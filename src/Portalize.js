import React, {useState, useEffect} from 'react'
import ReactDOM from 'react-dom'


/**
<Portalize container='#portals'>
  <div>Inject me</div>
</Portalize>
*/
export const PORTALS = {}
const getContainer = container =>
  typeof document !== 'undefined' && document.querySelectorAll(container)

const Portalize = ({container = '#portals', server = true, providers, children}) => {
  const [nodes, setNodes] = useState(getContainer(container))
  useEffect(() => {setNodes(getContainer(container))}, [container])

  if (nodes === false) {
    if (server === false)
      return null

    if (providers !== void 0 && providers.length > 0) {
      children = providers.reduceRight(
        (children, {provider, value}) => React.createElement(provider, {children, value}),
        children
      )
    }

    PORTALS[container] = children
    return null
  }
  else if (nodes.length === 0) {
    return null
  }
  else {
    let portals = [], i = 0
    for (; i < nodes.length; i++) portals.push(ReactDOM.createPortal(children, nodes[i]))
    return portals
  }
}

if (__DEV__) {
  const PropTypes = require('prop-types')

  Portalize.propTypes = {
    container: PropTypes.string,
    providers: PropTypes.arrayOf(
      PropTypes.shape({
        provider: PropTypes.any,
        value: PropTypes.any
      })
    ),
    server: PropTypes.bool
  }
}

export default Portalize