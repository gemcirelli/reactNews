import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

const isSearched = searchTerm => item =>item.title.toLowerCase().includes(searchTerm.toLowerCase());
// function isSearched(searchTerm){

//   return function(item){
//     return item.title.toLowerCase().includes(searchTerm.toLowerCase());
//   }
// }


const list=[
  {
    title:'React',
    url: 'https://facebook.github.io/react',
    author:'Gabriele',
    num_comments: 3,
    points:4,
    objectID:0,
  },

  {
  title:'Reacto',
  url: 'https://facebook.github.io/react',
  author:'Eduardo',
  num_comments: 3,
  points:4,
  objectID:1,
  },
];
class App extends Component {
  constructor(props){
    super(props);
    this.state={
      list,
      searchTerm: '',
    };


    this.onDismiss=this.onDismiss.bind(this);

    this.onSearchChange=this.onSearchChange.bind(this);
  }

  onDismiss(id){


    function isNotId(item){
      return item.objectID !== id;

    }
    const updatedlist= this.state.list.filter(isNotId);

    this.setState({list:updatedlist});
  }

  onSearchChange(event){

    this.setState({searchTerm: event.target.value});

  }

 
  render() {
  
    return(
     
        <div className="App">

          <form>
            <input type="text"
                  type="text"
                  onChange={this.onSearchChange}
                
            /> 
          </form>


          {this.state.list.filter(isSearched(this.state.searchTerm)).map(item=>
              <div key={item.objectID}>
               
                <ul>
                  <li>
                      <a href={item.url}> {item.title} </a>
                  </li>
                  <li>
                     {item.author}
                  </li>
                  <li>
                    {item.num_comments} 
                  </li>

                  <li>
                  {item.points}
                  </li>

                  <li>
                    <button 
                        onClick={()=>this.onDismiss(item.objectID)}
                        type="button"
                    >
                          Dismiss
                    </button>
                  </li>
                </ul>
                
     
              </div>
          )}



        </div>

    
    );
  }
}

export default App;
