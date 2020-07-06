import * as React from 'react'
export declare const PORTALS: Record<string, React.ReactElement>
declare const Portalize: React.FC<PortalizeProps>
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
