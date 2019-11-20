/**
 * when run asyncTasks.js
 *  it runs task one at the time
 *  before starting task, app should create a folder
 *      in the parent pathdirectory
 *      name : current unix timestamp
 *      The last digit of that timestamp determines the number of files (X) that each task will create.
 *           ex: if timestamp ends with 5, every task will create 5 files
 *  before start each task, log `Starting task [taskNumber]`
 *  after task is complete log  `Finished task [taskNumber]`
 * 
 * 
 * TASK 1
 *      Name                    `taskOne_[fileNumber]`
 *      Write Order             In Order
 *      Complete Order          In completetion Order
 *      Behavior:
 *          before the file is written:     Log `Creating file [fileName]` to the console
 *          after the file is written :     Log `Finished creating file [fileName]` 
 * TASK 2
 *      Name                    `taskTwo_[1-X]`
 *      Write Order             All at once
 *      Complete Order          In file name order
 *      Behavior:
 *          before the file is written:     Log `Creating file [fileName]` to the console
 *          after the file is written       Log `Finished creating file [fileName]` 
 *      
 * TASK 3
 *      Name                    `taskThree_[fileNumber]`
 *      Write Order             In Order
 *      Complete Order          In completetion Order
 *      behaviors: (repeat TASK 1)
 *          before the file is written:     Log `Creating file [fileName]` to the console
 *          after the file is written :     Log `Finished creating file [fileName]` 
 *          For 30% of the files:           written to a directory `notHome` and Fail
 *                                          log `File [fileNumber] failed to write` to the console
 *                                          proceed other tasks
 *          For one random file:            Delay 5 sec prior to write
 *                                          Log `Starting 5s delay at [unix timestamp]` when start delay
 *                                          Log `Ending 5s delay at [unix timestamp]` when end delay
 *          * same file can delay + fail
 * TASK 4
 */

 