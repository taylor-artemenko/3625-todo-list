import React, { useReducer, createContext } from "react";
import { Route, Switch } from 'react-router-dom';
import { createGlobalStyle, ThemeProvider } from "styled-components";
import { reducer, initialState } from "./reducer";

import Home from './components/Home';
import About from './components/About';
import Navbar from './components/Navbar';
import Error from './components/Error';
import Api from './components/Api';

export const AppContext = createContext();

function App() {
    const [state, dispatch] = useReducer(reducer, initialState);
    const { currentTheme } = state;

    return (
        <ThemeProvider theme={currentTheme}>
            <AppContext.Provider value={{ ...state, dispatch }}>
                <GlobalStyles />
                <div className='todoapp stack-large'>
                    <Navbar />
                    <Switch>
                        <Route path='/' component={Home} exact />
                        <Route path='/about' component = {About} />
                        <Route path='/api' component={Api} />
                        <Route component={Error} />
                    </Switch>
                </div>
            </AppContext.Provider>
        </ThemeProvider>
    );
}

const GlobalStyles = createGlobalStyle`
  html, body, .todoapp, a, button {
    background: ${props => props.theme.backgroundColor};
    color: ${props => props.theme.textColor};
    font-family: sans-serif;
  }
`;

export default App