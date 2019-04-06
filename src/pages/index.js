import React from 'react'

import {
  UrlDetails,
  UrlForm,
  UrlHistory
} from '~/containers/Url'

import Tabs from '~/components/Tabs'
import LinkSVG from '~/assets/images/link.svg'

const MAX_HISTORY = 25
const URL_HISTORY = 'url-history'
const tabItems = [
  'Create',
  'History'
]
class IndexPage extends React.Component {
  state = {
    selectedTab: 0,
    history: [],
    details: {
      hash: '',
      expires: ''
    }
  }
  componentDidMount() {
    const history = this.readStorage()
    this.setState({ history })
  }
  onSubmit = (newUrl) => {
    this.setState(
      ({ history }) => ({ details: newUrl, history: [newUrl, ...history]}),
      this.setStorage
    )
  }
  onSelectTab = (e, index) => {
    this.setState({
      selectedTab: index
    })
  }
  onSelectHistory = (e, payload) => {
    const url = payload.data
    this.setState({ details: url })
  }
  onRemoveLink = (e, payload) => {
    const removedLink = payload.data
    const history = this.state.history.filter(item => item.s !== removedLink.s)
    this.setState({ history }, this.setStorage)
  }
  readStorage = () => {
    const data = localStorage.getItem(URL_HISTORY)
    return data ? JSON.parse(data).slice(0, MAX_HISTORY) : []
  }
  setStorage = () => {
    const { history } = this.state
    localStorage.setItem(
      URL_HISTORY,
      JSON.stringify(history.slice(0, MAX_HISTORY))
    )
  }
  render() {
    const { selectedTab, details, history } = this.state
    return (
      <div className="h-100">
        <div className="flex h-100">
          <div className="relative flex w-60 h-100 bg-blue">
            <div className="w-100 mw7 center pt6">
              <div className="mb4">
                <div className="mb4 f1 fw6 near-white">
                  <LinkSVG className="mr2" style={{ transform: 'translateY(0.25rem)' }}/>
                  ShrinkL<span className="fw3">.ink</span>
                </div>
                {
                  details.hash
                    ? <UrlDetails {...details} />
                    : (
                      <div className="mw6 pl3 f4 fw3 lh-copy light-gray">
                        <p className="mb2">
                          Shink down that absurdly long link. Add an optional duration time to limit how long your link will work.
                        </p>
                        <p>
                          You can also add a passcode to protect who can use your link.
                        </p>
                      </div>
                    )
                }
              </div>
            </div>
            <svg
              className="absolute top-0 right--1"
              height="100%"
              viewBox="0 0 136 900"
              preserveAspectRatio="none"
              xmlns="http://www.w3.org/2000/svg">
              <path d="M128 0v900H65.622s91.401-211.2 0-450c-91.402-238.8 0-450 0-450H128z" fill="var(--white)" filter="url(#filter0_d)"/><defs><filter id="filter0_d" x=".999" y="-16" width="135.001" height="932" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB"><feFlood floodOpacity="0" result="BackgroundImageFix"/><feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/><feOffset dx="-8"/><feGaussianBlur stdDeviation="8"/><feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0"/><feBlend in2="BackgroundImageFix" result="effect1_dropShadow"/><feBlend in="SourceGraphic" in2="effect1_dropShadow" result="shape"/></filter></defs>
            </svg>
          </div>
          <div className="flex w-40 h-100 overflow-auto z-1 bg-white">
            <div className="w-100 mw6 center pt6">
              <Tabs selected={selectedTab} items={tabItems} onSelect={this.onSelectTab}/>
              {
                selectedTab === 0
                  ? <UrlForm onSubmit={this.onSubmit}/>
                  : <UrlHistory
                      items={history}
                      selected={details}
                      onRemove={this.onRemoveLink}
                      onSelect={this.onSelectHistory}/>
              }
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default IndexPage
