const path = require('path');
const {
    override,
    addPostcssPlugins
} = require('customize-cra');
module.exports = {
    paths: function (paths, env) {
        paths.appSrc     = path.resolve(__dirname, 'src/main/react');
        paths.appIndexJs = path.resolve(__dirname, 'src/main/react/index.js');
        paths.appPublic  = path.resolve(__dirname, 'src/main/resources/public');
        paths.appHtml    = path.resolve(__dirname, 'src/main/resources/public/index.html');
        paths.appBuild   = path.resolve(__dirname, 'target/classes/public');
        return paths;
    },
    jest: function(config) {
        config.rootDir = path.resolve(__dirname, 'src/main/react');
        config.roots = [
            '<rootDir>'
        ];
        config.setupFilesAfterEnv = [
            '<rootDir>/setupTests.js'
        ];
        config.transformIgnorePatterns = [
            '<rootDir>/node_modules/',
            '\\.pnp\\.[^\\\/]+$'
        ];
        config.testMatch = [
            '<rootDir>/**/__tests__/**/*.{js,jsx,ts,tsx}',
            '<rootDir>/**/*.{spec,test}.{js,jsx,ts,tsx}'
        ];
        config.collectCoverage = true;
        config.collectCoverageFrom = [
            '**/*.{js,jsx,ts,tsx}',
            '!**/*.d.ts',
            '!index.{js,jsx,ts,tsx}',
        ];
        config.coverageDirectory = path.resolve(__dirname, 'coverage');
        return config;
    },
    webpack: override(
        addPostcssPlugins([
            require('tailwindcss'),
            require('autoprefixer')
        ])
    )
}