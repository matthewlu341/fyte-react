import React, { Component } from 'react'
import '../css/YouTube.css'
import {Animated} from "react-animated-css";
import Spinner from 'react-bootstrap/Spinner'
import Button from 'react-bootstrap/Button'
import { FiArrowUpCircle } from "react-icons/fi";

export default class YouTube extends Component {
    constructor(props){
        super(props);
        this.state = {
            videos: [],
            loading: true
        };
        this.swap = this.swap.bind(this)
    }

    async componentDidMount(){  
        let data = await fetch("https://fyte-server.onrender.com/youtube"),
        vids = await data.json(),
        retVids = [];
        for (let vid of vids){
            retVids.push(`https://www.youtube.com/embed/${vid.snippet.resourceId.videoId}`)
        }
        this.setState({videos:retVids, loading:false})
    }

    swap(i1,i2){
        let tempVids = this.state.videos;
        let link1 = tempVids[i1],
        link2 = tempVids[i2];
        tempVids[i1] = link2;
        tempVids[i2] = link1;
        this.setState({videos: tempVids, loading: false})

    }

    render() {
        return (
            <div>
                <div className='load'>
                    <>{this.state.loading ? <Spinner animation="border" role="status" variant='light'></Spinner> : <div></div>}</>
                </div>
                <Animated>
                    <div class='videos'>
                            <iframe className='primary' title='0' width="70%" height="576" src={this.state.videos[0]} frameBorder="0" allow="accelerometer; autoplay; 
                            encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                            <a rel="noopener noreferrer" target="_blank" href='https://www.youtube.com/user/UFC/videos'><h2>More Videos</h2></a>
                            <hr></hr>
                            <div className='bottom'>
                                <div className='secondary'>
                                    <iframe className='primary' title='1' width="315" height="auto" src={this.state.videos[1]} frameBorder="0" allow="accelerometer; autoplay; 
                                    encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                                    <Button onClick={this.swap.bind(this,0, 1)} variant="success"><FiArrowUpCircle size='2em'></FiArrowUpCircle></Button>{' '}
                               </div>
                               <div className='secondary'>
                                    <iframe className='primary' title='2' width="315" height="auto" src={this.state.videos[2]} frameBorder="0" allow="accelerometer; autoplay; 
                                    encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                                    <Button onClick={this.swap.bind(this,0, 2)} variant="success"><FiArrowUpCircle size='2em'></FiArrowUpCircle></Button>{' '}
                               </div>
                               <div className='secondary'>
                                    <iframe className='primary' title='3' width="315" height="auto" src={this.state.videos[3]} frameBorder="0" allow="accelerometer; autoplay; 
                                    encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                                    <Button onClick={this.swap.bind(this,0, 3)} variant="success"><FiArrowUpCircle size='2em'></FiArrowUpCircle></Button>{' '}
                               </div>
                               <div className='secondary'>
                                    <iframe className='primary' title='4' width="315" height="auto" src={this.state.videos[4]} frameBorder="0" allow="accelerometer; autoplay; 
                                    encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                                    <Button onClick={this.swap.bind(this,0, 4)} variant="success"><FiArrowUpCircle size='2em'></FiArrowUpCircle></Button>{' '}
                               </div>
                            </div>
                    </div>
                </Animated>
            </div>
        )
    }
}
