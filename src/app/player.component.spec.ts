/* tslint:disable:no-unused-variable */

import { By } from '@angular/platform-browser';

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

  beforeEach( () => {
    this.component.player = {
      id:   0,
      name: 'Johnny',
      score: 10,
    };

    this.fixture.detectChanges();
  });

  it('should render the player name', async(() => {
    expect( this.compiled.querySelector( '.player-name' ).textContent ).toContain( 'Johnny' );
  }));

  it('should render the player score', async(() => {
    expect( this.compiled.querySelector( '.player-score' ).textContent ).toContain( '10' );
  }));

  it('should render the 3 buttons', async(() => {
    this.debugElement = this.fixture.debugElement;
    const buttonElements = this.debugElement.queryAll(By.css('button'));

    expect( buttonElements.length ).toBe( 3 );
  }));


});
