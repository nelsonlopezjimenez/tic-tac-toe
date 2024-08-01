// sync-read
import fs from 'fs';

const fsPromise = fs.promises;

const syncReadFile = (fileName) => {
    const data = fs.readFileSync(fileName);
    return data;
};

export default syncReadFile;