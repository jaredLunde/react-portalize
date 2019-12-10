/* jest */
import * as React from 'react'
import {render} from '@testing-library/react'
import Portalize, {PORTALS} from './index'

describe('<Portalize>', () => {
  it('should render into #portals by default', () => {
    const portalRoot = document.createElement('div')
    portalRoot.setAttribute('id', 'portals')
    document.body.appendChild(portalRoot)

    const result = render(
      <Portalize>
        <div>Hello world</div>
      </Portalize>
    )

    expect(result.baseElement).toMatchSnapshot()
    expect(Object.values(PORTALS).length).toBe(0)
    document.body.removeChild(portalRoot)
  })

  it('should render into a portal by custom selector', () => {
    const portalRoot = document.createElement('div')
    portalRoot.setAttribute('class', 'portals')
    document.body.appendChild(portalRoot)

    const result = render(
      <Portalize container=".portals">
        <div>Hello world</div>
      </Portalize>
    )

    expect(result.baseElement).toMatchSnapshot()
    expect(Object.values(PORTALS).length).toBe(0)
    document.body.removeChild(portalRoot)
  })

  it('should not render into a non-existent selector', () => {
    const portalRoot = document.createElement('div')
    portalRoot.setAttribute('class', 'blah')
    document.body.appendChild(portalRoot)

    const result = render(
      <Portalize container=".portals">
        <div>Hello world</div>
      </Portalize>
    )

    expect(result.baseElement).toMatchSnapshot()
    document.body.removeChild(portalRoot)
  })
})
