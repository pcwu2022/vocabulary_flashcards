import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import React, { useContext } from 'react';
import { ContextData } from '../types/types';
import { createUser, dataInit } from '../api/axios';

interface LoginProps {
  username: string,
  setUsername: React.Dispatch<React.SetStateAction<string>>
  setLogin: React.Dispatch<React.SetStateAction<boolean>>
}

const loginHandler = async (username: string): Promise<boolean> => {
  let success: boolean = await dataInit(username);
  if (success){
    return true;
  }
  if (window.confirm(`Username ${username} doesn't exist. Create a new account?`)){
    createUser(username);
    return true;
  }
  return false;
}

const Login = ({ username, setUsername, setLogin }: LoginProps) => {
  return (
    <div className='p-4 text-center'>
      <Paper
        elevation={3}
        sx={{
          padding: "24px",
          display: "inline-block"
        }}
      >
        <div className='mb-2 font-semibold text-2xl'>Random Volcabulary Tracker</div>
        <div className='mb-4'>Created by ddm4535</div>
        <TextField id="username" label="Enter Your Username" variant="filled" fullWidth 
          onChange={(e) => {
            setUsername(e.target.value);
          }} 
        />
        <br /><br />
        <Button variant="contained"
          onClick={(e) => {
            loginHandler(username).then((success: boolean) => {
              if (success){
                setLogin(true);
              }
            })
          }}
        >Submit</Button>
      </Paper>
    </div>
  )
}

export default Login;
