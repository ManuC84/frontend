const environment = {
  baseUrl: "http://localhost:8000",
};

if (process.env.REACT_APP_ENV === "staging") {
  environment.baseUrl = "https://freelycomment.herokuapp.com/";
}

export default environment;
