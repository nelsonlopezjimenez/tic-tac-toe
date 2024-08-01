import fs from 'fs';

const myAsyncAwait = async (FileName) => {
    const data = await fs.promises.readFile(FileName);
    console.log(`${data}`)
    return data;
};

export default myAsyncAwait;