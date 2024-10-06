// jest.config.js
module.exports = {
    setupFiles: ['<rootDir>/src/test/setup.js'],
    moduleNameMapper: {
      '^@models/(.*)$': '<rootDir>/src/models/$1',
      '^@controllers/(.*)$': '<rootDir>/src/controllers/$1',
      '^@services/(.*)$': '<rootDir>/src/services/$1',
      '^@validations/(.*)$': '<rootDir>/src/validations/$1',
      '^@routes/(.*)$': '<rootDir>/src/routes/$1',
      '^@middleware/(.*)$': '<rootDir>/src/middleware/$1',
    },
    // Other Jest configurations...
  };
  