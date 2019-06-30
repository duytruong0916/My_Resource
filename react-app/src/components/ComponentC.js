import React, { Component } from 'react'
import {UserConsumer} from './Usercontext'
export class ComponentC extends Component {
    render() {
        return (
            <UserConsumer>
                {
                    username => {
                        return <div> {username}</div>
                    }
                }
            </UserConsumer>
        )
    }
}

export default ComponentC
