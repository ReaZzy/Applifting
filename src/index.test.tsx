import React from 'react';
import App from '@src/App';
import { render, screen } from '@testing-library/react';

import '@testing-library/jest-dom';
describe('d', () => {
  it('should 123', () => {
    render(<App />);
    expect(screen.getByText('React setup')).toHaveTextContent('React setup');
  });
});
