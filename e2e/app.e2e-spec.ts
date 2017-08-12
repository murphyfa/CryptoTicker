import { CryptotickerPage } from './app.po';

describe('cryptoticker App', function() {
  let page: CryptotickerPage;

  beforeEach(() => {
    page = new CryptotickerPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
