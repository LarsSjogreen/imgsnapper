#!/usr/bin/env node

var request = require('request');
var fs = require('fs');
const { Builder, By, until } = require('selenium-webdriver');
const [,, ...args] = process.argv;
var source_url = 'http://www.lightningmaps.org';
var id = 'strikes_mini_img';

var download = function(uri, filename, callback){
	request.head(uri, function(err, res, body){
	  request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
	});
  };

(async function example() { 
	let driver = await new Builder().forBrowser('chrome').build();

	try {
		await driver.get(source_url);
		await driver.wait(until.elementIsVisible(driver.findElement(By.id(id))), 2000, 'no luck');
		await driver.findElement(By.id(id)).getAttribute('src').then(
		    function(image, err) {
				download(image,'lightning.png', function() { console.log('Done'); });
		});
		
	} catch(error) {
		console.log(error);
	} finally {
		await driver.quit();
	}
})();