export default {
    preset: 'ts-jest',
    testEnvironment: 'node', // or 'jsdom' if you're testing browser-based code
    transform: {
        '^.+\\.(ts|tsx)$': 'ts-jest',
    },
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
};
