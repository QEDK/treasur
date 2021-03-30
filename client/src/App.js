import "./App.css";

import {Text} from "@chakra-ui/react";

function App() {
  return (
    <div className="App">
      <Text
        bgGradient="linear(to-l, #7928CA,#FF0080)"
        bgClip="text"
        fontSize="6xl"
        fontWeight="extrabold"
      >
        Welcome to Tokenized Videos!
      </Text>
    </div>
  );
}

export default App;
