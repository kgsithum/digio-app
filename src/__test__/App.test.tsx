import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';

test('it render with file input', () => {
  render(<App />);
  const fileInput = screen.getByTestId('fileInput');
  expect(fileInput).toBeInTheDocument();
});
