const fs = require('fs');
const process = require('process');

const createFolder = async (parentPath) => {

  const timeStamp = Date.now();
  const folderNum = timeStamp;
  const folderPath = `${parentPath}/${timeStamp}`;

  return await new Promise((resolve, reject) => {
      fs.mkdir(folderPath,(err) => {
      if(err){reject(err)};
      resolve(folderNum);
    })
  })
}

const delay = async ms => {
  if(!ms){ return }; //should I throw error here? defensive coding?

  console.log(`   Starting ${ms / 1000}s delay at ${Date.now()}`);
  await new Promise(resolve => setTimeout(resolve, ms));
  console.log(`   Ending ${ms / 1000}s delay at ${Date.now()}`);
}

const writeFilePrimise = async (parentPath, folderNum, fileName, data, delayTime) => {
  if(delayTime){
    await delay(delayTime);
  };
  return new Promise((resolve, reject) => {
    const filePath = `${parentPath}/${folderNum}/${fileName}.txt`;

    console.log(` Creating file ${fileName}`)
    fs.writeFile( filePath, data, (err) => {
      if(err){ reject(err) };
      resolve(` Finished creating ${fileName}`)
    })
  })
};

const reAttempt = async(parentPath, folderNum, fileName, delayTime) => {
  let filePath = `${parentPath}/${folderNum}/${fileName}.txt`
  if(Math.random() < 0.3){
    filePath = `${__dirname}/notHome/${fileName}.txt`;
  };
  const data = filePath;
  await delay(delayTime);
  await new Promise ((resolve, reject) => {
    console.log(`     Retrying file ${fileName}`)
    fs.writeFile(filePath, data, (err) => {
      if(err){ reject(err) };
      resolve(` Finished creating ${fileName}`);
    })
  })
    .then(console.log)
    .catch(async(err) => { 
      console.log(`     File ${fileName} failed to write`)
      await reAttempt(parentPath, folderNum, fileName, delayTime * 2)
    })

}

const task1 = async(folderNum, parentPath) => {
  const fileAmount = folderNum % 10;
  console.log(`Starting Task 1`);
  try{
    for(let i = 1; i <= fileAmount; i += 1){
      const fileName = `taskOne_[${i}-${fileAmount}]`;
      const filePath = `${parentPath}/${folderNum}/${fileName}.txt`;
      const data = filePath;

      await writeFilePrimise(parentPath, folderNum, fileName, data, 0)
        .then(console.log)
        .catch((err) => { throw Error(err) })
    }
  }
  catch(err){
    console.log(err)
  }
  console.log(`Finished Task 1`)
};

const task2 = async(folderNum, parentPath) => {

  const fileAmount = folderNum % 10;
  const promiseRef = [];

  console.log(`Starting Task 2`);
  for(let i = 1; i <= fileAmount; i += 1){
    const fileName = `taskTwo_[${i}-${fileAmount}]`;
    const filePath = `${parentPath}/${folderNum}/${fileName}.txt`;
    const data = filePath; 

    promiseRef.push(
      writeFilePrimise(parentPath, folderNum, fileName, data, 0)
        .then(console.log)
        .catch((err) => { throw Error(err); })
    )
  }
  await Promise.all(promiseRef)
    .then(() => console.log(`Finished Task 2`))
    .catch((err) => console.log(err))
};

const task3 = async(folderNum, parentPath) => {
  const fileAmount = folderNum % 10
  const delayTarget = Math.floor(Math.random() * fileAmount) + 1;
  console.log(`Starting Task 3`);

  try{
    for(let i = 1; i <= fileAmount; i += 1){
      const fileName = `taskThree_[${i}-${fileAmount}]`;
      const folderName = Math.random() > 0.3 ? folderNum : 'notHome';
      const data = `${parentPath}/${folderName}/${fileName}.txt`;
      const delayMs = delayTarget === i ? 5000 : 0;

      await writeFilePrimise(parentPath, folderName, fileName, data, delayMs)
        .then(console.log)
        .catch((err) => { console.log(`     File [${i}-${fileAmount}] failed to write`) })
    }
  }
  catch(err){
    console.log(err);
  }
  console.log(`Finished Task 3`);
};

