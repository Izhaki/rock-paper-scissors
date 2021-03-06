import {
    Stream,
    Subscription
} from './Stream';

import { generateRandomIntInclusive } from './utils';

export
enum PlayerChoice {
    ROCK     = 0,
    PAPER    = 1,
    SCISSORS = 2
}

// Shorthand consts to reduce verbosity.
export const ROCK     = PlayerChoice.ROCK;
export const PAPER    = PlayerChoice.PAPER;
export const SCISSORS = PlayerChoice.SCISSORS;

export const DRAW = -1; // The returned value for a match in case there it's a draw

export const EVENT_ALL_PLAYERS_JOINED = 'All players joined';
export const EVENT_MATCH_CONCLUDED    = 'Match concluded';
export const EVENT_MATCH_STARTED      = 'Match started';

type Match = [ PlayerChoice, PlayerChoice ];

interface Player {
    id:         number;
    name:       string;
    score:      number;
    lastChoice: number;
    onAutoMode: Boolean;
}

export
class Game {
    private players: Array< Player > = [];
    private matches: Array< Match >  = [];
    private event$: Stream = new Stream();
    private playersCount = 2;

    static generateRandomChoice(): PlayerChoice {
        return generateRandomIntInclusive( 0, 2 );
    };

    addPlayer( aPlayerName: string ): number {

        const iPlayerID = this.players.length;

        this.players.push({
            id:         iPlayerID,
            name:       aPlayerName,
            score:      0,
            lastChoice: undefined,
            onAutoMode: false
        });

        if ( this.players.length === this.playersCount ) {
            this.event$.notify({
                type: EVENT_ALL_PLAYERS_JOINED,
                players: this.players
            });
        }

        return iPlayerID;
    }

    setPlayerAutoMode( aPlayerIndex: number, onAutoMode: boolean ): void {
        this.players[ aPlayerIndex ].onAutoMode = onAutoMode;
    }

    startNewMatch(): void {
        this.matches.push( [ undefined, undefined ] );
        this.event$.notify({
            type: EVENT_MATCH_STARTED
        });
    }

    setPlayerChoice( aPlayerIndex: number, aChoice: PlayerChoice ): void {
        this.getCurrentMatch()[ aPlayerIndex ] = aChoice;
        this.checkMatchEnd( this.getCurrentMatch() );
    }

    subscribe( aEventCallback ): Subscription {
        return this.event$.subscribe( aEventCallback );
    }

    private getCurrentMatch(): Match {
        const iLastMatchIndex = this.matches.length - 1;
        return this.matches[ iLastMatchIndex ];
    }

    private checkMatchEnd( aMatch: Match ): void {
        if ( this.allManualChoicesMade( aMatch ) ) {
            this.castAutoChoices( aMatch );
            this.concludeMatch( aMatch );
        }
    }

    private castAutoChoices( aMatch: Match ): void {
        this.players.forEach( ( aPlayer, aPlayerIndex ) => {
            if ( aPlayer.onAutoMode ) {
                const iRandomChoice = Game.generateRandomChoice();
                this.getCurrentMatch()[ aPlayerIndex ] = iRandomChoice;
            }
        });
    }

    private concludeMatch( aMatch: Match ): void {
        const [ aPlayer0Choice, aPlayer1Choice ] = aMatch;
        const iWinner = this.getWinner( aPlayer0Choice, aPlayer1Choice );

        this.updateScores( iWinner );

        this.players.forEach( ( aPlayer, aIndex ) => {
            aPlayer.lastChoice = aMatch[ aIndex ];
        });

        this.event$.notify({
            type:    EVENT_MATCH_CONCLUDED,
            winner:  iWinner,
            players: this.players
        });
    }

    private updateScores( aWinnerIndex: number ): void {
        if ( aWinnerIndex !== DRAW ) {
            this.players[ aWinnerIndex ].score++;
        }
    }

    // Note: The parameters are intentionally the choice of two players rather
    // than a Match, so we can later use this method if there are more than 2
    // players (eg, with Array.reduce()).
    // Also, you could implement this using nested ifs, but I've found the
    // matrix solution more declaritive.
    private getWinner( aPlayer0Choice: PlayerChoice, aPlayer1Choice: PlayerChoice ): number {
        const ROW = 0; // Row represents aPlayer0Choice
        const COL = 1; // Col represents aPlayer1Choice
        const iWinnerMatrix = [
            /*               [ ROCK, PAPER, SCISSORS ] */
            /*  ROCK:     */ [ DRAW,   COL,      ROW ],
            /*  PAPER:    */ [  ROW,  DRAW,      COL ],
            /*  SCISSORS: */ [  COL,   ROW,     DRAW ]
        ];
        return iWinnerMatrix[ aPlayer0Choice ][ aPlayer1Choice ];
    }

    private getManualPlayersCount(): number {
        return ( this.players.filter( aPlayer => !aPlayer.onAutoMode ) ).length;
    }

    private allManualChoicesMade( aMatch: Match ): boolean {
        let iManualChoiceMade = 0;
        this.players.forEach( ( aPlayer, aPlayerIndex ) => {
            if ( !aPlayer.onAutoMode && aMatch[ aPlayerIndex ] !== undefined ) {
                iManualChoiceMade++;
            }
        });
        return iManualChoiceMade === this.getManualPlayersCount();
    }

}
