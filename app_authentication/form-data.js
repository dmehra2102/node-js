const loginFormVars = {
  signup: {
    title: "Sign up",
    message: "Already have an account?",
    route: "/account",
    switchPage: "login",
    showExtraFields: true,
  },
  login: {
    title: "Log in",
    message: "Need to create an account?",
    route: "/auth",
    switchPage: "signup",
    showExtraFields: false,
  },
};

export default loginFormVars;
