// import React, { useState } from "react";

// function App() {
//   const [likes, setLikes] = useState(1);
//   function increment() {
//     setLikes(likes + 1);
//   }
//   function decrement() {
//     setLikes(likes - 1);
//   }

//   return (
//     <div className="App">
//       <h1>{likes}</h1>
//       <button onClick={increment}>Increment</button>
//       <button onClick={decrement}>Decrement</button>
//     </div>
//   );
// }

// export default App;

import React, { useEffect, useState } from "react";
// import logo from "./logo.svg";
// import "./App.css";
import { useMoralis, useMoralisWeb3Api } from "react-moralis";

function App() {
  const [value, setValue] = useState("lol");
  const {
    authenticate,
    isAuthenticated,
    isAuthenticating,
    user,
    account,
    logout,
  } = useMoralis();

  useEffect(() => {
    if (isAuthenticated) {
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  const login = async () => {
    if (!isAuthenticated) {
      await authenticate({ signingMessage: "Log in using Moralis" })
        .then(function(user) {
          console.log("logged in user:", user);
          console.log(user.get("ethAddress"));
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  };

  const logOut = async () => {
    await logout();
    console.log("logged out");
  };

  const setName = async () => {
    // const inputValue = document.querySelector(".input");
    // setValue(inputValue.value);

    if (isAuthenticated) {
      user.setUsername(value);
    }
  };

  useEffect(() => {
    console.log("value", value);
    // console.log(fetchTokenBalances);
  });

  // const Web3Api = useMoralisWeb3Api();

  // const fetchTokenBalances = async () => {
  //   const balances = await Web3Api.account.getTokenBalances();
  //   console.log(balances);
  // };

  return (
    <div>
      <h1>Raritygram The Best Social Web3 Network!</h1>
      {isAuthenticated && user.get("ethAddress")}
      <br />
      {isAuthenticated && user.get("username")}
      {/* {isAuthenticated && user.setUsername("Mary Jane")} */}
      <br />
      <input
        onChange={(e) => setValue(e.target.value)}
        value={value}
        className="input"
        type="text"
        placeholder="Putin"
      />
      {isAuthenticated && user.setUsername(value)}

      <button onClick={setName}>EDIT</button>
      <button onClick={login}>Metamask Login</button>
      <button onClick={logOut} disabled={isAuthenticating}>
        Logout
      </button>
    </div>
  );
}

export default App;
