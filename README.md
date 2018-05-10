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
- [ ] Make it possible to pick the image from other selection pattern than element id
- [ ] Add cron functionality
- [x] Add timestamped filenames for the image(s)
- [ ] Autodetect image type
- [x] Create `/images` directory automatically
- [x] Save files in a directory (`/images`)
- [x] Make it possible to specify a different image directory
- [ ] Create a command for making all the images into a movie