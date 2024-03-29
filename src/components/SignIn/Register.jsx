import React from 'react'

class Register extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            name: ''
        }
    }
    
    
    onNameChange = (event) => {
        this.setState({name:event.target.value})
    }
    
    onEmailChange = (event) => {
        this.setState({email:event.target.value})
    }
    
    onPasswordChange = (event) => {
        this.setState({password:event.target.value})
    }


    onSubmitRegister = () => {
        fetch('https://face-recognition-backend-me54.onrender.com/register',{
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                name: this.state.name,
                email: this.state.email,
                pwd: this.state.password
            })
        })
        .then(response => response.json())
        .then(user => {
            if (user.id) {
                this.props.loadUser(user)
                this.props.onRouteChange('home')
            }
        })
        
    }

    
    render() {
        return (
            <div className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw5 center shadow-5">
                <div
                    action="sign-up_submit"
                    method="get"
                    acceptCharset="utf-8"
                >
                    <fieldset
                    id="sign_up"
                    className="ba b--transparent ph0 mh0"
                    >
                        <legend className="f4 fw6 ph0 mh0 center">Register</legend>
                        <div className="mt3">
                            <label
                            className="db fw4 lh-copy f6"
                            htmlFor="name"
                            >
                            Name
                            </label>
                            <input
                            className="pa2 input-reset ba bg-transparent w-100 measure"
                            type="text"
                            name="name"
                            id="name"
                            onChange={this.onNameChange}
                            />
                        </div>
                        <div className="mt3">
                            <label
                            className="db fw4 lh-copy f6"
                            htmlFor="email-address"
                            >
                            Email address
                            </label>
                            <input
                            className="pa2 input-reset ba bg-transparent w-100 measure"
                            type="email"
                            name="email-address"
                            id="email-address"
                            onChange={this.onEmailChange}
                            />
                        </div>
                        <div className="mt3">
                            <label
                            className="db fw4 lh-copy f6"
                            htmlFor="password"
                            >
                            Password
                            </label>
                            <input
                            className="b pa2 input-reset ba bg-transparent"
                            type="password"
                            name="password"
                            id="password"
                            onChange={this.onPasswordChange}
                            />
                        </div>
                    </fieldset>
                    <div className="mt3">
                        <input
                        className="b center ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6"
                        type="submit"
                        value="Register"
                        onClick={this.onSubmitRegister}
                        />
                    </div>
                </div>
            </div>
        )
    }
 
}

export default Register