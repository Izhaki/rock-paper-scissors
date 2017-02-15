import { RockPaperScissorsPage } from './app.po';

describe('rock-paper-scissors App', function() {
  let page: RockPaperScissorsPage;

  beforeEach(() => {
    page = new RockPaperScissorsPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Rock  |  Paper  |  Scissors');
  });

  it('should display the player names', () => {
    page.navigateTo();
    expect(page.getPlayerNames()).toEqual( [ 'Computer', 'You' ] );
  });

  it('should display the player scores', () => {
    page.navigateTo();
    expect(page.getPlayerScores()).toEqual( [ '0', '0' ] );
  });

  it('when the user makes a choice the score should update ', () => {
    page.navigateTo();
    page.getRockButton().click();
    const totalScore = page.getPlayerScoreElements().reduce( ( acc, element ) => element.getText().then( text => acc + +text ), 0);
    expect( totalScore ).toEqual( 1 );
  });


});
