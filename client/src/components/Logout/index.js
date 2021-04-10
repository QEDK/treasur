import React from "react";
import {GoogleLogout} from "react-google-login";
import { useDispatch } from 'react-redux';
import { signOut } from '../../store/actions/signInAction';

const client_id = `${process.env.GOOGLE_CLIENT_ID}`;
const index = () => {
  const dispatch = useDispatch();
  const onSuccess = () => {
    console.log("Logout successful");
    dispatch(signOut());
  };
  return (
    <div>
      <GoogleLogout
        clientId={client_id}
        buttonText="Logout"
        onLogoutSuccess={onSuccess}
      />
    </div>
  );
};

export default index;
