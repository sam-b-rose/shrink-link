/* eslint-env jest */

import React from 'react'
import { render } from 'react-testing-library'

import UrlForm from '../UrlForm'

describe('UrlForm', () => {
  it('shows the URL label', () => {
    const { getByText } = render(<UrlForm />)
    expect(getByText(/URL/i)).not.toBeNull()
  })
})
