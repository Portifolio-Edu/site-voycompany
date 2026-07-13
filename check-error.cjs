const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();
    
    page.on('console', msg => console.log('PAGE LOG:', msg.text()));
    page.on('pageerror', error => console.log('PAGE ERROR:', error.message));
    page.on('requestfailed', request => console.log('REQUEST FAILED:', request.url(), request.failure().errorText));

    console.log('Navigating to http://localhost:5174 ...');
    try {
        await page.goto('http://localhost:5174', { waitUntil: 'networkidle0', timeout: 10000 });
        console.log('Page loaded successfully.');
        const errorText = await page.evaluate(() => document.getElementById('error-log').innerText);
        console.log('ERROR LOG TEXT:', errorText);
    } catch (e) {
        console.error('Navigation error:', e.message);
    }
    
    await browser.close();
})();
