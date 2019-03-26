import React from 'react'

import {
  UrlForm,
  UrlHistory,
  UrlDetails
} from '~/containers/Url'

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
      <div className="h-100">
        <div className="flex h-100">
          <div className="h-100 w-50">
            <div className="pv5 ph5">
              <UrlForm onSubmit={this.onSubmit}/>
            </div>
          </div>
          <div className="flex justify-center w-50 h-100 overflow-auto">
            <div className="pa5">
              <div className="mb4">
                <UrlDetails {...details} />
              </div>
              <div className="mb6">
                <UrlHistory items={history} onSelect={this.onSelectHistory}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default IndexPage
