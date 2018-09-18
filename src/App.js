import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';


const DEFAULT_QUERY= 'redux';

const PATH_BASE = 'https://hn.algolia.com/api/v1';
const PATH_SEARCH = '/search';
const PARAM_SEARCH = 'query=';

const PARAM_PAGE= 'page=';

const isSearched = searchTerm => item =>item.title.toLowerCase().includes(searchTerm.toLowerCase());
// function isSearched(searchTerm){

//   return function(item){
//     return item.title.toLowerCase().includes(searchTerm.toLowerCase());
//   }
// }


class App extends Component {
  constructor(props){
    super(props);
    this.state={
      result:null,
      searchTerm: DEFAULT_QUERY,
      error:null,
    };

    this.setSearchTopStories=this.setSearchTopStories.bind(this);
    this.onDismiss=this.onDismiss.bind(this);

    this.onSearchChange=this.onSearchChange.bind(this);


    this.onSearchSubmit=this.onSearchSubmit.bind(this);

    this.fetchSearchTopStories= this.fetchSearchTopStories.bind(this);
  }

  //metodo de clase reusable

  fetchSearchTopStories(searchTerm,page=0){
    fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}&${PARAM_PAGE}${page}`)
    .then(response => response.json())
    .then(result => this.setSearchTopStories(result))
    .catch(error => this.setState({error}));

  }


  onSearchSubmit(event){
    const {searchTerm}= this.state;
    this.fetchSearchTopStories(searchTerm);
    event.preventDefault();
  }

  setSearchTopStories(result){
    const {hits,page}= result;

    const oldHits= page !==0
    ? this.state.result.hits
    :[];


    const updatedHits=[
      ...oldHits,
      ...hits
    ]
    this.setState({
      result : { hits:updatedHits, page}
    
    });
  }

  componentDidMount(){
    const {searchTerm}= this.state;
    this.fetchSearchTopStories(searchTerm);
   
  }

  onDismiss(id){


    function isNotId(item){
      return item.objectID !== id;

    }
    const updatedlist= this.state.result.hits.filter(isNotId);

    this.setState({
      result:{...this.state.result, hits:updatedlist}
    
    });
  }

  onSearchChange(event){

    this.setState({searchTerm: event.target.value});

  }

 
  render() {
    const {result,searchTerm,error}= this.state;
    const page= (result && result.page) || 0;
    console.log(error);
    if(error){
      return <p>Something went wrong</p>
    }
    if (!result) {return null;}
    return(
     
        <div className="page">
          <div className="interactions">
              <Search
                value={searchTerm}
                onChange={this.onSearchChange}
                onSubmit={this.onSearchSubmit}
              >
                Search
              </Search>
          </div>
              { error ?   <div className="interactions"> <p>Something went wrong</p></div>
              :<Table
                list={result.hits}
                
                onDismiss={this.onDismiss}
              
              />
              
            }

            <Button onClick={()=>this.fetchSearchTopStories(searchTerm,page +1)}>
            More
            </Button>
          
          

        </div>

    );

  }    

}



const Search=({value, onChange,onSubmit, children})=>
 
      <form  onSubmit={onSubmit}>
        <input
        type="text"
        value={value}
        onChange={onChange}
        />

        <button type="submit">
        {children} 
        </button>
      </form>


const Table=({list,onDismiss}) =>
<div className="table">
    {list.map(item=>
        
      <div key={item.objectID} className="table-row">
      
        
          <span className="largeColumn">
              <a href={item.url}> {item.title} </a>
          </span>
          <span className="midColumn"> 
            {item.author}
          </span>
          <span className="smallColumn">
            {item.num_comments} 
          </span>

          <span className="smallColumn">
          {item.points}
          </span>

          <span>
            <Button 
                onClick={()=>onDismiss(item.objectID)}
                type="button"
                className="button-inline"
            >
                  Dismiss
            </Button>
          </span>
       

      </div>
    )}

</div>


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
