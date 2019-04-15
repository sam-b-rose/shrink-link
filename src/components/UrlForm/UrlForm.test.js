/* eslint-env jest */

import React from 'react'
import { render } from 'react-testing-library'

import UrlForm from '../UrlForm'

describe('UrlForm', () => {
  it('renders the URL label', () => {
    const { getByText } = render(<UrlForm />)
    expect(getByText(/URL/)).not.toBeNull()
  })
})
