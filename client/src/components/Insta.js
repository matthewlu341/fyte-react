import React, { Component } from 'react'
import '../css/Insta.css'
import { InstagramMedia } from 'react-instagram-media'
import {Animated} from "react-animated-css";
import Spinner from 'react-bootstrap/Spinner'
import { AiFillHeart } from "react-icons/ai";
import { MdDateRange } from "react-icons/md";
import { FiExternalLink } from "react-icons/fi";


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
        this.setState({pics: pics, loading:false})
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
                                            <Animated>
                                                <video width="320" height="auto" poster={display_url} controls>
                                                    <source src={video_url} type="video/mp4" />
                                                </video>
                                                <h6>{pic.caption}</h6>
                                                <div className= 'info'>
                                                    <div className = 'iconGroup'>
                                                        <div className='icon' style = {{color: '#db2414'}}>
                                                                <AiFillHeart />
                                                            </div>
                                                        <h6>{pic.likesCount}</h6>
                                                    </div>
                                                    <div className='iconGroup'>
                                                        <div className='icon' style = {{color: '#07b3f7'}}>
                                                                <MdDateRange />
                                                        </div>
                                                        <h6>{new Date(pic.timestamp*1000).toLocaleDateString("en-US")} @ {new Date(pic.timestamp*1000).toLocaleTimeString("en-US")}</h6>
                                                    </div>
                                                    <a rel="noopener noreferrer" target='_blank' href={pic.url}>
                                                    <div style = {{color: 'white'}}>
                                                            <FiExternalLink />
                                                    </div>
                                                </a>
                                                </div>
                                            </Animated>
                                        </div>
                                        )
                                    }
                                    return (
                                        <div className='post'>
                                            <Animated>
                                                <img width="320" height="auto" src={display_url} alt={caption}/>
                                                <h6>{pic.caption}</h6>
                                                <div className= 'info'>
                                                    <div className = 'iconGroup'>
                                                        <div className='icon' style  = {{color: '#db2414'}}>
                                                                <AiFillHeart />
                                                            </div>
                                                        <h6>{pic.likesCount}</h6>
                                                    </div>
                                                    <div className='iconGroup'>
                                                        <div className='icon' style = {{color: '#07b3f7'}}>
                                                                <MdDateRange />
                                                        </div>
                                                        <h6>{new Date(pic.timestamp*1000).toLocaleDateString("en-US")} @ {new Date(pic.timestamp*1000).toLocaleTimeString("en-US")}</h6>
                                                    </div>
                                                    <a rel="noopener noreferrer" target='_blank' href={pic.url}>
                                                    <div style = {{color: 'white'}}>
                                                            <FiExternalLink />
                                                    </div>
                                                </a>
                                                </div>
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
