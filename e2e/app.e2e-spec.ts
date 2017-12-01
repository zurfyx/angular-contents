import { AppPage } from './app.po';

describe('App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
    page.navigateTo();
  });

  it('should display "<Angular2+ Library Starter Kit>"', () => {
    expect(page.getTitleText()).toContain('<Angular2+ Library Starter Kit>');
  });
});
