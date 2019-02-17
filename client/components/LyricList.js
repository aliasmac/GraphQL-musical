import React, { Component } from "react";
import gql from 'graphql-tag'
import {graphql} from 'react-apollo'

class LyricList extends Component {

  onLike(id, likes) {  
    this.props.mutate({
      variables: {id},
      optimisticResponse: { // the following {} is what is returned from server dev tools > network, essentially we duplicate that code to optmistically render
        __typename: 'Mutation',
        likeLyric: {
          id: id,
          __typename: 'LyricType',
          likes: likes + 1
        }
      }
    })
  }

  renderLyrics() {
    return this.props.lyrics.map(({id, content, likes}) => {
      return (
        <li key={id} className="collection-item">
          {content}
          <div className="vote-box">
            <i 
              onClick={() => this.onLike(id, likes)}
              className="material-icons">thumb_up
            </i>
            {likes}
          </div>
        </li>
      )
    })
  }

  render() {
    console.log(this.props.lyrics)
    return (
      <ul className="collection">
        {this.renderLyrics()}
      </ul>
    );
  }
}

const mutation = gql`
  mutation LikeLyric($id: ID) {
    likeLyric(id: $id) {
      id
      content
      likes
    }
  }
`
export default graphql(mutation)(LyricList);

