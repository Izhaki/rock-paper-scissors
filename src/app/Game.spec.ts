import {
    Game,
    ROCK,
    PAPER,
    DRAW,
    SCISSORS
} from './Game';

describe( 'Game', () => {

    describe( 'A match should conclude with', () => {

        beforeEach( () => {
            this.game   = new Game();
            this.events = [];
            this.game.subscribe( aEvent => {
                this.events.push( aEvent );
            });
        });

        describe( 'a draw if the choice of both players chose', () => {

            it( 'rock', () => {
                this.game.setPlayerChoice( 0, ROCK );
                this.game.setPlayerChoice( 1, ROCK );

                expect( this.events.length ).toEqual( 1 );
                expect( this.events[0].winner ).toBe( DRAW );
            });

            it( 'paper', () => {
                this.game.setPlayerChoice( 0, PAPER );
                this.game.setPlayerChoice( 1, PAPER );

                expect( this.events.length ).toEqual( 1 );
                expect( this.events[0].winner ).toBe( DRAW );
            });

            it( 'scissors', () => {
                this.game.setPlayerChoice( 0, SCISSORS );
                this.game.setPlayerChoice( 1, SCISSORS );

                expect( this.events.length ).toEqual( 1 );
                expect( this.events[0].winner ).toBe( DRAW );
            });

        });

    });

});
