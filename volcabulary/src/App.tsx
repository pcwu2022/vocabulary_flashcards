import React, { useContext, useEffect, useState, createContext } from 'react';
import './App.css';
import Login from './components/Login';
import { Box, createTheme, ThemeProvider } from '@mui/material';
import { ContextData, UserData } from './types/types';
import Main from './components/Main';

function App() {
  const [login, setLogin] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");
  const theme = createTheme({
    palette: {
      mode: "dark",

    }
  });

  return (
    <div className="App m-0 p-0 w-full h-screen">
      <ThemeProvider theme={theme}>
        <div
          className='w-full h-screen flex items-center justify-center'
          style={{
            backgroundColor: theme.palette.background.default
          }}
        >  
          {
            (!login)?<Login
              username={username} setUsername={setUsername} setLogin={setLogin}
            />
            :<>
              <Main 
                
              />
            </>
          }
        </div>
      </ThemeProvider>
    </div>
  );
}

export default App;
