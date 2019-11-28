console.log('_____________________Test_____________________')
const fs = require('fs');
const process = require('process');

/*

functions:
  app
    makeDir
    task
      (stFile)
      file
        delay
        customWF
          fs.writeFile

*/
// const waitAndRetry = async (rejObj) => {
//   const taskNum = rejObj.taskNum
//   const fileNum = rejObj.fileNum
//   const delayTime = rejObj.delayTime
//   const path = Math.random() >= 0.3 ? 
//     `./t7_${fileNum}_${Date.now()}.txt`:
//     `./notHome/wtf.txt`;
//   const data = `This is RETRY Task 7 file ${fileNum}`;

//   console.log(`         ST File ${fileNum} Count Down ${delayTime / 1000} seconds`);
//   await new Promise(resolve => setTimeout(resolve, delayTime));
//   console.log(`         END File ${fileNum} Count Down ${delayTime}`);
//   console.log(`         File ${fileNum} Reattempt`)
//   await new Promise((resolve, reject) => {
//     fs.writeFile(path, data, (err) => {
        
//         if(err){
//           const rejObj = {
//             taskNum, 
//             fileNum, 
//             delayTime : delayTime * 2,
//           } 
//           reject(rejObj)};
//         resolve(`         File ${fileNum} Reattempt Successful`)
//       }
//     )
//   })
//   .then(console.log)
//   .catch(async (rejObj) => {
//     console.log(`         File ${rejObj.fileNum} Reattempt Failed`);
//     await waitAndRetry(rejObj);
//   })
// }

// const task7 = async (num) => {
//   const delay5sFile = Math.floor(Math.random() * num) + 1;

//   console.log(`START TASK 7`);
//   for(let i = 1; i <= num; i += 1){
//     const path = Math.random() >= 0.3 ? 
//                 `./t7_${i}_${Date.now()}.txt`:
//                 `./notHome/wtf.txt`;
//     const data = `This is Task 7 file ${i}`;

//     if(delay5sFile === i){
//       console.log(`           File ${i} Delay 5s ST`);
//       await new Promise(resolve => setTimeout(resolve, 5000));
//       console.log(`           File ${i} Delay 5s END`);
//     }
    
//     console.log(`       File ${i} Writing...`);
//     await new Promise((resolve, reject) => {
//       fs.writeFile(path, data, (err) => {
//         if(err){
//           const rejObj = {
//             taskNum: 7,
//             fileNum: i,
//             delayTime: 250,
//           }
//           reject(rejObj)
//         }
//         resolve(`       File ${i} Done`)
//       })
//     })
//       .then(console.log)
//       .catch(async (rejObj) => {
//         console.log(`         File ${i} FAILED`)
//         await waitAndRetry(rejObj)
//       })
//     }
//   console.log(`TASK 7 Complete`)
// }

// task7(9)
/*---------------------------------------------------------------TASK 6------------------------------------------------------------*/

/*
task 6
async
30% fail rate
1 file delay
fail all after one fails

cosnt task6 = num => {
  
}
*/


/*---------------------------------------------------------------TASK 6------------------------------------------------------------*/

/*
  task8 
  delay
  retry
  asycn
*/
const waitAndRetry8 = async (errObj) => {
  // console.log(errObj)
  let { path, fileNum, retryWaitTime } = errObj;
  const notHome = `./notHome/wtf/${fileNum}_${Date.now()}.txt`;
  const dir = Math.random() < 0.3 ? notHome : `${path}_${fileNum}_${Date.now()}.txt`;

  console.log(`   Start ${retryWaitTime / 1000}s wait for File ${fileNum}`)
  await new Promise((resolve) => setTimeout(resolve, retryWaitTime))
  console.log(`   End ${retryWaitTime / 1000}s wait for File ${fileNum}`)
  
  console.log(`   Retry Task 8 File ${fileNum}`)
  return await new Promise((resolve, reject) => {
    fs.writeFile(dir, `this is reattemp Task 8 File ${fileNum}`,(err) => {
      if(err){reject(err)}
      resolve()
    })
  })
    .then(() => console.log(` COMPLETE Task 8 FILE ${fileNum} (reattempt)`))
    .catch(() => {
      const errObj = {
        path,
        fileNum,
        retryWaitTime: retryWaitTime * 2,
      }
      waitAndRetry8(errObj)
    })

}

