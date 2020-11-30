import React, {Component} from "react";
class Feed extends React.Component {
  constructor(props){
    super(props);
    this.state = {

    }


  }
  componentDidMount(){

  }



  render(){
    return (
      <div className="feed">
          {this.props.data.map((hit,index)=>{
              return(
                  <div className="hit">
                    <div className="hitHeader" key={index}>
                        <h1>{hit.title}</h1>
                        <div>
                            <h2>Posted on: {(hit.created_at).substring(0,10)}</h2>
                            <h2>By: {hit.author}</h2>
                        </div>
                    </div>
                    <div className="hitBody">
                    <div id="hitTextContent">
                        <p>{hit.story_text}</p>
                    </div>
                    <a href={hit.url}>Original Post</a>

                    </div>
                  </div>
              )
          })}
      </div>
    );
  }
}

export default Feed;
