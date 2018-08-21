import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'


/**
<Portalize entry={() => document.getElementById('root')}>
  <div>Inject me</div>
</Portalize>
*/


export default class Portalize extends React.Component {
  static propTypes = {
    entry: PropTypes.func.isRequired
  }

  static defaultProps = {
    entry: function () {
      return document.getElementById('portals')
    }
  }

  element = null

  componentDidMount () {
    if (typeof document !== 'undefined' && this.element === null) {
      this.forceUpdate()
    }
  }

  render () {
    this.element = typeof document !== 'undefined' && this.props.entry()

    return this.element === false || this.element === null ? (
      null
    ) :(
      ReactDOM.createPortal(this.props.children, this.element)
    )
  }
}
