import React from 'react';
import { Icon, Text, Button } from '../atoms';
import { colors, spacing, AlertVariant } from '../../tokens';

export interface AlertProps {
  /** The alert variant determines colors and default icon */
  variant: AlertVariant;
  /** The main message to display */
  message: string;
  /** Optional title for the alert */
  title?: string;
  /** Whether the alert can be dismissed */
  dismissible?: boolean;
  /** Callback when dismiss button is clicked */
  onDismiss?: () => void;
  /** Optional custom icon name */
  icon?: 'check' | 'warning' | 'error' | 'info';
}

/**
 * Alert molecule - combines Icon, Text, and Button atoms.
 * 
 * As Brad Frost describes, molecules are "relatively simple groups
 * of UI elements functioning together as a unit." This Alert
 * combines our atoms to create something more useful than
 * any individual part.
 */
export function Alert({
  variant,
  message,
  title,
  dismissible = false,
  onDismiss,
  icon,
}: AlertProps) {
  // Default icon based on variant
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
    alignItems: 'flex-start',
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
      <Icon
        name={iconName}
        variant={variant}
        size={24}
        aria-label={`${variant} alert`}
      />
      
      <div style={contentStyle}>
        {title && (
          <Text weight="bold" color={variantColors.text}>
            {title}
          </Text>
        )}
        <Text color={variantColors.text}>{message}</Text>
      </div>

      {dismissible && (
        <Button
          variant="ghost"
          size="sm"
          onClick={onDismiss}
          aria-label="Dismiss alert"
        >
          <Icon name="close" size={16} color={variantColors.text} />
        </Button>
      )}
    </div>
  );
}