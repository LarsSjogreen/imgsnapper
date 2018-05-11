#!/usr/bin/env node

const request = require('request');
const fs = require('fs');
const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

const opt = require('node-getopt').create([
	['u', 'url=ARG', 'The URL to the web page from where you want to get the image or screenshot'],
	['i', 'id=ARG', 'The id of the <img> element in the web page'],
	['x', 'xpath=ARG', 'XPath to the img element to download'],

	['s', 'screenshot', 'Snap the whole web page instead of a specific img element'],
	['d', 'dir=ARG', 'The directory where you want images stored. Start with ./ if you want it in a subdir of where you are.'],
	
	['q', 'headless', 'Run imgsnapper (and webdriver) headless'],
	['h', 'help', 'display this help']
]).bindHelp().parseSystem();

let source_url = opt.options.u ? opt.options.u : 'http://www.lightningmaps.org';
let id = opt.options.i ? opt.options.i : 'strikes_mini_img';
let byThing = opt.options.x ? By.xpath(opt.options.x) : By.id(id);
let imagecat = opt.options.d ? opt.options.d : './images';
let screenshot = opt.options.s ? true : false;

checkdir(imagecat);

(async function() {
	let options = new chrome.Options();
	if (opt.options.q) { options.addArguments(["--headless"]); } else { options.addArguments(["--start-maximized"]); }
	let driver = await new Builder().forBrowser('chrome').setChromeOptions(options).build();

	try {
		await driver.get(source_url);
		let filename = imagecat + "/image-" + Date.now().toString();

		if (screenshot) {
			driver.takeScreenshot().then(function(data){
				var base64Data = data.replace(/^data:image\/png;base64,/,"")
				fs.writeFile(filename + ".png", base64Data, 'base64', function(err) {
					 if(err) console.log(err);
				});
			 });
		} else {
			await driver.wait(until.elementIsVisible(driver.findElement(byThing)), 4000, 'no luck');
			await driver.findElement(byThing).getAttribute('src').then(
				function(image, err) {
					download(image, filename, function() {});
				});	
		}
	} catch (error) {
		console.error(error);
	} finally {
		await driver.close();
		await driver.quit();
		if (process.platform === "win32") {
			console.log("Windows chromedriver bug. Remember to run 'taskkill /im chromedriver.exe /F' in your shell regularly. Sorry for the inconvenience. I'm working on a solution.");
		}
	}
})();

function download(uri, filename, callback) {
	request.head(uri, function(err, res, body) {
		let fileExt = "." + res.headers['content-type'].split("/").pop();
		request(uri).pipe(fs.createWriteStream(filename + fileExt)).on('close', callback);
	});
}

function checkdir(dirname) {
	fs.stat(dirname, function(err, stats) {
		if (err) {
			return fs.mkdir(dirname, () => {});
		}
		if (!stats.isDirectory()) {
			console.error('That is not a directory. Exiting.');
			process.exit(1);
		}
	});
}
