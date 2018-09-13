import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';





const list=[{
    title:'React',
    url: 'https://facebook.github.io/react',
    author:'Gabriel',
    num_comments: 3,
    points:4,
    objectID:0,
},
];
class App extends Component {
  render() {
    const helloworld="Welcome to the Road to learn React " 
    const author = "This is made by Gabriel Medina Cirelli"
    return (
      <div className="App">
          <h2>{helloworld} </h2>
          <h3>{author}</h3>
      </div>
    );
  }
}

export default App;
