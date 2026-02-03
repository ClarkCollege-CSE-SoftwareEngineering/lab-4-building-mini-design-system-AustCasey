import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Icon, Text, Button, Badge } from '../components/atoms';

describe('Atoms', () => {
  describe('Icon', () => {
    it('renders an icon with the correct aria-label', () => {
      render(<Icon name="check" aria-label="Success icon" />);
      
      expect(screen.getByRole('img', { name: 'Success icon' })).toBeInTheDocument();
    });

    it('renders as aria-hidden when no label is provided', () => {
      render(<Icon name="warning" />);
      
      const svg = document.querySelector('svg');
      expect(svg).toHaveAttribute('aria-hidden', 'true');
    });

    it('uses variant color when provided', () => {
      render(<Icon name="check" variant="success" aria-label="Success" />);
      
      const svg = screen.getByRole('img');
      expect(svg).toHaveAttribute('stroke', '#28a745');
    });

    it('uses custom color over variant when both provided', () => {
      render(<Icon name="check" variant="success" color="#ff0000" aria-label="Custom" />);
      
      const svg = screen.getByRole('img');
      expect(svg).toHaveAttribute('stroke', '#ff0000');
    });
  });

  describe('Text', () => {
    it('renders text content', () => {
      render(<Text>Hello World</Text>);
      
      expect(screen.getByText('Hello World')).toBeInTheDocument();
    });

    it('renders as specified element', () => {
      render(<Text as="h1">Heading</Text>);
      
      expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Heading');
    });

    it('applies correct font size for size prop', () => {
      render(<Text size="lg">Large text</Text>);
      
      const element = screen.getByText('Large text');
      expect(element).toHaveStyle({ fontSize: '18px' });
    });
  });

  describe('Button', () => {
    it('renders button with text', () => {
      render(<Button>Click me</Button>);
      
      expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument();
    });

    it('calls onClick when clicked', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      
      render(<Button onClick={handleClick}>Click me</Button>);
      
      await user.click(screen.getByRole('button'));
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('does not call onClick when disabled', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      
      render(<Button onClick={handleClick} disabled>Click me</Button>);
      
      await user.click(screen.getByRole('button'));
      expect(handleClick).not.toHaveBeenCalled();
    });

    it('uses aria-label when provided', () => {
      render(<Button aria-label="Close dialog">X</Button>);
      
      expect(screen.getByRole('button', { name: 'Close dialog' })).toBeInTheDocument();
    });
  });

  describe('Badge', () => {
    it('renders badge with text', () => {
      render(<Badge>New</Badge>);
        expect(screen.getByText('New')).toBeInTheDocument();
    });

    it('applies correct styles for variant prop', () => {
      render(<Badge variant="success">Success</Badge>);
        const badge = screen.getByText('Success');  
        expect(badge).toHaveStyle({ backgroundColor: '#d4edda', color: '#155724' });
    });

    it('applies correct styles for size prop', () => {
      render(<Badge size="sm">Small Badge</Badge>);
        const badge = screen.getByText('Small Badge');  
        expect(badge).toHaveStyle({ fontSize: '14px', padding: '4px 8px' });
    });

    it('uses aria-label when provided', () => {
      render(<Badge aria-label="Notification count">3</Badge>);
        expect(screen.getByRole('status', { name: 'Notification count' })).toBeInTheDocument();
    });
    });
});