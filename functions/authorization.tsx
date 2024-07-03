import { setCookie } from "cookies-next";
interface AuthParams {
  username: string;
  password: string;
}

const loginURL = `${process.env.NEXT_PUBLIC_BACKENDURL}login`;
const Authorize = async (authData: AuthParams) => {
  try {
    const { username, password } = authData;
    const loginOPT = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    };

    const loginStatus = await fetch(loginURL, loginOPT);
    const loginData = await loginStatus.json();
    if (loginStatus.ok) {
      // Storing in local storage & Redirect 
      setCookie("fresh_tomatoes_auth_token",loginData.token);
      return loginData;
    } else {
      console.error("API request failed", loginData.error);
      return { error: "Login Unsuccessful!" };
    }
  } catch (error) {
    console.error(error);
    return { error: error };
  }
};

export default Authorize;
