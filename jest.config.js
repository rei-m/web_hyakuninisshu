module.exports = {
  "transform": {
    "^.+\\.tsx?$": "ts-jest",
    "^.+\\.jsx?$": "<rootDir>/jest-preprocess.js"
  },
  "testMatch": [
    "**/__tests__/**/*.ts?(x)"
  ],
  "moduleNameMapper": {
    ".+\\.(css|styl|less|sass|scss)$": "identity-obj-proxy",
    ".+\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/__mocks__/fileMock.js",
    "@src/(.*)": "<rootDir>/src/$1"
  },
  "moduleFileExtensions": ["ts", "tsx", "js", "jsx", "json", "node"],
  "testPathIgnorePatterns": ["node_modules", ".cache", "/__tests__/factories/", "/__tests__/helpers/"],
  "transformIgnorePatterns": ["node_modules/(?!(gatsby)/)"],
  "globals": {
    "__PATH_PREFIX__": ""
  },
  "testURL": "http://localhost",
  "setupFiles": ["<rootDir>/loadershim.js", "<rootDir>/jest.setup.js"],
  "collectCoverage": false,
  "collectCoverageFrom": [
    "src/**/*.ts?(x)"
  ],
  "coverageDirectory": "./coverage/",
}
