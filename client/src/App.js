import "./App.css";

import {ChakraProvider, extendTheme, Container} from "@chakra-ui/react";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import CardList from "./components/CardList";
import Dashboard from './components/pages/Dashboard';
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
      <Router>
        <Switch>
      <Route path='/nft'>
        <Dashboard />
      </Route>
      <Route path='/'>
      <Container maxW="container.lg" centerContent>
      <CardList />
      </Container>
      </Route>
      </Switch>
      </Router>
      </ChakraProvider>
  );
}

export default App;
