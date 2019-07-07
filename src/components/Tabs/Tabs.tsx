import React, { SyntheticEvent, ReactNode } from 'react'

interface Props {
  items: string[]
  selected: number
  onSelect: (e: SyntheticEvent, index: number) => void
}

export default class Tabs extends React.Component<Props> {
  public handleOnClick = (e: SyntheticEvent, index: number): void => {
    e.preventDefault()
    this.props.onSelect(e, index)
  }
  public tabItem = (item: string, index: number): ReactNode => {
    const isSelected = index === this.props.selected
    return (
      <li key={index} className={`mr2 ${isSelected && 'bb bw1 b--blue blue'}`}>
        <button
          type="button"
          className={`link ph2 pv2 bn bg-transparent silver hover-dark-blue pointer ${
            isSelected ? 'blue' : ''
          }`}
          onClick={(e): void => this.handleOnClick(e, index)}
        >
          {item}
        </button>
      </li>
    )
  }
  public render(): ReactNode {
    const { items } = this.props
    return <ul className="flex list mb4 pl0">{items.map(this.tabItem)}</ul>
  }
}
