module.exports = {
  testEnvironment: "node",
  transform: {
    "^.+\\.jsx?$": "babel-jest",
  },
  coveragePathIgnorePatterns: ["/node_modules/"],
};
