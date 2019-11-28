const fs = require('fs');
const process = require('process');

const createFolder = async () => {

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
          reAttemptSync(folderPath, fileName, 250)
        })
    )
  }
  await Promise.all(promiseRef)
    .then(() => console.log(`Finished Task 8`))
    .catch((err) => console.log(err))
};

const app = async() => {
  const path = await createFolder()
  await task1(path);
  await task2(path);
  await task3(path);
  await task4(path);
  await task5(path);
  await task6(path);
  await task7(path);
  await task8(path);
}

app()
