import React, { Component } from 'react'
import '../css/Fight.css'

export default class Fight extends Component {
    constructor(props){
        super(props)
        this.state={
            f1color: 'white',
            f2color: 'white',
            f1selected: false,
            f2selected: false,
            selected: []
        }
        this.changeColor = this.changeColor.bind(this);
        this.changeColorAfterSelect = this.changeColorAfterSelect.bind(this);
        this.setSelected = this.setSelected.bind(this)
    }
    changeColor(color){ //initial state
        if(this.state[color]==='white'){
            this.setState({[color]:'green'})
        } else{
            this.setState({[color]:'white'})
        } 
    }
    changeColorAfterSelect(color){ 
        this.setState({[color]: "green"})
    }
    setSelected(selected, notSelected, notSelectedColor){
        if(this.state[selected]){
            this.setState({[selected]:false})
        } else{
            this.setState({[selected]:true, [notSelected]:false, [notSelectedColor]: "white"})
        }
    }
    render() {
        return (
            <div>
                <h2 className='line'>
                    <h2 onClick={this.setSelected.bind(this, 'f1selected', 'f2selected', 'f2color')} 
                    onMouseEnter={this.state.f1selected ? this.changeColorAfterSelect.bind(this, 'f1color') : this.changeColor.bind(this, 'f1color')} 
                    onMouseLeave={this.state.f1selected ? this.changeColorAfterSelect.bind(this, 'f1color') : this.changeColor.bind(this, 'f1color')}
                    style={{color: this.state.f1color}} 
                    className='fighter'>{this.props.name1}</h2> vs <h2 
                    onClick={this.setSelected.bind(this, 'f2selected', 'f1selected', 'f1color')} 
                    onMouseEnter={this.state.f2selected ? this.changeColorAfterSelect.bind(this, 'f2color') : this.changeColor.bind(this, 'f2color')}
                    onMouseLeave={this.state.f2selected ? this.changeColorAfterSelect.bind(this, 'f2color') : this.changeColor.bind(this, 'f2color')}
                    style={{color: this.state.f2color}} 
                    className='fighter'>{this.props.name2}</h2> at {this.props.division} 
                </h2>
                <div className='spacer'></div>
            </div>
        )
    }
}
