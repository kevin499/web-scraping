const puppeteer = require('puppeteer');

async function scrapeCT(search, page = 1) {

    const url = `https://www.computrabajo.com.ar/trabajo-de-${search}?p=${page}`

    // const browser = await puppeteer.launch({
    //     headless: false,
    //     args: ["--disable-setuid-sandbox"],
    //     'ignoreHTTPSErrors': true
    // });

    const browser = await puppeteer.launch();

    const web_page = await browser.newPage();
    console.log(`Navigating to ${url}...`);
    await web_page.goto(url);

    let result_jobs = await web_page.$$eval('div.gO', jobs => {
        return [...jobs[0].querySelectorAll(".bRS")].map(job => {
            return {
                title: job.querySelector('.js-o-link')?.textContent || '',
                url: job.querySelector('.js-o-link')?.href || '',
                company: job.querySelector("div.iO > div > span:nth-child(1) > span > a")?.textContent || '',
                company_thumbnail: job.querySelector("div.iC > img")?.src || '',
                location: job.querySelector("div.iO > div > span:nth-child(2) > span > span:nth-child(1) > a")?.textContent || '' ,
                date: job.querySelector("div.iO > span")?.textContent || '',
                description: job.querySelector("div.iO > p")?.textContent || ''
            }
        })

    });
    return {
        page: page,
        results: result_jobs
    };
}

module.exports = {
    scrapeCT
};