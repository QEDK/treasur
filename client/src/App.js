import "./App.css";

import {ChakraProvider, extendTheme} from "@chakra-ui/react";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Homepage from './components/pages/Homepage';
import Dashboard from './components/pages/Dashboard';
import Fonts from './assets/Fonts';

require('dotenv').config()

const theme = extendTheme({
  fonts: {
    body: "Roboto",
    heading:"Roboto",
  },
})

function App() {
  return (
    <ChakraProvider theme={theme}>
       <Fonts />
      <Router>
        <Switch>
      <Route path='/nft'>
        <Dashboard />
      </Route>
      <Route path='/'>

        <Homepage />

      </Route>
      </Switch>
      </Router>
      </ChakraProvider>
  );
}

export default App;
