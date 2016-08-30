import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import * as authActions from 'redux/modules/auth';

@connect(
  state => ({ user: state.auth.user }),
  authActions)
export default class Login extends Component {
  static propTypes = {
    user: PropTypes.object,
    login: PropTypes.func,
    logout: PropTypes.func
  }

  constructor(props) {
    super(props);
    this.state = { username: '' };
  }

  onInputChange = (event) => {
    const username = event.target.value;
    console.log(username);
    this.setState({
      username
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const input = this.state.username;
    this.props.login(input);
  }

  render() {
    const { user, logout } = this.props;
    const styles = require('./Login.scss');

    return (
      <div className={`${styles.loginPage} container`}>
        <Helmet title="Login" />
        <h1>Login</h1>
        {!user &&
          <div>
            <form className="login-form form-inline" onSubmit={this.handleSubmit}>
              <div className="form-group">
                <input
                  type="text"
                  onChange={this.onInputChange}
                  placeholder="Enter a username"
                  className="form-control"
                />
              </div>
              <button className="btn btn-success" onClick={this.handleSubmit}><i className="fa fa-sign-in" />{' '}Log In
              </button>
            </form>
            <p>This will "log you in" as this user, storing the username in the session of the API server.</p>
          </div>
        }
        {user &&
          <div>
            <p>You are currently logged in as {user.name}.</p>

            <div>
              <button className="btn btn-danger" onClick={logout}><i className="fa fa-sign-out" />{' '}Log Out</button>
            </div>
          </div>
        }
      </div>
    );
  }
}
