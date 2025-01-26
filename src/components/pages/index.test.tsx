import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import IndexPage from './index';
import StoreProvider from '@/app/StoreProvider';

describe('pages/index', () => {
  it('renders a heading', async () => {
    await waitFor(() => {
      render(
        <StoreProvider>
          <IndexPage />
        </StoreProvider>
      );
    });

    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toBeInTheDocument();
  });
});
