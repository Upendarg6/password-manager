import {Component} from 'react'

import {v4 as uuidv4} from 'uuid'

import ChildItem from '../ChildComponent'

const colors = ['red', 'green', 'blue', 'orange', 'black']

const bg = Math.ceil(Math.random() * colors.length - 1)

class Login extends Component {
  state = {website: '', name: '', password: '', arr: [], searchElement: ''}

  enterWebsite = event => {
    this.setState({website: event.target.value, show: true})
  }

  changeState = () => {
    this.setState(prevState => ({show: !prevState.show}))
  }

  enterName = event => {
    this.setState({name: event.target.value})
  }

  enterPassword = event => {
    this.setState({password: event.target.value})
  }

  search = event => {
    this.setState({searchElement: event.target.value})
  }

  noPassword = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
        alt="no passwords"
      />
      <p>No Passwords</p>
    </div>
  )

  submitDetails = event => {
    event.preventDefault()
    const {website, name, password} = this.state
    const addNew = {
      id: uuidv4(),
      website,
      name,
      password,
      background: colors[bg],
    }

    this.setState(prevState => ({
      arr: [...prevState.arr, addNew],
      website: '',
      name: '',
      password: '',
    }))
  }

  delPassword = id => {
    const {arr} = this.state
    const result = arr.filter(each => each.id !== id)
    this.setState({arr: result})
  }

  render() {
    const {website, name, password, arr, searchElement, show} = this.state
    const filterList = arr.filter(each =>
      each.name.toLowerCase().includes(searchElement.toLowerCase()),
    )
    return (
      <div>
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
          width="100px"
          height="30px"
          alt="app logo"
        />
        <h1>Add New Password</h1>
        <form onSubmit={this.submitDetails}>
          <label htmlFor="website">
            <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png "
              alt="website"
              id="website"
            />
          </label>
          <input
            type="text"
            placeholder="Enter Website"
            onChange={this.enterWebsite}
            value={website}
          />
          <label htmlFor="username">
            <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png "
              alt="username"
            />
          </label>
          <input
            id="username"
            type="text"
            placeholder="Enter Username"
            onChange={this.enterName}
            value={name}
          />
          <label htmlFor="username">
            <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png  "
              alt="password"
            />
          </label>
          <input
            type="password"
            onChange={this.enterPassword}
            placeholder="Enter Password"
            value={password}
          />
          <button type="submit">Add</button>
        </form>
        <div>
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
            alt="password manager"
            width="350px"
            height="350px"
          />
          <div>
            <h1>
              Your Passwords <p>{arr.length}</p>
            </h1>
          </div>

          <div className="search-con">
            <input type="search" value={searchElement} onChange={this.search} />
          </div>
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
            alt="search"
            width="50px"
            height="50px"
          />
          <div>
            <input type="checkbox" id="chb" onClick={this.changeState} />
            <label htmlFor="chb">Show passwords</label>
          </div>
        </div>
        <div>
          {arr.length === 0 ? (
            this.noPassword()
          ) : (
            <ul>
              {filterList.map(each => (
                <ChildItem
                  key={each.id}
                  details={each}
                  delPassword={this.delPassword}
                  show={show}
                />
              ))}
            </ul>
          )}
        </div>
      </div>
    )
  }
}

export default Login
