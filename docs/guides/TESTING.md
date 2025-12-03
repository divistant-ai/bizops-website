# Testing Guide

Panduan lengkap testing di BizOps Website V3 menggunakan Vitest dan Playwright.

## 📚 Table of Contents

- [Overview](#overview)
- [Unit Testing](#unit-testing)
- [Integration Testing](#integration-testing)
- [E2E Testing](#e2e-testing)
- [Best Practices](#best-practices)

## 🎯 Overview

### Testing Stack

- **Unit Tests:** Vitest + React Testing Library
- **E2E Tests:** Playwright
- **Coverage:** Vitest Coverage

### Running Tests

```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Coverage
npm run test:coverage

# Watch mode
npm run test:watch
```

## 🧪 Unit Testing

### Testing Components

```tsx
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Button } from '@/components/ui/Button';

describe('Button Component', () => {
  it('renders with children text', () => {
    render(<Button>Click me</Button>);

    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('handles click events', async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();

    render(<Button onClick={handleClick}>Click me</Button>);
    await user.click(screen.getByText('Click me'));

    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
```

### Testing Hooks

```tsx
import { renderHook, waitFor } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { useDebounce } from '@/hooks/useDebounce';

describe('useDebounce', () => {
  it('should debounce value changes', async () => {
    const { result, rerender } = renderHook(
      ({ value }) => useDebounce(value, 500),
      { initialProps: { value: 'initial' } },
    );

    expect(result.current).toBe('initial');

    rerender({ value: 'updated' });

    expect(result.current).toBe('initial');

    await waitFor(
      () => expect(result.current).toBe('updated'),
      { timeout: 600 },
    );
  });
});
```

### Testing Utils

```tsx
import { describe, expect, it } from 'vitest';
import { formatCurrency, formatDate } from '@/utils/format';

describe('Format Utils', () => {
  it('should format currency correctly', () => {
    expect(formatCurrency(2500000)).toBe('Rp2.500.000');
  });

  it('should format date correctly', () => {
    const date = new Date('2024-12-01');
    const formatted = formatDate(date, 'id-ID');

    expect(formatted).toContain('2024');
  });
});
```

## 🔗 Integration Testing

### Testing API Routes

```tsx
import { describe, expect, it } from 'vitest';
import { GET } from '@/app/api/users/route';

describe('Users API', () => {
  it('should return users list', async () => {
    const request = new Request('http://localhost:3000/api/users');
    const response = await GET(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data).toHaveProperty('users');
  });
});
```

### Testing Server Actions

```tsx
import { describe, expect, it } from 'vitest';
import { createUser } from '@/app/actions/users';

describe('User Actions', () => {
  it('should create a new user', async () => {
    const result = await createUser({
      name: 'John Doe',
      email: 'john@example.com',
    });

    expect(result.success).toBe(true);
    expect(result.user).toHaveProperty('id');
  });
});
```

## 🎭 E2E Testing

### Testing User Flows

```typescript
import { expect, test } from '@playwright/test';

test.describe('User Authentication', () => {
  test('should login successfully', async ({ page }) => {
    await page.goto('/login');

    await page.fill('input[name="email"]', 'user@example.com');
    await page.fill('input[name="password"]', 'password123');
    await page.click('button[type="submit"]');

    await expect(page).toHaveURL('/dashboard');
    await expect(page.getByText('Welcome back')).toBeVisible();
  });
});
```

### Testing Navigation

```typescript
import { expect, test } from '@playwright/test';

test.describe('Navigation', () => {
  test('should navigate to services page', async ({ page }) => {
    await page.goto('/');

    await page.click('a[href="/services"]');

    await expect(page).toHaveURL('/services');
    await expect(page.getByRole('heading', { name: 'Our Services' })).toBeVisible();
  });
});
```

### Testing Forms

```typescript
import { expect, test } from '@playwright/test';

test.describe('Contact Form', () => {
  test('should submit contact form', async ({ page }) => {
    await page.goto('/contact');

    await page.fill('input[name="name"]', 'John Doe');
    await page.fill('input[name="email"]', 'john@example.com');
    await page.fill('textarea[name="message"]', 'Test message');
    await page.click('button[type="submit"]');

    await expect(page.getByText('Message sent successfully')).toBeVisible();
  });

  test('should show validation errors', async ({ page }) => {
    await page.goto('/contact');

    await page.click('button[type="submit"]');

    await expect(page.getByText('Name is required')).toBeVisible();
    await expect(page.getByText('Email is required')).toBeVisible();
  });
});
```

## ✅ Best Practices

### 1. Use Data-testid for Complex Selectors

```tsx
<button data-testid="submit-button">Submit</button>;

// Test
screen.getByTestId('submit-button');
```

### 2. Test User Behavior, Not Implementation

❌ **Bad:**
```tsx
expect(component.state.count).toBe(1);
```

✅ **Good:**
```tsx
expect(screen.getByText('Count: 1')).toBeInTheDocument();
```

### 3. Use Semantic Queries

**Priority:**
1. `getByRole` - Accessibility-friendly
2. `getByLabelText` - Form elements
3. `getByText` - Text content
4. `getByTestId` - Last resort

```tsx
// ✅ Good
screen.getByRole('button', { name: 'Submit' });
screen.getByLabelText('Email');
screen.getByText('Welcome');

// ❌ Bad
screen.getByTestId('button-1');
```

### 4. Clean Up After Tests

```tsx
import { afterEach, beforeEach } from 'vitest';

beforeEach(() => {
  // Setup
  localStorage.clear();
});

afterEach(() => {
  // Cleanup
  vi.clearAllMocks();
});
```

### 5. Mock External Dependencies

```tsx
import { vi } from 'vitest';

vi.mock('@/utils/api', () => ({
  fetchUsers: vi.fn(() => Promise.resolve([
    { id: 1, name: 'John' },
  ])),
}));
```

### 6. Test Error States

```tsx
it('should handle API errors', async () => {
  vi.mocked(fetchUsers).mockRejectedValue(new Error('API Error'));

  render(<UserList />);

  await waitFor(() => {
    expect(screen.getByText('Failed to load users')).toBeInTheDocument();
  });
});
```

### 7. Use Fixtures for E2E Tests

```typescript
// fixtures/auth.ts
export const authenticatedUser = {
  email: 'user@example.com',
  password: 'password123',
};

// test
test.use({ storageState: 'auth.json' });
```

## 📊 Coverage Goals

### Target Coverage

- **Statements:** 80%+
- **Branches:** 75%+
- **Functions:** 80%+
- **Lines:** 80%+

### Check Coverage

```bash
npm run test:coverage
```

### View Coverage Report

```bash
open coverage/index.html
```

## 🔍 Debugging Tests

### Vitest Debug

```bash
# Debug mode
npm run test -- --inspect-brk

# UI mode
npm run test -- --ui
```

### Playwright Debug

```bash
# Debug mode
npm run test:e2e -- --debug

# Headed mode
npm run test:e2e -- --headed

# Slow motion
npm run test:e2e -- --slow-mo=1000
```

### Debug in VSCode

```json
{
  "type": "node",
  "request": "launch",
  "name": "Vitest Debug",
  "runtimeExecutable": "npm",
  "runtimeArgs": ["run", "test", "--", "--inspect-brk"],
  "console": "integratedTerminal"
}
```

## 📋 Testing Checklist

Before committing:

- [ ] All tests pass
- [ ] Coverage meets targets
- [ ] No console errors/warnings
- [ ] E2E tests for critical flows
- [ ] Error states tested
- [ ] Loading states tested
- [ ] Accessibility tested

## 🔗 Resources

- [Vitest Docs](https://vitest.dev/)
- [Playwright Docs](https://playwright.dev/)
- [Testing Library](https://testing-library.com/)
- [Testing Best Practices](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)

---

**Last Updated:** December 1, 2024
