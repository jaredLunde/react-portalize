import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'


/**
<Portalize container='#portals'>
  <div>Inject me</div>
</Portalize>
*/
export const PORTALS = {}

export default class Portalize extends React.Component {
  static propTypes = {
    container: PropTypes.string.isRequired,
    providers: PropTypes.arrayOf(
      PropTypes.shape({
        provider: PropTypes.any,
        value: PropTypes.any
      })
    ),
    server: PropTypes.bool.isRequired
  }

  static defaultProps = {
    container: '#portals',
    server: true
  }

  nodes = null

  render () {
    this.nodes =
      typeof document !== 'undefined' && document.querySelectorAll(this.props.container)

    if (this.nodes === false) {
      let {children, server, providers} = this.props

      if (server === false) {
        return null
      }

      if (providers !== void 0 && providers.length > 0) {
        children = providers.reduceRight(
          (children, {provider, value}) =>
            React.createElement(provider, {children, value}),
          children
        )
      }

      PORTALS[this.props.container] = children
      return null
    }
    else if (this.nodes.length === 0) {
      return null
    }
    else {
      const portals = []

      for (let i = 0; i < this.nodes.length; i++) {
        portals.push(ReactDOM.createPortal(this.props.children, this.nodes[i]))
      }

      return portals
    }
  }
}