const task8 = async (num, path) => {
  const delay5sFile = Math.floor(Math.random() * num) + 1;
  const q = [];
  console.log(`Start Task 8`)
  for(let i = 1; i <= num; i += 1){
    const notHome = `./notHome/wtf/${i}_${Date.now()}.txt`;
    const dir = Math.random() < 0.3 ? notHome : `${path}_${i}_${Date.now()}.txt`;
    
    q.push(
      new Promise(async(resolve, reject) => {
        if(delay5sFile === i ){
          console.log(`     START 5s delay`)
          await new Promise(resolve => setTimeout(resolve, 5000))
          console.log(`     End 5s delay`)
        }
        
        console.log(` START Task 8 File ${i}`)
        fs.writeFile(dir, `This is Task 8 File ${i}`,(err) => {
          if(err){ reject(err)}
          resolve(` COMPLETE Task 8 FILE ${i}`)
        })
      })
      .then(console.log)
      .catch((err) => {
        const errObj = {
          path,
          fileNum : i,
          retryWaitTime: 250,
        }
        waitAndRetry8(errObj)
      })
    )
  }

  return await Promise.all(q)
    .then(() => console.log(`Task 8 Complete`))
    .catch(() => console.log('ohhhhh you Fick UUUUP!!! '))
}

// task8(9,`./Task8`)

const task6to8 = async() => {
  await task6(9).then(console.log).catch(console.log);
  // await task7(9)
  await task8(9,`./Task8`)
}

// task6to8()


const createFolder = async () => {
  /*
  createFolder Function create a folder in the parent directory
  then returns the path to the created folder
  */
  const timeStamp = Date.now();
  const folderPath = `${__dirname}/${timeStamp}`;

  return await new Promise((resolve, reject) => {
      fs.mkdir(folderPath,(err) => {
      if(err){reject(err)};
      resolve(folderPath);
    })
  })
}

const reAttemptSync = async(folderPath, fileName, delayTime) => {
  let filePath = `${folderPath}/${fileName}.txt`;
  if(Math.random() < 0.3){
    filePath = `${__dirname}/notHome/${fileName}.txt`;
  };
  const data = filePath;
  console.log(`   Starting ${delayTime / 1000}s delay at ${Date.now()}`)
  await new Promise(resolve => setTimeout(resolve, delayTime));
  console.log(`   Ending ${delayTime / 1000}s delay at ${Date.now()}`)
  console.log(`     Retrying file ${fileName}`)
  await new Promise ((resolve, reject) => {
    fs.writeFile(filePath, data, (err) => {
      if(err){ reject(err) };
      resolve(` Finished creating ${fileName}`);
    })
  })
    .then(console.log)
    .catch(async(err) => { 
      console.log(`     File ${fileName} failed to write`)
      await reAttemptSync(folderPath, fileName, delayTime * 2)
    })

}

const task1 = async(folderPath) => {

  const fileAmount = Number.parseInt(folderPath[folderPath.length - 1]);
  console.log(`Starting Task 1`);
  try{
    for(let i = 1; i <= fileAmount; i += 1){
      const fileName = `taskOne_[${i}-${fileAmount}]`;
      const filePath = `${folderPath}/${fileName}.txt`;
      const data = filePath; //should fileName, filePath, and data be in the 'new Promise' function ?

      console.log(` Creating file ${fileName}`);
      await new Promise( (resolve, reject) => {
        fs.writeFile(filePath, data, (err) => { // sould I use fs.writeFileSync ?
          if(err){ reject(err) };
          resolve(` Finished creating ${fileName}`);
        });
      })
        .then(console.log)
        .catch((err) => { throw Error(err) }) //is there a better way to handle err ?
    }
  }
  catch(err){
    console.log(err)
  }
  console.log(`Finished Task 1`)
}

const task2 = async(folderPath) => {
  const fileAmount = Number.parseInt(folderPath[folderPath.length - 1]);
  const promiseRef = [];

  console.log(`Starting Task 2`);
  for(let i = 1; i <= fileAmount; i += 1){
    const fileName = `taskTwo_[${i}-${fileAmount}]`;
    const filePath = `${folderPath}/${fileName}.txt`;
    const data = filePath; //should fileName, filePath, and data be in the 'new Promise' function ?

    console.log(` Creating file ${fileName}`);
    promiseRef.push(
      await new Promise((resolve, reject) => {
        fs.writeFile(filePath, data, (err) => {
          if(err){ reject(err) };
          resolve(` Finished creating ${fileName}`)
        })
      })
        .then(console.log)
        .catch((err) => { throw Error(err); })
    )
  }
  await Promise.all(promiseRef)
    .then(() => console.log(`Finished Task 2`))
    .catch((err) => console.log(err))
}

