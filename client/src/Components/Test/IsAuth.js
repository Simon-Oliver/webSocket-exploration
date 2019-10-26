import React from 'react'

class IsAuth extends React.Component {
    state = {
        isLoggedIn:false
    }

   componentDidMount(){
    fetch('/auth', {
        method: 'POST',
        credentials: 'same-origin',
      }).then(res => res.json()).then(data => console.log(data))
   }

    render(){
        return(
           <div> {this.state.isLoggedIn ? <p>Is Authenticated</p> : <p>Not logged in</p>}</div>
        )
    }
}

export default IsAuth;