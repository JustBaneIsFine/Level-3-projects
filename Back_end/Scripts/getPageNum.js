import puppeteer from 'puppeteer';
var urlPolovni = 'https://www.polovniautomobili.com';
var urlKupujem = 'https://www.kupujemprodajem.com/automobili/kategorija/2013';
var contentLoaded = false;





export async function getPageNum (data,choice) {

	if(choice === 'polovni')
		{
			var returnPolovni = await getDataHandler(getDataPolovni,data);
			contentLoaded = false;
			return returnPolovni;
		}
	else if (choice==='kupujem')
		{
			var returnKupujem = await getDataHandler(getDataKupujem,data);
			contentLoaded = false;
			return returnKupujem;
		}

}




async function getDataHandler(someFunction,dataToPass)
	{

		var failed = true;
		var attempts = 7;
		var count = 0;
		

		var data;

		while(failed && count < attempts)
			{
				count++;
				contentLoaded = false;
				

				data = await someFunction(dataToPass);
				if(data != undefined)
					{
						failed = false;
						contentLoaded = true;
					}
				else if (data === 'there is no data')
					{
						count = 7;
						return;

					}
			}


		return data;
	}




async function getDataPolovni(data)
	{
		var pageUrl;
		var pageNum;
		var combinedData;
		var make = data['make'];
		var model = data['model'];
		var yearStart = data['yearStart'];
		var yearEnd = data['yearEnd'];


		//start up the browser and set config
		const browser = await puppeteer.launch({headless:true, defaultViewport: null});
		const page = await browser.newPage();
		await page.setRequestInterception(true);
		page.setDefaultNavigationTimeout(0);


	try {
			//if after 40 seconds we still don't get what we need, we will close down and try again.
			setTimeout(()=>{browser.close()},30000);

		

		//intercept page requests
		page.on('request',request => {

					if(!contentLoaded)
						{
							if(
									request.resourceType() === 'image' || 
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
		

		await Promise.race([
			page.goto(urlPolovni, {timeout: 40000}),
			page.waitForSelector('.sumo_brand')
			]);
		await pageClickHandlerPolovni(page,'.sumo_brand .placeholder','.sumo_brand .search-txt',make);
		await pageClickHandlerPolovni(page,'.sumo_model .placeholder','.sumo_model .search-txt',model);
		await pageClickHandlerPolovni(page,'.sumo_year_from .placeholder',undefined,yearStart);
		await pageClickHandlerPolovni(page,'.sumo_year_to .placeholder',undefined,yearEnd);

		//submit data
		console.log('submiting data');

		await Promise.all([
				// page.waitForNavigation({waitUntil:'networkidle2'}),
				page.waitForNavigation({waitUntil:'domcontentloaded'}),
				page.click('.js-search-buttons')
			]);
		console.log("done waiting for navigation")


		var dataIsThere = await page.evaluate(async ()=>{
			var text = document.querySelector('.paBlueButtonPrimary').parentElement.parentElement.innerText;

			if(text.includes('Trenutno nema rezultata'))
				{
					return false;
				}
			else 
				{
					return true;
				}
		})

		if(dataIsThere === false)
			{
				console.log('there is no data!!!!!!!')
				return 'there is no data';
			}

		console.log('going into page evaluate')
		pageNum = await page.evaluate(async ()=>{
			
				var found = false;
				var count = 0;
				var tryCount = 0;

				var dataNumOfPages;

				while(!found && tryCount<10)
					{


						var smallList = document.getElementsByTagName('small');
							smallList.forEach(x=>
							{
								if(found === true)
									{
										return;
									}

								if(x.innerText.includes('ukupno'))
									{
										found = true;
										return;
									}
								else 
									{
										count++;
									};

							});

						if(!found)
							{
								tryCount++;
								count = 0;
								await delaySecond(300);
							};

					}


						if (!found)
							{
								dataNumOfPages = "could not get page number";
							}
						else
							{
								var smallText = smallList[count].innerText;
								var numOfAds = smallText.slice(-5).replace(/\D/g, "");
								dataNumOfPages = Math.ceil(numOfAds/25);
								
							}
				
					return dataNumOfPages;

				function delaySecond(num){
					return new Promise ((resolve,reject)=>
							{
								setTimeout(resolve,num);
							});	
					}
				

		});
		
		console.log('exited the evaluate block')

		console.log('NUMBER OF PAGES ---------------------------------------',pageNum)
		

		if(pageNum>1)
			{

				await Promise.all([
					page.waitForNavigation({waitUntil:'domcontentloaded'}),
					page.evaluate(()=>{
					var pageNumButton = document.getElementsByClassName('js-pagination-numeric')[0];
					pageNumButton.click();})
					])
				
				


				console.log('start waiting for navigation');
				pageUrl = await page.url();
				console.log('end waiting for navigation');
			}
			else if (pageNum === undefined || pageNum === 1)
				{
					pageNum = 1;
					pageUrl = await page.url();
				}
			else if(pageNum === false)
				{
					contentLoaded = false;
					return;
				}

		combinedData = {'pageNum':pageNum,'url':pageUrl};
		contentLoaded = true;


	} catch(e){console.log(e)};
		await browser.close()
		return combinedData;

	}



async function getDataKupujem(data)
	{
		var make = data['make'];
		var model = data['model'];
		var yearStart = data['yearStart'];
		var yearEnd = data['yearEnd'];
		var dataReturned;

		//start up the browser and set config
		const browser = await puppeteer.launch({headless:true,defaultViewport:null});
		const page = await browser.newPage();
		await page.setRequestInterception(true);
		page.setDefaultNavigationTimeout(0);
		try {
		
		
		


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


		

			await page.goto(urlKupujem, {timeout: 30000});
			await page.waitForSelector('#groupSecondSelection');


			console.log('waiting for page.go to finished')
			var closeBt = page.$('.kpBoxCloseButton');
			console.log('got the button')
			var gotIt = false

			//closing the ads box
			while (!gotIt)
				{	
					try
						{	
							await page.click('.kpBoxCloseButton');
							await delaySecond(300);
						} catch(e)
							{
								gotIt = true;
							};	
				}
			console.log('clicked on the button');
	
			
			
			await pageClickHandlerKupujem(page,'#groupSecondSelection',make);
			


			var available = false;

			while (!available)
				{
					var result = await page.evaluate(async()=>{
						var button = document.querySelector('#carModelSecondSelection .choiceLabel');
						var modelSelection = document.querySelector('#carModelSecondSelection');

						await button.click();
						 if(modelSelection.querySelectorAll('.uiMenuItem').length >=1)
						 	{	
						 		return true;
						 	} 
						 	else{return false}

					})
					if (result)
						{
							available = true;
						}
				}



			await pageClickHandlerKupujem(page,'#carModelSecondSelection',model);
			await pageClickHandlerKupujem(page,'#vehicleMakeYearSecondMinSelection',yearStart);
			await pageClickHandlerKupujem(page,'#vehicleMakeYearSecondMaxSelection',yearEnd);

	
		//submit data 
			await delaySecond(200);
			await Promise.all([
			  page.click('.secondarySearchButton'),
			  page.waitForNavigation()
			]);


			var found = await page.evaluate(async ()=>{
				var foundItem = false;
				var text = document.querySelector('.error').innerText;

				if(!text.includes('nijedan oglas'))
					{
						foundItem = true;
					}
				return foundItem;
			})

			if(found === false)
				{
					return 'there is no data';
				}
			console.log('going to evaluate block ')
			
				dataReturned = await page.evaluate(()=>{
	
				var listOfPages = document.getElementsByClassName('pagesList')[0];
				if (listOfPages != undefined)
					{
						var nodeList = listOfPages.querySelectorAll('li');
					 	dataNumOfPages = nodeList[nodeList.length-2].innerText;
					 	dataCombined = {'pageNum':dataNumOfPages,'url':window.location.href};
					 	return dataCombined;
					}
				else 
					{
						return dataCombined = {'pageNum':1,'url':window.location.href}; 
					}
	
			})
	
	
	
			if(dataReturned['pageNum'] > 1)
				{

					page.evaluate(()=>{
						var listOfPages = document.getElementsByClassName('pagesList')[0];
						var nodeList = listOfPages.querySelectorAll('li');
						nodeList[2].childNodes[0].click();

						

					})	


					console.log('starting to wait for navigation');
					await page.waitForNavigation();
					console.log('ended waiting for navigation');
					
						var pageUrl = await page.url();

						console.log('pageURL---------------------------',pageUrl);

					dataReturned['url'] = pageUrl;
				}
	
		
	
	
	
		function delaySecond(num){
	
				return new Promise ((resolve,reject)=>
							{
								setTimeout(resolve,num);
							});	
			}
		} catch(e){console.log(e)};

		await browser.close();


	return dataReturned;


	}


async function pageClickHandlerKupujem(page,selector,data)
	{


		var fail = true;
		var countMax = 10;
		var count = 0;

		while(fail && count <= countMax)
			{
				await page.waitForSelector(`${selector} .choiceLabel`);
				await page.click(`${selector} .choiceLabel`);
				console.log('clicked');
				await page.waitForSelector(`${selector} .mg-field`);
				await page.type(`${selector} .mg-field`,data);
				console.log('clicking field is done')
				console.log('waiting for  uiMenuItem is done')
				await page.waitForSelector(`${selector} .uiMenuItem`);

				await page.evaluate(async (selectorx,datax)=>{

					console.log(selectorx,datax, 'THIS IS THE DATA______________________________')
					var uiList = document.querySelector(selectorx).querySelectorAll('.uiMenuItem');
					console.log(uiList, 'THIS IS THE UI LIST')
					var found = false;
					uiList.forEach(x=>{

						if(!found && x.innerText.toLowerCase().includes(datax.toLowerCase()))
							{
								found = true;
								x.click();
							}

					})

				},selector,data);

				console.log('clicking uiMenuItem is done')

				if(inputIsCorrect(selector,data))
					{
						fail = false;
						return;
					}
				await delaySecond(500);
				count++

			}

		if(fail === true)	
			{throw ('Failed to click')}
		return true;



		async function inputIsCorrect(selector,data)
			{

				var insideText = await page.$eval(selector, el => {return el.innerText});

				if(insideText === data)
					{
						return true;
					}
				else
					{return false;}



			}


	}

async function pageClickHandlerPolovni(page,selector1,selector2,data)
	{
		
		var firstSelector =  selector1.split(' ')[0];

		var fail = true;
		var countMax = 10;
		var count = 0;
		console.log('start while')
		while(fail && count <= countMax)
			{

				console.log('waiting for selector')
				await page.waitForSelector(selector1);
				console.log('ended wait for selector')
				await page.click(`${selector1}`);
				
				console.log('clicked');
				if(selector2 != undefined)
					{
						await page.waitForSelector(selector2);
						await page.type(`${selector2}`,data);
						console.log('typed data');
					}
				console.log('clicking field is done');


				await page.waitForSelector(`${firstSelector} .opt`);
				console.log('waiting for  opt is done')
				console.log(data);
				await page.evaluate(async (selectorx,datax)=>{

					var uiList = document.querySelectorAll(`${selectorx} .opt`);
					var found = false;
					uiList.forEach(x=>{

						if(!found && x.innerText.toLowerCase().includes(datax.toLowerCase()))
							{
								found = true;
								x.click();
							}

					})

				},firstSelector,data);

				console.log('clicking uiMenuItem is done')

				fail = false;
				count++

			}
		console.log('end while')
		if(fail === true)	
			{throw ('Failed to click')}
		return true;



		async function inputIsCorrect(selector,data)
			{

				var insideText = await page.$eval(selector, el => {return el.parentElement.innerText});

				if(insideText === data)
					{
						return true;
					}
				else
					{return false;}



			}


	}


function delaySecond(num){
	
				return new Promise ((resolve,reject)=>
							{
								setTimeout(resolve,num);
							});	
			}