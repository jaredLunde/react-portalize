import React from 'react'
// 🌟 LOOK AT ME 🌟
import Portalize from 'react-portalize'


const {Provider, Consumer} = React.createContext()
const second = React.createContext()
const SecondProvider = second.Provider
const SecondConsumer = second.Consumer

export default class App extends React.PureComponent {
  state = {name: null}

  render () {
    return (
      <Provider value={{foo: 'bar'}}>
        <SecondProvider value={{bar: 'baz'}}>
          <div>
            {/** // 🌟 LOOK AT ME 🌟 */}
            <div id='portals'/>

            Hello world

            {/** // 🌟 LOOK AT ME 🌟 */}
            <Consumer>
              {value => (
                <SecondConsumer>
                  {secondValue => (
                    <Portalize
                      providers={[
                        {provider: Provider, value},
                        {provider: SecondProvider, value: secondValue},
                      ]}
                    >
                      <Consumer>
                        {({foo}) => (
                          <SecondConsumer>
                            {({bar}) => `${foo} -> ${bar}`}
                          </SecondConsumer>
                        )}
                      </Consumer>
                    </Portalize>
                  )}
                </SecondConsumer>
              )}
            </Consumer>
          </div>
        </SecondProvider>
      </Provider>
    )
  }
}
