import React from 'react'
import axios from 'axios'

import Auth from '../../lib/Auth'
import Select from 'react-select'
import ReactFilestack from 'filestack-react'

const tools = {
  accept: 'image/*',
  transformations: {
    rotate: true,
    crop: true,
    circle: true
  }
}
const favfoods = [
  { value: 'Burger', label: 'Burger' },
  { value: 'Beer', label: 'Beer' },
  { value: 'Steak', label: 'Steak' },
  { value: 'Pizza', label: 'Pizza' },
  { value: 'Icecream', label: 'Icecream' },
  { value: 'Desserts', label: 'Desserts' },
  { value: 'Noodles', label: 'Noodles' },
  { value: 'Wine', label: 'Wine' },
  { value: 'Gin', label: 'Gin' },
  { value: 'Sushi', label: 'Sushi' },
  { value: 'chocolate', label: 'chocolate' },
  { value: 'Juice', label: 'Juice' },
  { value: 'Smoothie', label: 'Smoothie' }
]
class UserEdit extends React.Component {


  constructor(props) {
    super(props)

    this.state = {
      data: {},
      errors: {}
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleArrayChange = this.handleArrayChange.bind(this)
    this.handleFavFoodChange = this.handleFavFoodChange.bind(this)
    this.handleUploadedImages = this.handleUploadedImages.bind(this)
  }



  componentDidMount() {
    axios.get(`api/users/${this.props.match.params.id}`)
      .then(res => this.setState({ data: res.data }))
  }

  handleSubmit(e) {
    e.preventDefault()

    axios.put(`/api/users/${this.props.match.params.id}`, this.state.data, {
      headers: { Authorization: `Bearer ${Auth.getToken()}`}
    })
      .then(() => this.props.history.push(`/users/${this.props.match.params.id}`))
      .catch(err => this.setState({ errors: err.response.data.errors }))
  }

  handleChange(e) {
    const data = { ...this.state.data, [e.target.name]: e.target.value }
    this.setState({ data })
  }

  handleArrayChange(e) {
    const data = { ...this.state.data, [e.target.name]: e.target.value.split(',') }
    this.setState({ data })
  }

  handleFavFoodChange(selectedFavFoods, fooddata) {
    const data = { ...this.state.data, [fooddata.name]: selectedFavFoods.map(option => option.value) }
    this.setState({ data })
  }


  handleUploadedImages(result) {
    const data = { ...this.state.data, img: result.filesUploaded[0].url }
    this.setState({ data })
  }

  render() {
    const selectedFavFood = (this.state.data.favfood || []).map(food => ({label: food, value: food}))
    return (
      <section className="section">
        <div className="container">







          <div className="column">
            <div className="box">
              <form onSubmit={this.handleSubmit}>
                <label className="label is-center-text">Editing my account</label>
                <div className="columns">
                  <div className="column is-center-object is-6-desktop is-8-tablet is-12-mobile">
                    <div className="box">
                      <div className="field">
                        <label className="label is-center-text">Username</label>
                        <input
                          className="input is-center-text"
                          type="text"
                          name="username"
                          value={this.state.data.username || ''}
                          placeholder="eg. superman..."
                          onChange={this.handleChange}
                        />
                        {this.state.errors.name && <small className="help is-danger">{this.state.errors.name}</small>}
                      </div>
                      <div className="field">
                        <figure className="image is-center-text">
                          {this.state.data.img && <img className="image is-center-object is-rounded is-128x128 is-user-image" src={this.state.data.img} />}
                          <ReactFilestack
                            className="user-image"
                            apikey="A8sWHIqsSAqLSlJAAfZLgz"
                            componentDisplayMode={
                              {
                                type: 'button',
                                customText: 'Update your Photo',
                                customClass: 'button is-success'
                              }
                            }
                            actionOptions={tools}
                            onSuccess={this.handleUploadedImages}
                          />
                          {this.state.imageMessage && <div className="help is-info is-medium">{this.state.imageMessage}</div>}
                        </figure>
                      </div>
                    </div>
                  </div>
                </div>








                <div className="columns">
                  <div className="column is-6-desktop is-6-tablet is-12-mobile">
                    <div className="box">
                      <div className="field">
                        <label className="label">Name</label>
                        <input
                          className="input"
                          type="text"
                          name="name"
                          value={this.state.data.name || ''}
                          placeholder="eg. Paul..."
                          onChange={this.handleChange}
                        />
                      </div>
                      <div className="field">
                        <label className="label">Last Name</label>
                        <input
                          className="input"
                          type="text"
                          name="lastname"
                          value={this.state.data.lastname || ''}
                          placeholder="eg. Smith..."
                          onChange={this.handleChange}
                        />
                      </div>
                    </div>
                  </div>





                  <div className="column is-6-desktop is-6-tablet is-12-mobile">
                    <div className="box">
                      <div className="field">
                        <label className="label">Email</label>
                        <input
                          className="input"
                          type="text"
                          name="email"
                          value={this.state.data.email || ''}
                          placeholder="eg. abc@example.com"
                          onChange={this.handleChange}
                        />
                      </div>
                      <div className="field">
                        <label className="label">Mobile</label>
                        <input
                          className="input"
                          type="text"
                          name="mobile"
                          value={this.state.data.mobile || ''}
                          placeholder="eg. +449993333222"
                          onChange={this.handleChange}
                        />
                      </div>
                    </div>
                  </div>
                </div>


                <div className="columns">
                  <div className="column is-center-object is-6-desktop is-8-tablet is-12-mobile">
                    <div className="box">
                      <div className="field">
                        <label className="label">Country</label>
                        <input
                          className="input"
                          type="text"
                          name="country"
                          value={this.state.data.country || ''}
                          placeholder="eg. France"
                          onChange={this.handleChange}
                        />
                      </div>
                      <div className="field">
                        <label className="label">City</label>
                        <input
                          className="input"
                          type="text"
                          name="city"
                          value={this.state.data.city || ''}
                          placeholder="eg. Paris"
                          onChange={this.handleChange}
                        />
                      </div>
                    </div>
                  </div>
                </div>




                <div className="columns">
                  <div className="column is-6-desktop is-6-tablet is-12-mobile ">
                    <div className="box">
                      <div className="field">
                        <label className="label">About you</label>
                        <div className="control">
                          <input
                            className="input"
                            type="text"
                            name="bio"
                            value={this.state.data.bio || ''}
                            placeholder="eg. I enjoy when I spent time with my friends..."
                            onChange={this.handleChange}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="column is-6-desktop is-6-tablet is-12-mobile">
                    <div className="box">
                      <div className="field">
                        <label className="label">Favorite Food</label>
                        <Select
                          name="favfood"
                          options={favfoods}
                          value={selectedFavFood}
                          isMulti
                          onChange={this.handleFavFoodChange}
                        />
                        {this.state.errors.favfood && <small className="help is-danger">{this.state.errors.favfood}</small>}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="level-item">
                  <button className="button is-info submit-edit-button">Submit Changes</button>
                </div>
              </form>
            </div>
          </div>

        </div>
      </section>
    )
  }
}



export default UserEdit
