# imgsnapper
A node.js program that will take a screenshot or snap an image from a web page and save it to a file.
<img src='/logo.png' alt='imgsnapper logo' width='180'/>

## Installation
Use [chocolatey](https://chocolatey.org/) to install chromedriver and geckodriver.
```
cinst selenium-chrome-driver
cinst selenium-gecko-driver
```
Clone this repository. (Use the green clone button to the top right above.)
Go to the imgsnapper directory and type:
```
npm install
npm link
```

## Usage

Just type `imgsnapper` in your shell. Or `imgsnapper --help` for a list of all command line options.

## Removal

Go to the imgsnapper directory and type: `npm unlink`

## Todo
- [x] Add command line arguments support
- [x] Experimental firefox/geckodriver support. (Still throws an error.)
- [x] Add --help
- [ ] Fix the help text so it says imgsnapper instead of `node.exe ./cli.js`
- [x] Make it possible to pick the image XPath rather than element id
- [ ] Add cron functionality
- [x] Add timestamped filenames for the image(s)
- [x] Autodetect image type
- [x] Create `/images` directory automatically
- [x] Save files in a directory (`/images`)
- [x] Make it possible to specify a different image directory
- [x] Add option to run headless
- [x] If not headless, run browser maximized for largest screenshot.
- [ ] Create a command for making all the images into a movie

## Bugs to be fixed
- [ ] The chromedriver process doesn't terminate after program exits.
- [ ] The geckodriver variant crashes on program exit.

## Hints and tips
To find the XPath to an image in a web page, try the [ChroPath plugin](https://chrome.google.com/webstore/detail/chropath/ljngjbnaijcbncmcnjfhigebomdlkcjo) for Chrome.

## Examples
Take a screenshot of a web page, give it a timestamped filename and save it in the `/images` folder.
```
imgsnapper -s -u https://www.sunet.se
```