const React = require("react");
const { action } = require("@storybook/addon-actions");
const iconImage = require("@src/presentation/images/app-icon.png");
const correctImage = require("@src/presentation/images/check_correct.png");
const incorrectImage = require("@src/presentation/images/check_incorrect.png");
const dogezaImage = require("@src/presentation/images/dogeza_businessman.png");
const karutaImage = require("@src/presentation/images/karuta_001.jpg");
const tatamiImage  = require("@src/presentation/images/tatami_part.png");
const appIconImage  = require("@src/presentation/images/android_app_icon.png");
const appIconReaderImage  = require("@src/presentation/images/android_app_reader_icon.png");

const linkActionHandler = action("Link:");
const navigateActionHandler = action("NavigateTo:");

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
          publicURL: iconImage,
        },
      };
    }
    if (query.indexOf("query CorrectImageQuery") > -1) {
      return {
        correctImage: {
          childImageSharp: {
            gatsbyImageData: {
              layout: "constrained",
              backgroundColor: "#a8d878",
              images: {
                fallback: {
                  src: correctImage,
                  srcSet: "",
                  sizes: "(max-width: 300px) 100vw, 200px",
                }
              },
            },
          },
        },
        incorrectImage: {
          childImageSharp: {
            gatsbyImageData: {
              layout: "constrained",
              backgroundColor: "#a8d878",
              images: {
                fallback: {
                  src: incorrectImage,
                  srcSet: "",
                  sizes: "(max-width: 300px) 100vw, 200px",
                }
              },
            },
          },
        },
      };
    }
    if (query.indexOf("query DogezaImageQuery") > -1) {
      return {
        dogezaImage: {
          childImageSharp: {
            gatsbyImageData: {
              layout: "constrained",
              backgroundColor: "#a8d878",
              images: {
                fallback: {
                  src: dogezaImage,
                  srcSet: "",
                  sizes: "(max-width: 200px) 200px, 200px",
                }
              },
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
    if (query.indexOf("query PlayStoreImageQuery1") > -1) {
      return {
        storeImage1: {
          childImageSharp: {
            gatsbyImageData: {
              layout: "constrained",
              backgroundColor: "#a8d878",
              images: {
                fallback: {
                  src: appIconImage,
                  srcSet: "",
                  sizes: "(max-width: 200px) 200px, 200px",
                }
              },
            },
          },
        },
        storeImage2: {
          childImageSharp: {
            gatsbyImageData: {
              layout: "constrained",
              backgroundColor: "#a8d878",
              images: {
                fallback: {
                  src: appIconReaderImage,
                  srcSet: "",
                  sizes: "(max-width: 200px) 200px, 200px",
                }
              },
            },
          },
        },
      };
    }
    if (query.indexOf("query KarutaImageQuery") > -1) {
      return {
        karutaImages: {
          edges: Array.from(Array(100).keys()).map(i => ({
            node: {
              childImageSharp: {
                gatsbyImageData: {
                  layout: "constrained",
                  backgroundColor: "#a8d878",
                  images: {
                    fallback: {
                      src: appIconReaderImage,
                      srcSet: "",
                      sizes: "(max-width: 200px) 100vw, 200px",
                    }
                  },
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
