import React, { MouseEvent, ChangeEvent } from 'react'
import isPast from 'date-fns/is_past'
import { UrlResponse } from '~/types/data'

interface Payload {
  data: UrlResponse
}

interface Props {
  selected: UrlResponse
  items: UrlResponse[]
  onRemove: (e: MouseEvent<HTMLButtonElement>, payload: Payload) => void
  onSelect: (e: ChangeEvent<HTMLInputElement>, payload: Payload) => void
}

class UrlHistory extends React.Component<Props> {
  private handleOnClick = (
    e: MouseEvent<HTMLButtonElement>,
    item: UrlResponse
  ): void => {
    this.props.onRemove(e, { data: item })
  }

  private handleOnChange = (
    e: ChangeEvent<HTMLInputElement>,
    item: UrlResponse
  ): void => {
    this.props.onSelect(e, { data: item })
  }

  private renderItem = (item: UrlResponse, index: number): JSX.Element => {
    const { selected } = this.props
    const isExpired = item.expires && isPast(item.expires)
    return (
      <li
        key={item.hash}
        className={`item relative flex ph2 pv2 ${
          selected.hash === item.hash
            ? 'selected bg-blue white'
            : 'hover-bg-near-white'
        }`}
      >
        <label
          htmlFor={`url-${item.hash}`}
          className={`w-75 pr2 truncate pointer ${isExpired && 'strike'}`}
        >
          {item.url}
        </label>
        <span
          className={`h1 w1 center br-100 ${
            isExpired ? 'bg-light-red' : 'bg-light-green'
          }`}
        />
        <button
          className="remove link absolute top-0 right-0 h-100 ph3-l ph2 bn bg-transparent f3 silver pointer"
          tab-index="-1"
          aria-label="Remove link"
          onClick={(e): void => this.handleOnClick(e, item)}
        >
          &times;
        </button>
        <input
          className="dn"
          type="radio"
          id={`url-${item.hash}`}
          name="selectedUrl"
          value={index}
          onChange={(e): void => this.handleOnChange(e, item)}
        />
        <style jsx>{`
          .remove {
            transition: opacity 0.15s ease;
            opacity 0;
          }

          .item:hover > .remove {
            opacity: 1;
          }

          .item.selected:hover > .remove {
            color: var(--near-white);
          }
        `}</style>
      </li>
    )
  }

  public render(): JSX.Element {
    const { items } = this.props
    return (
      <div className="w-100">
        <header className="flex ph2 pv2 bb b--light-gray f6 fw6 ttu gray">
          <div className="w-75">Link</div>
          <div className="flex-auto tc">Status</div>
        </header>
        <ul className="list ma0 pl0">{items.map(this.renderItem)}</ul>
      </div>
    )
  }
}

export default UrlHistory
