module.exports = {
  "transform": {
    "^.+\\.tsx?$": "ts-jest",
    "^.+\\.jsx?$": "<rootDir>/.jest/preprocess.js"
  },
  "testMatch": [
    "**/src/**/*.test.ts?(x)",
    "**/.storybook/**/*.test.js?(x)",
  ],
  "moduleNameMapper": {
    ".+\\.(css|styl|less|sass|scss)$": "identity-obj-proxy",
    ".+\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/__mocks__/fileMock.js",
    "@src/(.*)": "<rootDir>/src/$1",
    "@helper/(.*)": "<rootDir>/helper/$1"
  },
  "moduleFileExtensions": ["ts", "tsx", "js", "jsx", "json", "node"],
  "testPathIgnorePatterns": ["node_modules", ".cache"],
  "transformIgnorePatterns": ["node_modules/(?!(gatsby)/)"],
  "globals": {
    "__PATH_PREFIX__": ""
  },
  "testURL": "http://localhost",
  "setupFiles": [
    "<rootDir>/.jest/loadershim.js",
    "<rootDir>/.jest/register-context.js",
    "<rootDir>/.jest/setup-twitter.js",
    "<rootDir>/.jest/setup-enzyme.js",
  ],
  "collectCoverage": false,
  "collectCoverageFrom": [
    "src/**/*.ts?(x)",
    "!src/**/*.stories.ts?(x)",
    "!src/**/*.test.ts?(x)",
  ],
  "coverageDirectory": "./coverage/",
}
