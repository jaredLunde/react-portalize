import React from 'react'
import ReactDOMServer from 'react-dom/server'
import createRenderer, {getScripts} from '@jaredlunde/example-server/react/createRenderer'
// 🌟 LOOK AT ME 🌟
import {renderPortalsToString} from 'react-portalize/server'
import App from '../App'


export default createRenderer({
  render: ({clientStats}) => async (req, res, next) => {
    try {
      // 🌟 LOOK AT ME 🌟
      const page = renderPortalsToString(
        ReactDOMServer.renderToString(<App/>)
      )

      res.set('Content-Type', 'text/html').send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <title>Hello world app</title>
          <meta charset="utf-8">
          <meta
            name="viewport"
            content="width=device-width, user-scalable=yes, initial-scale=1.0"
          >
          ${getScripts(clientStats)}
        </head>
        <body>
          <div id="⚛️">${page}</div>
        </body>
        </html>
      `)
    }
    catch (err) {
      console.log(err)
      res.send(`
        <center>
          <pre style='max-width: 400px;word-wrap: break-word;white-space: pre-wrap;text-align:left;'>${err}</pre>
        </center>
      `)
    }
  }
})
