import React from "react";
import { login } from "@api";
import { Button } from "@components";

const LoginScreen: React.FC = (props) => {
  return (
    <Button
      buttonText="login"
      onPress={() => {
        login();
      }}
    />
  );
};

export default LoginScreen;
