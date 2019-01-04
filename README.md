
## Installation

### NPM

```sh
npm install --save react react-spring @ludofischer/react-springy-collapse
```

Don't forget to manually install peer dependencies (`react`, `react-spring`).


## Usage

Default behaviour, never unmounts content

```js
import {Collapse} from '@ludofischer/react-springy-collapse';

// ...
<Collapse isOpened={true || false}>
  <div>Random content</div>
</Collapse>
```

If you want to unmount collapsed content, use `Unmount` component provided as:

```js
import {UnmountClosed} from '@ludofischer/react-springy-collapse';

// ...
<UnmountClosed isOpened={true || false}>
  <div>Random content</div>
</UnmountClosed>
```

## Options


#### `isOpened`: boolean

Expands or collapses content.


#### `children`: ReactChildren

One or multiple children with static, variable or dynamic height.

```js
<Collapse isOpened={true}>
  <p>Paragraph of text</p>
  <p>Another paragraph is also OK</p>
  <p>Images and any other content are ok too</p>
  <img src="nyancat.gif" />
</Collapse>
```


#### `springConfig`: PropTypes.objectOf(PropTypes.number)

Custom config `{tension, friction}` passed to the spring function (see http://react-spring.surge.sh/spring#config)

```js
import {config} from 'react-spring';

<Collapse isOpened={true} springConfig={config.wobbly}>
  <div>Wobbly animated container</div>
</Collapse>
```

```js
<Collapse isOpened={true} springConfig={{tension: 100, friction: 20}}>
  <div>Customly animated container</div>
</Collapse>
```

#### `className`: string

It is possible to set `className` for the extra `div` element that ReactCollapse creates.

Example:
```js
<Collapse className="collapse">
  <div>Customly animated container</div>
</Collapse>
```


Which ends up in the following markup:
```html
<div className="collapse">
  {children}
</div>
```

NOTE: these are not style objects, but class names!


#### `onRest`: PropTypes.func
Performs some action when the animation end. Same as in `react-spring`. 
See http://react-spring.surge.sh/spring#props

```js
<Collapse onRest={() => console.log(123)}>
  <div>Container text</div>
</Collapse>
```

#### `onFrame`: PropTypes.func

Same as react-spring: http://react-spring.surge.sh/spring#props


#### Pass-through props

All other props are applied to a container that is being resized. So it is possible to pass `style` or `className`, for example.

```js
<Collapse isOpened={true}
  style={{width: 200, border: '1px solid red'}}
  className="collapse">

  <div>
    Animated container has red border, 200px width
    and has `class="collapse"`
  </div>
</Collapse>
```


## Behaviour notes

- initially opened Collapse elements will be statically rendered with no animation
- Overriding `overflow` and `height` styles may behave unexpectedly. Do it only when you definitely know you need it, otherwise, never override `overflow` and `height` styles.

## Development and testing

Currently is being developed and tested with `Node 10` on `OSX`.

To run example covering all features, use `npm start`, which will compile `example/Example.js`

```bash
npm install
npm start

# then
open http://localhost:8080
```

## to run ESLint check

npm run lint

## License

MIT

# Thanks
[react-collapse](https://github.com/nkbt/react-collapse) for tests and the original implementation.
