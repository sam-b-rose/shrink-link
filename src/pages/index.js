import React from 'react'

import {
  Tile
} from 'carbon-components-react'

import {
  UrlForm,
  UrlHistory,
  UrlDetails
} from '../components/Url'

import '../static/styles.scss'

const MAX_HISTORY = 25
const URL_HISTORY = 'url-history'
class IndexPage extends React.Component {
  state = {
    history: [],
    details: {
      s: '',
      expires: ''
    }
  }
  componentDidMount() {
    if(!localStorage.getItem(URL_HISTORY)) {
      this.populateStorage();
    } else {
      this.setHistory();
    }
  }
  onSubmit = (newUrl) => {
    this.setState(
      ({ history }) => (
        { details: newUrl, history: [newUrl, ...history]}
      ),
      this.populateStorage
    )
  }
  onSelectHistory = (e, payload) => {
    const url = payload.data
    this.setState({ details: url })
  }
  populateStorage = () => {
    const { history } = this.state
    localStorage.setItem(
      URL_HISTORY,
      JSON.stringify(history.slice(0, MAX_HISTORY))
    )
  }
  setHistory = () => {
    const data = localStorage.getItem(URL_HISTORY)
    const history = JSON.parse(data).slice(0, MAX_HISTORY)
    this.setState({ history })
  }
  render() {
    const { history, details } = this.state
    return (
      <div className="bx--grid--full-width h-100">
        <div className="bx--row h-100">
          <div
            className="h-100"
            style={{backgroundColor: 'var(--ui-02)'}}>
            <div className="pv5 ph5">
              <UrlForm onSubmit={this.onSubmit}/>
            </div>
          </div>
          <div className="bx--col flex justify-center h-100 overflow-auto">
            <div className="pa5">
              <Tile className="mb4">
                <UrlDetails {...details} />
              </Tile>
              <Tile className="mb6">
                <UrlHistory items={history} onSelect={this.onSelectHistory}/>
              </Tile>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default IndexPage
