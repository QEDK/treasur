import "./App.css";

import {ChakraProvider, extendTheme, Container} from "@chakra-ui/react";
import CardList from "./components/CardList";
import Fonts from './assets/Fonts';


const theme = extendTheme({
  fonts: {
    body: "Lato",
    heading:"Lato",
  },
})

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Fonts />
      <Container maxW="container.lg" centerContent>
      <CardList />
      </Container>
      </ChakraProvider>
  );
}

export default App;
