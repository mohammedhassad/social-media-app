import AuthBase from "@/components/Auth/Base";
import AuthFormSignin from "@/components/Auth/Form/Signin";
import { useEffect } from "react";

const ScreensSignin = () => {
  useEffect(() => {
    document.title = "Sign In - Social Media App";
  }, []);

  return (
    <AuthBase title="Sign In">
      <AuthFormSignin />
    </AuthBase>
  );
};

export default ScreensSignin;
