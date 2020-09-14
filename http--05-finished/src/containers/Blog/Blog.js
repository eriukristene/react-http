import React, { Component } from 'react';
// import axios from 'axios';
// set to our axios instance from our file
import axios from '../../axios';
import './Blog.css';
import Post from '../../components/Post/Post';
import FullPost from '../../components/FullPost/FullPost';
import asyncComponent from '../../hoc/asyncComponent';
// only want to load this if they choose a new post
// otherwise it is being loaded for no reason, that's not efficient
//import NewPost from '../../components/NewPost/NewPost';

// here we can dynamically load NewPost only if we need to, with lazy loading
// only load it if the user clicks on it
// need to pass a function to it, use an anonymous function here
// NB! will use this below instead of NewPost route
// this version of the file uses a different way of rendering NewPost
// using routing, and this project does not use routing
// so this will not work in this version of the project
const AsyncNewPost = asyncComponent(() => {
    // dynamic import - whatever is between the () is only imported
    // when that function is executed
    // function here will only execute when AsyncNewPost is rendered
    // only executed when the const AsyncNewPost is executed somewhere
    return import('../../components/NewPost/NewPost'); 
});


class Blog extends Component {
    state = {
        posts: [],
        selectedPostId: null,
        error: false
    }

    componentDidMount () {
        axios.get( '/posts' )
            .then( response => {
                const posts = response.data.slice(0, 4);
                const updatedPosts = posts.map(post => {
                    return {
                        ...post,
                        author: 'Max'
                    }
                });
                this.setState({posts: updatedPosts});
                // console.log( response );
            } )
            .catch(error => {
                // console.log(error);
                this.setState({error: true});
            });
    }

    postSelectedHandler = (id) => {
        this.setState({selectedPostId: id});
    }

    render () {
        let posts = <p style={{textAlign: 'center'}}>Something went wrong!</p>;
        if (!this.state.error) {
            posts = this.state.posts.map(post => {
                return <Post 
                    key={post.id} 
                    title={post.title} 
                    author={post.author}
                    clicked={() => this.postSelectedHandler(post.id)} />;
            });
        }

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