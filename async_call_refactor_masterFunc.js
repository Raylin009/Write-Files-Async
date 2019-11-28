const taskCreator = (input) => {
  //takes in "sync" or "async"
  if(input === "SYNC"){
    return writeTaskSync();
  }else{
    return writeTaskAsync();
  }
}
/*
  taskNum : int
    fileWritingMethod : "SYNC" || "ASYNC"
      folder1 : str
      folder2 : str
      redirect Condition : func return true or false
        fileName
          data : str
            fileAmount : int
              delayFile Condition
                delayFileTime
              fileAmount
              errHandler

  task
    1. taskNum
    2. taskName
    3. fileWritingMethod
    4. fileDelayCondition
    5. fileDelayTime
    6. redirectCondition
    7. fileDestination1/folder1/(defualt)
    8. fileDestination2/folder2/if redirectCondition is mat
    9. errHandler
      returns a function that ask 
        1. fileAmount
        2. writeFileFunc

  file
    1. folderPath
    2. fileName
    3. fileContent
    4. delayTime
    5. errHnadler

*/


