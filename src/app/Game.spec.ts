import {
    Game,
    ROCK,
    PAPER,
    DRAW,
    SCISSORS,
    EVENT_ALL_PLAYERS_JOINED
} from './Game';

describe( 'Game', () => {

    describe( 'generateRandomChoice()', () => {

        beforeEach( () => {
            this.randomStub = spyOn( Math, 'random' ).and;
        });

        it( 'should return ROCK if the random number is in the lower third', () => {
            this.randomStub.returnValue( 0 );
            expect( Game.generateRandomChoice() ).toBe ( ROCK );

            this.randomStub.returnValue( 0.333 );
            expect( Game.generateRandomChoice() ).toBe ( ROCK );
        });

        it( 'should return PAPER if the random number is in the middle third', () => {
            this.randomStub.returnValue( 0.34 );
            expect( Game.generateRandomChoice() ).toBe ( PAPER );

            this.randomStub.returnValue( 0.66 );
            expect( Game.generateRandomChoice() ).toBe ( PAPER );
        });

        it( 'should return SCISSORS if the random number is in the upper third', () => {
            this.randomStub.returnValue( 0.67 );
            expect( Game.generateRandomChoice() ).toBe ( SCISSORS );

            this.randomStub.returnValue( 0.99 );
            expect( Game.generateRandomChoice() ).toBe ( SCISSORS );
        });

    });

    it( 'should notify once all players have joined', () => {
            this.game = new Game();
            this.events = [];
            this.game.subscribe( aEvent => {
                this.events.push( aEvent );
            });

            this.game.addPlayer( 'Johnny' );
            this.game.addPlayer( 'Depp' );

            expect( this.events.length ).toEqual( 1 );
            expect( this.events[0].type ).toBe( EVENT_ALL_PLAYERS_JOINED );
            expect( this.events[0].players[0].name ).toBe( 'Johnny' );
            expect( this.events[0].players[1].name ).toBe( 'Depp' );
    });

    describe( 'once all players joined', () => {

        beforeEach( () => {
            this.game = new Game();
            this.game.addPlayer( 'Johnny' );
            this.game.addPlayer( 'Depp' );
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

        it( 'may involve a player in auto mode', () => {
            spyOn( Math, 'random').and.returnValue( 0 );

            this.game.setPlayerAutoMode( 1, true );
            this.game.setPlayerChoice( 0, ROCK );

            expect( this.events.length ).toEqual( 1 );
            expect( this.events[0].winner ).toBe( DRAW );
        });

    });

});
