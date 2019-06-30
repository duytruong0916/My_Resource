import React, { Component } from 'react'
import UpdatedComponent from './parent'
 class Child1 extends Component {
    render() {
        const {count, countIncrement} = this.props
        return (
            <div>
                <button onClick = {countIncrement}>I have clicked {count} time(s)</button>
            </div>
        )
    }
}

export default UpdatedComponent(Child1);
