import React, { Component } from 'react'
import '../css/Insta.css'
import { InstagramMedia } from 'react-instagram-media'
import {Animated} from "react-animated-css";
import Spinner from 'react-bootstrap/Spinner'

export default class Instagram extends Component {
    constructor(props){
        super(props);
        this.state={
            pics: [],
            loading: true
        }
        this.getPics = this.getPics.bind(this)
    }
    async componentWillMount(){
        let data = await this.getPics(),
        pics = data.posts;
        this.setState({pics: pics, loading:false});
    }
    getPics(){
        const userInstagram = require("user-instagram");

        return userInstagram("ufc")
            .then(data => {return data})
            . catch(console.error);
    }
    render() {
        return (
            <div>
                <div className='load'>
                    <>{this.state.loading ? <Spinner animation="border" role="status" variant='light'></Spinner> : <div></div>}</>
                </div>
                <div className='ig'>
                    {
                        this.state.pics.map((pic) => {
                          return <InstagramMedia
                                    uri={pic.url}
                                
                                renderItem={
                                    ({ display_url, video_url, type, caption }) => {
                                    if (type === 'video') {
                                        return (
                                        <div className='post'>
                                            <Animated animationIn='fadeInLeft'>
                                                <video width="320" height="auto" poster={display_url} controls>
                                                    <source src={video_url} type="video/mp4" />
                                                </video>
                                                <h6>{pic.caption}</h6>
                                            </Animated>
                                        </div>
                                        )
                                    }
                                    return (
                                        <div className='post'>
                                            <Animated animationIn='fadeInLeft'>
                                                <img width="320" height="auto"
                                                src={display_url}
                                                alt={caption}
                                                />
                                                <h6>{pic.caption}</h6>
                                            </Animated>
                                        </div>
                                    )
                                    }
                                    }
                                /> 
                        })
                    }       
                </div>
                </div>
        )
    }
}
