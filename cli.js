#!/usr/bin/env node

var request = require('request');
var fs = require('fs');
const { Builder, By, until } = require('selenium-webdriver');

opt = require('node-getopt').create([
	['s','source=ARG','The source web page from where you want to get the image'],
	['i','id=ARG', 'The id of the <img> element in the web page'],
	['d','dir=ARG', 'The directory where you want images stored. Start with ./ if you want it in a subdir of where you are.'],
	['x','xpath=ARG', 'XPath to the img element to download'],
	['h','help','display this help']
]).bindHelp().parseSystem();

let source_url = opt.options.s ? opt.options.s : 'http://www.lightningmaps.org';
let id = opt.options.i ? opt.options.i : 'strikes_mini_img';

let byThing = opt.options.x ? By.xpath(opt.options.x) : By.id(id);

var imagecat = opt.options.d ? opt.options.d : './images';
checkdir(imagecat);

var download = function(uri, filename, callback){
	request.head(uri, function(err, res, body){
	  request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
	});
};

(async function example() { 
	let driver = await new Builder().forBrowser('chrome').build();

	try {
		await driver.get(source_url);
		await driver.wait(until.elementIsVisible(driver.findElement(byThing)), 2000, 'no luck');
		await driver.findElement(byThing).getAttribute('src').then(
		    function(image, err) {
					var filename = imagecat + "/image-" + Date.now().toString() + ".png";
				download(image, filename, function() { console.log('Done'); });
		});
		
	} catch(error) {
		console.log(error);
	} finally {
		await driver.quit();
	}
})();



function checkdir(dirname) {
	fs.stat(dirname, function (err, stats){
		if (err) {
			return fs.mkdir(dirname, () => {});
		}
		if (!stats.isDirectory()) {
			console.log('That is not a directory. Exiting.');
			process.exit(1);
		}
	});
}