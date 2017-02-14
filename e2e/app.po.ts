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

  getPlayerScores() {
    return element
      .all( by.className( 'player-score' ) )
      .map( aElement => aElement.getText() );
  }

}
