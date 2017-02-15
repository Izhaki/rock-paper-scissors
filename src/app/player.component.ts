import {
  Component,
  Input,
  Output,
  EventEmitter
} from '@angular/core';

import {
  ROCK,
  PAPER,
  SCISSORS
} from './Game';


@Component({
  selector: 'player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent {
  @Input() player;
  @Input() matchOn;
  @Output() onChoiceMade = new EventEmitter();

  rock     = ROCK;
  paper    = PAPER;
  scissors = SCISSORS;

  choose( aChoice ) {
    if ( this.matchOn ) {
      this.onChoiceMade.emit( aChoice );
    }
  }

  isDisabled( aChoice ) {
    const { player, matchOn } = this;
    if ( matchOn ) {
      return player.onAutoMode;
    } else {
      return player.lastChoice !== aChoice;
    }

  }

}
