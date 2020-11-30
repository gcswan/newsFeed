import logo from './logo.svg';
import './App.css';
import React, {Component} from "react";
import $ from "jquery";
import Feed from "./components/feed";
class App extends React.Component {
  constructor(){
    super();
    this.state = {
      searchBy:"story",
      keywords:"",
      created_at:"",
      hits:[],
      active:false
    }
  }

  componentDidMount(){
    this.getData("http://hn.algolia.com/api/v1/search?tags=front_page")
  }

  frontPage(){
    this.getData("http://hn.algolia.com/api/v1/search?tags=front_page");
  }

  request(request){
    if(request.tags=="author_"){
      let url="http://hn.algolia.com/api/v1/search?tags="+request.tags+request.query;
      this.getData(url);
    }else{
      let url="http://hn.algolia.com/api/v1/search?query="+request.query+"&tags="+request.tags;
      this.getData(url);
    }

  }

  getData(url){
    $.ajax({
      type:"GET",
      url: url,
      success:(response) =>{
           console.log(response);
           if(response.hits.length >0){
            this.setState({active:true});
           }else{
            this.setState({active:false});

           }
           this.setState({hits:response.hits})
      },
      error:(response)=>{
          console.log("error:");
          console.log(response);
      }
    }
    )
  }

  render(){
    return (
      <div className="App">
        <header>
          <button onClick={()=>{this.frontPage()}}>Front Page</button>
          <form onSubmit={(e)=>{e.preventDefault(); this.request({query:this.state.keywords, tags:this.state.searchBy})}}>
            <select value={this.state.searchBy} onChange={(e)=>{this.setState({searchBy:e.target.value})}}>
                <option value="story">Story</option>
                <option value="poll">Poll</option>
                <option value="author_">Author</option>
            </select>
            <input type="search" placeholder="search" value={this.state.keywords} onChange={(e)=>{this.setState({keywords:e.target.value})}}></input>
            <input type="submit"></input>
          </form>
        </header>
        {this.state.active ?
        (
          <Feed data={this.state.hits}></Feed>
        ):(<div>No Posts Found</div>)}
      </div>
    );
  }
}

export default App;
