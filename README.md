# Portalize
A convenience component for injecting elements into React Portals

### Installation
```yarn add react-portalize``` or ```npm i react-portalize```

## Usage
```js
import Portalize from 'react-portalize'


function SomeOtherComponent (props) {
  return (
    // ...other stuff
    <Portalize entry={() => document.getElementById('portals')}>
      // I will render into <div id='portals'/>
      <div>Hello</div>
    </Portalize>
    // ...other stuff
  )
}
```
____

## Props
- `entry {function}`
  - a function which returns the DOM element you'd like to portal into
    ```js
    const getPortal = () => document.getElementById('portal')
    <Portalize entry={getPortal}>
      // ...your components...
    </Portalize>
    ```
