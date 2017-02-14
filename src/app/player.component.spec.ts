/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { PlayerComponent } from './player.component';

describe( 'PlayerComponent', () => {
  beforeEach( () => {
    TestBed.configureTestingModule({
      declarations: [
        PlayerComponent
      ],
    });
    TestBed.compileComponents();
    this.fixture   = TestBed.createComponent(PlayerComponent);
    this.component = this.fixture.componentInstance;
    this.compiled  = this.fixture.debugElement.nativeElement;
  });

  it('should render the player name', async(() => {
    this.component.player = {
      name: 'Johnny',
    };
    this.fixture.detectChanges();

    expect( this.compiled.querySelector( '.player-name' ).textContent ).toContain( 'Johnny' );
  }));

  it('should render the player score', async(() => {
    this.component.player = {
      score: 10,
    };
    this.fixture.detectChanges();

    expect( this.compiled.querySelector( '.player-score' ).textContent ).toContain( '10' );
  }));

});
