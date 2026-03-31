import 'react-native-gesture-handler/jestSetup';

// Mock native modules that are unavailable in Jest environment
jest.mock('@react-native-camera-roll/camera-roll', () => ({
  CameraRoll: {
    getPhotos: jest.fn(),
    saveImageWithTag: jest.fn(),
  },
  useCameraRoll: jest.fn(() => [[], jest.fn()]),
}));

jest.mock('react-native-image-picker', () => ({
  launchCamera: jest.fn(),
  launchImageLibrary: jest.fn(),
}));

jest.mock('react-native-maps', () => {
  const React = require('react');
  const MockMapView = (props) => React.createElement('MapView', props);
  const MockMarker = (props) => React.createElement('Marker', props);
  MockMapView.Marker = MockMarker;
  return {
    __esModule: true,
    default: MockMapView,
    Marker: MockMarker,
  };
});

jest.mock('react-native-linear-gradient', () => {
  const React = require('react');
  return (props) => React.createElement('LinearGradient', props);
});

jest.mock('react-native-vector-icons/MaterialIcons', () => {
  const React = require('react');
  return (props) => React.createElement('Icon', props);
});

jest.mock('react-native-vector-icons/Ionicons', () => {
  const React = require('react');
  return (props) => React.createElement('Icon', props);
});

jest.mock('react-native-vector-icons/FontAwesome', () => {
  const React = require('react');
  return (props) => React.createElement('Icon', props);
});

jest.mock('react-native-vector-icons/MaterialCommunityIcons', () => {
  const React = require('react');
  return (props) => React.createElement('Icon', props);
});

jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);

jest.mock('react-native-worklets', () =>
  require('react-native-worklets/lib/module/mock')
);

jest.mock('react-native-reanimated', () =>
  require('react-native-reanimated/mock')
);

jest.mock('react-native-fs', () => ({
  readFile: jest.fn(),
  writeFile: jest.fn(),
  exists: jest.fn(() => Promise.resolve(true)),
  mkdir: jest.fn(),
  DownloadDirectoryPath: '/mocked/path',
  DocumentDirectoryPath: '/mocked/documents',
}));