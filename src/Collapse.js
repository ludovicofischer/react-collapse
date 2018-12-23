import React from 'react';
import {animated, Spring} from 'react-spring';

/**
 * @param {{isOpened: boolean, style: object, className: string, onRender: function, onMeasure: function,
 * onRest: (string|number) => void,
 * fixedHeight: number, children: React.ReactChildren, onFrame: function, springConfig: any }} props
 */
function Collapser(props) {

  const {
    isOpened,
    springConfig,
    style,
    onRest,
    onFrame,
    className,
    children,
    fixedHeight,
    ...other
  } = props;

  const openHeight = fixedHeight !== -1 ? fixedHeight : 'auto';
  const originalOverflow = style.overflow || 'visible';
  return (
    <Spring
      native
      onRest={onRest}
      to={isOpened ? {height: openHeight} : {height: 0}}
      onFrame={onFrame}
      config={springConfig}
    >
      {({ height }) => (
        <animated.div
          style={{
            height: height,
            overflow: height.interpolate(height => height === openHeight ? originalOverflow : 'hidden'),
            ...style }}
          className={className}
          {...other}
        >
          {children}
        </animated.div>
      )}
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
