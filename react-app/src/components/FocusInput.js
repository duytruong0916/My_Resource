import React, { Component } from 'react';
import Stylesheet from './stylesheet';
export class FocusInput extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
        this.focusInput = React.createRef()
    }
    clickHandler = () => {
        this.focusInput.current.StyleFocus()
    }
    render() {
        return (
            <div>
                <Stylesheet ref={this.focusInput}/>
                <button onClick ={this.clickHandler}>Focus input</button>
            </div>
        )
    }
}

export default FocusInput
