const path = require('path');
const fs = require('fs');
const EventEmitter = require('events');

const dbPath = './databases/'; // for use in index.js
const defaultDb = 'default.json';

const dbLockEmitter = new EventEmitter();
const dbLock = {};

const ramDb = {};

const now = () => (new Date()).getTime();
const startTime = now();
const monitorTimeout = 1000;

const print = (...args) => {
  console.log(`[${now() - startTime} ms]: `, ...args);
}

const releaseLock = async (filePath = path.join(dbPath,defaultDb)) => {
  dbLockEmitter.on('release: ' + filePath, () => {
    return true;
  });
}

const monitorDb = (filePath = path.join(dbPath, defaultDb)) => {
  // print('monitor: ' + filePath);
  setTimeout(async () => {
    if (ramDb[filePath] === undefined){
      return;
    }
    if (now() - ramDb[filePath][1] > monitorTimeout){
      // save data and delete ramDb
      await writeDb(filePath, ramDb[filePath][0]);
      // print('saved: ' + filePath);
      delete ramDb[filePath];
      return;
    }
    monitorDb(filePath);
  }, monitorTimeout);
}

const loadFile = async (filePath = path.join(dbPath,defaultDb)) => {
  if (dbLock[filePath] === true){
    await releaseLock(filePath);
  }
  if (ramDb[filePath] !== undefined){
    ramDb[filePath][1] = now() - startTime;
    return ramDb[filePath][0];
  }
  let data =  await loadDb(filePath);
  ramDb[filePath] = [data, now() - startTime];
  monitorDb(filePath);
  return data;
}

const loadDb = (filePath = path.join(dbPath,defaultDb)) => {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        console.error(err);
        reject(err);
      }
      try {
        resolve(JSON.parse(data));
      } catch (err) {
        reject(err);
      }
    });
  });
}

const writeFile = async (filePath = path.join(dbPath,defaultDb), data) => {
  if (ramDb[filePath] !== undefined){
    ramDb[filePath][0] = data;
    ramDb[filePath][1] = now();
    return true;
  }
  return await writeDb(filePath, data);
}

const writeDb = (filePath = path.join(dbPath,defaultDb), data) => {
  return new Promise(async (resolve, reject) => {
    if (dbLock[filePath] === true){
      await releaseLock(filePath);
    }
    dbLock[filePath] = true;
    // print('lock: ' + filePath);
    fs.writeFile(filePath, JSON.stringify(data, null, 2), (err) => {
      delete dbLock[filePath];
      dbLockEmitter.emit('release:' + filePath);
      // print('release: ' + filePath);
      if (err) {
        console.error(err);
        resolve(false);
      }
      resolve(true);
    });
  });
  
}

const dbExists = (filePath = path.join(dbPath,defaultDb)) => {
  return new Promise((resolve, reject) => {
    fs.exists(filePath, (exists) => {
      resolve(exists);
    })
  });
}

const createDb = async (relPath) => {
  let filePath = path.join(dbPath, relPath);
  // print(`creating file ${filePath}...`);
  let exists = await dbExists(filePath);
  if (exists) {
    // print(`file ${filePath} already exists`);
    return false;
  }
  let status = await writeFile(filePath, {});
  if (status) {
    // print(`created file ${filePath}`);
  } else {
    // print(`failed to create file ${filePath}`);
  }
  return status;
}

module.exports.execute = async () => {
  await createDb('test.json');
  for (let i = 0; i < 100; i++){
    let json = await loadFile(path.join(dbPath, 'test.json'));
    json[i] = i;
    await writeFile(path.join(dbPath, 'test.json'), json);
  }
  // print("finished");
}

module.exports.loadFile = loadFile;
module.exports.writeFile = writeFile;
module.exports.createDb = createDb;