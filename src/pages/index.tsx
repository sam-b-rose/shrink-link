import React from 'react'
import Notification from '~/components/Notification'
import UrlDetails from '~/components/UrlDetails'
import UrlForm from '~/components/UrlForm'
import UrlHistory from '~/components/UrlHistory'
import Tabs from '~/components/Tabs'
import LinkSVG from '~/assets/svg/link.svg'
import { deleteUrl } from '~/services/api'
import { UrlResponse, NotificationData } from '~/types/data'

const MAX_HISTORY = 25
const URL_HISTORY = 'url-history'
const tabItems = ['Create', 'History']

interface State {
  notificationTimeout?: number
  showNotification: boolean
  notification: NotificationData
  selectedTab: number
  history: UrlResponse[]
  details: UrlResponse | null
}

class IndexPage extends React.Component<{}, State> {
  public initialState: State = {
    showNotification: false,
    notification: {},
    selectedTab: 0,
    history: [],
    details: {
      url: '',
      hash: '',
      expires: '',
      passcode: ''
    }
  }

  public state: State = {
    ...this.initialState
  }

  public componentDidMount(): void {
    const history = this.readStorage()
    //@ts-ignore
    this.setState({ history })
  }

  private onSubmit = (data: UrlResponse): void => {
    const hasErrorMessage = Boolean(data.message)
    let notification: NotificationData = {
      type: hasErrorMessage ? 'error' : 'success',
      message: hasErrorMessage ? data.message : 'Your link has been shrunk!'
    }
    this.setState((prevState: State): State => {
      const details = hasErrorMessage ? null : data
      const history = hasErrorMessage
        ? prevState.history
        : [data, ...prevState.history]
      return {
        ...prevState,
        details,
        history,
        notification,
        showNotification: true,
        notificationTimeout: +setTimeout(
          (): void => this.onDismissNotification(),
          3000
        )
      }
    }, this.setStorage)
  }
  private onSelectTab = (
    _: React.SyntheticEvent<Element, Event>,
    index: number
  ): void => {
    this.setState({
      selectedTab: index
    })
  }

  private onSelectHistory = (_, payload: { data: UrlResponse }): void => {
    const url = payload.data
    this.setState({ details: url })
  }

  private onRemoveLink = async (
    _,
    payload: { data: UrlResponse }
  ): Promise<void> => {
    const removedLink = payload.data
    const history = this.state.history.filter(
      (item): boolean => item.hash !== removedLink.hash
    )
    const { message } = await deleteUrl(removedLink)
    const hasErrorMessage = message === undefined
    this.setState({ history }, this.setStorage)
    let notification: NotificationData = {
      type: hasErrorMessage ? 'error' : 'success',
      message: hasErrorMessage
        ? 'Failed to delete your link.'
        : 'Your link has been deleted!'
    }
    this.setState({
      history,
      notification,
      showNotification: true,
      notificationTimeout: +setTimeout(
        (): void => this.onDismissNotification(),
        3000
      )
    })
  }

  private onDismissNotification = (): void => {
    this.setState(
      ({
        notificationTimeout
      }: Pick<State, 'notificationTimeout'>): Pick<
        State,
        'showNotification' | 'notificationTimeout'
      > => ({
        showNotification: false,
        //@ts-ignore
        notificationTimeout: clearTimeout(notificationTimeout)
      })
    )
  }

  private readStorage = (): object[] => {
    const data = localStorage.getItem(URL_HISTORY)
    return data ? JSON.parse(data).slice(0, MAX_HISTORY) : []
  }

  private setStorage = (): void => {
    const { history } = this.state
    localStorage.setItem(
      URL_HISTORY,
      JSON.stringify(history.slice(0, MAX_HISTORY))
    )
  }