const task4 = async(folderNum, parentPath) => {
  const fileAmount = folderNum % 10;
  const delayTarget = Math.floor(Math.random() * fileAmount) + 1;
  const promiseRef = [];

  console.log(`Starting Task 4`);
  for(let i = 1; i <= fileAmount; i += 1){
    const fileName = `taskFour_[${i}-${fileAmount}]`;
    const folderName = Math.random() > 0.3 ? folderNum : 'notHome';
    const data = `${parentPath}/${folderName}/${fileName}.txt`;
    const delayMs = delayTarget === i ? 5000 : 0;

    promiseRef.push(
      writeFilePrimise(parentPath, folderName, fileName, data, delayMs)
        .then(console.log)
        .catch((err) => { console.log(`     File [${i}-${fileAmount}] failed to write`); })
    )
  }
  await Promise.all(promiseRef)
    .then(() => console.log(`Finished Task 4`))
    .catch((err) => console.log(err))
};

const task5 = async(folderNum, parentPath) => {
  const fileAmount = folderNum % 10
  const delayTarget = Math.floor(Math.random() * fileAmount) + 1;
  console.log(`Starting Task 5`);

  try{
    for(let i = 1; i <= fileAmount; i += 1){
      const fileName = `taskFive_[${i}-${fileAmount}]`;
      const folderName = Math.random() > 0.3 ? folderNum : 'notHome';
      const data = `${parentPath}/${folderName}/${fileName}.txt`;
      const delayMs = delayTarget === i ? 5000 : 0;

      await writeFilePrimise(parentPath, folderName, fileName, data, delayMs)
        .then(console.log)
        .catch((err) => { throw Error(err) });
    }
    console.log(`Finished Task 5`)
  }
  catch(err){
    console.log(err.message)
    console.log(`Task 5 Failed`)
  }
};

const task6 = async(folderNum, parentPath) => {
  const fileAmount = folderNum % 10;
  const delayTarget = Math.floor(Math.random() * fileAmount) + 1;
  const promiseRef = [];
  
  console.log(`Starting Task 6`);
  for(let i = 1; i <= fileAmount; i += 1){
    const fileName = `taskSix_[${i}-${fileAmount}]`;
    const folderName = Math.random() > 0.3 ? folderNum : 'notHome';
    const data = `${parentPath}/${folderName}/${fileName}.txt`;
    const delayMs = delayTarget === i ? 5000 : 0;

    promiseRef.push(
      writeFilePrimise(parentPath, folderName, fileName, data, delayMs)
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

const task7 = async(folderNum, parentPath) => {
  const fileAmount = folderNum % 10;
  const delayTarget = Math.floor(Math.random() * fileAmount) + 1;
  console.log(`Starting Task 7`);

  try{
    for(let i = 1; i <= fileAmount; i += 1){
      const fileName = `taskSeven_[${i}-${fileAmount}]`;
      const folderName = Math.random() > 0.3 ? folderNum : 'notHome';
      const data = `${parentPath}/${folderName}/${fileName}.txt`;
      const delayMs = delayTarget === i ? 5000 : 0;

      await writeFilePrimise(parentPath, folderName, fileName, data, delayMs)
        .then(console.log)
        .catch(async(err) => {
          console.log(`     File [${i}-${fileAmount}] failed to write`)
          await reAttempt(parentPath, folderNum, fileName, 250)
        })
    }
  }
  catch(err){
    console.log(err)
  }
  console.log(`Finished Task 7`)
};

const task8 = async(folderNum, parentPath) => {
  const fileAmount = folderNum % 10;
  const delayTarget = Math.floor(Math.random() * fileAmount) + 1;
  const promiseRef = [];

  console.log(`Starting Task 8`);
  for(let i = 1; i <= fileAmount; i += 1){
    const fileName = `taskEight_[${i}-${fileAmount}]`;
    const folderName = Math.random() > 0.3 ? folderNum : 'notHome';
    const data = `${parentPath}/${folderName}/${fileName}.txt`;
    const delayMs = delayTarget === i ? 5000 : 0;

    promiseRef.push(
      writeFilePrimise(parentPath, folderName, fileName, data, delayMs)
        .then(console.log)
        .catch(async (err) => { 
          console.log(`     File [${i}-${fileAmount}] failed to write`);
          await reAttempt(parentPath, folderNum, fileName, 250)
        })
    )
  }
  await Promise.all(promiseRef)
    .then(() => console.log(`Finished Task 8`))
    .catch((err) => console.log(err))
};

const app = async() => {
  const parentPath = __dirname;
  const path = await createFolder(parentPath)
  await task1(path, parentPath);
  await task2(path, parentPath);
  await task3(path, parentPath);
  await task4(path, parentPath);
  await task5(path, parentPath);
  await task6(path, parentPath);
  await task7(path, parentPath);
  await task8(path, parentPath);
};

app();

/**
 * parentPath
 * redirect
 * folder1
 * folder2
 * fileName
 * delayTime
 * fileAmonut
 * errHandler
 */