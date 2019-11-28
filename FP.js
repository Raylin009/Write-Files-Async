const fs = require('fs');
const util = require('util');
const blue = require('bluebird');
const blueMkDir = blue.promisify(fs.mkdir);
const blueWf = blue.promisify(fs.writeFile);

const wFile = util.promisify(fs.writeFile);
const time = new Date();
const folder_id = `${time.getHours()}_${time.getMinutes()}_${time.getSeconds()}`;
const dir = `${__dirname}/blue${folder_id}`;
const fileLimit = 9;

/*

const file = (id, dir, delayMs, errRate, handleErr, sync, retry) => {
  // error rate ->0% || 30% ; sync -> boolean ; retry -> boolean
  //returns a promise 


}

const task = (id, dir, numOfFiles, fileRecipe) => {
  //fileRecipt -> obj
  //returns a primise



}
const time = new Date();
const folder_id = `${time.getHours()}_${time.getMinutes()}_${time.getSeconds()}`;
const dir = `${__dirname}/blue${folder_id}`;
const fileLimit = 9;

bMkdir(dir)
  .then(() => {
    // console.log('START TASK 1');
    // for(let i = 1; i <= 9; i += 1){
    //   const fName = `T1_F${i}`;
    //   console.log(` starting ${fName}`);
    //   bWriteFileSync(`${dir}/${fName}.txt`, `This is ${fName} sync`)
    //   console.log(` complete ${fName}`);
    // }
    // console.log('TASK 1 COMPLETE')
    const wFiles = async(num) => {
      const fName = `T1_F1`;
      console.log(` starting ${fName}`);
      await new Promise(fs.writeFile(`${dir}/${fName}.txt`, `This is ${fName} sync`), (err) => {
        if (err){
          reject(err);
        }else{
          resolve();
        }
      })
      console.log('TASK 1 CONPLETE')
    }
    wFiles()
  })
  .then(() => {
    // console.log('START TASK 2');
    // let q = [];
    // for(let i = 1; i <= 9; i += 1){
    //   const fName = `T2_F${i}`;
    //   q.push(
    //     new bPromise ((resolve, reject) => {
    //       console.log(` starting ${fName}`);
    //       bWriteFile(`${dir}/${fName}.txt`, `This is ${fName}`)
    //       .then(() => console.log(` complete ${fName}`))
    //       .then(() => resolve())
    //       .catch((err) => reject(err))
    //     })
    //   )
    // }
    // const allFiles = bPromise.all(q)
    // allFiles.then(() => console.log('TASK 2 COMPLETE')).catch(console.log)
  })
  .then(() => {
    // console.log('START TASK 3');
    // for(let i = 1; i <= 9; i += 1){
    //   const fName = `T3_F${i}`;
    //   const t3 = bPromise.resolve(` starting ${fName}`);

    //   t3
    //   .then(console.log)
    //   .then(() => {
    //     bWriteFile(`${dir}/${fName}.txt`, `This is ${fName}`)
    //     .then(() => console.log(` complete ${fName}`))
    //   })
    //   .catch(console.log)
    // }
  })
/*
cosnt numOfFile

mkdir()
.then(() => { Task1(); })
.then(() => { Task2(); }) async
.then(() => { Task3(); })
.then(() => { Task4(); }) async
.then(() => { Task5(); })
.then(() => { Task6(); }) async
.then(() => { Task7(); })
.then(() => { Task8(); }) async
.catch(console.log);
*/

const makeDir = util.promisify(fs.mkdir)

const customWF = (path, data) =>{
  return new Promise((resolve, reject) => {
    // console.log(` writing ${data}`)
    fs.writeFile(path, data, (err) => {
      if(err) { 
        reject(err) 
        // reject(`     FAILED TO WRITE ${data}`)
      }else{
        resolve(` done writing ${data}`)
      }
    })
  })
};


const delay = async (taskId, ms) => {
  console.log(`   delaying ${taskId} for ${ms/1000} sec starts now`)
  await new Promise(resolve => {setTimeout(resolve, ms)});
  console.log(`   delay ${taskId} complete`)
};

const file = async (taskNum, fileNum, delayTime, failRate, dir, errHandler) => {
  const taskId = `Task ${taskNum} File ${fileNum}`;
  if(Math.random() <= failRate){
    dir = 'notHome'
  }

  if (delayTime > 0) {
    await delay(taskId, delayTime)
  }
  console.log(` writing ${taskId}`)
  return await customWF(`${dir}/${taskId}.txt`, taskId)
                .then(console.log)
                .catch((err) => {
                  if(errHandler){
                    errHandler(err, dir, taskNum, fileNum, 250, failRate)
                  }else{
                    console.log(err.message)
                  }
                })
};

