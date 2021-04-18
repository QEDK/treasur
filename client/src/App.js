import "./App.css";

import {ChakraProvider, extendTheme} from "@chakra-ui/react";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Homepage from './components/pages/Homepage';
import Dashboard from './components/pages/Dashboard';
import Offer from './components/pages/Offer';
import Navbar from './components/Navbar';
import Fonts from './assets/Fonts';

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
       <Navbar />
      <Router>
        <Switch>
      <Route path='/nft/:tokenURI'>
        <Dashboard />
      </Route>
      <Route path='/offer'>
        <Offer />
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
