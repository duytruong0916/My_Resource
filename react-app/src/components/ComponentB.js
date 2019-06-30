import React, { Component } from 'react'
import ComponentC from './ComponentC'
export class ComponentB extends Component {
    render() {
        return (
            <div>
                <ComponentC/>
            </div>
        )
    }
}

export default ComponentB
