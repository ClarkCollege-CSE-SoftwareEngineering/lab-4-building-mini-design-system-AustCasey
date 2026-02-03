import { describe, it, expect } from 'vitest';
import * as Components from '../components';

describe('components index exports', () => {
  it('exports atoms, molecules, and organisms namespaces', () => {
    expect(Components).toBeDefined();
  });
});
