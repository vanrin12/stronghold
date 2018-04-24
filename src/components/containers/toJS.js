// @flow
import * as React from 'react'
import { isCollection } from 'immutable'

/* Pass regular JS objects instead of Immutables to "dumb" components.
 *
 * http://redux.js.org/docs/recipes/UsingImmutableJS.html#use-a-higher-order-component-to-convert-your-smart-components-immutablejs-props-to-your-dumb-components-javascript-props
 *
 * https://gist.github.com/quangv/52d7cf1b39b0611b4029e309e47944e2
 */
export default (Component: React.ComponentType<any>) => (props: Object) => {

  const propsJS = Object.keys(props).reduce( function(newProps, key) {
    const value = props[key]

    if (isCollection(value)) {
      newProps[key] = value.toJS()  // convert Immutable to regular JS.
    } else {
      newProps[key] = value
    }

    return newProps

  }, {} )

  return <Component {...propsJS} />
}
