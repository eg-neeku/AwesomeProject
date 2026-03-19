/**
 * @format
 */

import React from 'react';
// import ReactTestRenderer from 'react-test-renderer';
import App from '../App';
import { render } from "@testing-library/react-native";

test('renders correctly', async () => {
  const { toJSON } = render(<App />);
  expect(toJSON()).toBeTruthy();
});

// await ReactTestRenderer.act(() => {
//   ReactTestRenderer.create(<App />);
// });