import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Alert, AlertWithAction } from '../components/molecules';

describe('Molecules', () => {
  describe('Alert', () => {
    it('renders with message', () => {
      render(<Alert variant="info" message="This is an info message" />);
      
      expect(screen.getByRole('alert')).toBeInTheDocument();
      expect(screen.getByText('This is an info message')).toBeInTheDocument();
    });

    it('renders with title when provided', () => {
      render(
        <Alert
          variant="success"
          title="Success!"
          message="Your action was completed."
        />
      );
      
      expect(screen.getByText('Success!')).toBeInTheDocument();
      expect(screen.getByText('Your action was completed.')).toBeInTheDocument();
    });

    it('shows dismiss button when dismissible', () => {
      render(
        <Alert
          variant="warning"
          message="Warning message"
          dismissible
        />
      );
      
      expect(screen.getByRole('button', { name: 'Dismiss alert' })).toBeInTheDocument();
    });

    it('does not show dismiss button when not dismissible', () => {
      render(<Alert variant="error" message="Error message" />);
      
      expect(screen.queryByRole('button', { name: 'Dismiss alert' })).not.toBeInTheDocument();
    });

    it('calls onDismiss when dismiss button is clicked', async () => {
      const user = userEvent.setup();
      const handleDismiss = vi.fn();
      
      render(
        <Alert
          variant="info"
          message="Dismissible message"
          dismissible
          onDismiss={handleDismiss}
        />
      );
      
      await user.click(screen.getByRole('button', { name: 'Dismiss alert' }));
      expect(handleDismiss).toHaveBeenCalledTimes(1);
    });

    it('uses default icon based on variant', () => {
      render(<Alert variant="success" message="Success" />);
      
      // The icon should have the success variant's aria-label
      expect(screen.getByRole('img', { name: 'success alert' })).toBeInTheDocument();
    });

    it('uses custom icon when provided', () => {
      render(<Alert variant="info" message="Info with warning icon" icon="warning" />);
      
      // Check that the warning icon path is rendered
      const svg = screen.getByRole('img', { name: 'info alert' });
      expect(svg.querySelector('path')).toBeInTheDocument();
    });

    it('applies correct colors for each variant', () => {
      const { rerender } = render(<Alert variant="success" message="Success" />);
      
      let alert = screen.getByRole('alert');
      expect(alert).toHaveStyle({ backgroundColor: '#d4edda' });
      
      rerender(<Alert variant="error" message="Error" />);
      alert = screen.getByRole('alert');
      expect(alert).toHaveStyle({ backgroundColor: '#f8d7da' });
    });
  });

  describe('AlertWithAction', () => {
    it('renders with action button', () => {
      const handleAction = vi.fn(); 
        render(
            <AlertWithAction
                variant="info"
                message="Action required"
                actionLabel="Take Action"
                onAction={handleAction}
            />
        );
        expect(screen.getByRole('button', { name: 'Take Action' })).toBeInTheDocument();
    });

    it('calls onAction when action button is clicked', async () => {
      const user = userEvent.setup();
      const handleAction = vi.fn();
        render(
            <AlertWithAction
                variant="info"
                message="Action required"   
                actionLabel="Take Action"
                onAction={handleAction}
            />
        );
        await user.click(screen.getByRole('button', { name: 'Take Action' }));
        expect(handleAction).toHaveBeenCalledTimes(1);
    });

    it('shows dismiss button when dismissible', () => {
      render(
        <AlertWithAction
          variant="warning"
          message="Warning with action"
          actionLabel="Fix it"
          onAction={vi.fn()}
          dismissible
        />
      );
        expect(screen.getByRole('button', { name: 'Dismiss alert' })).toBeInTheDocument();
    });

    it('calls onDismiss when dismiss button is clicked', async () => {
      const user = userEvent.setup();
      const handleDismiss = vi.fn();
        render(
            <AlertWithAction
                variant="info"
                message="Dismissible action alert"
                actionLabel="Do something"
                onAction={vi.fn()}
                dismissible
                onDismiss={handleDismiss}
            />
        );
        await user.click(screen.getByRole('button', { name: 'Dismiss alert' }));
        expect(handleDismiss).toHaveBeenCalledTimes(1);
    });
  });
});