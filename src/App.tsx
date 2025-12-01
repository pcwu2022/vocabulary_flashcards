import React from 'react';
import './App.css';
import { Box, createTheme, ThemeProvider } from '@mui/material';
import { ContextData, UserData } from './types/types';
import Main from './components/Main';

function App() {
  // App is now a static, localStorage-only site — always show Main
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
          <Main />
        </div>
      </ThemeProvider>
    </div>
  );
}

export default App;
