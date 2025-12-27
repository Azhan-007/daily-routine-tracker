module.exports = {
  // Electron configuration
  electronBuildConfig: {
    productName: 'Daily Routine Tracker',
    appId: 'com.dailyroutinetracke.app',
    directories: {
      buildResources: 'assets',
      output: 'dist',
    },
    files: [
      'main.js',
      'preload.js',
      '../web/**/*',
      'package.json',
    ],
    win: {
      target: ['nsis', 'portable'],
    },
    mac: {
      target: ['dmg', 'zip'],
    },
    linux: {
      target: ['AppImage', 'deb'],
    },
  },
};
