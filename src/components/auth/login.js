import React from 'react'
import axios from 'axios'

import Auth from '../../lib/Auth'

class Login extends React.Component {

  constructor() {
    super()
    this.state = {
      formData: {},
      error: ''
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(e) {
    const formData = { ...this.state.formData, [e.target.name]: e.target.value }
    this.setState({ formData, error: '' })
  }

  handleSubmit(e) {
    e.preventDefault()

    axios.post('/api/login', this.state.formData)
      .then(res => {
        Auth.setToken(res.data.token, res.data.message) // store the token in localStorage
        this.props.history.push(`/users/${Auth.getPayload().sub}`) // redirect to the user SHOW page
      })
      .catch(() => {
        Auth.removeToken() // remove the token from localStorage
        this.setState({ error: 'Invalid token' }) // display an error
      })

  }

  render() {
    return (
      <section className="section">
        <div className="container">
          <div className="column is-center-object is-6-desktop is-9-tablet is-11-mobile">
            <div className="box">
              <form onSubmit={this.handleSubmit}>
                <div className="field">
                  <label className="label">Email</label>
                  <div className="control">
                    <input
                      className="input"
                      type="email"
                      name="email"
                      placeholder="eg: leela3000@planetexpress.co.nny"
                      onChange={this.handleChange}
                    />
                  </div>
                </div>
                <div className="field">
                  <label className="label">Password</label>
                  <div className="control">
                    <input
                      className="input"
                      type="password"
                      name="password"
                      placeholder="eg: ••••••••"
                      onChange={this.handleChange}
                    />
                  </div>
                  {this.state.error && <small className="help is-danger">{this.state.error}</small>}
                </div>
                <div className="column is-center-text">
                  <button className="button is-primary">Submit</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    )
  }
}

export default Login
