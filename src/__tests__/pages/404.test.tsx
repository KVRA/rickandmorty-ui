import { render, screen } from '@testing-library/react';

import { RICK } from '@/__tests__/data';
import HomePage from '@/pages';
import NotFoundPage from '@/pages/404';

describe('404', () => {
  it('renders a heading', () => {
    render(<NotFoundPage />);

    const heading = screen.getByText(/not found/i);

    expect(heading).toBeInTheDocument();
  });
});

describe('Character has name', () => {
  it('renders a heading', () => {
    render(
      <HomePage
        characters={{
          info: {
            count: 1,
            pages: 1,
            next: 'https://rickandmortyapi.com/api/character/?page=2',
            prev: null,
          },
          results: [RICK],
        }}
      />
    );

    const heading = screen.getByText(/rick sanchez/i);

    expect(heading).toBeInTheDocument();
  });
});
