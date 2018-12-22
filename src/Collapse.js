import React from 'react';
import { Spring, animated } from 'react-spring';

const IDLING = 'IDLING';

export class Collapse extends React.PureComponent {

  /**
   * @param {{isOpened: boolean, style: object, className: string, onRender: function, onMeasure: function,
   * fixedHeight: number, children: React.ReactChildren, onFrame: function }} props
   */
  constructor(props) {
    super(props);
    this.state = {
      currentState: IDLING,
      from: 0,
      to: 0
    };
  }

  /**
   * @param {{ height: string | number  }} springStyles
   */
  getStyle(springStyles) {
    if (springStyles.height === 'auto'|| springStyles.height === this.props.fixedHeight) {
      return {...springStyles};
    } else {
      return {...springStyles, overflow: 'hidden'};
    }
  }
  /**
@param {{ height: string | number  }} springStyles
   */
  renderContent = (springStyles) => { // eslint-disable-line
    const {
      isOpened,
      springConfig,
      style,
      onRest: _onRest,
      onFrame,
      children,
      fixedHeight,
      ...props
    } = this.props;

    const dynamicStyles = this.getStyle(springStyles);
    return (
      <animated.div
        style={{...dynamicStyles, ...style}}
        className={this.props.className}
        {...props}>
        {children}
      </animated.div>
    );
  };


  render() {
    const targetHeight = this.props.fixedHeight !== -1 ? this.props.fixedHeight : 'auto';
    const target = this.props.isOpened ? {height: targetHeight} : {height: 0};
    return (
      <Spring
        native
        onRest={this.props.onRest}
        to={target}
        onFrame={this.props.onFrame}
        config={this.props.springConfig}>
        {this.renderContent}
      </Spring>
    );
  }
}

Collapse.defaultProps = {
  springConfig: {},
  style: {},
  fixedHeight: -1,
  className: ""
};
