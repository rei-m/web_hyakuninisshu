import * as React from 'react';
import ReactDOM from 'react-dom';

export interface OverlayProps {
  style?: React.CSSProperties;
}

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

export default class Overlay extends React.Component<OverlayProps> {
  private body: HTMLElement;
  private rootContainer: HTMLElement;
  private el: HTMLDivElement;
  private bodyOverflow: string | null;

  constructor(props: OverlayProps) {
    super(props);
    this.body = document.getElementsByTagName('body')[0]!;
    this.rootContainer = document.getElementById('___gatsby_portal')!;
    this.el = document.createElement('div');
    this.el.style.cssText = rootStyle;
    this.bodyOverflow = this.body.style.overflow;
  }

  componentDidMount() {
    // The portal element is inserted in the DOM tree after
    // the Modal's children are mounted, meaning that children
    // will be mounted on a detached DOM node. If a child
    // component requires to be attached to the DOM tree
    // immediately when mounted, for example to measure a
    // DOM node, or uses 'autoFocus' in a descendant, add
    // state to Modal and only render the children when Modal
    // is inserted in the DOM tree.
    this.rootContainer.appendChild(this.el);
    this.body.style.overflow = 'hidden';
  }

  componentWillUnmount() {
    this.rootContainer.removeChild(this.el);
    this.body.style.overflow = this.bodyOverflow;
  }

  render() {
    const { children } = this.props;
    return ReactDOM.createPortal(children, this.el);
  }
}
