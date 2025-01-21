import React, { useEffect, useState } from 'react';
import ReactCardFlip from 'react-card-flip';
import { Card, Button, CardActions, CardContent, Typography, Box, IconButton, Tooltip } from '@mui/material';
import { getRandomWord } from '../api/axios';

import DeleteIcon from '@mui/icons-material/Delete';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import HelpIcon from '@mui/icons-material/Help';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { DictionaryData, UserDataIndex } from '../types/types';
import { ThemeContext } from '@emotion/react';

type FlashCardProps = {
  word: string,
  level: number | UserDataIndex,
  data: DictionaryData,
  onSave: (word: string, level: number | UserDataIndex) => void,
  onDiscard: (word: string, level: number | UserDataIndex) => void,
  onCheck: (word: string, level: number | UserDataIndex) => void,
  onRemember: (word: string, level: number | UserDataIndex) => void,
  onForget: (word: string, level: number | UserDataIndex) => void,
  update: boolean // dummy variable for update
}

const Flashcard = ({
  word, level, data, onSave, onDiscard, onCheck, onRemember, onForget, update
}: FlashCardProps) => {
  const isSaved = (typeof level !== "number")
  const [flip, setFlip] = useState<boolean>(false);
  const [saved, setSaved] = useState<boolean>(false);
  const [discarded, setDiscarded] = useState<boolean>(false);
  const [checked, setChecked] = useState<boolean>(false);
  const [remembered, setRemembered] = useState<boolean>(false);
  const [forgetted, setForgetted] = useState<boolean>(false);

  useEffect(() => {
    setSaved(false);
    setDiscarded(false);
    setChecked(false);
    setRemembered(false);
    setForgetted(false);
  }, [update]);

  return (
    <>
    <div id={(update)?"dummy":"dummy2"}></div>
      <ReactCardFlip
        isFlipped={flip}
        flipDirection='vertical'
      >
        <Card 
          sx={{ 
            width: 275,
            height: 300,
            // borderWidth: 3,
            // borderWidth: (discarded||saved||checked||remembered||forgetted)?3:0,
            // borderColor: (discarded?"red":saved?"yellow":checked?"green":"black")
          }}
        >
          <CardContent>
            <div 
              className='h-52 flex items-center justify-center cursor-pointer'
              onClick={(e) => {
                setFlip(true);
              }}
            >
              <Typography variant="h5" component="div">
                {word}
              </Typography>
            </div>
          </CardContent>
          <CardActions>
            <Box sx={{display: 'relative', width: "100%"}}>
              <Box sx={{float: "left"}}>
                <Tooltip title={"I don't want to see it again."}>
                  <IconButton
                    onClick={() => {
                      setDiscarded(true);
                      onDiscard(word, level);
                    }}
                  >
                    <DeleteIcon style={{fill: ((discarded)?"red":"white")}} />
                  </IconButton>
                </Tooltip>
              </Box>
              {isSaved?
              <>
                <Box sx={{float: "right"}}>
                  <Tooltip title={"I remember!"}>
                    <IconButton
                      onClick={() => {
                        setRemembered(true);
                        onRemember(word, level);
                      }}
                    >
                      <LightbulbIcon style={{fill: ((remembered)?"cyan":"white")}} />
                    </IconButton>
                  </Tooltip>
                </Box>
                <Box sx={{float: "right"}}>
                  <Tooltip title={"I forgot..."}>
                    <IconButton
                      onClick={() => {
                        setForgetted(true);
                        onForget(word, level);
                      }}
                    >
                      <HelpIcon style={{fill: ((forgetted)?"orange":"white")}} />
                    </IconButton>
                  </Tooltip>
                </Box>
              </>:
              <>
                <Box sx={{float: "right"}}>
                  <Tooltip title={"I know this word!"}>
                    <IconButton
                      onClick={() => {
                        setChecked(true);
                        onCheck(word, level);
                      }}
                    >
                      <CheckCircleIcon style={{fill: ((checked)?"green":"white")}} />
                    </IconButton>
                  </Tooltip>
                </Box>
                <Box sx={{float: "right"}}>
                  <Tooltip title={"New word! Save it!"}>
                    <IconButton
                      onClick={() => {
                        setSaved(true);
                        onSave(word, level);
                      }}
                    >
                      <BookmarkIcon style={{fill: ((saved)?"yellow":"white")}} />
                    </IconButton>
                  </Tooltip>
                </Box>
              </>}
            </Box>

          </CardActions>
        </Card>
        <Card 
          sx={{ 
            width: 275,
            height: 300,
            cursor: "pointer"
          }}
          onClick={(e) => {
            setFlip(false);
          }}
        >
          <CardContent>
            <div className='w-full max-h-64 no-scrollbar overflow-auto'>
              <Typography variant="h5" component="div">
                {word}
              </Typography>
              {
                data.map((meaning) => (<div key={Math.random()}>
                  <Typography sx={{ mt: 1.5 }} color="text.secondary">
                    {meaning.partOfSpeech}
                  </Typography>
                  <div>
                    <ul className='m-2 ml-4 list-disc'>
                      {
                        meaning.definitions.map((definition) => (
                          <li key={Math.random()} >
                            <Typography variant="body2">
                              {definition}
                            </Typography>
                          </li>
                        ))
                      }
                    </ul>
                  </div>
                </div>))
              }
            </div>
          </CardContent>
        </Card>
      </ReactCardFlip>
    </>
  )
}

export default Flashcard;
