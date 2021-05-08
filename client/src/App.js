import "./App.css";

import {ChakraProvider, extendTheme} from "@chakra-ui/react";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Homepage from './components/pages/Homepage';
import Dashboard from './components/pages/Dashboard';
import Profile from './components/pages/Profile';
import Offer from './components/pages/List';
import Navbar from './components/Navbar';
import Fonts from './assets/Fonts';

const theme = extendTheme({
  fonts: {
    body: "Roboto",
    heading:"Roboto",
  },
  colors: {
    brand: {
      100: "#281A03",
      200: "#281A03",
      300: "#281A03",
      400: "#281A03",
      500: "#281A03",
      600: "#281A03",
      700: "#281A03",
      800: "#281A03",
      900: "#281A03",
    }
  }
})

function App() {
  return (
    <ChakraProvider theme={theme}>
       <Fonts />
       <Router>
       <Navbar />
        <Switch>
      <Route path='/nft/:tokenURI'>
        <Dashboard />
      </Route>
      <Route path='/profile'>
        <Profile />
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
