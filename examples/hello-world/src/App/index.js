import React from 'react'
// 🌟 LOOK AT ME 🌟
import Portalize from 'react-portalize'


export default class App extends React.PureComponent {
  state = {name: null}

  render () {
    return (
      <div>
        {/** // 🌟 LOOK AT ME 🌟 */}
        <div id='portals'/>
        <div className='portals'/>
        <div className='portals'/>
        <section></section>
        <div data-portalize="why not"></div>

        Hello world

        {/** // 🌟 LOOK AT ME 🌟 */}
        <Portalize>
          Hello from above
        </Portalize>

        <Portalize container='.portals'>
          Hello twice
        </Portalize>

        <Portalize container='section'>
          Hello section
        </Portalize>

        <Portalize container='div[data-portalize="why not"]'>
          Hello div[data-portalize="why not"]
        </Portalize>
      </div>
    )
  }
}
