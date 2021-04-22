import React from "react";
import {GoogleLogin} from "react-google-login";
import { useDispatch } from 'react-redux';
import {signIn} from '../../store/actions/signInAction';
import { refreshTokenSetup } from '../../utils/auth'
import { useToast } from "@chakra-ui/react";

const client_id = `${process.env.REACT_APP_GOOGLE_CLIENT_ID}`;
const index = () => {
  const dispatch = useDispatch();

  const onSuccess = (res) => {
    dispatch(signIn(res.profileObj))
    refreshTokenSetup(res);
    return(toast({
      title: "Autentication Successful",
      description: "Logged In Successfully",
      status: "success",
      duration: 30000,
      isClosable: true,
      position: "top-right"
    })
)
  };

  const onFailure = (res) => {
    return(toast({
      title: "Authentication Error",
      description: "There was some issue. Please try again.",
      status: "error",
      duration: 3000,
      isClosable: true,
      position: "top-right"
    })
)
  };
  return (
    <div>
      <GoogleLogin
        clientId={client_id}
        buttonText="Login"
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy={"single_host_origin"}
        isSignedIn={true}
      />
    </div>
  );
};

export default index;
