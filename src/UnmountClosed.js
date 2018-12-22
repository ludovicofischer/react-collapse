import React from 'react';
import { Transition } from 'react-spring';


/**
 * @param {{ isOpened: boolean, onRest: () => void, children: React.ReactChildren }} props
 */
const UnmountClosed = React.memo(function Unmounter(props) {
  return (
    <Transition
      from={{height: 0}}
      enter={{height: 'auto'}}
      leave={{height: 0}}
      items={props.isOpened}
      onDestroyed={props.onRest}
    >
      {isOpened => isOpened && (springProps => <div style={{...springProps, overflow: 'hidden'}}>{props.children}</div>)}
    </Transition>
  );

});


export {  UnmountClosed };
