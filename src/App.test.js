import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/react/cleanup-after-each';
import App from './App';

it('renders without crashing', () => {
  render(<App />);
});
