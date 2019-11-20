console.log('___________Test__________')
const fs = require('fs');
const util = require('util');

// const task1 = Promise.resolve('Task 1 starts')

// task1.then(console.log)
// .then(()=> {
//   console.log('moving on...')
//   return 'writ file'
// })
// .then((data) => {
//   return new Promise(resolve => setTimeout(resolve, 1000, data))
// }).then((data)=> (
//   console.log(data)
// ))

//return a promise object
const init = Promise.resolve('start');
const action = (val) => Promise.resolve(val);
//return a promise object w/ delay
const delayAction = (val) => new Promise(resolve => setTimeout(resolve, 1000, val))



// action().then(console.log)
// init
// .then((res) => {
//   console.log(res)
//   return 'next'
// })
// .then(action)
// .then(console.log)
// .then(() => 'delay')
// .then(delayAction)
// .then(console.log)
// .then(() => 'action')
// .then(action)
// .then(console.log)
const today = new Date(Date.now())
const time = `${today.getHours()}_${today.getMinutes()}_${today.getSeconds()}`
let failAll = false;
const errHandling = (err) => {
  if(err){
    failAll = true
    console.log('F1 Failed')
  }else{
    console.log('F1 Complete')
  };
  console.log(`   failAll: ${failAll}`)
};

const createFile = (dir, fileNum, cb) => {
  console.log(`F${fileNum} Start`);
  fs.writeFile(`${dir}/f${fileNum}.txt`, `this is file number ${fileNum}`, cb)
}

const dir = `./cb_${time}`;
const falseDir = './notHome'

fs.mkdir(dir,() =>{
  
  createFile(`${dir}`, 1, errHandling)

  // console.log('F1 Start')
  // fs.writeFile(`./cb_${time}/f1.txt`,`this is f1`, errHandling )
});

/*
folder created
F1 Start
F1 Complete
failAll: flase
*/




