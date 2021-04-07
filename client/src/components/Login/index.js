import React from "react";
import {GoogleLogin} from "react-google-login";
import { refreshTokenSetup } from '../../utils/auth'

const client_id = `1084414217627-siqkc8nv2m6b9hj8pv4prsrsmk6e5b4c.apps.googleusercontent.com`;
const index = () => {
  const onSuccess = (res) => {
    // console.log(`Login successful ${res.profileObj}`);
    console.log(res.profileObj)
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
