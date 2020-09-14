import React, { Component } from 'react';
import axios from 'axios';

import './FullPost.css';

class FullPost extends Component {
    // will manage the loaded post
    state = {
        loadedPost: null
    }

    // make the HTTP request here
    componentDidUpdate () {
        // don't want to do this if the id is null, so must check this
        // only run this if the id is not null
        // so in other words, we have an id, only run if this is true
        if ( this.props.id ) {
            // only do this if we are clicking on a new post
            // otherwise it will run and run in an infinite loop
            // first check to see if we already loaded a post
            // so this.state.loadedPost is true
            // and make sure it's not the same id as a post we already have
            // loaded (do we have a loaded post? then to check to make sure
            // the ids are different
            // Lesson 166
            if ( !this.state.loadedPost || (this.state.loadedPost && this.state.loadedPost.id !== this.props.id) ) {
                axios.get( 'https://jsonplaceholder.typicode.com/posts/' + this.props.id )
                    .then( response => {
                        // console.log(response);
                        // set the loadedPost in the state
                        // to the post and it's data which 
                        // we fetched from the backend
                        this.setState( { loadedPost: response.data } );
                    } );
            }
        }
    }

    render () {
        let post = <p style={{ textAlign: 'center' }}>Please select a Post!</p>;
        if ( this.props.id ) {
            post = <p style={{ textAlign: 'center' }}>Loading...!</p>;
        }
        // this will run when we have a loaded post because loadedPost
        // will only be set to true once we have fetched the data from
        // the server
        // before when it was id, it would throw an error because we 
        // we had the id from the server, but the data had not been 
        // loaded yet because we don't wait in JS for everything to
        // execute (in this case, waiting for an HTTP request for data
        // to finish) before we load the rest of the page
        // so we only want this to run when we have all that data loaded
        if ( this.state.loadedPost ) {
            post = (
                <div className="FullPost">
                    <h1>{this.state.loadedPost.title}</h1>
                    <p>{this.state.loadedPost.content}</p>
                    <div className="Edit">
                        <button className="Delete">Delete</button>
                    </div>
                </div>

            );
        }
        return post;
    }
}

export default FullPost;