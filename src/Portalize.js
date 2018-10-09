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
    container: PropTypes.string.isRequired
  }

  static defaultProps = {
    container: '#portals'
  }

  nodes = null

  render () {
    this.nodes =
      typeof document !== 'undefined' && document.querySelectorAll(this.props.container)

    if (this.nodes === false) {
      PORTALS[this.props.container] = this.props.children
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
