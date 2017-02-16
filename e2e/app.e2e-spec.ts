import { RockPaperScissorsPage } from './app.po';

describe('rock-paper-scissors App', function() {
  let page: RockPaperScissorsPage;

  beforeEach(() => {
    page = new RockPaperScissorsPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Rock | Paper | Scissors');
  });

  it('should display the player names', () => {
    page.navigateTo();
    expect(page.getPlayerNames()).toEqual( [ 'Computer', 'You' ] );
  });

  it('should display the player scores', () => {
    page.navigateTo();
    expect(page.getPlayerScores()).toEqual( [ '000', '000' ] );
  });

});