const task3 = async(folderPath) => {
  const fileAmount = Number.parseInt(folderPath[folderPath.length - 1]);
  const delayTarget = Math.floor(Math.random() * fileAmount) + 1;
  console.log(`Starting Task 3`);

  try{
    for(let i = 1; i <= fileAmount; i += 1){
      const fileName = `taskThree_[${i}-${fileAmount}]`;
      let filePath = `${folderPath}/${fileName}.txt`;
      if(Math.random() < 0.3){
        filePath = `${__dirname}/notHome/${fileName}.txt`;
      }
      const data = filePath; //should fileName, filePath, and data be in the 'new Promise' function ?
      const delayMs = delayTarget === i ? 5000 : 0;

      console.log(` Creating file ${fileName}`);
      await new Promise( async (resolve, reject) => {
        if(delayMs){
          console.log(`   Starting ${delayMs / 1000}s delay at ${Date.now()}`);
          await new Promise(resolve => setTimeout(resolve, delayMs));
          console.log(`   Ending ${delayMs / 1000}s delay at ${Date.now()}`);
        }
        fs.writeFile(filePath, data, (err) => { // sould I use fs.writeFileSync ?
          if(err){ reject(err) };
          resolve(` Finished creating ${fileName}`);
        });
      })
        .then(console.log)
        .catch((err) => { console.log(`     File [${i}-${fileAmount}] failed to write`) }) //is there a better way to handle err ?
    }
  }
  catch(err){
    console.log(err)
  }
  console.log(`Finished Task 3`)
}

const task4 = async(folderPath) => {
  const fileAmount = Number.parseInt(folderPath[folderPath.length - 1]);
  const delayTarget = Math.floor(Math.random() * fileAmount) + 1;
  const promiseRef = [];

  console.log(`Starting Task 4`);
  for(let i = 1; i <= fileAmount; i += 1){
    const fileName = `taskFour_[${i}-${fileAmount}]`;
    let filePath = `${folderPath}/${fileName}.txt`;
    if(Math.random() < 0.3){
      filePath = `${__dirname}/notHome/${fileName}.txt`;
    }
    const data = filePath; //should fileName, filePath, and data be in the 'new Promise' function ?
    const delayMs = delayTarget === i ? 5000 : 0;

    console.log(` Creating file ${fileName}`);
    promiseRef.push(
      new Promise( async (resolve, reject) => {
        if(delayMs){
          console.log(`   Starting ${delayMs / 1000}s delay at ${Date.now()}`);
          await new Promise(resolve => setTimeout(resolve, delayMs));
          console.log(`   Ending ${delayMs / 1000}s delay at ${Date.now()}`);
        };

        fs.writeFile(filePath, data, (err) => {
          if(err){ reject(err) };
          resolve(` Finished creating ${fileName}`);
        })
      })
        .then(console.log)
        .catch((err) => { console.log(`     File [${i}-${fileAmount}] failed to write`); })
    )
  }
  await Promise.all(promiseRef)
    .then(() => console.log(`Finished Task 4`))
    .catch((err) => console.log(err))
};

const task5 = async(folderPath) => {
  const fileAmount = Number.parseInt(folderPath[folderPath.length - 1]);
  const delayTarget = Math.floor(Math.random() * fileAmount) + 1;
  console.log(`Starting Task 5`);

  try{
    for(let i = 1; i <= fileAmount; i += 1){
      const fileName = `taskFive_[${i}-${fileAmount}]`;
      let filePath = `${folderPath}/${fileName}.txt`;
      if(Math.random() < 0.3){
        filePath = `${__dirname}/notHome/${fileName}.txt`;
      }
      const data = filePath; //should fileName, filePath, and data be in the 'new Promise' function ?
      const delayMs = delayTarget === i ? 5000 : 0;

      console.log(` Creating file ${fileName}`);
      await new Promise( async (resolve, reject) => {
        if(delayMs){
          console.log(`   Starting ${delayMs / 1000}s delay at ${Date.now()}`);
          await new Promise(resolve => setTimeout(resolve, delayMs));
          console.log(`   Ending ${delayMs / 1000}s delay at ${Date.now()}`);
        }
        fs.writeFile(filePath, data, (err) => { // sould I use fs.writeFileSync ?
          if(err){ reject(err) };
          resolve(` Finished creating ${fileName}`);
        });
      })
        .then(console.log)
        .catch((err) => { throw Error(err) });
        // .catch((err) => { console.log(`     File [${i}-${fileAmount}] failed to write`) }) //is there a better way to handle err ?
    }
    console.log(`Finished Task 5`)
  }
  catch(err){
    console.log(err.message)
    console.log(`Task 5 Failed`)
  }
};

