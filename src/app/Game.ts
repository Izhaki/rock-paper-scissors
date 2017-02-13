import {
    Stream,
    Subscription
} from './Stream';

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

type Match = [ PlayerChoice, PlayerChoice ];

interface Player {
    name:       string;
    onAutoMode: Boolean;
}

export
class Game {
    private players: Array< Player > = [];
    private matches: Array< Match >  = [];
    private event$: Stream = new Stream();

    addPlayer( aPlayerName: string ): number {
        return this.players.push({
            name:       aPlayerName,
            onAutoMode: false
        });
    }

    setPlayerAutoMode( aPlayerIndex: number, onAutoMode: boolean ): void {
        this.players[ aPlayerIndex ].onAutoMode = onAutoMode;
    }

    startNewMatch(): void {
        this.matches.push( [ undefined, undefined ] );
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
                this.getCurrentMatch()[ aPlayerIndex ] = ROCK;
            }
        });
    }

    private concludeMatch( aMatch: Match ): void {
        const [ aPlayer0Choice, aPlayer1Choice ] = aMatch;
        const iWinner = this.getWinner( aPlayer0Choice, aPlayer1Choice );
        this.event$.notify({
            winner: iWinner
        });
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
