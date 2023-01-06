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
		if(data.yearStart === undefined){
			data.yearStart = '';
		}
		if(data.yearEnd === undefined){
			data.yearEnd = '';
		}

		data.model.name = data.model.name.replace(' ','-');
		
		const stringUrl = `https://www.polovniautomobili.com/auto-oglasi/pretraga?brand=${data.make.name.toLowerCase()}&model[]=${data.model.name.toLowerCase()}&year_from=${data.yearStart}&year_to=${data.yearEnd}`
		const paginationUrl = `https://www.polovniautomobili.com/auto-oglasi/pretraga?page=1&brand=${data.make.name.toLowerCase()}&model[]=${data.model.name.toLowerCase()}&year_from=${data.yearStart}&year_to=${data.yearEnd}`
		//start up the browser and set config
		const browser = await puppeteer.launch({headless:true});
		const page = await browser.newPage();
		await page.setRequestInterception(false);

		//load page
		await page.goto(paginationUrl, {waitUntil:'domcontentloaded'})

		//check if there is data
		var dataIsThere = await page.evaluate(async ()=>{
			var text = document.querySelector('.paBlueButtonPrimary').parentElement.parentElement.innerText;

			if(text.includes('Trenutno nema rezultata'))
				{return false;}
			else 
				{return true;}
		})

		if(dataIsThere === false)
			{
				console.log('there is no data!')
				await browser.close()
				return 'there is no data';
			}
		// get number of pages..
		let pageNum = await page.evaluate(async ()=>{
			
			var found = false;
			var count = 0;
			var tryCount = 0;

			var dataNumOfPages;

			while(!found && tryCount<10)
				{
					var smallList = document.getElementsByTagName('small');
						smallList.forEach(x=>
						{
							if(found)
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
		contentLoaded = true;

		await browser.close()
		return {'pageNum':pageNum,'url':paginationUrl};

	}



async function getDataKupujem(data)
	{
		var make = data.make.name;
		var model = data.model.name;
		var yearStart = data.yearStart;
		var yearEnd = data.yearEnd;
		var pageNum;
		const stringUrl = `https://novi.kupujemprodajem.com/automobili/pretraga?categoryId=2013&groupId=${data.make.id}&carModel=${data.model.id}&vehicleMakeYearMin=${yearStart}.&vehicleMakeYearMax=${yearEnd}.&page=1`
		//start up the browser and set config
		const browser = await puppeteer.launch({headless:true,defaultViewport:null});
		const page = await browser.newPage();
		await page.goto(stringUrl, {timeout: 30000});



			var found = await page.evaluate(async ()=>{
				var foundItem = false;
				var text;
				try{
					text = document.querySelector('.NotificationBox_text__FgaiD').innerText;
				}catch(e){}
				
				if(text === undefined){
					foundItem = true;
				}
				return foundItem;
			})

			if(found === false)
				{
					return 'there is no data';
				}

			
				pageNum = await page.evaluate(()=>{
				
				var resultNumber = document.querySelector('[class*=breadcrumbHolder]').querySelector('span').querySelector('span');
				var resultNumExtracted = resultNumber.innerText.match(/(\d+)/)[0];
				pageNum = Math.ceil(resultNumExtracted/30);
				return pageNum;
			})
	
		await browser.close();
		return  {'pageNum':pageNum,'url':stringUrl};

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
				await page.waitForSelector(`${selector} .mg-field`);
				await page.type(`${selector} .mg-field`,data);
				await page.waitForSelector(`${selector} .uiMenuItem`);

				await page.evaluate(async (selectorx,datax)=>{

					var uiList = document.querySelector(selectorx).querySelectorAll('.uiMenuItem');
					var found = false;
					uiList.forEach(x=>{

						if(!found && x.innerText.toLowerCase().includes(datax.toLowerCase()))
							{
								found = true;
								x.click();
							}

					})

				},selector,data);

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


function delaySecond(num){
	
				return new Promise ((resolve,reject)=>
							{
								setTimeout(resolve,num);
							});	
			}