import React from 'react';
import { colors, spacing, typography } from '../../tokens';

export interface BadgeProps {
  /** Content inside the badge (text or element) */
  children: React.ReactNode;
  /** Visual variant */
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'error';
  /** Size */
  size?: 'sm' | 'md';
  /** Accessible label */
  'aria-label'?: string;
  /** Additional class name */
  className?: string;
}

/**
 * Badge atom - small label used for statuses, counts, or tags.
 */
export function Badge({
  children,
  variant = 'default',
  size = 'md',
  'aria-label': ariaLabel,
  className,
}: BadgeProps) {
  const sizeStyles: Record<BadgeProps['size'] & string, React.CSSProperties> = {
    sm: {
      padding: `${spacing.xs} ${spacing.sm}`,
      fontSize: typography.fontSize.sm,
    },
    md: {
      padding: `${spacing.sm} ${spacing.md}`,
      fontSize: typography.fontSize.base,
    },
  };

  const variantStyles: Record<BadgeProps['variant'] & string, React.CSSProperties> = {
    default: {
      backgroundColor: colors.neutral.gray200,
      color: colors.neutral.gray800,
      border: `1px solid ${colors.neutral.gray300}`,
    },
    primary: {
      backgroundColor: colors.info.icon,
      color: colors.neutral.white,
      border: 'none',
    },
    success: {
      backgroundColor: colors.success.background,
      color: colors.success.text,
      border: `1px solid ${colors.success.border}`,
    },
    warning: {
      backgroundColor: colors.warning.background,
      color: colors.warning.text,
      border: `1px solid ${colors.warning.border}`,
    },
    error: {
      backgroundColor: colors.error.background,
      color: colors.error.text,
      border: `1px solid ${colors.error.border}`,
    },
  };

  const baseStyle: React.CSSProperties = {
    fontFamily: typography.fontFamily.base,
        fontWeight: typography.fontWeight.medium,
        borderRadius: '4px',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: spacing.xs,
        transition: 'background-color 0.2s, opacity 0.2s',
        ...sizeStyles[size],
        ...variantStyles[variant],
  };

  return (
    <span style={baseStyle} aria-label={ariaLabel} role={ariaLabel ? 'status' : undefined} className={className}>
      {children}
    </span>
  );
}

export default Badge;
