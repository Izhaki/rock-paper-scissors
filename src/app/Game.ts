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

export
class Game {
    private match: Match = [ undefined, undefined ];
    private event$: Stream = new Stream();

    setPlayerChoice( aPlayerIndex: number, aChoice: PlayerChoice ): void {
        this.match[ aPlayerIndex ] = aChoice;
        this.checkMatchEnd( this.match );
    }

    subscribe( aEventCallback ): Subscription {
        return this.event$.subscribe( aEventCallback );
    }

    private checkMatchEnd( aMatch: Match ): void {
        if ( this.allPlayersMadeTheirChoice( aMatch ) ) {
            this.concludeMatch( aMatch );
        }
    }

    private concludeMatch( aMatch: Match ): void {
        this.event$.notify({
            winner: DRAW
        });
    }

    private allPlayersMadeTheirChoice( aMatch: Match ): boolean {
        const iNoChoiceMadeCount = ( aMatch.filter( aChoice => aChoice === undefined ) ).length;
        return iNoChoiceMadeCount === 0;
    }

}
