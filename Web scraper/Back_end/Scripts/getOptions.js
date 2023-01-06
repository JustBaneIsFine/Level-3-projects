import * as cheerio from 'cheerio';
import puppeteer from 'puppeteer';
//cSpell: disable
var contentLoaded = false;
var urlPolovni = 'https://www.polovniautomobili.com';
var urlKupujem = 'https://www.kupujemprodajem.com/automobili/kategorija/2013';

export async function getWebsiteMake(website)
	{

		if (website === "polovni")
			{
				contentLoaded = false;
				var make = await handlerFunction(getMakePolovni);
				return make; 
			}

		else if (website === "kupujem")
			{
				contentLoaded = false;
				var make = await handlerFunction(getMakeKupujem);
				return make;
			}
	}

export async function getWebsiteModel(website,make)
	{
		if (website === "polovni")
			{
				contentLoaded = false;
				var model = await handlerFunction(getModelPolovni,make);
				return model;
			}

		else if (website === "kupujem")
			{
				contentLoaded = false;
				var model = await handlerFunction(getModelKupujem,make);
				return model;
			}

	}

export async function getWebsiteYear(website,make,model)
	{
		//set make and model

		if (website === "polovni")
			{	
				contentLoaded = false;
				var year = await handlerFunction(getYearPolovni,make,model);
				return year;
			}

		else if (website === "kupujem")
			{
				contentLoaded = false;
				var year = await handlerFunction(getYearKupujem,make,model);
				return year;
			}
	}



async function getMakePolovni()
	{
		// POLOVNI DOES NOT FETCH MAKE, BUT IT DOES FETCH MODELS
		let data;

		try {

		//start up browser and open page
		const browser = await puppeteer.launch({headless:true});
		const page = await browser.newPage();
		await page.goto(urlPolovni,{waitUntil: 'domcontentloaded'});

		data = await page.evaluate(()=>{
			const optionsArray = document.getElementById('brand').options;
			const options = [];
			for (let i=1;i<optionsArray.length;i++){
				options.push({'name':optionsArray[i].innerText});
			}
			return options;
		})
		
		await browser.close();		

	} catch(e){console.log(e)};
	console.log(data);
	return data;
	}

async function getMakeKupujem()
	{
		var data;

		try {

		//start up browser and open page
		const browser = await puppeteer.launch({headless:true});
		const page = await browser.newPage();
		await page.goto(urlKupujem,{waitUntil:'domcontentloaded'});
		
		// catch the response and pull out data
		const [response] = await Promise.all([
			page.waitForResponse(async(response) => {
					if(
						response.url().includes('categories') && 
						response.headers()['content-type'] === 'application/json')
						{
							data = await response.json()
							return true;
						}
				}),
			page.click('button.ButtonAsLink_asLink__PxD0l:nth-child(1) > span:nth-child(1)')
		])

		await browser.close();		

	} catch(e){console.log(e)};

	if(data.categories.length>1){
		const resultArray = [];
		data.categories.forEach(x=>{
			resultArray.push({'name':x.name, 'id':x.id});
		})
		return resultArray;
	} else{
		return false;
	}


	}


async function getModelPolovni(make)
	{
		let data;

		try {

		//start up browser and open page
		const browser = await puppeteer.launch({headless:true});
		const page = await browser.newPage();
		await page.goto(urlPolovni,{waitUntil: 'domcontentloaded'});


		await page.click('.sumo_brand');
		await page.waitForSelector('.sumo_brand .search-txt');
		await page.type('.sumo_brand .search-txt', make);

		// catch and save the response data
		const [response] = await Promise.all([
			page.waitForResponse(async(response) => {
					if(
						response.url().includes('models'))
						{
							let dataRes = await response.text();
							const $ = cheerio.load(dataRes);
							const options = $('option');
							const arrayOptions = [];
							$(options).each((i,e)=>{
								arrayOptions.push({'name':$(e).text().trim()});
							})
							//$(options[0]).text().trim()
							data = arrayOptions;
							return true;
						}
				}),
			
				page.evaluate((make)=>{
					let found = false;
					const brandElement =  document.querySelector('.sumo_brand');
					const allOptions = brandElement.getElementsByTagName('li');
					
					for (let i=0;i<allOptions.length;i++){
				
						if(found === false){
							if (allOptions[i].innerText === make){
								allOptions[i].click();
								found = true;
							}
					} 
					}
					
				return found;
				},make)
			
		])
		await browser.close();	
		return data;

	} catch(e){console.log(e)};
	return data;

	}

