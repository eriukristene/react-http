import React, { Component } from 'react';
import axios from 'axios';

import Post from '../../components/Post/Post';
import FullPost from '../../components/FullPost/FullPost';
import NewPost from '../../components/NewPost/NewPost';
import './Blog.css';

class Blog extends Component {
    state = {
        posts: [],
        selectedPostId: null
    }

    componentDidMount () {
        axios.get( 'https://jsonplaceholder.typicode.com/posts' )
            .then( response => {
                // only fetch and store first 4 posts in posts const
                const posts = response.data.slice(0, 4);
                // for each post
                // want to return a JS object
                // where we distribute the property of the post
                // so the properties from the server basically
                // and add a new author property 
                const updatedPosts = posts.map(post => {
                    return {
                        ...post,
                        author: 'Max'
                    }
                });
                // data from the server then is shortened and transformed
                // because we added the author field
                // to show that we can work with the data 
                // before setting it to the state
                this.setState({posts: updatedPosts});
                // console.log( response );
            } );
    }

    // get the id of the post that was selected when clicked on
    postSelectedHandler = (id) => {
        this.setState({selectedPostId: id});
    }

    render () {
        // returns a new array which is stored in the posts constant
        // grabbed from the state
        // getting individual post as an input we are passing to the map() method
        // then return JSX element, a single post
        const posts = this.state.posts.map(post => {
            return <Post 
                key={post.id} 
                title={post.title} 
                author={post.author}
                clicked={() => this.postSelectedHandler(post.id)} />;
        });

        return (
            <div>
                <section className="Posts">
                    {posts}
                </section>
                <section>
                    <FullPost id={this.state.selectedPostId} />
                </section>
                <section>
                    <NewPost />
                </section>
            </div>
        );
    }
}

export default Blog;