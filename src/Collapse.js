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

    hasNestedCollapse: PropTypes.bool,

    theme: PropTypes.objectOf(PropTypes.string),
    style: PropTypes.object,

    onRender: PropTypes.func,
    onRest: PropTypes.func,
    onMeasure: PropTypes.func,
    fixedHeight: PropTypes.number,
    children: PropTypes.node.isRequired
  };


  static defaultProps = {
    springConfig: {},
    forceInitialAnimation: false,
    hasNestedCollapse: false,
    style: {},
    fixedHeight: -1,
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
      isOpened: _isOpened,
      springConfig: _springConfig,
      forceInitialAnimation: _forceInitialAnimation,
      hasNestedCollapse: _hasNestedCollapse,
      theme,
      style,
      onRest: _onRest,
      onMeasure: _onMeasure,
      children,
      onFrame,
      fixedHeight,
      ...props
    } = this.props;

    const dynamicStyles = this.getStyle(springStyles);
    return (
      <animated.div
        style={{...dynamicStyles, ...style}}
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
