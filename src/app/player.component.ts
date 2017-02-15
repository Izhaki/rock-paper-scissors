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
    this.onChoiceMade.emit( aChoice );
  }

}
