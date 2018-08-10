import React from 'react'
import { shallow } from 'enzyme'
import Dashboard from '../presentational/Dashboard'

// test if dashboard page load without any errors.
it('renders dashboard page', () => {
    const wrapper = shallow(
        <Dashboard />
    )
    expect(wrapper.contains('Dashboard')).toEqual(true)
})