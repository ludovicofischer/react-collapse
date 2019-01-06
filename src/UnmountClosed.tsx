import React from 'react';
import { Transition, animated } from 'react-spring';

function Unmounter(props: {
  children: React.ReactChildren;
  isOpened: boolean;
  onRest: () => void;
}) {
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
}

export const UnmountClosed = Unmounter;
