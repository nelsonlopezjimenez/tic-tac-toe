import fs from 'fs';
import syncReadFile from "./sync-read.js";
import asyncRead from "./async-read.js";
import myPromise from './promise-read.js';
import myAsyncAwait from './async-await-read.js';

function displayBuffer () {
    console.log(syncReadFile('readmeA.txt')); // 41 hex
    
    fs.readFile('readmeB.txt', (error, data) => { // 42 hex
        if (error) console.log(error);
        console.log(data);
    });
    
    console.log(myPromise('readmeC.txt')); // 43 hex
    
    myPromise('readmeD.txt').then(v => console.log(v)); // 44 hex

    console.log(myAsyncAwait('readmeE.txt')); // 45 hex
    let data = myAsyncAwait('readmeE.txt')
    console.log("" + data )
     
    console.log(syncReadFile('readmeA.txt')); // 41 hex
}



function displayChar () {
    console.time();

    console.log(`${syncReadFile('readmeA.txt')}`); // A
    
    fs.readFile('readmeB.txt', (error, data) => { // B
        if (error) console.log(error);
        console.log(`${data}`);
    });
    
    console.log(`${myPromise('readmeC.txt')}`); // C
    
    
    myPromise('readmeD.txt').then(v => console.log(`${v}`)); // D
    
    let data = myAsyncAwait('readmeE.txt')
    console.log(data)

    console.log(`${syncReadFile('readmeA.txt')}`); // A

    console.timeEnd()
}
// displayBuffer();
displayChar()