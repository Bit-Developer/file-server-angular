import { AppPage } from './app.po';
import { browser, logging } from 'protractor';

describe('file-server-angular App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display file server title', async () => {
    await page.navigateTo();
    expect(await page.getTitleText()).toEqual('File Server');
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
