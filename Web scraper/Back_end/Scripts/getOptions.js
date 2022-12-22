import * as cheerio from 'cheerio';



// IMPORT CHERIO AND USE IT TO PARSE AND GET THE DATA FROM HTML RESPONSE __________________________________________________________
//_______________________
//_______________________

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
				console.log(model);
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
		var data;

		try {

		//start up browser and open page
		const browser = await puppeteer.launch({headless:true});
		const page = await browser.newPage();
		await page.goto(urlPolovni,{waitUntil: 'domcontentloaded'});
		
		data = await page.evaluate(()=>{
			const optionsArray = document.getElementById('brand').options;
			const options = [];
			for (let i=1;i<optionsArray.length;i++){
				options.push(optionsArray[i].innerText);
			}
			return options;
		})
		

		
		await browser.close();		

	} catch(e){};

	return data;
	}

async function getMakeKupujem()
	{
		var data;

		try {

		//start up browser and open page
		const browser = await puppeteer.launch({headless:true});
		const page = await browser.newPage();
		await page.goto(urlKupujem);
		
		// catch and save the response data
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

	} catch(e){};

	if(data.categories.length>1){
		const resultArray = [];
		data.categories.forEach(x=>{
			resultArray.push(x.name);
		})
		return resultArray;
	} else{
		return false
	}


	}


