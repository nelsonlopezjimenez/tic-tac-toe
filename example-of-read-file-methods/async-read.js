// async-read
import fs from 'fs';

fs.readFile('readmeA.txt', (error, data) => {
    if (error) console.log(error);
    
})
const asyncRead = () => {
    fs.readFile('readmeA.txt', (error, data) => {
        if (error){
            console.log(error);
        }
        // console.log(data);
        return data;
    })
};
// asyncRead();

export default asyncRead;