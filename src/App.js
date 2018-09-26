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
      results: null,
      searchKey: '',
      searchTerm: DEFAULT_QUERY,
      error:null,
      isLoading: false,
    };

    this.setSearchTopStories=this.setSearchTopStories.bind(this);
    this.onDismiss=this.onDismiss.bind(this);

    this.onSearchChange=this.onSearchChange.bind(this);


    this.onSearchSubmit=this.onSearchSubmit.bind(this);

    this.fetchSearchTopStories= this.fetchSearchTopStories.bind(this);

    this.needsToSearchTopStories = this.needsToSearchTopStories.bind(this);
  }

  //metodo de clase reusable

  fetchSearchTopStories(searchTerm,page=0){
    this.setState({isLoading: true});
    fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}&${PARAM_PAGE}${page}`)
    .then(response => response.json())
    .then(result => this.setSearchTopStories(result))
    .catch(error => this.setState({error}));

  }


  onSearchSubmit(event){
    const {searchTerm}= this.state;
    this.setState({ searchKey: searchTerm });
    this.fetchSearchTopStories(searchTerm);

    if (this.needsToSearchTopStories(searchTerm)) {
      this.fetchSearchTopStories(searchTerm);
    }
    event.preventDefault();
  }

  setSearchTopStories(result){
    const {hits,page}= result;

    const { searchKey, results } = this.state;


    const oldHits = results && results[searchKey]
    ? results[searchKey].hits
    : [];


    const updatedHits=[
      ...oldHits,
      ...hits
    ]
    this.setState({
     results: {
              ...results,
              [searchKey]: { hits: updatedHits, page }
    },
    isLoading:false
    
    });
  }

  needsToSearchTopStories(searchTerm) {
    return !this.state.results[searchTerm];
    }

  componentDidMount(){
    const {searchTerm}= this.state;
    this.setState({ searchKey: searchTerm });
    
    this.fetchSearchTopStories(searchTerm);
   

    if(this.input){
      this.input.focus();
    }
  }

  onDismiss(id){

    const { searchKey, results } = this.state;
    const { hits, page } = results[searchKey];
    // function isNotId(item){
    //   return item.objectID !== id;

    // }

    const isNotId= item =>item.objectID !== id;

    const updatedHits = hits.filter(isNotId);
      this.setState({
            results: {
              ...results,
              [searchKey]: { hits: updatedHits, page }
            }
            
      });
    }

  onSearchChange(event){

    this.setState({searchTerm: event.target.value});

  }

 
  render() {
    const {
      searchTerm,
      results,
      searchKey,
      error,
      isLoading
      } = this.state;
      const page = (
        results &&
        results[searchKey] &&
        results[searchKey].page
        ) || 0;


    const list = (
          results &&
          results[searchKey] &&
          results[searchKey].hits
    ) || [];

      let llave= Math.random(); 
    

    
    
    return(
     
        <div className="page">
          <div className="interactions">

                { isLoading
                  ? <Loading />
                  : <p>Information fetched</p>
              
                }



              <Search
                value={searchTerm}
                onChange={this.onSearchChange}
                onSubmit={this.onSearchSubmit}
              >
                Search
              </Search>
          </div>
              { error ?   <div className="interactions"> <p>Something went wrong charging the data</p></div>
              :<Table
                  list={list}
                  onDismiss={this.onDismiss}
              
              />
              
            }

            <Button onClick={()=>this.fetchSearchTopStories(searchKey,page +1)}>
            More
            </Button>
          
          

        </div>

    );

  }    

}

const Loading=()=>
      <div>Loading...</div>



class Search extends Component{

  render(){
    const{value, onChange,onSubmit, children}= this.props
  

        return(
                <form  onSubmit={onSubmit}>
                <input
                type="text"
                value={value}
                onChange={onChange}
                ref={(node)=>{this.input=node;}}
                />

                <button type="submit">
                {children} 
                </button>
              </form>
              );
  }
}
// const Search=({value, onChange,onSubmit, children})=>
 
      // <form  onSubmit={onSubmit}>
      //   <input
      //   type="text"
      //   value={value}
      //   onChange={onChange}
      //   />

      //   <button type="submit">
      //   {children} 
      //   </button>
      // </form>


const Table=({list,onDismiss}) =>
<div className="table">
    {list.map(item=>
        
      <div key={Math.random()}  className="table-row">
      
        
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
