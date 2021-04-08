import React from "react";
import {GoogleLogout} from "react-google-login";

const client_id = `1084414217627-siqkc8nv2m6b9hj8pv4prsrsmk6e5b4c.apps.googleusercontent.com`;
const index = () => {
  const onSuccess = () => {
    console.log("Logout successful");
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
