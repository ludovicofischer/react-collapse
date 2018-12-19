import React from 'react';
import PropTypes from 'prop-types';
import { Transition } from 'react-spring';


function Unmounter(props) {
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

}

Unmounter.propTypes = {
  isOpened: PropTypes.bool.isRequired,
  onRest: PropTypes.func
};

const UnmountClosed = React.memo(Unmounter);

export {  UnmountClosed };
