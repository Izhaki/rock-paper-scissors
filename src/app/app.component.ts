import { Component } from '@angular/core';
import {
  Game,
  EVENT_ALL_PLAYERS_JOINED,
  EVENT_MATCH_STARTED,
  EVENT_MATCH_CONCLUDED,
  DRAW
} from './Game';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title         = 'Rock, Paper, Scissors.';
  game          = undefined;
  players       = undefined;
  matchOn       = false;
  winnerMessage = undefined;

  constructor() {
    this.game = new Game();

    this.game.subscribe( aEvent => this.onGameEvent( aEvent ) );

    const iComputerPlayerIndex = this.game.addPlayer( 'Computer' );
    this.game.setPlayerAutoMode( iComputerPlayerIndex, true );

    this.game.addPlayer( 'You' );
  }

  onGameEvent( aEvent ) {
    switch ( aEvent.type ) {
      case EVENT_ALL_PLAYERS_JOINED:
        this.players = aEvent.players;
        this.game.startNewMatch();
        break;
      case EVENT_MATCH_STARTED:
        this.matchOn = true;
        break;
      case EVENT_MATCH_CONCLUDED:
        this.winnerMessage = aEvent.winner === DRAW ? `It's a draw` : `The winner is: ` + this.players[ aEvent.winner ].name;
        this.matchOn = false;
        break;
    }
  }

  onPlayerChoice( aPlayerId, aChoice ) {
    this.game.setPlayerChoice( aPlayerId, aChoice );
  }

  startNewMatch() {
    this.game.startNewMatch();
  }
}
