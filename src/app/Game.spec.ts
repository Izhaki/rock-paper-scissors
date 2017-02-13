import {
    Game,
    ROCK,
    PAPER,
    DRAW,
    SCISSORS
} from './Game';

describe( 'Game', () => {

    beforeEach( () => {
        this.game = new Game();
        this.game.startNewMatch();
        this.events = [];
        this.game.subscribe( aEvent => {
            this.events.push( aEvent );
        });
    });

    describe( 'A match should conclude with', () => {

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

        describe( 'player 0 winning when', () => {

            it( 'player 0 chose rock and player 1 chose scissors', () => {
                this.game.setPlayerChoice( 0, ROCK );
                this.game.setPlayerChoice( 1, SCISSORS );

                expect( this.events.length ).toEqual( 1 );
                expect( this.events[0].winner ).toBe( 0 );
            });

            it( 'player 0 chose scissors and player 1 chose paper', () => {
                this.game.setPlayerChoice( 0, SCISSORS );
                this.game.setPlayerChoice( 1, PAPER );

                expect( this.events.length ).toEqual( 1 );
                expect( this.events[0].winner ).toBe( 0 );
            });

            it( 'player 0 chose paper and player 1 chose rock', () => {
                this.game.setPlayerChoice( 0, PAPER );
                this.game.setPlayerChoice( 1, ROCK );

                expect( this.events.length ).toEqual( 1 );
                expect( this.events[0].winner ).toBe( 0 );
            });

        });

        describe( 'player 1 winning when', () => {

            it( 'player 1 chose rock and player 0 chose scissors', () => {
                this.game.setPlayerChoice( 1, ROCK );
                this.game.setPlayerChoice( 0, SCISSORS );

                expect( this.events.length ).toEqual( 1 );
                expect( this.events[0].winner ).toBe( 1 );
            });

            it( 'player 1 chose scissors and player 0 chose paper', () => {
                this.game.setPlayerChoice( 1, SCISSORS );
                this.game.setPlayerChoice( 0, PAPER );

                expect( this.events.length ).toEqual( 1 );
                expect( this.events[0].winner ).toBe( 1 );
            });

            it( 'player 1 chose paper and player 0 chose rock', () => {
                this.game.setPlayerChoice( 1, PAPER );
                this.game.setPlayerChoice( 0, ROCK );

                expect( this.events.length ).toEqual( 1 );
                expect( this.events[0].winner ).toBe( 1 );
            });

        });

    });

    it( 'may consist of more than one match', () => {
        this.game.setPlayerChoice( 0, ROCK );
        this.game.setPlayerChoice( 1, ROCK );

        this.game.startNewMatch();

        this.game.setPlayerChoice( 0, ROCK );
        this.game.setPlayerChoice( 1, PAPER );

        expect( this.events.length ).toEqual( 2 );
        expect( this.events[0].winner ).toBe( DRAW );
        expect( this.events[1].winner ).toBe( 1 );
    });


});
