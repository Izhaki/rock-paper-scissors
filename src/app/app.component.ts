import { Component } from '@angular/core';
import {
  Game,
  EVENT_ALL_PLAYERS_JOINED
} from './Game';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title   = 'Rock, Paper, Scissors.';
  game    = undefined;
  players = undefined;

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
        break;

    }

  }
}
