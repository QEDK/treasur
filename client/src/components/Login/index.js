import React from "react";
import {GoogleLogin} from "react-google-login";
import { useDispatch } from 'react-redux';
import {signIn} from '../../store/actions/signInAction';
import { refreshTokenSetup } from '../../utils/auth'

const client_id = process.env.GOOGLE_CLIENT_ID;
const index = () => {
  const dispatch = useDispatch();

  const onSuccess = (res) => {
    // console.log(`Login successful ${res.profileObj}`);
    console.log(res.profileObj)
    dispatch(signIn(res.profileObj))
    refreshTokenSetup(res);
  };

  const onFailure = (res) => {
    console.log(`Login failed ${res}`);
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
