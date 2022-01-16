import logo from './logo.svg';
import './App.css';

import { useEffect } from "react";

import axios from "axios";

function App() {

  useEffect(() => {
    console.log("work");
    axios.post("http://localhost:8888/v1/auth/register", {
      username: 'dungtt',
      password: 'dungtran',
      email: 'dungtest@gmail.com'
    }).then(res => {
      console.log("res")
    })
    .catch(err => {
      console.log("err", err);
    })
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
