import * as React from 'react';
import styled, { keyframes, StyledFunction } from 'styled-components';

const rippleAnimation = keyframes`
  100% {
    transform: scale(2);
    opacity: 0;
  }
`;

const RippleContainer = styled.div`
  display: inline-block;
  position: relative;
  overflow: hidden;
`;

interface RippleEffect {
  readonly key: number;
  readonly position: {
    readonly x: number;
    readonly y: number;
  };
  readonly size: number;
  readonly color: string;
}

const rippleEffect: StyledFunction<
  RippleEffect & React.HTMLProps<HTMLDivElement>
> =
  styled.div;

const RippleEffect = rippleEffect`
  position: absolute;
  left: ${props => `${props.position.x}px`};
  top: ${props => `${props.position.y}px`};
  width: ${props => `${props.size}px`};
  height: ${props => `${props.size}px`};
  background: ${props => props.color};
  border-radius: 50%;
  user-select: none;
  pointer-events: none;
  transform: scale(0);
  opacity: 0.7;
  animation: ${rippleAnimation} 0.5s linear;
`;

export interface RippleProps {
  color?: string;
}

export interface RippleState {
  ripples: RippleEffect[];
}

export default class Ripple extends React.Component<RippleProps, RippleState> {
  public static defaultProps: RippleProps = { color: '#a9a9a980' };

  private container: HTMLDivElement;
  private idHolder = 0;

  constructor(props: RippleProps) {
    super(props);
    this.holdContainer = this.holdContainer.bind(this);
    this.createRipple = this.createRipple.bind(this);
    this.removeFinishedRipple = this.removeFinishedRipple.bind(this);
    this.state = {
      ripples: []
    };
  }

  public render() {
    const { color, children, ...props } = this.props;
    const { ripples } = this.state;

    return (
      <RippleContainer
        {...props}
        innerRef={this.holdContainer}
        onMouseDown={this.createRipple}
      >
        {children}
        {ripples.map(r => (
          <RippleEffect {...r} onAnimationEnd={this.removeFinishedRipple} />
        ))}
      </RippleContainer>
    );
  }

  private holdContainer(component: HTMLDivElement) {
    this.container = component;
  }

  private createRipple(event: React.MouseEvent<HTMLDivElement>) {
    const { width, height, left, top } = this.container.getBoundingClientRect();
    const size = Math.max(width, height);

    const newRipple = {
      color: this.props.color as string,
      key: this.generateRippleId,
      position: {
        x: event.clientX - left - size / 2,
        y: event.clientY - top - size / 2
      },
      size
    };

    this.setState(prevState => {
      prevState.ripples.push(newRipple);
      return prevState;
    });
  }

  private removeFinishedRipple() {
    this.setState(prevState => {
      const afterRipples = [...prevState.ripples];
      afterRipples.shift();
      return {
        ripples: afterRipples
      };
    });
  }

  private get generateRippleId() {
    this.idHolder += 1;
    return this.idHolder;
  }
}
