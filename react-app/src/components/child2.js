import React, { Component } from 'react'
export class Child2 extends Component {
    render() {
        const {count, countIncrement} = this.props
        return (
            <div>
                <button onClick = {countIncrement}>I have clicked {count} time(s)</button>
            </div>
        )
        
    }
}

export default Child2
