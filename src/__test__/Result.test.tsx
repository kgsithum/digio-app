import React from 'react';
import { render, screen } from '@testing-library/react';
import Result from '../components/Result';

test('it render with result container', () => {
  render(<Result result={null} />);
  const resultContainer = screen.getByTestId('resultContainer');
  expect(resultContainer).toBeInTheDocument();
});
