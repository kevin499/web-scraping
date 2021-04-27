const puppeteer = require('puppeteer');

async function scrapeCT(search, page = 1) {

    const url = `https://www.computrabajo.com.ar/trabajo-de-${search}?p=${page}`

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
                location: job.querySelector("div.iO > div > span:nth-child(2) > span > span:nth-child(1) > a")?.textContent || '',
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

async function scrapeZJ(search, page = 1) {

    const url = `https://www.zonajobs.com.ar/ofertas-de-trabajo-${search}-pagina-${page}.html`

    // const browser = await puppeteer.launch({
    //     headless: true,
    //     args: ["--disable-setuid-sandbox"],
    //     'ignoreHTTPSErrors': true
    // });

    const browser = await puppeteer.launch();

    const web_page = await browser.newPage();
    console.log(`Navigating to ${url}...`);

    await web_page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.181 Safari/537.36')
    await web_page.goto(url);

    let result_jobs = await web_page.$$eval('.list-jobs', jobs => {
        console.log(jobs)
        return [...jobs[0].querySelectorAll(".aviso")].map(job => {
            return {
                title: job.querySelector('h2.titulo-aviso')?.innerText || '',
                url: job.querySelector('h2.titulo-aviso')?.parentElement?.href || '',
                company: job.querySelector(".empresa_nombre_link")?.textContent.replace(/(\r\n|\n|\r|,)/gm, "").trim() || '',
                location: job.querySelector(".ubicacion")?.textContent.replace(/(\r\n|\n|\r|,)/gm, "").trim() || '',
                date: job.querySelector(".z-fecha")?.textContent || '',
            }
        })

    });
    return {
        page: page,
        results: result_jobs
    };

}



module.exports = {
    scrapeCT,
    scrapeZJ
};



// const waitTillHTMLRendered = async (page, timeout = 30000) => {
//   const checkDurationMsecs = 1000;
//   const maxChecks = timeout / checkDurationMsecs;
//   let lastHTMLSize = 0;
//   let checkCounts = 1;
//   let countStableSizeIterations = 0;
//   const minStableSizeIterations = 3;

//   while(checkCounts++ <= maxChecks){
//     let html = await page.content();
//     let currentHTMLSize = html.length; 

//     let bodyHTMLSize = await page.evaluate(() => document.body.innerHTML.length);

//     console.log('last: ', lastHTMLSize, ' <> curr: ', currentHTMLSize, " body html size: ", bodyHTMLSize);

//     if(lastHTMLSize != 0 && currentHTMLSize == lastHTMLSize) 
//       countStableSizeIterations++;
//     else 
//       countStableSizeIterations = 0; //reset the counter

//     if(countStableSizeIterations >= minStableSizeIterations) {
//       console.log("Page rendered fully..");
//       break;
//     }

//     lastHTMLSize = currentHTMLSize;
//     await page.waitFor(checkDurationMsecs);
//   }  
// };