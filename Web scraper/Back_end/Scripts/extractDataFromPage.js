import puppeteer from 'puppeteer';
import * as cheerio from 'cheerio';




export async function extractDataFromPage (URL,choice) 
	{

		var contentLoaded = false;
		var data;
		const urlNEW = URL.replace('novi','www');
		

				const browser = await puppeteer.launch({headless:true});
				const page = await browser.newPage();

		try
			{
				
				if(choice === 'kupujem')
					{
						page.setRequestInterception(true);

						page.on('request', async (req) => {
							if (req.url().includes('pretraga')){

								page.on('response',async (res)=>{	


									const arrayOptions = [];

									// load html with cheerio
									const dataHtml = await res.text();
									const $ = cheerio.load(dataHtml);
									
									//gather data
									const adList = $('[id*="adDescription"]');
									$(adList).each((i,e)=>{
										const nameRaw = $(e).find('a[class="adName"]').text().trim();
										const descriptionRaw = $(e).find('div[class*="adDescription"]').text().trim();
										const priceRaw = $(e).find('span[class*="adPrice"]').text().trim();
										const linkRaw = $(e).find('[class="adName"]').attr('href').trim();

										const name = nameRaw.trim();
										const descriptionArray = descriptionRaw.split(',');
										const FuelAndDescArray = descriptionArray[3].split('.');
										const year = descriptionArray[0].match('[0-9]+')[0]
										const km = descriptionArray[1].trim().replaceAll('.','').replace(' km','');
										const cc = descriptionArray[2].trim().replace(' cm3','');
										const fuel = FuelAndDescArray[0].trim();
										
										FuelAndDescArray.shift();
										// const descriptionBefore = FuelAndDescArray.join('').trim()
										// const description = FuelAndDescArray.join(' ').trim();
										const price = priceRaw.split(',')[0].trim().replace('.','');
										if(priceRaw.includes('din')){
											price.concat(' din');
											
										}
										
										const link = `https://novi.kupujemprodajem.com${linkRaw}`;
										const carObject = {'Car Name':name,'Car Year':year,'Car Price':price,'Car Fuel':fuel,'Car CC':cc,'Car KM':km,'href':link}
										arrayOptions.push(carObject);
									})
									
									data = arrayOptions;
									await browser.close()
								})

								req.continue();									
							}
						});
						
						await page.goto(urlNEW);
						
						
					}
				else if (choice === 'polovni')
					{

						page.setRequestInterception(true);

						page.on('request', async (req) => {
							if (req.url().includes('pretraga')){

								page.on('response',async (res)=>{	

									const arrayOptions = [];

									// load html with cheerio 
									const dataHtml = await res.text();
									const $ = cheerio.load(dataHtml);
									
									//gather data
									const featuredCarsList = [];
									const ordinaryCarsList = [];

									try {
										const featuredList = $('section[class*="classified"]');
										$(featuredList).each((i,e)=>{

										})
										
									} catch(e){}

									const ordinaryList = $('article[class*="classified"]');
									
									$(ordinaryList).each((i,e)=>{

										//if element is hidden, don't load it
										var hidden = false;
										try {
											var element = $(e).find('div[class="textContentHolder"]').length;
											if (element === 0){
												hidden = true;
											}
										} catch (e){}
										if(hidden){return};


										var priceDiscount;
										var priceRaw;
										const nameRaw = $(e).find('a[class="ga-title"]').text().trim();
										const linkRaw = $(e).find('a[class="ga-title"]').attr('href').trim();
									
										try {
											var x = $(e).find('span[class*="discount"i]');
											if(x.length>0){
												priceDiscount = x.text().trim().replaceAll('.','').replace(' €','');
											}
										} catch (e){}
										if(priceDiscount === undefined){
											priceRaw = $(e).find('div[class*="price"]').text().trim().replaceAll('.','').replace(' €','');
										}
										const descriptionRaw1 = $(e).find('div[class*="setInfo"]')[0]; 
										const descriptionRaw2 = $(e).find('div[class*="setInfo"]')[1]; 
										const year = $(descriptionRaw1).find('div[class="top"]').text().match(/\d+/g)[0];
										const fuel = $(descriptionRaw1).find('div[class="bottom"]').text().split('|')[0].trim();
										var cc;

										try {
											var includesDigits = $(descriptionRaw1).find('div[class="bottom"]').text().match(/\d+/g)
											if(includesDigits === null){
												cc = $(descriptionRaw1).find('div[class="bottom"]').text().trim();
											}
										} catch (e){}
										if (cc === undefined){
											cc = $(descriptionRaw1).find('div[class="bottom"]').text().match(/\d+/g)[0];
										}
										const name = nameRaw;
										const km = $(descriptionRaw2).find('div[class="top"]').text().replace(' km','').replaceAll('.','');
									
										const link = `https://www.polovniautomobili.com${linkRaw}`;
										const carObject = {'Car Name':name,'Car Year':year,'Car Price': priceDiscount === undefined ? priceRaw : priceDiscount ,'Car Fuel':fuel,'Car CC':cc,'Car KM':km,'href':link}
										arrayOptions.push(carObject);
									})


									
									
									data = arrayOptions;
									await browser.close()
								})

								req.continue();									
							}
						});
						
						await page.goto(URL);
					}
				
			}
		catch(e){console.log(e,'outside error'), await browser.close()}

		return data;

	}