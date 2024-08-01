//const fs = require('fs');
//const fsPromise = fs.promises;

import fs from 'fs';
const fsPromise = fs.promises;

const mySyncReadFile = () => {
   const syncRead = fs.readFileSync('readme.txt');
   console.log(`syncRead ${syncRead}`);
}
mySyncReadFile();


fs.readFile('readme.txt', (error, data) => {
   if (error) throw error;
   console.log(`asyncRead ${data}`);
});

const myReadFileProm = (path) => {
    return new Promise((resolve, reject) => {
      fs.readFile(path, function (err, data) {
        if (err) {
          reject(err);
        }
        resolve(data)
      });
    })
 }

myReadFileProm('readme.txt')
   .then( result => console.log(`with Promise: ${result}`));

const myAsyncAwait = async () => {
   const data = await fsPromise.readFile('readme.txt');
   console.log(`async-await ${data}`);
};

myAsyncAwait();

//console.log(`syncRead at the end : ${syncRead}`);

mySyncReadFile();