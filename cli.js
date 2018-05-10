#!/usr/bin/env node

var request = require('request');
var fs = require('fs');
const { Builder, By, until } = require('selenium-webdriver');

opt = require('node-getopt').create([
	['s','source=ARG','The source web page from where you want to get the image'],
	['i','id=ARG', 'The id of the <img> element in the web page'],
	['h','help','display this help']
]).bindHelp().parseSystem();

var source_url = opt.options.s ? opt.options.s : 'http://www.lightningmaps.org';
var id = opt.options.i ? opt.options.i : 'strikes_mini_img';

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