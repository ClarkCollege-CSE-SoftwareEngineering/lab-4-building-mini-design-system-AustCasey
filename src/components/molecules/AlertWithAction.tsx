import React from 'react';
import { Icon, Text, Button } from '../atoms';
import { colors, spacing, AlertVariant } from '../../tokens';
import type { AlertProps } from './Alert';

export interface AlertWithActionProps extends AlertProps {
  actionLabel: string;
  onAction: () => void;
  actionVariant?: 'primary' | 'secondary' | 'ghost';
}

export function AlertWithAction({
  variant,
  message,
  title,
  dismissible = false,
  onDismiss,
  icon,
  actionLabel,
  onAction,
  actionVariant = 'primary',
}: AlertWithActionProps) {
  const defaultIcons: Record<AlertVariant, 'check' | 'warning' | 'error' | 'info'> = {
    success: 'check',
    warning: 'warning',
    error: 'error',
    info: 'info',
  };

  const iconName = icon || defaultIcons[variant];
  const variantColors = colors[variant];

  const containerStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: spacing.md,
    padding: spacing.lg,
    backgroundColor: variantColors.background,
    border: `1px solid ${variantColors.border}`,
    borderRadius: '6px',
    position: 'relative',
  };

  const contentStyle: React.CSSProperties = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: spacing.xs,
  };

 

  return (
    <div role="alert" style={containerStyle}>
      <Icon name={iconName} variant={variant} size={24} aria-label={`${variant} alert`} />

      <div style={contentStyle}>
        {title && (
          <Text weight="bold" color={variantColors.text}>
            {title}
          </Text>
        )}
        <Text color={variantColors.text}>{message}</Text>
      </div>

      <div>
        <Button variant={actionVariant} size="sm" onClick={onAction} aria-label={actionLabel}>
          {actionLabel}
        </Button>

        {dismissible && (
          <Button variant="ghost" size="sm" onClick={onDismiss} aria-label="Dismiss alert">
            <Icon name="close" size={16} color={variantColors.text} />
          </Button>
        )}
      </div>
    </div>
  );
}

export default AlertWithAction;
