import React from "react";
import { Link } from "react-router-dom";
function Login(props) {
  const handleSubmit = (e) => {
    e.preventDefault();
    props.handleLogin({
      username: e.target.username.value,
      password: e.target.password.value,
    });
  };
  return (
    <div id="login">
      <div id="form">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            id="username"
            placeholder="Username"
          />
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
          />
          <input type="submit" id="submit" value="Login" />
        </form>
      </div>
      <div id="oauth">
        <div className="google-btn">
          <div className="google-icon-wrapper">
            <img
              className="google-icon"
              src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
              alt="Google"
            />
          </div>
          <p className="btn-text">
            <b>Sign in with google</b>
          </p>
        </div>
      </div>
      <div id="signup">
        <p>
          Dont have account yet? <Link to={"/signup"}>Sign Up</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
