exports.config = {
  allScriptsTimeout: 11000,

  specs: [
    '*.js'
  ],

  chromeOnly: true,
  
  capabilities: {
    'browserName': 'chrome'
  },

  baseUrl: 'http://localhost:8000/app/',

  framework: 'jasmine',

  jasmineNodeOpts: {
    defaultTimeoutInterval: 30000
  }
};
