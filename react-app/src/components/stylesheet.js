import React, { Component } from 'react'
import './style.css';
export class Stylesheet  extends Component {
    constructor(props) {
        super(props)
        this.state = {
             name: 'F1'
        }
        this.inputRef = React.createRef();
    }
    StyleFocus(){
        this.inputRef.current.focus();
    }
    render() {
        return (
             <div>
                 <label>Name</label>
                 <input type= 'text' ref ={this.inputRef}></input>
             </div>
        )
    }
}

export default Stylesheet
