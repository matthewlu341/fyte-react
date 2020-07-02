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
            this.setState({[color]:'#28a745'})
        } else{
            this.setState({[color]:'white'})
        } 
    }
    changeColorAfterSelect(color){ 
        this.setState({[color]: "#28a745"})
    }
    setSelected(selected, notSelected, notSelectedColor, index, fighter){
        if(this.state[selected]){
            this.props.selectFunction(fighter,index, true)
            this.setState({[selected]:false})
        } else{
            this.props.selectFunction(fighter,index, false)
            this.setState({[selected]:true, [notSelected]:false, [notSelectedColor]: "white"})
        }
    }
    render() {
        return (
            <div>
                <div className='line'>
                    {
                        this.props.picks===null ? 
                        <h2 id='leftFighter' onClick={this.setSelected.bind(this, 'f1selected', 'f2selected', 'f2color', this.props.index, this.props.name1)} 
                        onMouseEnter={this.state.f1selected ? this.changeColorAfterSelect.bind(this, 'f1color') : this.changeColor.bind(this, 'f1color')} 
                        onMouseLeave={this.state.f1selected ? this.changeColorAfterSelect.bind(this, 'f1color') : this.changeColor.bind(this, 'f1color')}
                        style={{color: this.state.f1color}} 
                        className='fighter'>{this.props.name1}</h2>
                        :
                        (this.props.picks.includes(this.props.name1)?
                        <h2 id='leftFighter' style={{color:'#28a745'}}>{this.props.name1}</h2>
                        :
                        <h2 id='leftFighter' style={{color:'white'}}>{this.props.name1}</h2>
                        )

                    }
                    {
                        this.props.picks===null ? 
                        <h2 id='rightFighter' onClick={this.setSelected.bind(this, 'f2selected', 'f1selected', 'f1color', this.props.index, this.props.name2)} 
                        onMouseEnter={this.state.f2selected ? this.changeColorAfterSelect.bind(this, 'f2color') : this.changeColor.bind(this, 'f2color')}
                        onMouseLeave={this.state.f2selected ? this.changeColorAfterSelect.bind(this, 'f2color') : this.changeColor.bind(this, 'f2color')}
                        style={{color: this.state.f2color}} 
                        className='fighter'>{this.props.name2}</h2>
                        :
                        (this.props.picks.includes(this.props.name2)?
                        <h2 id='rightFighter' style={{color:'#28a745'}}>{this.props.name2}</h2>
                        :
                        <h2 id='rightFighter' style={{color:'white'}}>{this.props.name2}</h2>
                        )
                    }
                </div>
                <div className='spacer'></div>
            </div>
        )
    }
}
