import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });

window.twttr = {
  widgets: {
    load: (arg) => {}
  }
}

// import React from 'react';
// import ReactDOM from 'react-dom';
// ReactDOM.createPortal = (element, node) => {
//   return (
//     <div>
//       <div>{element}</div>
//       <div data-target-tag-name={node.tagName}></div>
//     </div>
//   );
// };
