import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';


const DEFAULT_QUERY= 'foo';

const PATH_BASE = 'https://hn.algolia.com/api/v1';
const PATH_SEARCH = '/search';
const PARAM_SEARCH = 'query=';

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
    };

    this.setSearchTopStories=this.setSearchTopStories.bind(this);
    this.onDismiss=this.onDismiss.bind(this);

    this.onSearchChange=this.onSearchChange.bind(this);
  }

  setSearchTopStories(result){
    this.setState({result});
  }

  componentDidMount(){
    const {searchTerm}= this.state;
    fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}`)
      .then(response => response.json())
      .then(result => this.setSearchTopStories(result))
      .catch(error => error);
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
    const {result,searchTerm}= this.state;
    console.log(result);
    if (!result) {return null;}
    return(
     
        <div className="page">
          <div className="interactions">
              <Search
                value={searchTerm}
                onChange={this.onSearchChange}
              >
                Search
              </Search>
              <Table
                list={result.hits}
                pattern={searchTerm}
                onDismiss={this.onDismiss}
              
              />
          </div>
          

        </div>

    );

  }    

}

// class Search extends Component{
//   render(){
//     const{value,onChange,children}=this.props;
//     return(
//         <form>
//           {children}
//           <input
//             type="text"
//             value={value}
//             onChange={onChange}
//           />
//         </form>
//     )
//   }
// }

const Search=({value, onChange, children})=>
 
      <form>
        {children} <input
        type="text"
        value={value}
        onChange={onChange}
        />
      </form>


const Table=({list,pattern,onDismiss}) =>
<div className="table">
    {list.filter(isSearched(pattern)).map(item=>
        
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



// class Table extends Component{
//   render(){
//     const{list,pattern, onDismiss}=this.props;
//     return(
//         <div>
//           {list.filter(isSearched(pattern)).map(item=>
              
//             <div key={item.objectID}>
            
//               <ul>
//                 <li>
//                     <a href={item.url}> {item.title} </a>
//                 </li>
//                 <li>
//                   {item.author}
//                 </li>
//                 <li>
//                   {item.num_comments} 
//                 </li>

//                 <li>
//                 {item.points}
//                 </li>

//                 <li>
//                   <Button 
//                       onClick={()=>onDismiss(item.objectID)}
//                       type="button"
//                   >
//                         Dismiss
//                   </Button>
//                 </li>
//               </ul>
    
//             </div>
//           )}

//         </div>


//     )
//   }
// }

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
