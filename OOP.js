class Operation {
  constructor(id, type,stMessage, endMessage, callBack, sync, delay,errorRate, errHandling) {
    this.id = id;                       //INT: Task: 1 to 8, file: 1 to 9
    this.stMessage = stMessage;         // STR: task, file, delay, 
    this.endMessage = endMessage;       // STR: task, file, delay,
    this.callback = callBack;           // FUNC: task, file, delay
    this.sync = sync;                   // BOOL: True / False
    this.delay = delay;                 // null, 5000ms, 250ms, or 250ms * X
    this.errorRate = errorRate;         // 0% or 30 %
    this.errHandling = errHandling;     // TBD FUNC most likely
  }
  start() {
    return `Are ${this.type}s your favorite type of nut?`;
  }
  terminate() {
    return `Hello, I am a ${this.type}!`;
  }
}

/*
basicOperation 
  log stMessage -> cb() -> log endMessage

delay 
  super(basicOperation)
  log(stMessage) -> async setTimeout() -> log endMessage

write files
  super(basicOperation)
   sync: log(stMessage) -> fs.writeFile() -> log endMessage/failMessage
   async: log(stMessage)-> return Promise: ()=> fs.weiteFile, log endMessage/failMessage

task
  super(basicOperation)
  log stMessage -> cb() -> log endMessage
*/
