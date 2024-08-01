import fs from 'fs';

const myPromise = (fileName) => {
    return new Promise ((resolve, reject) =>  {
        fs.readFile(fileName, (error, data) => {
            if (error) reject(error);
            resolve(data)
        })
    })
}

export default myPromise;