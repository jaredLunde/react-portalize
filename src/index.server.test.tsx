/**
 * @jest-environment node
 */
import * as React from 'react'
import {renderToStaticMarkup, renderToString} from 'react-dom/server'
import Portalize, {PORTALS} from './index'

const Context = React.createContext({foo: null})

const Component = () => {
  const context = React.useContext(Context)
  return context.foo
}

describe('<Portalize>', () => {
  it('should store portals in the PORTALS constant according to their container', () => {
    const result = renderToString(
      <body>
        <div id="portals" />
        <Portalize container=".portals">
          <div>Hello world</div>
        </Portalize>
      </body>
    )

    expect(Object.values(PORTALS).length).toBe(1)
    expect(PORTALS['.portals'].props.children).toBe('Hello world')
    expect(result).toMatchSnapshot()
    delete PORTALS['.portals']
  })

  it('should work with context', () => {
    const result = renderToString(
      <body>
        <div id="portals" />
        <Portalize
          container=".portals"
          providers={[{provider: Context.Provider, value: {foo: 'bar'}}]}
        >
          <Component />
        </Portalize>
      </body>
    )

    expect(Object.values(PORTALS).length).toBe(1)
    console.log(PORTALS['.portals'].props.children)
    expect(renderToStaticMarkup(PORTALS['.portals'])).toMatchSnapshot()
    expect(result).toMatchSnapshot()
    delete PORTALS['.portals']
  })

  it('should not render on server if server={false}', () => {
    const result = renderToString(
      <body>
        <div id="portals" />
        <Portalize container=".portals" server={false}>
          <div>Hello world</div>
        </Portalize>
      </body>
    )

    expect(Object.values(PORTALS).length).toBe(0)
    expect(result).toMatchSnapshot()
  })
})
