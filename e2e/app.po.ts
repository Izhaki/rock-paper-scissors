import { browser, element, by } from 'protractor';

export class RockPaperScissorsPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('app-root h1')).getText();
  }

  getPlayerNames() {
    return element
      .all( by.className( 'player-name' ) )
      .map( aElement => aElement.getText() );
  }

  getPlayerScoreElements() {
    return element.all( by.className( 'player-score' ) );
  }

  getPlayerScores() {
    return this.getPlayerScoreElements().map( aElement => aElement.getText() );
  }

  getRockButton() {
    return element.all( by.className( 'button-rock' ) ).last();
  }

}