const task6 = async(folderPath) => {
  const fileAmount = Number.parseInt(folderPath[folderPath.length - 1]);
  const delayTarget = Math.floor(Math.random() * fileAmount) + 1;
  const promiseRef = [];
  
  console.log(`Starting Task 6`);
  for(let i = 1; i <= fileAmount; i += 1){
    const fileName = `taskSix_[${i}-${fileAmount}]`;
    let filePath = `${folderPath}/${fileName}.txt`;
    if(Math.random() < 0.3){
      filePath = `${__dirname}/notHome/${fileName}.txt`;
    }
    const data = filePath;
    const delayMs = delayTarget === i ? 5000 : 0;

    console.log(` Creating file ${fileName}`);
    promiseRef.push(
      new Promise( async (resolve, reject) => {
        if(delayMs){
          console.log(`   Starting ${delayMs / 1000}s delay at ${Date.now()}`);
          await new Promise(resolve => setTimeout(resolve, delayMs));
          console.log(`   Ending ${delayMs / 1000}s delay at ${Date.now()}`);
        };

        fs.writeFile(filePath, data, (err) => {
          if(err){ reject(err) };
          resolve(` Finished creating ${fileName}`);
        })
      })
        .then(console.log)
        .catch((err) => { throw Error(err) })
    )
  }
  try {
    await Promise.all(promiseRef);
    console.log(`Finished Task 6`);
  }
  catch(err){
    const afterAllPromiseSettle = async() => {
      for(let i = 0; i < promiseRef.length; i += 1){
        try {
          await promiseRef[i];
        }
        catch(err){};
      }
    }
    await afterAllPromiseSettle()
    console.log(err.message)
    console.log(`Task 6 Failed`)
  }
};

const task7 = async(folderPath) => {
  const fileAmount = Number.parseInt(folderPath[folderPath.length - 1]);
  const delayTarget = Math.floor(Math.random() * fileAmount) + 1;
  console.log(`Starting Task 7`);

  try{
    for(let i = 1; i <= fileAmount; i += 1){
      const fileName = `taskSeven_[${i}-${fileAmount}]`;
      let filePath = `${folderPath}/${fileName}.txt`;
      if(Math.random() < 0.3){
        filePath = `${__dirname}/notHome/${fileName}.txt`;
      }
      const data = filePath; //should fileName, filePath, and data be in the 'new Promise' function ?
      const delayMs = delayTarget === i ? 5000 : 0;

      console.log(` Creating file ${fileName}`);
      await new Promise( async (resolve, reject) => {
        if(delayMs){
          console.log(`   Starting ${delayMs / 1000}s delay at ${Date.now()}`);
          await new Promise(resolve => setTimeout(resolve, delayMs));
          console.log(`   Ending ${delayMs / 1000}s delay at ${Date.now()}`);
        }
        fs.writeFile(filePath, data, (err) => { // sould I use fs.writeFileSync ?
          if(err){ reject(err) };
          resolve(` Finished creating ${fileName}`);
        });
      })
        .then(console.log)
        .catch(async(err) => {
          console.log(`     File [${i}-${fileAmount}] failed to write`)
          await reAttemptSync(folderPath, fileName, 250)
        })
    }
  }
  catch(err){
    console.log(err)
  }
  console.log(`Finished Task 7`)
};

const task8 = async(folderPath) => {
  const fileAmount = Number.parseInt(folderPath[folderPath.length - 1]);
  const delayTarget = Math.floor(Math.random() * fileAmount) + 1;
  const promiseRef = [];

  console.log(`Starting Task 8`);
  for(let i = 1; i <= fileAmount; i += 1){
    const fileName = `taskEight_[${i}-${fileAmount}]`;
    let filePath = `${folderPath}/${fileName}.txt`;
    if(Math.random() < 0.3){
      filePath = `${__dirname}/notHome/${fileName}.txt`;
    }
    const data = filePath; //should fileName, filePath, and data be in the 'new Promise' function ?
    const delayMs = delayTarget === i ? 5000 : 0;

    console.log(` Creating file ${fileName}`);
    promiseRef.push(
      new Promise( async (resolve, reject) => {
        if(delayMs){
          console.log(`   Starting ${delayMs / 1000}s delay at ${Date.now()}`);
          await new Promise(resolve => setTimeout(resolve, delayMs));
          console.log(`   Ending ${delayMs / 1000}s delay at ${Date.now()}`);
        };

        fs.writeFile(filePath, data, (err) => {
          if(err){ reject(err) };
          resolve(` Finished creating ${fileName}`);
        })
      })
        .then(console.log)
        .catch((err) => { 
          console.log(`     File [${i}-${fileAmount}] failed to write`);
          reAttemptSync(`${parentPath}/${folderNum}`, fileName, 250)
          
        })
    )
  }
  await Promise.all(promiseRef)
    .then(() => console.log(`Finished Task 8`))
    .catch((err) => console.log(err))
};








const app = async() => {
  const path = await createFolder()
  // await task1(path);
  // await task2(path);
  // await task3(path);
  // await task4(path);
  // await task5(path);
  // await task6(path);
  await task7(path);
  // await task8(path);

}

app()
