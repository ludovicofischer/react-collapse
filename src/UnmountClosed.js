import React from 'react';
import { Transition, animated } from 'react-spring';

/**
 * @param {{ isOpened: boolean, onRest: () => void, children: React.ReactChildren }} props
 */
const UnmountClosed = React.memo(function Unmounter(props) {
  return (
    <Transition
      native
      from={{ height: 0 }}
      enter={{ height: 'auto' }}
      leave={{ height: 0 }}
      items={props.isOpened}
      onDestroyed={props.onRest}
    >
      {isOpened =>
        isOpened &&
        (springProps => (
          <animated.div style={{ ...springProps, overflow: 'hidden' }}>
            {props.children}
          </animated.div>
        ))
      }
    </Transition>
  );
});

export { UnmountClosed };
