/* eslint-disable react/no-did-update-set-state,react/no-did-mount-set-state */
import React from 'react';
import PropTypes from 'prop-types';
import { Spring, animated } from 'react-spring';

const IDLING = 'IDLING';

export class Collapse extends React.PureComponent {
  static propTypes = {
    isOpened: PropTypes.bool.isRequired,
    springConfig: PropTypes.objectOf(PropTypes.number),
    forceInitialAnimation: PropTypes.bool,
    style: PropTypes.object,
    className: PropTypes.string,
    onRender: PropTypes.func,
    onRest: PropTypes.func,
    onMeasure: PropTypes.func,
    fixedHeight: PropTypes.number,
    children: PropTypes.node.isRequired
  };


  static defaultProps = {
    springConfig: {},
    forceInitialAnimation: false,
    style: {},
    fixedHeight: -1,
    className: ""
  };


  constructor(props) {
    super(props);
    this.state = {
      currentState: IDLING,
      from: 0,
      to: 0
    };
  }

   getStyle(springStyles) {
    if (springStyles.height === 'auto'|| springStyles.height === this.props.fixedHeight) {
      return {...springStyles};
    } else {
      return {...springStyles, overflow: 'hidden'};
    }
  }
  renderContent = (springStyles) => { // eslint-disable-line
    const {
      isOpened,
      springConfig,
      forceInitialAnimation,
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
