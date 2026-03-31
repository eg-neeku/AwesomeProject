module.exports = {
  preset: 'react-native',
  setupFilesAfterEnv: ['./jest.setup.js'],
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|@react-native|@react-navigation|react-native-gesture-handler|react-native-reanimated|react-native-screens|react-native-safe-area-context|react-native-vector-icons|react-native-element-dropdown|@react-native-async-storage|@react-native-community|@react-native-camera-roll|react-native-image-picker|react-native-linear-gradient|react-native-maps|react-native-worklets|react-native-drawer-layout|react-native-fs)/)',
  ],
};
