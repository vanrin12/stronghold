# Converting an HTML to COMPONENT

React has a few caveats that we need to follow. These are detailed below.

Also note that React requires closing tags on everything `<br />` instead of `<br>` for example.

Use your text editor's search & replace when possible.

1. Be sure to convert 4 spaces to 2 spaces. (We are using JS convention of 2 spaces for indents, since the HTML is going to be embedded in the JS, please change the indents to 2 spaces)
2. rename `class` to `className`. (`class` is a reserved word in JS, so needs to be `className`)
3. rename `<!--end of container-->` to `{/*end of container*/}`. [HTML comments is not allowed.](http://wesbos.com/react-jsx-comments/)
4. convert relative app links from `<a href="/signup.html" />` anchor tags to `<Link to="/signup" />` (React router's [Link component](https://reacttraining.com/react-router/web/api/Link))
5. convert relative links not yet in the App to absolute links to the marketing page. Eg. `/terms-of-service.html -> http://stronghold.co/terms-of-service.html`

## High Level

### HTML

Our templates files are full page html files. We need to chop it up into components. We will do this gradually.

### Example

[Signup.html](https://github.com/actionfactory/stronghold.co/blob/master/signup.html) got turned into two components.

- `pages/SignUp.js` (main react-router's routes goes in `components/pages/` folder.)
- `orgs/TopNav.js` (orgs is short for organisms, ala Atomic Design methodology)

We are using `React-Router` and high level pages will be in the `src/components/pages` directory.

Check out `components/App.js` on example of React-router.

### CSS

We are using [BEM](https://csswizardry.com/2013/01/mindbemding-getting-your-head-round-bem-syntax/) on the React app currently for styling.

We might switch to something more powerful if need in the future (like (postcss)[https://github.com/postcss/postcss],  [Radium](https://survivejs.com/react/advanced-techniques/styling-react/))

The convention set by [Create-React-App](https://github.com/facebookincubator/create-react-app) is to have a companion `.css` file, then have the component js file import it in.

Webpack will take care of bundling/loading the css.

Example:

```
// js file : src/components/pages/SignUp.js
// css file: src/components/pages/SignUp.css

// somewhere on top of SignUp.js
import './SignUp.css'
```

## Misc

### Page Title

You can't use `<title />` tag because it's a SPA.

We are using `<Helmet><title>Page Title</title></Helmet>` [component](https://www.npmjs.com/package/react-helmet) to set the page title & meta description.

Alternatively you can do it like [this](https://github.com/ReactTraining/react-router/issues/49), but it is more error proned.

### Images

We are putting images in the `src/assets/img` folder.

Example:

```
// @flow
import * as React from 'react'
import Photo from '../../assets/img/photo.jpg'

class Example extends React.Component<{}> {
  render() {
    return (
      <div className="Example">
        <img src={Photo} />
      </div>
    )
  }
}
```

For CSS files, use relative URLs and webpack will automatically point to correct url.

Example:

```
/* components/pages/SignUp.css */

.SignUp .background-image-holder.loaded {
  background: url("../../assets/img/stronghold-safe.jpg");
  opacity: 1;

}
```

### Notes

- There are some things like JS behavior that can't be directly moved over. Try not to use jQuery, and convert it to idiomatic React code instead.
- common convention to use capitalize format for the parent component like `className="SignUp"`

Check out [PR #36](https://github.com/actionfactory/stronghold/pull/36/files) for full example on converting signup.html into React Components.
