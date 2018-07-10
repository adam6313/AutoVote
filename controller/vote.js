const puppeteer = require('puppeteer');

const AutoVote = async (ctx) => {
  const data = {
    url: 'https://goo.gl/forms/v0L8aoZuFGBf3NpC3', // test
    id: ctx.request.body.id,
    name: ctx.request.body.name,
    department: ctx.request.body.department,
    department_name: ctx.request.body.department_name,
    openBrowser: ctx.request.body.openBrowser || false,
  }
  
  const browser = await puppeteer.launch({headless: !data.openBrowser});
  const page = await browser.newPage();
  await page.goto(data.url);
  await page.type('#mG61Hd > div > div.freebirdFormviewerViewFormContent > div.freebirdFormviewerViewItemList > div:nth-child(1) > div.freebirdFormviewerViewItemsTextItemWrapper > div > div.quantumWizTextinputPaperinputMainContent.exportContent > div > div.quantumWizTextinputPaperinputInputArea > input', data.id);
  await page.type('#mG61Hd > div > div.freebirdFormviewerViewFormContent > div.freebirdFormviewerViewItemList > div:nth-child(2) > div.freebirdFormviewerViewItemsTextItemWrapper > div > div.quantumWizTextinputPaperinputMainContent.exportContent > div > div.quantumWizTextinputPaperinputInputArea > input', data.name);
  await page.click('#mG61Hd > div > div.freebirdFormviewerViewFormContent > div.freebirdFormviewerViewNavigationNavControls > div.freebirdFormviewerViewNavigationButtonsAndProgress > div > div > div.quantumWizButtonPaperbuttonFocusOverlay.exportOverlay');

  await page.waitFor(2000);
  await page.evaluate(data => {
    document.querySelector('#mG61Hd > div > div.freebirdFormviewerViewFormContent > div.freebirdFormviewerViewItemList > div:nth-child(2) > input[type="hidden"]').value = data;
  }, data.department);
  await page.type('#mG61Hd > div > div.freebirdFormviewerViewFormContent > div.freebirdFormviewerViewItemList > div.freebirdFormviewerViewItemsItemItem.freebirdFormviewerViewItemsTextTextItem > div.freebirdFormviewerViewItemsTextItemWrapper > div > div.quantumWizTextinputPaperinputMainContent.exportContent > div > div.quantumWizTextinputPaperinputInputArea > input', data.department_name);
  await page.click('#mG61Hd > div > div.freebirdFormviewerViewFormContent > div.freebirdFormviewerViewNavigationNavControls > div.freebirdFormviewerViewNavigationButtonsAndProgress > div > div.quantumWizButtonPaperbuttonEl.quantumWizButtonPaperbuttonFlat.quantumWizButtonPaperbuttonDark.quantumWizButtonPaperbutton2El2.freebirdFormviewerViewNavigationSubmitButton > div.quantumWizButtonPaperbuttonFocusOverlay.exportOverlay');
  await page.waitFor(1000);
  await page.close();
}

module.exports = {
    AutoVote,
};