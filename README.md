# Portalize
A component for injecting elements into React Portals via DOM selectors. You may
optionally choose to render your portals on the server side as well :)


### Installation
```yarn add react-portalize``` or ```npm i react-portalize```

## Basic Usage
```js
import Portalize from 'react-portalize'


// renders 'Hello' into <div id='portals'/>
<Portalize container='#portals'>
  Hello
</Portalize>

// renders 'Hello' into all instances of <div class='portals'/>
<Portalize container='.portals'>
  Hello
</Portalize>

// renders 'Hello' into all instances of <section/>
<Portalize container='section'>
  Hello
</Portalize>

// renders 'Hello' into all instances of <div data-portalize="why not"/>
<Portalize container='div[data-portalize="why not"]'>
  Hello
</Portalize>
```

## Examples
**[Hello world](examples/hello-world)**
**[Hello world w/ Context](examples/hello-world-context)**

____

## react-portalize
```js
<Portalize
  container={string}
  children={React.Component}
  providers={Array}
  server={boolean}
/>
```
- `container <string>`
  - The DOM selector you'd like to render your children into
  - **default** `#portals`

- `children <React.Component>`
  - Anything React can render

- `server <boolean>`
  - If you want to skip rendering this component on the server side you can do
    so with the `server={false}` flag
    - **default** `true`

- `providers <Array[Object<{provider, value}>]>`
  - Critically, this component will not work with portals that utilize context
    out of the box. This is because the children are never rendered into the
    virtual DOM tree on the server side. This hacky approach fixes that problem
    by creating your portals with `<Provider value={}/>` components wrapped
    around them. The providers supplied in the array are reduced from the
    right, so `[a, b, c]` renders as `<a><b><c/></b></a>`. You can check out
    an example **[here](examples/hello-world-context)**.
    ```js
    <Portalize providers={[{provider: YourProvider, value: YourProviderValue}]}>
      <YourConsumer>
        {value => JSON.stringify(value)}
      </YourConsumer>
    </Portalize>
    ```

## react-portalize/server
### `renderPortalsToString(html <string>)`
  - Injects portals created within your App into their respective containers.
    You can provide either your entire `<!DOCTYPE html>` string here or
    alternatively just the React root generated by
    `ReactDOMServer.renderToString()`.

## Server side rendering
### Example with React root as the entry point
```js
import {renderPortalsToString} from 'react-portalize/server'

function serverRenderer req, res, next() {
  const page = renderPortalsToString(
    ReactDOMServer.renderToString(<App/>)
  )

  res.set('Content-Type', 'text/html').send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <title>Hello world app</title>
    </head>
    <body>
      <div id="⚛️">${page}</div>
    </body>
    </html>
  `)
}
```

### Example with HTML root as the entry point
```js
import {renderPortalsToString} from 'react-portalize/server'

function serverRenderer (req, res, next) {
  const page = ReactDOMServer.renderToString(<App/>)

  res.set('Content-Type', 'text/html').send(
    renderPortalsToString(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <title>Hello world app</title>
      </head>
      <body>
        <div id="⚛️">${page}</div>
      </body>
      </html>
    `)
  )
}
```

## Note
You will receive a warning message in the console from `ReactDOM.hydrate()` in
"development" akin to `Did not expect server HTML to contain the text node "Hello" in <div>.`.
This is because `ReactDOM.hydrate()` does not expect your portals to be rendered
into the App. You can safely ignore this warning.

## Future
- `renderPortalsToNodeStream()`
