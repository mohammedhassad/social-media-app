// import { signout } from "./api-auth";

const authenticate = (jwt, cb) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("jwt", JSON.stringify(jwt));
  }

  cb();
};

const isAuthenticated = () => {
  if (typeof window == "undefined") return false;

  if (localStorage.getItem("jwt"))
    return JSON.parse(localStorage.getItem("jwt"));
  else return false;
};

const clearJWT = (cb) => {
  if (typeof window !== "undefined") localStorage.removeItem("jwt");
  cb();
  //optional
  // signout().then((data) => {
  //   document.cookie = "jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
  // })
};

export { authenticate, isAuthenticated, clearJWT };
