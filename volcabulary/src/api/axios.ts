import axios from "axios";
import { DictionaryData, UserData, UserDataIndex } from "../types/types";
import wordbase from "../database/wordbase.json";
import { redirect } from "react-router-dom";

// const database = "https://pcwu-service.onrender.com";
const database = "http://localhost:3001";
const dictAPI = "https://api.dictionaryapi.dev/api/v2/entries/en";

let globalUsername = "";
let userData: UserData = {
    learning1: [],
    learning2: [],
    learning3: [],
    learning4: [],
    learning5: [],
    learnt: [], // learnt through five success trials
    known: [], // known in advance
    discarded: [],
    level: 1,
    count: 0
};

let connection = true;

/******************** USER INFORMATION ******************/

const testFetch = (message = false) => {
    axios.get(`${database}/test/`, {
        timeout: 5000
    })
        .then((response) => {
            connection = true;
            console.log("Successfully connected to the database");
        })
        .catch((err) => {
            if (message){
                alert("Cannot connect to database. Data is stored in local storage.");
            }
            connection = false;
        })
}

const dataInit = (username: string): Promise<boolean> => {
    return new Promise((resolve, reject) => {
        if (connection){
            axios.get(`${database}/volcabulary/${username}`)
                .then((res) => {
                    if (res.data.data === null){
                        resolve(false); // no user present
                        console.log("no user present");
                    } else {
                        userData = res.data.data;
                        globalUsername = username;
                        resolve(true); // user present
                        console.log(userData);
                    }
                })
                .catch((err) => {
                    console.error(err)
                    resolve(false);
                });
        } else {
            if (localStorage.getItem("username") === null){
                resolve(false);
            } else {
                let data = localStorage.getItem("userData");
                if (data !== null){
                    userData = JSON.parse(data);
                    resolve(true);
                } else {
                    resolve(false);
                }
            }
        }
    });
}

const createUser = (username: string) => {
    let newUser = userData;
    globalUsername = username;
    localStorage.setItem("username", username);
    if (connection){
        axios.post(`${database}/volcabulary/${username}/`, newUser)
            .catch((err) => console.error(err));
    } else {
        localStorage.setItem("userData", JSON.stringify(userData));
    }
}

let collectLevel: Array<number> = [];
const saveUser = () => {
    if (globalUsername === ""){
        let newUsername = localStorage.getItem("username");
        if (newUsername !== null){
            globalUsername = newUsername;
        } else {
            redirect("/");
        }
    }
    collectLevel[userData.count-1] = userData.level;
    // if (userData.count%10 === 0){
    //     console.log(collectLevel);
    // }
    if (connection){
        axios.post(`${database}/volcabulary/${globalUsername}/`, userData)
            .catch((err) => console.error(err));
    } else {
        testFetch();
    }
    localStorage.setItem("username", globalUsername);
    localStorage.setItem("userData", JSON.stringify(userData));
}

/******************** ALGORITHM ******************/

const stableProb = 0.3;
const initProb = 0.8;
const thresholdCount = 40
const prob = () => {
    return ((userData.count+1) < thresholdCount)?(0-(initProb-stableProb)/thresholdCount)*(userData.count+1)+initProb:stableProb
}

const stableStep = 0.2
const initStep = 2;
const step = () => {
    return ((userData.count+1) < thresholdCount)?(0-(initStep-stableStep)/thresholdCount)*(userData.count+1)+initStep:stableStep
}

const stableReview = 0.3;
const reviewProb = () => {
    let len = userData.learning1.length + userData.learning2.length + userData.learning3.length + userData.learning4.length + userData.learning5.length;
    return ((len < thresholdCount)?len*stableReview/thresholdCount:stableReview)
}

// check if the word is inside userData
const inData = (word: string): [boolean, string | null] => {
    for (let key in userData){
        let searchArray = userData[key as keyof UserData];
        if (typeof searchArray !== "number"){
            if (searchArray.indexOf(word) !== -1){
                // found word in searchArray
                return [true, key];
            }
        }
    }
    return [false, null];
}

const randomSelect = (array: Array<any>): any => {
    let index = Math.floor(Math.random() * array.length);
    return array[index];
}

