const async_call = () => {
  const fs = require('fs')
  const util = require('util');

  const timeStamp = `${Math.floor(Date.now()/1000)}`;
  const fileAmount = Number.parseInt(timeStamp[timeStamp.length - 1])
  const failer30percent = () => {
    const num = Math.floor(Math.random()*10)
    const f = num === 9 || num === 8 || num === 7
    return !f;
  };
  const getRandomIntInclusive = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const task2 = (fileAmount, outputDir) => {
    //return a promise (promise.all) resolve to `finish tas 1` reject if err
    //loop x number of times
    //fs.writeFile
    //q fs.writeFile to an array
    console.log(`Starting task 2--------------------------------------ST2`);
    const filePromises = [];
    for(let i = 1; i <= fileAmount; i += 1){
      const fileName = `taskTwo_${i}`
      filePromises.push(
        new Promise((resolve, reject) => {
          console.log(`Creating file ${fileName}`)
          fs.writeFile(`${outputDir}/${fileName}.txt`, `task 2 file ${i}`, (err) => {
            if(err){
              reject(err);
            }else{
              resolve(`Finished creating file ${i}`)
            }
          });
        }).then(console.log)
      )
    }
    const task1Status = Promise.all(filePromises)
      .then(() => 'Finished task 2--------------------------------------END2')
      .catch(() => 'FAIL FAIL FAIL Task 2')
    return task1Status
  };

  const task1 = (fileAmount, outputDir) => {
    console.log(`Starting Task 1--------------------------------------ST1`)
    for(let i = 1; i <= fileAmount; i += 1){
      const fileName = `taskOne_${i}`;
      console.log(`Creating file ${fileName}`)
      fs.writeFileSync(`${outputDir}/${fileName}.txt`, `task 1 file ${i}`)
      console.log(`Finished file ${fileName}`)
    }
    return Promise.resolve(`Finished task 1--------------------------------------END1`)
  };

  const task3 = (fileAmount, outputDir) => {
    console.log(`Starting Task 3-------------------------------------ST3`)
    const delayFileNum = getRandomIntInclusive(1,fileAmount);
    for(let i = 1; i <= fileAmount; i += 1){

      const fileName = `taskThree_${i}`;
      const message =  `task 3 file ${i}`
      const dir = failer30percent() ? outputDir : 'notHome'; 
      const setTimeoutPromise = util.promisify(setTimeout);
      const write = () => {
        try {
          console.log(`Creating file ${fileName}`);
          fs.writeFileSync(`${dir}/${fileName}.txt`, message);
          console.log(`Finished creating file ${fileName}`);
        } catch (error) {
          console.log(`File ${fileName} fialed to write-----!!!!!!`)
        }
      };

      if(i === delayFileNum){
        setTimeoutPromise(5000)
        .then(() => write)
      }else{
        write();
      }

    }
    return `Finished task 3--------------------------------------END3`
  }
  // ___________________________exacution __________________________________________________

  // fs.mkdirSync(`${__dirname}/${timeStamp}`);
  // task1(fileAmount, `${__dirname}/${timeStamp}`)
  //   .then(console.log)
  //   .then(() => (task2(fileAmount, `${__dirname}/${timeStamp}`)))
  //   .then(console.log)
  //   //.then task3
  //   //.then console.log(task3 complete)
  //   //.then task4
  //   //.then console.log(task4 complete)...
  //   .catch((err)=>(console.log(`eroor occered: ${err}`)))
  
  // ___________________________test ______________________________________________________

  const testDir = `${__dirname}/test/task3_${timeStamp}`;
  fs.mkdirSync(testDir)
  task3(9, `${testDir}`)

  // ___________________________test ______________________________________________________

  // task1(fileAmount,`${__dirname}/${timeStamp}`)
  // .then(()=>{
  //   //invoke task 2
  // })
  // fs.writeFile(`${__dirname}/${timeStamp}/message.txt`, 'initial test', (err) => { console.log(err)})

}

async_call() //_______________________________run file_______________

const failer30percent = () => {
  const num = Math.floor(Math.random()*10)
  const f = num === 9 || num === 8 || num === 7
  return !f;
};

const getRandomIntInclusive = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
