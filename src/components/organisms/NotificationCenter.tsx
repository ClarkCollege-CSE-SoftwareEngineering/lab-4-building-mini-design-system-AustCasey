import React from 'react';
import { Alert } from '../molecules';
import { Text } from '../atoms';
import { spacing, colors, AlertVariant } from '../../tokens';

export interface Notification {
  /** Unique identifier for the notification */
  id: string;
  /** Alert variant */
  variant: AlertVariant;
  /** Notification message */
  message: string;
  /** Optional title */
  title?: string;
}

export interface NotificationCenterProps {
  /** Array of notifications to display */
  notifications: Notification[];
  /** Callback when a notification is dismissed */
  onDismiss: (id: string) => void;
  /** Optional title for the notification center */
  title?: string;
  /** Maximum number of notifications to show */
  maxVisible?: number;
}

/**
 * NotificationCenter organism - displays and manages multiple alerts.
 * 
 * As Frost describes, organisms are "relatively complex UI components
 * composed of groups of molecules and/or atoms." This component
 * composes multiple Alert molecules into a functional notification
 * system.
 */
export function NotificationCenter({
  notifications,
  onDismiss,
  title = 'Notifications',
  maxVisible = 5,
}: NotificationCenterProps) {
  const visibleNotifications = notifications.slice(0, maxVisible);
  const hiddenCount = notifications.length - maxVisible;

  const containerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: spacing.md,
    padding: spacing.lg,
    backgroundColor: colors.neutral.white,
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    maxWidth: '400px',
  };

  const headerStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: spacing.md,
    borderBottom: `1px solid ${colors.neutral.gray200}`,
  };

  const listStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: spacing.sm,
  };

  if (notifications.length === 0) {
    return (
      <div style={containerStyle} role="region" aria-label={title}>
        <div style={headerStyle}>
          <Text as="h2" size="lg" weight="bold">
            {title}
          </Text>
        </div>
        <Text color={colors.neutral.gray600}>No notifications</Text>
      </div>
    );
  }

  return (
    <div style={containerStyle} role="region" aria-label={title}>
      <div style={headerStyle}>
        <Text as="h2" size="lg" weight="bold">
          {title}
        </Text>
        <Text size="sm" color={colors.neutral.gray600}>
          {notifications.length} {notifications.length === 1 ? 'notification' : 'notifications'}
        </Text>
      </div>

      <div style={listStyle} role="list" aria-label="Notification list">
        {visibleNotifications.map((notification) => (
          <div key={notification.id} role="listitem">
            <Alert
              variant={notification.variant}
              message={notification.message}
              title={notification.title}
              dismissible
              onDismiss={() => onDismiss(notification.id)}
            />
          </div>
        ))}
      </div>

      {hiddenCount > 0 && (
        <Text size="sm" color={colors.neutral.gray600}>
          +{hiddenCount} more {hiddenCount === 1 ? 'notification' : 'notifications'}
        </Text>
      )}
    </div>
  );
}