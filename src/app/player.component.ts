import {
  Component,
  Input
} from '@angular/core';

@Component({
  selector: 'player',
  templateUrl: './player.component.html',
})
export class PlayerComponent {
  @Input()
  player;
}
