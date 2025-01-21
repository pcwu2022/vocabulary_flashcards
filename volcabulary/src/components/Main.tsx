import React, { useEffect, useState } from 'react';
import Flashcard from './Flashcard';
import { DictionaryData, UserDataIndex } from '../types/types';
import { canReview, checkWord, discardWord, forgetWord, getAPI, getRandomWord, rememberWord, saveWord, testFetch } from '../api/axios';
import { Button, Typography } from '@mui/material';

const Main = () => {
  const timeout = 600; // icon fill

  const [review, setReview] = useState<boolean>(false);

  const [nextData, setNextData] = useState<DictionaryData>([]);
  const [nextWord, setNextWord] = useState<string>("");
  const [nextLevel, setNextLevel] = useState<number | UserDataIndex>(1);

  const [data, setData] = useState<DictionaryData>([]);
  const [word, setWord] = useState<string>("");
  const [level, setLevel] = useState<number | UserDataIndex>(1);

  const [dummy, setDummy] = useState<boolean>(false);
  const [dummy2, setDummy2] = useState<boolean>(false);

  // flashcard reload
  const forceUpdate = () => {
    setDummy(!dummy);
  }

  // main page reload
  const forceUpdate2 = () => {
    setDummy2(!dummy2);
  }

  const loadWord = (current=false) => {
    setData(nextData);
    setWord(nextWord);
    setLevel(nextLevel);
    let [randWord, randLevel] = getRandomWord(review);
    getAPI(randWord)
      .then((dict) => {
        setNextData(dict);
        setNextWord(randWord);
        setNextLevel(randLevel);
        // console.log("Current: ", nextData, nextWord, nextLevel);
        // console.log("Next: ", dict, randWord, randLevel);
        if (current){
          setData(dict);
          setWord(randWord);
          setLevel(randLevel);
        }
      })
      .catch((err) => {
        loadWord(current);
      })
  }

  const wordAnimation = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        forceUpdate();
        loadWord();
        resolve(true);
      }, timeout);
    });
  }

  const reload = () => {
    setData([]);
    setWord("");
    setLevel(1);
    setNextData([]);
    setNextWord("");
    setNextLevel(1);
    forceUpdate2();
  }

  useEffect(() => {
    // get word and display it
    loadWord(true);
    loadWord();
  }, [dummy2]);

  useEffect(() => {
    testFetch(true);
  }, [])
  return (
    <div className='p-4'>
      <div id={(dummy2)?"dummy":"dummy2"}></div>
      <Typography variant='h5' color="white">
        Random Vocabulary Tracker
      </Typography>
      <Typography variant='body2' color="white">
      </Typography>
      <div className='m-4'>
        {
          canReview()?<Button variant='outlined' size="small"
            onClick={() => {
              setReview(!review);
              reload();
            }}
          >
            {(review)?"Back to Random Generation":"View My Dictionary"}
          </Button>:<></>
        }
        
      </div>
      <div className='flex align-center justify-center mt-4 p-4'>
        <Flashcard
          word={word}
          level={level}
          data={data}
          update={dummy}
          onCheck={(word: string, level: number | UserDataIndex) => {
            // console.log("Word Level: " + level);
            checkWord(word, level);
            wordAnimation();
          }}
          onDiscard={(word: string, level: number | UserDataIndex) => {
            discardWord(word, level);
            wordAnimation();
          }}
          onSave={(word: string, level: number | UserDataIndex) => {
            saveWord(word, level);
            wordAnimation();
          }}
          onRemember={(word: string, level: number | UserDataIndex) => {
            rememberWord(word, level);
            wordAnimation();
          }}
          onForget={(word: string, level: number | UserDataIndex) => {
            forgetWord(word, level);
            wordAnimation();
          }}
        />
      </div>
    </div>
  )
}

export default Main;
