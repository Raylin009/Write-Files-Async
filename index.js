const fs = require('fs');
const util = require('util');
var path = require('path');

function logCompletion(name){
            console.log(`Finished Writing file ${name}`)

}

function writeFileAsync(directory, file){
    return new Promise( (resolve,reject) => {
        console.log(`Writing File ${file}`)
        fs.writeFile(path.join(directory,file), 'this is a file', (err) => {
            if(err){
                reject(err)
            } else{
                resolve()
            }
        })
    })
}

function logFailure(name){
    
}


function delayFiveSec(){
    return new Promise(resolve => {
        console.log(`Starting 5s delay at ${Date.now()}`);
        setTimeout(() => {console.log(`Ending 5s delay at ${Date.now()}`)}, 5000)
    });
}

function taskOne(x, location){
    return new Promise(resolve => {
        console.log('Starting task T1')
        let i = 1;
        while(i <= x){
            let name = `T1_${i}`;
            writeFileAsync(location,name)
            .then(logCompletion(name))
            .then(i++)
        }
        console.log('** Finished with T1 **')
    })
}

function taskTwo(x, location){
    return new Promise(resolve => {
        console.log('Starting task T2')
        let i = 1;
        while(i <= x){
            let name = `T2_${i}`;
                writeFileAsync(location, name)
                .then((success) => logCompletion(name))
                .then(i++)
        }
        console.log(`** Finished with T2 **`)
    })
}

function taskThree(x, location){
    return new Promise( resolve => {
        console.log('Starting task T3')
        const badPath = path.join(__dirname,`/notHome`);
        const randomlyDelayedIndex = Math.floor(Math.random()*Math.floor(x+1)+1);
        const isItGoodOrBad = () => { 
            let chance =  Math.floor(Math.random()*Math.floor(10)+1) 
            return chance < 7 ? true : false
        }
        let i = 1;
        while(i <= x){
            let name = `T2_${i}`;
            let directionIsGood = isItGoodOrBad();
            if(directionIsGood){
                writeFileAsync(location, name)
                .then(logCompletion(name))
                .then(i++)
            } else{
                writeFileAsync(badPath, name)
                .then(logCompletion(name))
                .catch((err)=> {console.log(`Failed to write ${name}`)})
                .then(i++)
            }
        }
        console.log(`** Finished with T3 **`)
    })
}

function main(){
    const folderName = String(Date.now());
    const x = Number(folderName.slice(-1));
    const location = path.join(__dirname,folderName);
    fs.mkdir(location, ()=> {});
    return taskOne(7, location)
    .then(taskTwo(7,location))
    .then(taskThree(7,location)) 
}


main();