const levelLimit = 12;
const getRandomWord = (review = false): [string ,number | UserDataIndex] => { // get random word according to user info
    //// some probability of reviewing -> discarded
    // if (Math.random() < reviewProb()){ // random
    if (review){ // by user setting
        // get word from review
        let len = userData.learning1.length + userData.learning2.length + userData.learning3.length + userData.learning4.length + userData.learning5.length;
        let choice = Math.floor(Math.random() * len);
        if (choice < userData.learning1.length){
            // choose from learning1
            return [userData.learning1[choice], UserDataIndex.learning1];
        } 
        choice -= userData.learning1.length;
        if (choice < userData.learning2.length){
            // choose from learning2
            return [userData.learning2[choice], UserDataIndex.learning2];
        } 
        choice -= userData.learning2.length;
        if (choice < userData.learning3.length){
            // choose from learning3
            return [userData.learning3[choice], UserDataIndex.learning3];
        } 
        choice -= userData.learning3.length;
        if (choice < userData.learning4.length){
            // choose from learning4
            return [userData.learning4[choice], UserDataIndex.learning4];
        } else {
            choice -= userData.learning4.length;
            // choose from learning5
            return [userData.learning5[choice], UserDataIndex.learning5];
        }
    } else {
        let level = Math.floor(userData.level);
        let rand = Math.random();
        // for some probability, it would randomly choose to go up or down a level
        if (rand < prob()/2){
            // + one level
            level = Math.round(userData.level) + 1;
        } else if (rand < prob()){
            // - one level
            // special case: level 1-2
            if (userData.level < 2){
                level = Math.round(userData.level) + 1;
            } else {
                level = Math.round(userData.level) - 1;
            }
        } else {
            let delta = level - Math.floor(level); 
            // if level = 7.4, then [7] <-0.6- [7.4] -0.4-> [8]
            rand = Math.random();
            if (rand < delta){
                level = Math.ceil(userData.level);
            } else {
                level = Math.floor(userData.level);
            }
        }

        // boundary conditions
        if (level > levelLimit){
            level = levelLimit;
        } if (level < 1){
            level = 1;
        }

        // pick a random word
        let word = "";
        do {
            word = randomSelect(wordbase[(level + "") as keyof typeof wordbase]);
        } while (inData(word)[0]);

        // console.log("Generated word of level " + level);

        return [word, level];
    }
}

// extract word from userData
const extract = (word: string) => {
    const [isInData, key] = inData(word);
    if (!isInData){
        return;
    }
    let searchArray = userData[key as keyof UserData];
    if (typeof searchArray === "number"){
        return;
    }
    let index = searchArray.indexOf(word);
    if (index !== -1){
        searchArray.splice(index, 1);
    }
}

/******************** UI ACTIONS ******************/
const additionalStep = 0.5;

const saveWord = (word: string, level: number | UserDataIndex) => {
    extract(word);
    userData.learning1.push(word);

    // algorithm: subtract a level to the user
    if (typeof level === "number" && level < userData.level + additionalStep){
        userData.level -= step()*(userData.level - level - additionalStep);
        // boundary conditions
        if (userData.level < 1){
            userData.level = 1;
        } else if (userData.level > levelLimit){
            userData.level = levelLimit;
        }
    }

    userData.count += 1;
    saveUser();
}

const discardWord = (word: string, level: number | UserDataIndex) => {
    extract(word);
    userData.discarded.push(word);
    saveUser();
}

const checkWord = (word: string, level: number | UserDataIndex) => {
    extract(word);
    userData.known.push(word);
    
    // algorithm: add a level to the user
    if (typeof level === "number" && level > userData.level - additionalStep){
        userData.level += step()*(level - userData.level + additionalStep);
        // boundary conditions
        if (userData.level < 1){
            userData.level = 1;
        } else if (userData.level > levelLimit){
            userData.level = levelLimit;
        }
    }

    userData.count += 1;
    saveUser();
}

const rememberWord = (word: string, level: number | UserDataIndex) => {
    extract(word);
    if (level === UserDataIndex.learning1){
        userData.learning2.push(word);
    } else if (level === UserDataIndex.learning2){
        userData.learning3.push(word);
    } else if (level === UserDataIndex.learning3){
        userData.learning4.push(word);
    } else if (level === UserDataIndex.learning4){
        userData.learning5.push(word);
    } else if (level === UserDataIndex.learning5){
        userData.learnt.push(word);
    }
    saveUser();
}

const forgetWord = (word: string, level: number | UserDataIndex) => {
    extract(word);
    if (level === UserDataIndex.learning1){
        userData.learning1.push(word);
    } else if (level === UserDataIndex.learning2){
        userData.learning1.push(word);
    } else if (level === UserDataIndex.learning3){
        userData.learning2.push(word);
    } else if (level === UserDataIndex.learning4){
        userData.learning2.push(word);
    } else if (level === UserDataIndex.learning5){
        userData.learning2.push(word);
    }
    saveUser();
}

const canReview = () => {
    let len = userData.learning1.length + userData.learning2.length + userData.learning3.length + userData.learning4.length + userData.learning5.length;
    if (len > 0){
        return true;
    }
    return false
}

/******************** DICTIONARY API ******************/

const getAPI = (word: string): Promise<DictionaryData> => {
    return new Promise<DictionaryData>((resolve, reject) => {
        axios.get(`${dictAPI}/${word}`)
            .then((response) => {
                // console.log(response.data);
                let meanings = response.data[0].meanings;
                let dictArr: DictionaryData = [];
                for (let meaning of meanings){
                    dictArr.push({
                        partOfSpeech: meaning.partOfSpeech as string,
                        definitions: []
                    })
                    for (let definition of meaning.definitions){
                        dictArr[dictArr.length-1].definitions.push(definition.definition);
                    }
                }
                resolve(dictArr);
            })
            .catch((err) => {
                // 404
                // console.error(err);
                reject("404");
            })
    })
}

/******************** EXPORT ******************/

export {
    dataInit,
    createUser,
    getRandomWord,
    saveUser,
    saveWord,
    discardWord,
    checkWord,
    rememberWord,
    forgetWord,
    getAPI,
    canReview,
    testFetch
}