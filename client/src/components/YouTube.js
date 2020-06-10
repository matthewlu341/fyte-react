import React, { Component } from 'react'
import { gapi } from 'gapi-script';
import '../css/YouTube.css'
import {Animated} from "react-animated-css";

export default class YouTube extends Component {
    constructor(props){
        super(props);
        this.state = {
            videos: []
        };
        this.loadClient = this.loadClient.bind(this);
        this.execute = this.execute.bind(this)
    }

    componentDidMount(){   
        gapi.load("client:auth2", function() {
            gapi.auth2.init({client_id: "199095257382-1u0md22q8iac7qb53fmpn1dpoapu379k.apps.googleusercontent.com"});
            }); 
        this.loadClient().then(this.execute).then((array) => {
            for (let i=0; i < array.length; i++){
                array[i] = `https://www.youtube.com/embed/${array[i]}`;
            }
            this.setState({videos: array})
        });        
    }

    loadClient(){
        gapi.client.setApiKey("AIzaSyAcjzKG1wnMMZgESYzlQlln7pb3QiAHdnI");
        return gapi.client.load("https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest")
        .then(function() { console.log("GAPI client loaded for API"); },
        function(err) { console.error("Error loading GAPI client for API", err); });
    }

    execute(){
        return gapi.client.youtube.playlistItems.list({
            "part": [
                "snippet"
            ],
            "playlistId": "UUvgfXK4nTYKudb0rFR6noLA"
            })
                .then(function(response, array=[]) {
                        let videos = response.result.items;
                        for (let video of videos){
                            let id = video.snippet.resourceId.videoId;
                            array.push(id)
                        }
                        return array;
                    },
                    function(err) { console.error("Execute error", err);});
    }

    render() {
        return (
            <Animated animationIn='fadeInLeft'>
                <div class='videos'>
                        <iframe className='primary' title='0' width="560" height="315" src={this.state.videos[0]} frameBorder="0" allow="accelerometer; autoplay; 
                        encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                        <div className='bottom'>
                        <iframe className='primary' title='0' width="315" height="auto" src={this.state.videos[1]} frameBorder="0" allow="accelerometer; autoplay; 
                        encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                        <iframe className='primary' title='0' width="315" height="auto" src={this.state.videos[2]} frameBorder="0" allow="accelerometer; autoplay; 
                        encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                        <iframe className='primary' title='0' width="315" height="auto" src={this.state.videos[3]} frameBorder="0" allow="accelerometer; autoplay; 
                        encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                        <iframe className='primary' title='0' width="315" height="auto" src={this.state.videos[4]} frameBorder="0" allow="accelerometer; autoplay; 
                        encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                        </div>
                </div>
            </Animated>
        )
    }
}
