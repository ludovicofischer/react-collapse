import React from 'react';
import { Spring, animated } from 'react-spring';

/**
 * @param {{isOpened: boolean, style: object, className: string, onRender: function, onMeasure: function,
 * onRest: (string|number) => void,
 * fixedHeight: number, children: React.ReactChildren, onFrame: function, springConfig: any }} props
 */
function Collapser(props) {

  /**
   * @param {{ height: string | number  }} springStyles
   */
  function getStyle(springStyles, props) {
    if (
      springStyles.height === 'auto' ||
      springStyles.height === props.fixedHeight
    ) {
      return { ...springStyles };
    } else {
      return { ...springStyles, overflow: 'hidden' };
    }
  }
  /**
@param {{ height: string | number  }} springStyles
   */
  function renderContent(springStyles, props) {
    // eslint-disable-line
    const {
      isOpened,
      springConfig,
      style,
      onRest: _onRest,
      onFrame,
      children,
      fixedHeight,
      ...other
    } = props;

    const dynamicStyles = getStyle(springStyles, props);
    return (
      <animated.div
        style={{ ...dynamicStyles, ...style }}
        className={props.className}
        {...other}
      >
        {children}
      </animated.div>
    );
  }

    const targetHeight =
      props.fixedHeight !== -1 ? props.fixedHeight : 'auto';
    const target = props.isOpened
      ? { height: targetHeight }
      : { height: 0 };
    return (
      <Spring
        native
        onRest={props.onRest}
        to={target}
        onFrame={props.onFrame}
        config={props.springConfig}
      >
        {springStyles => renderContent(springStyles, props)}
      </Spring>
    );
}

Collapser.defaultProps = {
  springConfig: {},
  style: {},
  fixedHeight: -1,
  className: ''
};

export const Collapse = React.memo(Collapser);
