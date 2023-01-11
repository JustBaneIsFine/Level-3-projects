import { render, screen } from '@testing-library/react';
import { describe, it } from 'vitest';
import App from './App';

describe('App', () => {
  it('renders hello', () => {
    // It's bassicaly the same from here out as Jest
    render(<App />);
    const x = screen.getByText('Vite + React');
    expect(x).toBeInTheDocument();
  });
});
