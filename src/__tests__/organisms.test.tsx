import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { NotificationCenter, Notification } from '../components/organisms';

describe('Organisms', () => {
  describe('NotificationCenter', () => {
    const sampleNotifications: Notification[] = [
      { id: '1', variant: 'success', message: 'File uploaded successfully', title: 'Upload Complete' },
      { id: '2', variant: 'warning', message: 'Your session will expire in 5 minutes' },
      { id: '3', variant: 'error', message: 'Failed to save changes', title: 'Error' },
    ];

    it('renders with a title', () => {
      render(
        <NotificationCenter
          notifications={sampleNotifications}
          onDismiss={vi.fn()}
          title="My Notifications"
        />
      );
      
      expect(screen.getByRole('heading', { name: 'My Notifications' })).toBeInTheDocument();
    });

    it('displays notification count', () => {
      render(
        <NotificationCenter
          notifications={sampleNotifications}
          onDismiss={vi.fn()}
        />
      );
      
      expect(screen.getByText('3 notifications')).toBeInTheDocument();
    });

    it('displays singular form for one notification', () => {
      render(
        <NotificationCenter
          notifications={[sampleNotifications[0]]}
          onDismiss={vi.fn()}
        />
      );
      
      expect(screen.getByText('1 notification')).toBeInTheDocument();
    });

    it('renders all notifications', () => {
      render(
        <NotificationCenter
          notifications={sampleNotifications}
          onDismiss={vi.fn()}
        />
      );
      
      expect(screen.getByText('File uploaded successfully')).toBeInTheDocument();
      expect(screen.getByText('Your session will expire in 5 minutes')).toBeInTheDocument();
      expect(screen.getByText('Failed to save changes')).toBeInTheDocument();
    });

    it('limits visible notifications to maxVisible', () => {
      const manyNotifications: Notification[] = [
        { id: '1', variant: 'info', message: 'Message 1' },
        { id: '2', variant: 'info', message: 'Message 2' },
        { id: '3', variant: 'info', message: 'Message 3' },
        { id: '4', variant: 'info', message: 'Message 4' },
        { id: '5', variant: 'info', message: 'Message 5' },
        { id: '6', variant: 'info', message: 'Message 6' },
      ];

      render(
        <NotificationCenter
          notifications={manyNotifications}
          onDismiss={vi.fn()}
          maxVisible={3}
        />
      );
      
      expect(screen.getByText('Message 1')).toBeInTheDocument();
      expect(screen.getByText('Message 2')).toBeInTheDocument();
      expect(screen.getByText('Message 3')).toBeInTheDocument();
      expect(screen.queryByText('Message 4')).not.toBeInTheDocument();
      expect(screen.getByText('+3 more notifications')).toBeInTheDocument();
    });

    it('calls onDismiss with correct id when notification is dismissed', async () => {
      const user = userEvent.setup();
      const handleDismiss = vi.fn();
      
      render(
        <NotificationCenter
          notifications={sampleNotifications}
          onDismiss={handleDismiss}
        />
      );
      
      // Find all dismiss buttons
      const dismissButtons = screen.getAllByRole('button', { name: 'Dismiss alert' });
      
      // Click the first one
      await user.click(dismissButtons[0]);
      
      expect(handleDismiss).toHaveBeenCalledWith('1');
    });

    it('shows empty state when no notifications', () => {
      render(
        <NotificationCenter
          notifications={[]}
          onDismiss={vi.fn()}
        />
      );
      
      expect(screen.getByText('No notifications')).toBeInTheDocument();
    });

    it('has correct accessibility attributes', () => {
      render(
        <NotificationCenter
          notifications={sampleNotifications}
          onDismiss={vi.fn()}
          title="Notifications"
        />
      );
      
      expect(screen.getByRole('region', { name: 'Notifications' })).toBeInTheDocument();
      expect(screen.getByRole('list', { name: 'Notification list' })).toBeInTheDocument();
    });
  });
});