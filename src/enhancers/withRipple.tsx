import * as React from 'react';
import styled, { keyframes } from 'styled-components';

const rippleAnimation = keyframes`
  to {
    transform: scale(2);
    opacity: 0;
  }
`;

const RippleContainer = styled.div`
  position: relative;
  overflow: hidden;

  & .ripple-effect {
    position: absolute;
    border-radius: 50%;
    user-select: none;
    pointer-events: none;
    transform: scale(0);
    opacity: 0.75;
    animation: ${rippleAnimation} 1000ms;
  }
`;

export interface RippledComponentProps
  extends React.HTMLAttributes<HTMLDivElement> {
  color?: string;
}

export const withRipple = (WrappedComponent: React.ComponentClass) => {
  return class RippledComponent extends React.Component<RippledComponentProps> {
    public static defaultProps: RippledComponentProps = { color: '#fff' };

    private container: HTMLDivElement;
    private clearRippleTimer: number;

    constructor(props: RippledComponentProps) {
      super(props);
      this.holdContainer = this.holdContainer.bind(this);
      this.addRipple = this.addRipple.bind(this);
      this.clearRipple = this.clearRipple.bind(this);
    }

    public render() {
      return (
        <RippleContainer
          innerRef={this.holdContainer}
          onMouseDown={this.addRipple}
          onMouseUp={this.clearRipple}
        >
          <WrappedComponent {...this.props} />
        </RippleContainer>
      );
    }

    private holdContainer(component: HTMLDivElement) {
      this.container = component;
    }

    private addRipple(event: React.MouseEvent<HTMLDivElement>) {
      const {
        width,
        height,
        left,
        top
      } = this.container.getBoundingClientRect();

      const effect = document.createElement('span');
      effect.className = 'ripple-effect';
      this.container.appendChild(effect);

      const size = Math.max(width, height);
      const ripplerStyle = [
        `left: ${event.clientX - left - size / 2}px`,
        `top: ${event.clientY - top - size / 2}px`,
        `width: ${size}px`,
        `height: ${size}px`,
        `background-color: ${this.props.color}`
      ];
      effect.setAttribute('style', ripplerStyle.join('; '));
    }

    private clearRipple() {
      if (this.clearRippleTimer) {
        window.clearTimeout(this.clearRippleTimer);
      }
      this.clearRippleTimer = window.setTimeout(() => {
        const ripples = this.container.getElementsByClassName('ripple-effect');
        [...Array(ripples.length).keys()].reverse().forEach(i => {
          this.container.removeChild(ripples.item(i));
        });
      }, 1000);
    }
  };
};