async function getModelPolovni(make)
	{
		let data;

		try {

		//start up browser and open page
		const browser = await puppeteer.launch({headless:true});

		const page = await browser.newPage();
		await page.setViewport({
			width: 1200,
			height: 600,
			deviceScaleFactor: 1,
		  });
		await page.goto(urlPolovni,{waitUntil: 'domcontentloaded'});
		console.log('page loaded')
		await page.click('.sumo_brand');
		console.log('clicked')
		await page.waitForSelector('.sumo_brand .search-txt');
		console.log('selector found');
		await page.type('.sumo_brand .search-txt', make);
		console.log('screenshot-start after type')
		await page.screenshot({path:'./pictureAFTERTYPEPOLOVNI.png',fullPage:true});
		console.log('screenshot-end')

	

		

		// catch and save the response data
		const [response] = await Promise.all([
			page.waitForResponse(async(response) => {
				
				console.log('waiting for response')
					if(
						response.url().includes('models'))
						{
							console.log('got response')
							let dataRes = await response.text();
							const $ = cheerio.load(dataRes);
							const options = $('option');
							const arrayOptions = [];
							$(options).each((i,e)=>{
								arrayOptions.push($(e).text().trim());
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
		console.log('response and click done')
		await browser.close();	
		return data;

	} catch(e){console.log(e)};
	console.log(data);
	return data;

	}

async function getModelKupujem(make)	
	{ 
		//click on this: ::::::::::::::  div.Grid_col-lg-4__fPwt2:nth-child(1) > span:nth-child(2) > div:nth-child(2)
		// then this will become available after clicking ::::::::   'div.Grid_col-lg-4__fPwt2:nth-child(1) > span:nth-child(2) > div:nth-child(2)'  
		var data;

		try {

		//start up browser and open page
		const browser = await puppeteer.launch({headless:true});
		const page = await browser.newPage();
		
		await page.goto(urlKupujem);
		await page.click('button.ButtonAsLink_asLink__PxD0l:nth-child(1) > span:nth-child(1)')
		await page.waitForSelector('div.Grid_col-lg-4__fPwt2:nth-child(1) > span:nth-child(2) > div:nth-child(2)')
		await page.click('div.Grid_col-lg-4__fPwt2:nth-child(1) > span:nth-child(2) > div:nth-child(2)');
		await page.waitForSelector('.css-1gxogjc-menu');
		await page.type('#react-select-groupId-input', make);
		
		


		console.log('getting to log data')

		// catch and save the response data
		const [response] = await Promise.all([
			page.waitForResponse(async(response) => {
					if(
						response.url().includes('categories') && 
						response.headers()['content-type'] === 'application/json' &&
						!response.url().includes('groups'))
						{
							data = await response.json()
							return true;
						}
				}),
				page.keyboard.press('Enter')
			
		])
		console.log('before screen')
		await page.screenshot({path:'./picture2.png',fullPage:true});
		console.log('after screen')
		console.log(data)
		await browser.close();		

	} catch(e){};

	return data;

	}


async function getYearPolovni(make,model)
	{
		var data;

		try {
		//start up the browser and set config
		const browser = await puppeteer.launch({headless:true});
		const page = await browser.newPage();
		await page.setRequestInterception(true);
		page.setDefaultNavigationTimeout(0);

		data = page.waitForSelector('.sumo_year_to',{timeout:15000})
		.then(
				()=>{

						return (async function(){
							try{

							const text = await page.evaluate((make,model)=>{
								return (async function(){

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
								})(); 






								},make,model)
							await browser.close();
							contentLoaded = true;
							return text;

							}catch(e){console.log(e)};








						})();




				}
			
			).catch((e)=>{console.log(e,"expected error, ignore"); browser.close();return false})


		//intercept page requests
		page.on('request',request => {

					if(!contentLoaded)
						{
							if(request.resourceType() === 'image' || 
								  	request.resourceType() ==='imageset' ||
								  	request.resourceType() ==='media'||
								  	request.resourceType() === 'font'||
								  	request.resourceType() === 'object'||
								  	request.resourceType() === 'object_subrequest'||	
								  	request.resourceType() === 'sub_frame'||
								  	request.resourceType() === 'xmlhttprequest'
								)
									{
										//cancel request
										request.respond({
											status:200,
											body:"foo"
										})	
									}
							else
								{
									request.continue();
								}

						}
				})

		await page.goto(urlPolovni);

	}catch(e){};
	return data;
	}

async function getYearKupujem(make,model)
	{
		var data;

		try {
		//start up the browser and set config
		const browser = await puppeteer.launch({headless:true});
		const page = await browser.newPage();
		await page.setRequestInterception(true);
		page.setDefaultNavigationTimeout(0);

		data = page.waitForSelector('#vehicleMakeYearSecondMinSelection',{timeout:15000}) 
		.then(
				()=>{

						return (async function(){
							try{

							const text = await page.evaluate((make,model)=>{
								return (async function(){

								if(document.readyState != 'interactive' && document.readyState != 'complete')	
									{
										var promiseDom = new Promise((resolve,reject)=>
												{
													document.addEventListener('DOMContentLoaded',resolve);
												});	
										await promiseDom;
									}


									





								var yearOptionsStart = document.getElementById('vehicleMakeYearSecondMinSelection').querySelectorAll('.uiMenuItem');
								var yearOptionsEnd = document.getElementById('vehicleMakeYearSecondMaxSelection').querySelectorAll('.uiMenuItem');
								var yearStartArray =[];
								var yearEndArray = [];

								for (let i=0;i<yearOptionsStart.length;i++)
									{
										yearStartArray.push(yearOptionsStart[i].innerText.replace('.',''))
									}

								for (let i=0;i<yearOptionsEnd.length;i++)
									{
										yearEndArray.push(yearOptionsEnd[i].innerText.replace('.',''))
									}
								
								var data = {'yearStart':yearStartArray,'yearEnd':yearEndArray};

								return data;
								})(); 






								},make,model)
							await browser.close();
							contentLoaded = true;
							return text;

							}catch(e){console.log(e)};








						})();




				}
			
			).catch((e)=>{console.log(e,"expected error, ignore"); browser.close();return false})


		//intercept page requests
		page.on('request',request => {

					if(!contentLoaded)
						{
							if(request.resourceType() === 'image' || 
								  	request.resourceType() ==='imageset' ||
								  	request.resourceType() ==='media'||
								  	request.resourceType() === 'font'||
								  	request.resourceType() === 'object'||
								  	request.resourceType() === 'object_subrequest'||	
								  	request.resourceType() === 'sub_frame'||
								  	request.resourceType() === 'xmlhttprequest'
								)
									{
										//cancel request
										request.respond({
											status:200,
											body:"foo"
										})	
									}
							else
								{
									request.continue();
								}

						}
				})

		await page.goto(urlKupujem);

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