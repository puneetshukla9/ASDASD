import React from 'react';
import './login.css';
class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: ''
        };
        this.onUserNameChange = this.onUserNameChange.bind(this);
        this.onPasswordChange = this.onPasswordChange.bind(this);
        this.onLoginClick = this.onLoginClick.bind(this);
    }

    onUserNameChange(event) {
        this.setState({
            username: event.target.value
        })
    }

    onPasswordChange(event) {
        this.setState({
            password: event.target.value
        })
    }
    onLoginClick() {
       if (this.state.password === '123456') {
            this.props.history.push('/userDetails', { username: this.state.username });
        }

    }
    render() {
        return (
            <div class="wrapper">
                <form class="form-signin">
                    <h2 class="form-signin-heading">Please login</h2>
                    <input type="text" class="form-control" onChange={this.onUserNameChange} value={this.state.username} name="username" placeholder="User name" required="" autofocus="" />
                    <input type="password" class="form-control" onChange={this.onPasswordChange} value={this.state.password} name="password" placeholder="Password" required="" />

                    <button type="button" onClick={this.onLoginClick} class="btn btn-primary">Login</button>
                </form>
            </div>

        );
    }
}
export default Login