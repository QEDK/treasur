import React from "react";
import {Button} from "@chakra-ui/react";
import {PlusSquareIcon} from "@chakra-ui/icons";

const index = ({text}) => {
  return (
    <div style={container}>
    <Button style={bidButton} leftIcon={<PlusSquareIcon />} variant="solid">
      {text}
    </Button>
    </div>
  );
};

const bidButton = {
  width: "80%",
  borderRadius: "8px",
  background: "#2F2F31",
  color: "white",
  marginBottom: "10px"
};

const container = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center"
}

export default index;
