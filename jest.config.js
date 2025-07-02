module.exports = {

  transform: {

    "^.+\\.(js|jsx)$": "babel-jest"

  },
  moduleNameMapper:{
    "\\.(css)$": "<rootDir>/__mocks__/styleMock.js"
  }

};