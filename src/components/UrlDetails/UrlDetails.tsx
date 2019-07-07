import React, { ReactNode, MouseEvent } from 'react'
import distanceInWordsToNow from 'date-fns/distance_in_words_to_now'
import isPast from 'date-fns/is_past'
import ClipboardJS from 'clipboard'

import CopySVG from '~/assets/svg/copy.svg'

interface State {
  baseUrl: string
}

interface Props {
  hash?: string
  expires?: string
  passcode?: string
}

interface ClipboardEvent {
  action: string
  text: string
  trigger: HTMLElement
  clearSelection: () => void
}

let clipboard: ClipboardJS | null = null
const tooltipClasses: string[] = [
  'tooltipped',
  'tooltipped-s',
  'tooltipped-no-delay'
]

class UrlDetails extends React.Component<Props, State> {
  public state = {
    baseUrl: ''
  }
  public componentDidMount(): void {
    this.setState({ baseUrl: window.location.href })
    clipboard = new ClipboardJS('.copy')
    if (!clipboard) return
    clipboard.on('success', function(e: ClipboardEvent): void {
      e.trigger.classList.add(...tooltipClasses)
      setTimeout(
        (): void => e.trigger.classList.remove(...tooltipClasses),
        1500
      )
    })
  }
  public componentWillUnmount(): void {
    clipboard.destroy()
  }

  private copyLink = (
    type: string,
    helperText: string,
    link: string
  ): ReactNode => (
    <div className="mb4-l mb3">
      <div className="flex justify-between mb2">
        <span className="f6 fw6 ttu">{type}</span>
        <span className="f7 i">{helperText}</span>
      </div>
      <div className="flex justify-between">
        <a className="link washed-blue" href={link}>
          {link}
        </a>
        <button
          className="copy link bn bg-transparent pointer near-white f6 nowrap"
          aria-label="Copied!"
          onClick={(event: MouseEvent<HTMLButtonElement>): void =>
            //@ts-ignore
            event.target.focus()
          }
          data-clipboard-text={link}
        >
          Copy{' '}
          <span className="ml2">
            <CopySVG />
          </span>
        </button>
      </div>
    </div>
  )

  public render(): JSX.Element | null {
    const { baseUrl } = this.state
    const { hash, expires, passcode } = this.props

    const redirectUrl = `${baseUrl}r/${hash}`
    const frameUrl = `${baseUrl}f/${hash}`
    const isExpired = expires && isPast(expires)

    const expiresLabel = !expires
      ? 'Expires'
      : isExpired
      ? 'Expired'
      : 'Expires in'

    const expiresValue = !expires
      ? '\u2014' // em dash
      : `${distanceInWordsToNow(expires)}${isExpired ? ' ago' : ''}`

    return hash ? (
      <div className="mw6 pl3 f4-l f6 fw3 lh-copy light-gray">
        <div className="mb4-l mb2 pv3 bb b--white-30">
          {this.copyLink('redirect', 'Go directly to link', redirectUrl)}
          {this.copyLink('frame', 'Hide in an iframe', frameUrl)}
        </div>
        <div className="flex pv3-l pv2">
          <div className="w-50">
            <div className="f6 fw6 ttu">{expiresLabel}</div>
            <div>{expiresValue}</div>
          </div>
          <div className="w-50">
            <div className="f6 fw6 ttu">Passcode</div>
            {passcode ? (
              <code className="f6-l f7 fw3 light-gray">{passcode}</code>
            ) : (
              <span>{'\u2014'}</span>
            ) // em dash
            }
          </div>
        </div>
      </div>
    ) : null
  }
}

export default UrlDetails
