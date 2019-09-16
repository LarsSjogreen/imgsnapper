# imgsnapper
A node.js program that will take a screenshot or snap an image from a web page and save it to a file.
<p style="text-align:center;"><img src='/logo.png' alt='imgsnapper logo' width='180'/></p>

## Installation
Use [chocolatey](https://chocolatey.org/) to install chromedriver and geckodriver.
```
cinst selenium-chrome-driver
cinst selenium-gecko-driver
```
Clone this repository. (Use the green clone button to the top right above.)
Go to the imgsnapper directory and type:
```
yarn
yarn link
```

## Usage

Just type `imgsnapper` in your shell. Or `imgsnapper --help` for a list of all command line options.

## Command line options

| Option | Short option | Description |
| ----- | ----------- | --- |
| url=ARG     |  u=ARG | The URL to the web page from where you want to get the image or screenshot |
| id=ARG      |  i=ARG | The id of the <img> element in the web page |
| xpath=ARG   |  x=ARG | XPath to the img element to download |
| browser=ARG |  b=ARG | Selecting which browser you want to use. Available: firefox, chrome |
| repeat=ARG  |  r=ARG | Make imgsnapper repeat and take a snapshot every ARG minutes. |
| screenshot  |  s     | Snap the whole web page instead of a specific img element |
| dir=ARG     |  d=ARG | The directory where you want the images. (Start with ./ if you want it in a subdir of current dir.)' |
| headless    |  q     | Run imgsnapper (and webdriver) headless |
| help        |  h     | display this help |

## Examples
Take a screenshot of a web page, give it a timestamped filename and save it in the `/images` folder.
```
imgsnapper -s -u https://www.sunet.se
```

Take a screenshot every 15 minutes
```
imgsnapper -s -u https://www.bbc.com/weather -r 15
```

Take a screenshot every minute and hide the browser window while doing it
```
imgsnapper -u https://trends.google.com/trends/explore?date=now%201-H&q=trump -s -r 1 -q
```

## Removal

Go to the imgsnapper directory and type: `yarn unlink`

## Todo
- [x] Add command line arguments support
- [x] Experimental firefox/geckodriver support. (Still throws an error.)
- [x] Add --help
- [x] Fix the help text so it says imgsnapper instead of `node.exe ./cli.js`
- [x] Make it possible to pick the image XPath rather than element id
- [x] Add timestamped filenames for the image(s)
- [x] Autodetect image type
- [x] Create `/images` directory automatically
- [x] Save files in a directory (`/images`)
- [x] Make it possible to specify a different image directory
- [x] Add option to run headless
- [x] If not headless, run browser maximized for largest screenshot.
- [ ] Create a command for making all the images into a movie
- [x] Add cron functionality
- [x] Added [lynt](https://github.com/saadq/lynt) for linting the code.
- [x] Use Yarn instead of NPM
- [x] Update the README

## Bugs to be fixed
- [x] The chromedriver process doesn't terminate after program exits.
- [x] The geckodriver variant crashes on program exit.

## Hints and tips
To find the XPath to an image in a web page, try the [ChroPath plugin](https://chrome.google.com/webstore/detail/chropath/ljngjbnaijcbncmcnjfhigebomdlkcjo) for Chrome.