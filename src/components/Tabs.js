import React from 'react'

export default class Tabs extends React.Component {
  onClick = (e, index) => {
    e.preventDefault()
    this.props.onSelect(e, index)
  }
  tabItem = (item, index) => {
    const isSelected = index === this.props.selected
    return (
      <li key={index} className={`mr2 ${isSelected && 'bb bw1 b--blue blue'}`}>
        <button className={`link ph2 pv2 bn bg-transparent silver pointer ${isSelected && 'blue'}`} onClick={(e) => this.onClick(e, index)}>{item}</button>
      </li>
    )
  }
  render() {
    const { items } = this.props
    return (
      <ul className="flex list mb5 pl0">
        { items.map(this.tabItem) }
      </ul>
    )
  }
}
