import React from 'react'
import isPast from 'date-fns/is_past'

import {
  Icon,
  StructuredListWrapper,
  StructuredListHead,
  StructuredListBody,
  StructuredListRow,
  StructuredListCell,
  StructuredListInput
} from 'carbon-components-react'

import {
  iconCheckmarkSolid,
  iconCloseSolid
} from 'carbon-icons';

class UrlHistory extends React.Component {
  onChange = (e, item) => {
    this.props.onSelect(e, { data: item })
  }
  renderItem = (item) => {
    const isExpired = isPast(item.expires)
    return (
      <StructuredListRow label htmlFor={`url-${item.s}`} key={item.s}>
        <StructuredListCell noWrap>
          <span className={isExpired ? 'strike' : ''}>{ item.url }</span>
        </StructuredListCell>
        <StructuredListCell style={{ textAlign: 'center' }}>
          <Icon
            icon={isExpired ? iconCloseSolid : iconCheckmarkSolid}
            fill={`var(--support-${isExpired ? '01' : '02'}`}/>
        </StructuredListCell>
        <StructuredListInput
          id={`url-${item.s}`}
          value={`url-${item.s}`}
          title={`url-${item.s}`}
          name="url-history"
          onChange={(e) => this.onChange(e, item)} />
      </StructuredListRow>
    )
  }
  render() {
    const { items } = this.props
    return (
      <div>
        <StructuredListWrapper selection border>
          <StructuredListHead>
            <StructuredListRow head>
              <StructuredListCell head>URL</StructuredListCell>
              <StructuredListCell
                head
                style={{ textAlign: 'center' }}>
                Status
              </StructuredListCell>
            </StructuredListRow>
          </StructuredListHead>
          <StructuredListBody>
            { items.map(this.renderItem) }
          </StructuredListBody>
        </StructuredListWrapper>
      </div>
    )
  }
}

export default UrlHistory
