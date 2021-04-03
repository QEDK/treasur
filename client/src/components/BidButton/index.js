import React from 'react'
import { Button } from "@chakra-ui/react";
import {PlusSquareIcon} from "@chakra-ui/icons";

const index = ({text}) => {
    return (
        <Button style={bidButton} leftIcon={<PlusSquareIcon />} variant="solid">
                {text}
              </Button>
    )
}

const bidButton = {
    borderRadius: "10px",
    background: "linear-gradient(145deg, #e6e6e6, #ffffff)",
    boxShadow: `20px 20px 60px #d9d9d9,
                -20px -20px 60px #ffffff`,
  };

export default index
