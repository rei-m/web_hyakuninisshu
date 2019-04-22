const React = require("react");

module.exports = {
  graphql: () => {},
  Link: ({ to, ...rest }) =>
    React.createElement("a", {
      ...rest,
      href: to,
    }),
  StaticQuery: () => {},
  useStaticQuery: () => {},
  navigate: () => {}
}
