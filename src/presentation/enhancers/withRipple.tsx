import React, { useState, useRef, useLayoutEffect } from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { ThemeInterface } from '@src/presentation/styles/theme';

const useStyles = makeStyles<ThemeInterface>({
  rippleContainer: {
    position: 'relative',
    overflow: 'hidden !important',
    '& .ripple-effect': {
      position: 'absolute',
      borderRadius: '50%',
      userSelect: 'none',
      pointerEvents: 'none',
      transform: 'scale(0)',
      opacity: 0.75,
      animationName: '$ripple',
      animationDuration: '1000ms',
    },
  },
  '@keyframes ripple': {
    to: {
      transform: 'scale(2)',
      opacity: 0,
    },
  },
});

export type RippledComponentProps = {
  color?: string;
  style?: React.CSSProperties;
};

// このHOC中途半端なので作り直したさ
export function withRipple<T>(WrappedComponent: React.ComponentType<T>) {
  return (props: T & RippledComponentProps) => {
    const color = props.color ? props.color : '#fff';

    const [timerHolder] = useState<{ clearRippleTimer: number | undefined }>({ clearRippleTimer: undefined });

    // tslint:disable-next-line:no-null-keyword
    const containerEl = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
      return function cleanup() {
        if (timerHolder.clearRippleTimer) {
          window.clearTimeout(timerHolder.clearRippleTimer);
        }
      };
    });

    const classes = useStyles();

    const addRipple = (event: React.MouseEvent<HTMLDivElement>) => {
      const { width, height, left, top } = containerEl.current!.getBoundingClientRect();

      const effect = document.createElement('span');
      effect.className = 'ripple-effect';
      containerEl.current!.appendChild(effect);

      const size = Math.max(width, height);
      const ripplerStyle = [
        `left: ${event.clientX - left - size / 2}px`,
        `top: ${event.clientY - top - size / 2}px`,
        `width: ${size}px`,
        `height: ${size}px`,
        `background-color: ${color}`,
      ];
      effect.setAttribute('style', ripplerStyle.join('; '));
    };

    const clearRipple = () => {
      if (timerHolder.clearRippleTimer) {
        window.clearTimeout(timerHolder.clearRippleTimer);
      }
      timerHolder.clearRippleTimer = window.setTimeout(() => {
        const ripples = containerEl.current!.getElementsByClassName('ripple-effect');
        Array.from(Array(ripples.length).keys())
          .reverse()
          .forEach((i) => containerEl.current!.removeChild(ripples.item(i)!));
      }, 1000);
    };

    return (
      <div
        ref={containerEl}
        onMouseDown={addRipple}
        onMouseUp={clearRipple}
        style={props.style}
        className={classes.rippleContainer}
      >
        <WrappedComponent {...props} style={{}} />
      </div>
    );
  };
}
