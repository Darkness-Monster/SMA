module.exports = {
    mutate: ['**/*.js'], // Specify which files to mutate
    testRunner: 'mocha', // Use Mocha as the test runner
    reporters: ['progress', 'clear-text', 'html'], // Specify reporters for test results
  };
  