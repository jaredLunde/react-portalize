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

  componentDidMount () {
    if (this.props.entry() === null) {
      this.forceUpdate()
    }
  }

  render () {
    const {children, entry} = this.props

    if (entry() === null) {
      return null
    }

    return ReactDOM.createPortal(children, entry())
  }
}
