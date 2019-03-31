import React from 'react'
import isPast from 'date-fns/is_past'

class UrlHistory extends React.Component {
  onRemove = (e, item) => {
    this.props.onRemove(e, { data: item })
  }
  onChange = (e, item, ) => {
    this.props.onSelect(e, { data: item })
  }
  renderItem = (item, index) => {
    const { selected } = this.props
    const isExpired = isPast(item.expires)
    return (
      <li
        key={item.s}
        className={`item relative flex ph2 pv2 ${selected.s === item.s ? 'selected bg-blue white' : 'hover-bg-near-white'}`}>
        <label
          htmlFor={`url-${item.s}`}
          className={`w-75 pr2 truncate pointer ${isExpired && 'strike'}`}>
          { item.url }
        </label>
        <span className={`h1 w1 center br-100 ${isExpired ? 'bg-light-red' : 'bg-light-green'}`} />
        <button
          className="remove link absolute top-0 right-0 h-100 ph3 bn bg-transparent f3 silver pointer"
          aria-label="Remove link"
          onClick={(e) => this.onRemove(e, item, index)}>
          &times;
        </button>
        <input
          className="dn"
          type="radio"
          id={`url-${item.s}`}
          name="selectedUrl"
          value={index}
          onChange={(e) => this.onChange(e, item, index)}/>
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
  render() {
    const { items } = this.props
    return (
      <div className="w-100">
        <header className="flex ph2 pv2 bb b--light-gray f6 fw6 ttu gray">
          <div className="w-75">Link</div>
          <div className="flex-auto tc">Status</div>
        </header>
        <ul className="list ma0 pl0" htmlFor="selectedUrl">
          { items.map(this.renderItem) }
        </ul>
      </div>
    )
  }
}

export default UrlHistory
