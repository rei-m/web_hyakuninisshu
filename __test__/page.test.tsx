import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import Page from './page';

describe('Page', () => {
  it('renders a heading', async () => {
    await waitFor(() => {
      render(<Page />);
    });

    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toBeInTheDocument();
  });
});
