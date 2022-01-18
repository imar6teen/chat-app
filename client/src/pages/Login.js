import React from "react";
function Login() {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e);
  };
  return (
    <div id="login">
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
        <input type="submit" value="Login" />
      </form>
    </div>
  );
}

export default Login;
