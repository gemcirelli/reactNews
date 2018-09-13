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
    const {list,searchTerm}= this.state;
    return(
     
        <div className="App">
          <Search
            value={searchTerm}
            onChange={this.onSearchChange}
          >
            Search
          </Search>
          <Table
            list={list}
            pattern={searchTerm}
            onDismiss={this.onDismiss}
          
          />

        </div>

    );

  }    

}

class Search extends Component{
  render(){
    const{value,onChange,children}=this.props;
    return(
        <form>
          {children}
          <input
            type="text"
            value={value}
            onChange={onChange}
          />
        </form>
    )
  }
}

class Table extends Component{
  render(){
    const{list,pattern, onDismiss}=this.props;
    return(
        <div>
          {list.filter(isSearched(pattern)).map(item=>
              
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
                  <Button 
                      onClick={()=>onDismiss(item.objectID)}
                      type="button"
                  >
                        Dismiss
                  </Button>
                </li>
              </ul>
    
            </div>
          )}

        </div>


    )
  }
}

class Button extends Component{
  render(){
    const {
      onClick,
      className='',
      children,
    }= this.props;

    return(
        <button
            onClick={onClick}
            className={className}
            type="button"
        >
        {children}
        </button>
    );
  }
}

export default App;
