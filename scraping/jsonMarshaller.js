const fs = require('fs');
const path = require('path');

const imagesFolder = './images';

// Function to read files in the images folder
fs.readdir(imagesFolder, (err, files) => {
  if (err) {
    console.error('Error reading directory:', err);
    return;
  }

  // Filter out non-image files
  const imageFiles = files.filter(file => file.endsWith('.png'));

  // Array to store JSON objects for each image
  const imageObjects = [];

  // Process each image file
  imageFiles.forEach(file => {
    const [imageName, artistName] = file.split('_'); // Split filename by underscore
    const imageObject = {
      imageName: imageName,
      artistName: artistName.replace('.png', ''), // Remove file extension from artistName
      fileName: "/pfps/" + file,
    };
    imageObjects.push(imageObject);
  });

  // Write JSON objects to a file
  fs.writeFile('images.json', JSON.stringify(imageObjects, null, 2), err => {
    if (err) {
      console.error('Error writing JSON file:', err);
      return;
    }
    console.log('JSON file created successfully.');
  });
});