  public render(): JSX.Element {
    const {
      selectedTab,
      details,
      history,
      notification,
      showNotification
    } = this.state
    return (
      <div className="h-100">
        <div className="flex flex-column flex-row-l h-100 overflow-hidden-l overflow-auto">
          <div className="relative flex-none flex w-60-l h-100-l bg-blue">
            <div className="w-100 measure center mb4 pt6-l pa4-l pa3">
              <div className="mb4-l">
                <div className="flex items-center mb4-l f1-l f3 fw6 near-white">
                  <LinkSVG className="mr2" />
                  ShrinkL<span className="fw3">.ink</span>
                </div>
                {details && details.hash ? (
                  <UrlDetails {...details} />
                ) : (
                  <div className="mw6 pl3 f4-l f5 fw3 lh-copy light-gray">
                    <p className="mb2 pt2">
                      Shink down that absurdly long link. Add an optional
                      duration time to limit how long your link will work.
                    </p>
                    <p>
                      You can also add a passcode to protect who can use your
                      link.
                    </p>
                  </div>
                )}
              </div>
            </div>
            <svg
              className="db-l dn absolute top-0 right--1"
              height="100%"
              width="15vw"
              viewBox="0 0 136 900"
              preserveAspectRatio="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ maxWidth: '160px' }}
            >
              <path
                d="M128 0v900H65.622s91.401-211.2 0-450c-91.402-238.8 0-450 0-450H128z"
                fill="var(--white)"
                filter="url(#wave-v)"
              />
              <defs>
                <filter
                  id="wave-v"
                  x=".999"
                  y="-16"
                  width="135.001"
                  height="932"
                  filterUnits="userSpaceOnUse"
                  colorInterpolationFilters="sRGB"
                >
                  <feFlood floodOpacity="0" result="BackgroundImageFix" />
                  <feColorMatrix
                    in="SourceAlpha"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                  />
                  <feOffset dx="-8" />
                  <feGaussianBlur stdDeviation="8" />
                  <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0" />
                  <feBlend
                    in2="BackgroundImageFix"
                    result="effect1_dropShadow"
                  />
                  <feBlend
                    in="SourceGraphic"
                    in2="effect1_dropShadow"
                    result="shape"
                  />
                </filter>
              </defs>
            </svg>
            <svg
              className="dn-l absolute bottom--1"
              width="100%"
              height="60"
              viewBox="0 0 375 53"
              preserveAspectRatio="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M375 52.5H0V22.924s88 33.578 187.5 0c99.5-33.579 187.5 0 187.5 0V52.5z"
                fill="var(--white)"
                filter="url(#wave-h)"
              />
              <defs>
                <filter
                  id="wave-h"
                  x="-4"
                  y="0"
                  width="383"
                  height="52.5"
                  filterUnits="userSpaceOnUse"
                  colorInterpolationFilters="sRGB"
                >
                  <feFlood floodOpacity="0" result="BackgroundImageFix" />
                  <feColorMatrix
                    in="SourceAlpha"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                  />
                  <feOffset dy="-4" />
                  <feGaussianBlur stdDeviation="2" />
                  <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                  <feBlend
                    in2="BackgroundImageFix"
                    result="effect1_dropShadow"
                  />
                  <feBlend
                    in="SourceGraphic"
                    in2="effect1_dropShadow"
                    result="shape"
                  />
                </filter>
              </defs>
            </svg>
          </div>
          <div className="flex flex-none w-40-l h-100-l overflow-auto-l z-1 bg-white">
            <div className="relative w-100 measure center pt6-l pa4 db-l dn">
              <Notification
                className="absolute top-0 left-0 right-0 mt5 mh4"
                type={notification.type}
                active={showNotification}
                onDismiss={this.onDismissNotification}
              >
                {notification.message}
              </Notification>
              <Tabs
                selected={selectedTab}
                items={tabItems}
                onSelect={this.onSelectTab}
              />
              {selectedTab === 0 ? (
                <UrlForm onSubmit={this.onSubmit} />
              ) : (
                <UrlHistory
                  items={history}
                  selected={details}
                  onRemove={this.onRemoveLink}
                  onSelect={this.onSelectHistory}
                />
              )}
            </div>
            <div className="w-100 measure center pa3 mb4 dn-l">
              <Notification
                className="absolute top-1 left-1 right-1 measure center"
                type={notification.type}
                active={showNotification}
                onDismiss={this.onDismissNotification}
              >
                {notification.message}
              </Notification>
              <div className="mb5">
                <h2>Create</h2>
                <UrlForm onSubmit={this.onSubmit} />
              </div>
              <div className="mb4">
                <h2>History</h2>
                <UrlHistory
                  items={history}
                  selected={details}
                  onRemove={this.onRemoveLink}
                  onSelect={this.onSelectHistory}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default IndexPage