async function getModelKupujem(make)	
	{ 
		var data;



		try {

		//start up browser and open page
		const browser = await puppeteer.launch({headless:true});
		const page = await browser.newPage();

		await page.goto(urlKupujem);
		await page.click('button.ButtonAsLink_asLink__PxD0l:nth-child(1) > span:nth-child(1)')
		await page.waitForSelector('#react-select-groupId-placeholder');
		await page.type('#react-select-groupId-input',make);

		await page.waitForSelector('[id*=groupId-option]');
		// catch and save the response data
		const [response] = await Promise.all([
			page.waitForResponse(async(response) => {
					if(
						response.url().includes('categories') && 
						response.headers()['content-type'] === 'application/json' &&
						!response.url().includes('groups'))
						{
							let dataResponse = await response.json()
							data = dataResponse.results;
							return true;
						}
				}),
				page.evaluate((make)=>{
					const listOptions = document.querySelectorAll('[id*=groupId-option]');
					var found = false;

					listOptions.forEach(el=>{
						if(!found && el.innerText === make){
							el.click();
							found = true;
						}
					})

				},make)
				
			
		])

		// await page.screenshot({path:'./imageSreenNew2.jpeg',fullPage:true})
		await browser.close();		

	} catch(e){console.log(e)};

	return data;

	}


async function getYearPolovni(make,model)
	{
		var data;

		try {
		//start up the browser and set config
		const browser = await puppeteer.launch({headless:true});
		const page = await browser.newPage();
		await page.goto(urlPolovni,{waitUntil:'domcontentloaded'});
		await page.waitForSelector('.sumo_year_to',{timeout:15000});
		data = await page.evaluate(async(make,model)=>{
			if(document.readyState != 'interactive' && document.readyState != 'complete')	
				{
					var promiseDom = new Promise((resolve,reject)=>
							{
								document.addEventListener('DOMContentLoaded',resolve);
							});	
					await promiseDom;
				}

			var data;
			var yearOptionsStart = document.getElementsByClassName('sumo_year_from')[0].querySelectorAll('.opt');
			var yearStartArray = [];

			for (let i=0;i<yearOptionsStart.length;i++)
				{
					yearStartArray.push(yearOptionsStart[i].innerText.replace('.','').replace(' ','').replace('god',''));
				}


			var yearOptionsEnd = document.getElementsByClassName('sumo_year_to')[0].querySelectorAll('.opt');
			var yearEndArray = [];

			for (let i=0;i<yearOptionsEnd.length;i++)
				{
					yearEndArray.push(yearOptionsEnd[i].innerText.replace('.','').replace(' ','').replace('god',''));
				}
			data = {"yearStart":yearStartArray,"yearEnd":yearEndArray};

			return data;

			},make,model);
		

	}catch(e){console.log(e)};
	if (data != undefined){contentLoaded=true}
	console.log(data)
	return data;
	}

async function getYearKupujem(make,model)
	{
		var data;
		var yearStart = [];
		var yearEnd = [];

		try {
		//start up the browser and set config
		const browser = await puppeteer.launch({headless:true});
		const page = await browser.newPage();
		page.setDefaultNavigationTimeout(0);
		await page.goto(urlKupujem,{waitUntil:'domcontentloaded'});
		await page.click('button.ButtonAsLink_asLink__PxD0l:nth-child(1) > span:nth-child(1)')

		// get yearStart
		await page.waitForSelector('#react-select-vehicleMakeYearMin-placeholder')
		await page.click('#react-select-vehicleMakeYearMin-placeholder');
		await page.waitForSelector('#react-select-vehicleMakeYearMin-option-0');

		yearStart = await page.evaluate(()=>{
			let yearStart = [];
			const listOptions = document.querySelectorAll('[id*=select-vehicleMakeYearMin-option]');

			listOptions.forEach(el=>{
				var text = el.innerText.replace('.','');
				yearStart.push(text);
			})
			return yearStart;
		})

		// get yearEnd
		await page.click('#react-select-vehicleMakeYearMax-placeholder');
		await page.waitForSelector('#react-select-vehicleMakeYearMax-option-0');
		yearEnd = await page.evaluate(()=>{
			let yearEnd = [];
			const listOptions = document.querySelectorAll('[id*=select-vehicleMakeYearMax-option]');

			listOptions.forEach(el=>{
				var text = el.innerText.replace('.','');
				yearEnd.push(text);
			})
			return yearEnd;
		})

	data = {'yearStart':yearStart,'yearEnd':yearEnd};

	}catch(e){};

	return data;
	}


async function handlerFunction(dataToGet,arg1,arg2)
	{

		var gotData = false;
		var count = 0;
		var make;

		while (!gotData && count < 5)
			{

				make = await dataToGet(arg1,arg2);

				if (make === undefined || make === false)
					{
						count++;
						console.log("FAILED TO GET WEBSITE DATA DUE TO SOME ERROR")
					}
				else 
					{
						try{
							if(make.length >= 1)
								{
									gotData = true;
								}

						}catch(e){gotData = false;}

						try
						{

							if(Object.keys(make).length >=1)
								{
									gotData = true;
									
								}
						}
						catch(e)
							{
								gotData = false;
							}



					}

			}

		if(gotData === false)
			{
				make = false;;
				console.log("HUGE ERROR, TRIED 5 TIMES AND FAILED...")
			}
		
		return make;
	}

function convertToArray(keyName, object){
	const array = [];
	

	
	
	return array;
}



