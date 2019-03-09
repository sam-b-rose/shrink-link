/* eslint-env jest */

import React from 'react'
import { render } from 'react-testing-library'

import IndexPage from '../index'

describe('Home page', () => {
  it('shows the contents of the Form', () => {
    const { getByText } = render(<IndexPage />)
    expect(getByText(/URL/i)).not.toBeNull()
  })
})

