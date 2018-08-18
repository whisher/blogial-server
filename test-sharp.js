'use strict';
const fs = require('fs');
const sharp = require('sharp');
const imagePath = './images/flowers.jpg';
const readableStream = fs.createReadStream(imagePath);
const transformer = sharp()
    .resize(1440, 300)
    .crop(sharp.strategy.entropy)
    .on('error', function(err) {
      console.log(err);
    });
const writableStream = fs.createWriteStream('./images/my-flowers.jpg');
// Read image data from readableStream
// Write 200px square auto-cropped image data to writableStream
readableStream.pipe(transformer).pipe(writableStream);
