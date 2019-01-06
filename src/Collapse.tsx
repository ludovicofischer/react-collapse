import React from 'react';
import { animated, Spring, SpringConfig } from 'react-spring';

type MovementCallback = (arg: object) => void;

interface CollapseProps {
  isOpened: boolean;
  style: { overflow?: string };
  className: string;
  fixedHeight?: number;
  children: React.ReactChildren;
  onRest?: MovementCallback;
  onFrame?: MovementCallback;
  springConfig?: SpringConfig;
}

function Collapser(props: CollapseProps) {
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
      to={isOpened ? { height: openHeight } : { height: 0 }}
      onFrame={onFrame}
      config={springConfig}
    >
      {({ height }) => (
        <animated.div
          style={{
            height: height,
            overflow: height.interpolate(height =>
              height === openHeight ? originalOverflow : 'hidden'
            ),
            ...style
          }}
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

export const Collapse = Collapser;
