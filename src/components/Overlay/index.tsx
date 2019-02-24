import * as React from 'react';
import ReactDOM from 'react-dom';

const rootStyleMap: { [key: string]: string | number } = {
  width: '100vw',
  height: '100vh',
  position: 'fixed',
  top: 0,
  left: 0,
  cursor: 'default',
  'background-color': 'transparent',
  'z-index': 99,
};

const rootStyle = Object.keys(rootStyleMap)
  .map(key => `${key}: ${rootStyleMap[key]}`)
  .join(';');

const el: HTMLDivElement = document.createElement('div');
el.style.cssText = rootStyle;

const Overlay: React.FC<{}> = ({ children }) => {
  React.useEffect(() => {
    const body = document.getElementsByTagName('body')[0]!;
    const bodyOverflow = body.style.overflow;
    body.style.overflow = 'hidden';

    const rootContainer = document.getElementById('___gatsby_portal')!;
    rootContainer.appendChild(el);

    return function cleanup() {
      rootContainer.removeChild(el);
      body.style.overflow = bodyOverflow;
    };
  });

  return ReactDOM.createPortal(children, el);
};

export default Overlay;
