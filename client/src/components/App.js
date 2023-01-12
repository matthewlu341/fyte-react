import React from 'react';
import '../css/App.css';
import {Animated} from "react-animated-css";
import Watch from './Watch'
import Bet from './Bet'
import Discover from './Discover'


class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      route: 'landing'
    }
    this.setRoute = this.setRoute.bind(this);
  }
  componentWillMount(){
    fetch('https://fyte-server.onrender.com', {
            method: 'get',
            headers: {'Accept': 'application/json'},
        })
  }

  setRoute(route){
    this.setState({route:route})
  }

  render(){
    if(this.state.route==='watch'){
      return <Watch setRoute={this.setRoute}></Watch>
    }
    if(this.state.route==='bet'){
      return <Bet setRoute={this.setRoute}></Bet>
    }
    if(this.state.route==='discover'){
      return <Discover setRoute={this.setRoute}></Discover>
    }
    return (
      <div className="App">
        <header className="App-header">
          <Animated animationIn="fadeInDownBig">
            <h1 className='logo'>FYTE</h1>
          </Animated>
          <Animated animationIn="fadeInUpBig">
            <ul className="nav">
              <li><button className = 'link' onClick={this.setRoute.bind(this,"watch")}>Read.</button></li>
              <li><button className = 'link' onClick={this.setRoute.bind(this, "bet")}>Bet.</button></li>
              <li><button className = 'link' onClick={this.setRoute.bind(this, "discover")}>Discover.</button></li>
            </ul>
          </Animated>
        </header>
      </div>
    );
  }
}

export default App;
