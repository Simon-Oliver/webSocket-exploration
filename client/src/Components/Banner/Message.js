import React from 'react'

class Message extends React.Component{

    render(){
        return(
            <h1>{this.props.message}</h1>
        )
    }
}

export default Message