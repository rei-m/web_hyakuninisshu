const React = require("react");
const { action } = require("@storybook/addon-actions");
const iconImage = require("@src/images/app-icon.png");
const correctImage = require("@src/images/check_correct.png");
const incorrectImage = require("@src/images/check_incorrect.png");
const dogezaImage = require("@src/images/dogeza_businessman.png");
const karutaImage = require("@src/images/karuta_001.jpg");
const tatamiImage  = require("@src/images/tatami_part.png");

const linkActionHandler = action("Link:");
const navigateActionHandler = action("NavigateTo:");

const imageSrc = (image) => (image.default === "test-file-stub" ? image.default : image);

module.exports = {
  graphql: (args) => args,
  Link: ({ to, ...rest }) =>
    React.createElement("a", {
      ...rest,
      href: to,
      onClick: (e) => {
        e.preventDefault();
        linkActionHandler(to);
      }
    }),
  StaticQuery: () => {},
  useStaticQuery: (args) => {
    const query = args[0];
    if (query.indexOf("query SEOQuery") > -1) {
      return {
        site: {
          siteMetadata: {
            title: "百人一首 簡単に暗記",
            description: "説明",
            author: "rei-m",
          },
        },
        ogpImage: {
          publicURL: imageSrc(iconImage),
        },
      };
    }
    if (query.indexOf("query CorrectImageQuery") > -1) {
      return {
        correctImage: {
          childImageSharp: {
            fluid: {
              aspectRatio: 0.7228915662650602,
              srcSet: "",
              sizes: "(max-width: 300px) 100vw, 200px",
              src: imageSrc(correctImage),
            },
          },
        },
        incorrectImage: {
          childImageSharp: {
            fluid: {
              aspectRatio: 0.7228915662650602,
              srcSet: "",
              sizes: "(max-width: 300px) 100vw, 200px",
              src: imageSrc(incorrectImage),
            },
          },
        },
      };
    }
    if (query.indexOf("query DogezaImageQuery") > -1) {
      return {
        dogezaImage: {
          childImageSharp: {
            fluid: {
              aspectRatio: 0.7228915662650602,
              srcSet: "",
              sizes: "(max-width: 200px) 200px, 200px",
              src: imageSrc(dogezaImage),
            },
          },
        },
      };
    }
    if (query.indexOf("query TatamiImageQuery") > -1) {
      return {
        tatamiImage: {
          publicURL: tatamiImage,
        },
      };
    }
    if (query.indexOf("query KarutaImageQuery") > -1) {
      return {
        karutaImages: {
          edges: Array.from(Array(100).keys()).map(i => ({
            node: {
              childImageSharp: {
                fluid: {
                  aspectRatio: 0.7228915662650602,
                  srcSet: "",
                  sizes: "(max-width: 200px) 100vw, 200px",
                  src: imageSrc(karutaImage),
                }
              },
              name: `karuta_${("00" + (i + 1)).slice(-3)}`
            }
          }))
        }
      };
    }
    return {};
  },
  navigate: (to, options) => {
    navigateActionHandler(to, options);
  }
}
