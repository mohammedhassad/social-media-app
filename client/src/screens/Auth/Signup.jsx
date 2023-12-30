import AuthBase from "@/components/Auth/Base";
import AuthFormSignup from "@/components/Auth/Form/Signup";
import { useEffect } from "react";

const ScreensSignup = () => {
  useEffect(() => {
    document.title = "Sign Up - Social Media App";
  }, []);

  return (
    <AuthBase title="Sign Up">
      <AuthFormSignup />
    </AuthBase>
  );
};

export default ScreensSignup;
