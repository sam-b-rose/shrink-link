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
    const history = this.state.history.filter(item => item.hash !== removedLink.hash)
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
        <div className="flex flex-column flex-row-l h-100 overflow-hidden-l overflow-auto">
          <div className="relative flex w-60-l h-100-l bg-blue">
            <div className="w-100 measure center mb4 pt6-l pa4-l pa3">
              <div className="mb4-l">
                <div className="flex items-center mb4-l f1-l f3 fw6 near-white">
                  <LinkSVG className="mr2" />
                  ShrinkL<span className="fw3">.ink</span>
                </div>
                {
                  details.hash
                    ? <UrlDetails {...details} />
                    : (
                      <div className="mw6 pl3 f4-l f5 fw3 lh-copy light-gray">
                        <p className="mb2 pt2">
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
              className="db-l dn absolute top-0 right--1"
              height="100%"
              width="10vw"
              viewBox="0 0 136 900"
              preserveAspectRatio="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ maxWidth: '120px' }}>
              <path d="M128 0v900H65.622s91.401-211.2 0-450c-91.402-238.8 0-450 0-450H128z" fill="var(--white)" filter="url(#wave-v)"/><defs><filter id="wave-v" x=".999" y="-16" width="135.001" height="932" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB"><feFlood floodOpacity="0" result="BackgroundImageFix"/><feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/><feOffset dx="-8"/><feGaussianBlur stdDeviation="8"/><feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0"/><feBlend in2="BackgroundImageFix" result="effect1_dropShadow"/><feBlend in="SourceGraphic" in2="effect1_dropShadow" result="shape"/></filter></defs>
            </svg>
            <svg
              className="dn-l absolute bottom--1"
              width="100%"
              height="53"
              viewBox="0 0 375 53"
              preserveAspectRatio="none"
              xmlns="http://www.w3.org/2000/svg">
              <path d="M375 52.5H0V22.924s88 33.578 187.5 0c99.5-33.579 187.5 0 187.5 0V52.5z" fill="var(--white)" filter="url(#wave-h)"/><defs><filter id="wave-h" x="-4" y="0" width="383" height="52.5" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB"><feFlood floodOpacity="0" result="BackgroundImageFix"/><feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/><feOffset dy="-4"/><feGaussianBlur stdDeviation="2"/><feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/><feBlend in2="BackgroundImageFix" result="effect1_dropShadow"/><feBlend in="SourceGraphic" in2="effect1_dropShadow" result="shape"/></filter></defs>
            </svg>
          </div>
          <div className="flex w-40-l h-100-l overflow-auto-l z-1 bg-white">
            <div className="w-100 measure center pt6-l pa4 db-l dn">
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
            <div className="w-100 measure center pa3 mb4 dn-l">
              <div className="mb5">
                <h2>Create</h2>
                <UrlForm onSubmit={this.onSubmit}/>
              </div>
              <div className="mb4">
                <h2>History</h2>
                <UrlHistory
                  items={history}
                  selected={details}
                  onRemove={this.onRemoveLink}
                  onSelect={this.onSelectHistory}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default IndexPage
