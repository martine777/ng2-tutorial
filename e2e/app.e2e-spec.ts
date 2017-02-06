import { Ng2TutorialPage } from './app.po';

describe('ng2-tutorial App', function() {
  let page: Ng2TutorialPage;

  beforeEach(() => {
    page = new Ng2TutorialPage();
  });

  it('should display message saying This is a hello-angular app', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('This is a hello-angular app');
  });
});