const task = async (taskNumber, fileLimit, async, opt) => {
  let fileCount = 1;
  let q = [];
  const delayTarget = opt.delay1File ? Math.floor(Math.random() * fileLimit) + 1 : null;

  const {
    failRate,
    delayTime,
    errHandler,
  } = opt;

  console.log(`START TASK ${taskNumber}`);

  try {
    while(fileCount <= fileLimit){
      const timeToDelay = fileCount === delayTarget ? delayTime : 0;
      const stFile = () => file(taskNumber, fileCount, timeToDelay, failRate, dir, errHandler)
                              // .then(console.log)
                              // .catch((err) => {
                              //   if(errHandler){
                              //     errHandler(err, taskNumber, )
                              //   }else{
                              //     console.log(err.message)
                              //   }
                              // })

      if(async){
        q.push( stFile())
        fileCount++
      }else{
        await stFile()
        fileCount++
      }
    };

    if(async){
        await Promise.all(q)
    }
    console.log(`TASK ${taskNumber} COMPLETE`)

  
  }
  catch (error) {
    console.log(error.message);
  }
}

const waitAndRetry = async (rejObj) => {
  const taskNum = rejObj.taskNum
  const fileNum = rejObj.fileNum
  const delayTime = rejObj.delayTime
  const path = Math.random() >= 0.3 ? 
    `./t7_${fileNum}_${Date.now()}.txt`:
    `./notHome/wtf.txt`;
  const data = `This is RETRY Task 7 file ${fileNum}`;

  console.log(`         ST File ${fileNum} Count Down ${delayTime / 1000} seconds`);
  await new Promise(resolve => setTimeout(resolve, delayTime));
  console.log(`         END File ${fileNum} Count Down ${delayTime / 1000} seconds`);
  console.log(`         File ${fileNum} Reattempt`)
  await new Promise((resolve, reject) => {
    fs.writeFile(path, data, (err) => {
        
        if(err){
          const rejObj = {
            taskNum, 
            fileNum, 
            delayTime : delayTime * 2,
          } 
          reject(rejObj)};
        resolve(`         File ${fileNum} Reattempt Successful`)
      }
    )
  })
  .then(console.log)
  .catch(async (rejObj) => {
    console.log(`         File ${rejObj.fileNum} Reattempt Failed`);
    await waitAndRetry(rejObj);
  })
}

const task7 = async (num, dir) => {
  const delay5sFile = Math.floor(Math.random() * num) + 1;

  console.log(`START TASK 7`);
  for(let i = 1; i <= num; i += 1){
    //
    const path = Math.random() >= 0.3 ?
                `${dir}/t7_${i}_${Date.now()}.txt`:
                `./notHome/wtf.txt`;
    const data = `This is Task 7 file ${i}`;

    if(delay5sFile === i){
      console.log(`           File ${i} Delay 5s ST`)
      await new Promise(resolve => setTimeout(resolve, 5000));
      console.log(`           File ${i} Delay 5s END`)
    }
    
    console.log(`       File ${i} Writing...`);
    await new Promise((resolve, reject) => {
      fs.writeFile(path, data, (err) => {
        if(err){
          const rejObj = {
            taskNum: 7,
            fileNum: i,
            delayTime: 250,
          }
          reject(rejObj)
        }
        resolve(`       File ${i} Done`)
      })
    })
      .then(console.log)
      .catch(async (rejObj) => {
        console.log(`         File ${i} FAILED`)
        await waitAndRetry(rejObj)
      })
    }
  console.log(`TASK 7 Complete`)
}

const failWholeTask = (err) => {
  throw Error(err.message);
}

const app = async () => {

  await makeDir(`${dir}`)
  await task(1, 9, false, {delay1File: false, delayTime: 0, failRate: 0});
  await task(2, 9, true, {delay1File: false, delayTime: 0, failRate: 0});
  await task(3, 9, false, {delay1File: true, delayTime: 5000, failRate: 0.3});
  await task(4, 9, true, {delay1File: true, delayTime: 5000, failRate: 0.3});
  await task(5, 9, false, 
    {delay1File: true, 
      delayTime: 5000, 
      failRate: 0.3, 
      errHandler: failWholeTask}
  );
  await task(6, 9, true, 
    {delay1File: true, 
      delayTime: 5000, 
      failRate: 0.3, 
      errHandler: failWholeTask}
  );
  await task7(9, dir)

}

app()
// const d = async (ms) => {
//   const t = new Promise(resolve => { setTimeout(resolve, ms, 2.5)}).then(console.log).catch(console.log)

//   console.log(1)
//   await t
//   console.log(2)
//   return 
// }

// const f = async () => {

//   await d(2000)
//   console.log(3)
//   console.log(4)

// }

// f()

// const failfreq = (rate) => {
//   return Math.random() > rate 
// }
// let sto = [0,0];
// for(let i = 0; i < 100; i ++){
//   if(failfreq(0.3)){
//     sto[0] ++
//   }else{
//     sto[1] ++
//   }
// }

// console.log(sto)



