import React from 'react'
import isPast from 'date-fns/is_past'

class UrlHistory extends React.Component {
  onChange = (e, item) => {
    this.props.onSelect(e, { data: item })
  }
  renderItem = (item) => {
    const isExpired = isPast(item.expires)
    return (
      <div htmlFor={`url-${item.s}`} key={item.s}>
        <div>
          <span className={isExpired ? 'strike' : ''}>{ item.url }</span>
        </div>
        <div style={{ textAlign: 'center' }}>
          <span
            icon={isExpired ? 'closeSolid' : 'checkmarkSolid'}
            fill={`var(--support-${isExpired ? '01' : '02'}`}/>
        </div>
        <input
          id={`url-${item.s}`}
          value={`url-${item.s}`}
          title={`url-${item.s}`}
          name="url-history"
          onChange={(e) => this.onChange(e, item)} />
      </div>
    )
  }
  render() {
    const { items } = this.props
    return (
      <div>
        <div>
          <div>
            <div>
              <div>URL</div>
              <div
                style={{ textAlign: 'center' }}>
                Status
              </div>
            </div>
          </div>
          <div>
            { items.map(this.renderItem) }
          </div>
        </div>
      </div>
    )
  }
}

export default UrlHistory
