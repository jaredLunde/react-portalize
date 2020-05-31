import * as React from 'react'
import * as ReactDOM from 'react-dom'

export const PORTALS: Record<string, React.ReactElement> = {}
const getContainer = (container: string) =>
  typeof document !== 'undefined' && document.querySelectorAll(container)

const Portalize: React.FC<PortalizeProps> = ({
  container = '#portals',
  server = true,
  providers,
  children,
}) => {
  const [nodes, setNodes] = React.useState(getContainer(container))
  React.useEffect(() => {
    setNodes(getContainer(container))
  }, [container])

  if (nodes === false) {
    // this branch only renders on the server
    if (server) {
      if (providers !== void 0 && providers.length > 0) {
        children = providers.reduceRight(
          (children, {provider, value}) =>
            React.createElement(provider, {value}, children),
          children
        )
      }
      if (children) PORTALS[container] = children
    }
  } else if (nodes.length > 0) {
    const portals: React.ReactPortal[] = []
    for (let i = 0; i < nodes.length; i++)
      portals.push(ReactDOM.createPortal(children, nodes[i]))
    return <React.Fragment>{portals}</React.Fragment>
  }

  return null
}

export interface PortalizeProvider {
  provider: React.Provider<any>
  value: any
}

export interface PortalizeProps {
  container?: string
  providers?: PortalizeProvider[]
  server?: boolean
  children: React.ReactElement | null
}

export default Portalize
