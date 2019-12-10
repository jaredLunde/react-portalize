import React, {useState, useEffect} from 'react'
import ReactDOM from 'react-dom'

/**
 <Portalize container='#portals'>
 <div>Inject me</div>
 </Portalize>
 */
export const PORTALS: Record<string, React.ReactNode> = {}
const getContainer = container =>
  typeof document !== 'undefined' && document.querySelectorAll(container)

export interface PortalizeProvider {
  provider: React.Provider<any>
  value: any
}

export interface PortalizeProps {
  container?: string
  providers?: PortalizeProvider[]
  server?: boolean
}

const Portalize: React.FC<PortalizeProps> = ({
  container = '#portals',
  server = true,
  providers,
  children,
}) => {
  const [nodes, setNodes] = useState(getContainer(container))
  useEffect(() => {
    setNodes(getContainer(container))
  }, [container])

  if (nodes === false) {
    // this branch only renders on the server
    if (server === false) return null

    if (providers !== void 0 && providers.length > 0) {
      children = providers.reduceRight(
        (children, {provider, value}) =>
          React.createElement(provider, {children, value}),
        children
      )
    }

    PORTALS[container] = children
    return null
  } else if (nodes.length === 0) {
    return null
  } else {
    const portals: React.ReactPortal[] = []
    for (let i = 0; i < nodes.length; i++)
      portals.push(ReactDOM.createPortal(children, nodes[i]))
    return <>{portals}</>
  }
}

export default Portalize
