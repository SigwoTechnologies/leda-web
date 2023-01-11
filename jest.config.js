// jest.config.js
const nextJest = require('next/jest');

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
});

// Add any custom config to be passed to Jest
/** @type {import('jest').Config} */
const customJestConfig = {
  // Add more setup options before each test is run
  // setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  // if using TypeScript with a baseUrl set to the root directory then you need the below for alias' to work
  moduleDirectories: ['node_modules', '<rootDir>/'],
  moduleNameMapper: {
    '@store/*': ['<rootDir>/src/store'],
    '@assets/*': ['<rootDir>/assets/'],
    '@ui/*': ['<rootDir>/components/ui/'],
    '@components/*': ['<rootDir>/components/'],
    '@widgets/*': ['<rootDir>/components/widgets/'],
    '@containers/*': ['<rootDir>/containers/'],
    '@layout/*': ['<rootDir>/layouts/'],
    '@utils/*': ['<rootDir>/utils/'],
    '@hooks': ['<rootDir>/hooks'],
    '@types': ['<rootDir>/types'],
  },
  testEnvironment: 'jest-environment-jsdom',
  preset: 'ts-jest',
  testEnvironment: 'node',
  transform: {
    'node_modules/variables/.+\\.(j|t)sx?$': 'ts-jest',
  },
  transformIgnorePatterns: ['node_modules/(?!variables/.*)'],
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig);
