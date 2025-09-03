const fs = require('fs');

// console.log(fs);
fs.readFile('./doc/text1.txt', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(data);
});

fs.writeFile('./doc/text1.txt', 'This is some random text for testing purposes. I ADDED THIS', (err) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log('File has been EDITED');
});

if (!fs.existsSync('./assets')) {
    fs.mkdir('./assets', (err) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log('Folder created');
    });
} else {
    fs.rmdir('./assets', (err) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log('Folder deleted');
    });
}
