# imgsnapper
A node.js program that will snapshot an image from a web page and save it to a file

## Installation

Go to the imgsnapper directory and type:
`npm install`
`npm link`

## Usage

Just type `imgsnapper` in your shell.

## Removal

Go to the imgsnapper directory and type: `npm unlink`

## Todo
- [x] Add command line arguments support
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
- [ ] Create a command for making all the images into a movie

## Hints and tips
To find the XPath to an image in a web page, try the [ChroPath plugin](https://chrome.google.com/webstore/detail/chropath/ljngjbnaijcbncmcnjfhigebomdlkcjo) for Chrome.

## Example
`imgsnapper -s https://www.svt.se/vader/ -x "//a[@href='/vader/amne/sverigevader180510']//div[@class='nyh_teaser__inner']//div[@class='nyh_teaser__figure']//div[@class='pic pic--cinema']//img[contains(@class,'pic__img pic__img--optimized pic__img--cinema')]"`