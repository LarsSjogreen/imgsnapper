#!/usr/bin/env node

const request = require('request');
const fs = require('fs');
const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const firefox = require('selenium-webdriver/firefox');

const opt = require('node-getopt').create([
	['u', 'url=ARG', 'The URL to the web page from where you want to get the image or screenshot'],
	['i', 'id=ARG', 'The id of the <img> element in the web page'],
	['x', 'xpath=ARG', 'XPath to the img element to download'],
	['b', 'browser=ARG', 'Selecting which browser you want to use. Available: firefox, chrome'],

	['r', 'repeat=ARG', 'Make imgsnapper repeat and take a snapshot every ARG minutes.'],

	['s', 'screenshot', 'Snap the whole web page instead of a specific img element'],
	['d', 'dir=ARG', 'The directory where you want the images. (Start with ./ if you want it in a subdir of current dir.)'],
	
	['q', 'headless', 'Run imgsnapper (and webdriver) headless'],
	['h', 'help', 'display this help']
]).setHelp(
	"Usage: imgsnapper\n" +
	"A script for creating screenshots or snapshots of individual images from a webpage.\n" +
	"\n" +
	"[[OPTIONS]]\n" +
	"\n" +
	"Installation: npm install\nnpm link\n" +
	"Respository:  https://github.com/LarsSjogreen/imgsnapper"
  ).bindHelp().parseSystem();

const source_url = opt.options.u ? opt.options.u : 'http://www.lightningmaps.org';
const id = opt.options.i ? opt.options.i : 'strikes_mini_img';
const byThing = opt.options.x ? By.xpath(opt.options.x) : By.id(id);
const imagecat = opt.options.d ? opt.options.d : './images';
const screenshot = opt.options.s ? true : false;
const browser = (opt.options.b === 'chrome') ? chrome : firefox;
const browserStr = (opt.options.b === 'firefox') ? 'firefox' : 'chrome';
const repeatMin = opt.options.r ? opt.options.r : 0;

checkdir(imagecat);

if (repeatMin === 0) {
	snap();
} else {
	var CronJob = require('cron').CronJob;
	new CronJob(repeatMin + ' * * * * *', function() {
		snap();
	}, null, true, 'America/Los_Angeles');
}

async function snap() {
	const chromeOptions = new chrome.Options();
	if (opt.options.q) { chromeOptions.addArguments(["--headless"]); } else { chromeOptions.addArguments(["--start-maximized"]); }

	const firefoxOptions = new firefox.Options();
	// TODO

	const driver = await new Builder().forBrowser(browserStr).setChromeOptions(chromeOptions).setFirefoxOptions(firefoxOptions).build();

	try {
		await driver.get(source_url);
		const filename = imagecat + "/image-" + Date.now().toString();

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
		if (browser === 'chrome') {
			await driver.close();
		}
		await driver.quit();
		if (process.platform === "win32") {
			const { spawn } = require('child_process');
			spawn('powershell', ['/c', './win/killproc.bat']);
		}
	}
};

function download(uri, filename, callback) {
	request.head(uri, function(err, res, body) {
		const fileExt = "." + res.headers['content-type'].split("/").pop();
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
