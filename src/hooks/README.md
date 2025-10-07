# React Hooks Directory

**Location:** `/src/hooks/`  
**Purpose:** Custom React hooks for reusable component logic  
**Convention:** All files follow `useXxxXxx.ts` naming pattern

## 🎣 What are React Hooks?

**Hooks** are special functions that let you "hook into" React features from your components. They allow you to use state and other React features without writing a class component.

### Built-in vs Custom Hooks

```typescript
// ✅ BUILT-IN HOOKS (provided by React)
import { useState, useEffect } from 'react';

function MyComponent() {
  const [count, setCount] = useState(0);        // State management
  
  useEffect(() => {                             // Side effects
    document.title = `Count: ${count}`;
  }, [count]);
  
  return <div>Count: {count}</div>;
}

// ✅ CUSTOM HOOKS (your own reusable logic)
import { useCSRFToken } from '@/hooks/useCSRFToken';

function ContactForm() {
  const { csrfToken, addToJSON } = useCSRFToken();  // Custom security logic
  
  return <form>/* form content */</form>;
}
```

### Hook Rules (Must Follow)

1. **Only call hooks at the top level** - Never inside loops, conditions, or nested functions
2. **Only call hooks from React functions** - Components or other custom hooks
3. **Hook names must start with "use"** - This is enforced by React's linting rules

```typescript
// ✅ CORRECT
function MyComponent() {
  const [state, setState] = useState(0);     // ✅ Top level
  const data = useMyCustomHook();            // ✅ Top level
  
  if (condition) {
    return <div>Loading...</div>;
  }
  
  return <div>{data}</div>;
}

// ❌ WRONG
function MyComponent() {
  if (condition) {
    const [state, setState] = useState(0);   // ❌ Inside condition
  }
  
  const data = customFunction();             // ❌ Doesn't start with "use"
  
  return <div>{data}</div>;
}
```

## 📁 Directory Structure

```
src/hooks/
├── README.md           # This documentation
├── useCSRFToken.ts     # CSRF token management for forms
└── [future hooks]      # Additional custom hooks as needed
```

## 🎯 Current Hooks

### `useCSRFToken.ts` - CSRF Protection Hook

**Purpose:** Manages CSRF tokens for secure form submissions  
**Security:** Prevents cross-site request forgery attacks  
**Used by:** Contact forms, quote requests, newsletter signups

#### Hook API
```typescript
import { useCSRFToken } from '@/hooks/useCSRFToken';

const {
  csrfToken,        // string | null - The CSRF token
  loading,          // boolean - Is token still loading?
  refreshToken,     // () => void - Refresh token (reloads page)
  addToFormData,    // (formData: FormData) => FormData - Add token to FormData
  addToJSON,        // (data: object) => object - Add token to JSON object
  getHeaders        // () => HeadersInit - Get headers with token
} = useCSRFToken();
```

#### Basic Usage Example
```typescript
import { useCSRFToken } from '@/hooks/useCSRFToken';

function ContactForm() {
  const { csrfToken, addToJSON, getHeaders, loading } = useCSRFToken();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: ''
  });

  if (loading) {
    return <div>Loading security token...</div>;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: getHeaders(), // Includes CSRF token in headers
        body: JSON.stringify(addToJSON(formData)) // Includes token in body
      });
      
      if (response.ok) {
        alert('Form submitted successfully!');
      } else {
        alert('Form submission failed');
      }
    } catch (error) {
      console.error('Submission error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={formData.firstName}
        onChange={(e) => setFormData({...formData, firstName: e.target.value})}
        placeholder="First Name"
        required
      />
      {/* More form fields... */}
      <button type="submit">Submit</button>
    </form>
  );
}
```

#### Advanced Usage - FormData Example
```typescript
import { useCSRFToken } from '@/hooks/useCSRFToken';

function FileUploadForm() {
  const { addToFormData, loading } = useCSRFToken();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const formData = new FormData(e.target as HTMLFormElement);
    
    // Add CSRF token to FormData
    const secureFormData = addToFormData(formData);
    
    const response = await fetch('/api/upload', {
      method: 'POST',
      body: secureFormData // CSRF token automatically included
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="file" type="file" required />
      <input name="description" type="text" placeholder="File description" />
      <button type="submit" disabled={loading}>
        {loading ? 'Loading...' : 'Upload File'}
      </button>
    </form>
  );
}
```

#### Error Handling Example
```typescript
import { useCSRFToken } from '@/hooks/useCSRFToken';

function SecureForm() {
  const { csrfToken, addToJSON, getHeaders, refreshToken } = useCSRFToken();
  const [error, setError] = useState('');

  const handleSubmit = async (formData: any) => {
    try {
      const response = await fetch('/api/secure-endpoint', {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(addToJSON(formData))
      });

      if (response.status === 403) {
        // CSRF token validation failed
        setError('Security validation failed. Refreshing...');
        refreshToken(); // This will reload the page to get a new token
        return;
      }

      if (!response.ok) {
        throw new Error('Request failed');
      }

      // Success handling...
    } catch (error) {
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div>
      {error && <div className="error">{error}</div>}
      {/* Form content */}
    </div>
  );
}
```

#### Security Flow Explanation
```typescript
// 1. Middleware automatically sets CSRF token cookie when user visits form pages
// src/middleware.ts: Sets csrf_token=abc123xyz789

// 2. useCSRFToken hook reads the token from cookie
const { csrfToken } = useCSRFToken(); // csrfToken = "abc123xyz789"

// 3. Form submission includes token in two places for validation
const payload = {
  message: "Hello",
  _csrf_token: "abc123xyz789"  // In request body
};
const headers = {
  "X-CSRF-Token": "abc123xyz789"  // In request headers
};

// 4. API route validates both tokens match the cookie
// src/app/api/contact/route.ts: Validates tokens → Processes request
```

## 📋 Hook Development Guidelines

### ✅ Best Practices
- **Naming:** Always start with `use` (React convention)
- **TypeScript:** Full type safety with proper interfaces
- **Client-side:** Use `"use client"` directive for browser-only hooks
- **Documentation:** Include comprehensive JSDoc comments
- **Error handling:** Graceful fallbacks for edge cases
- **Single responsibility:** Each hook should do one thing well

### 📝 Hook Template
```typescript
/**
 * Brief description of the hook
 * 
 * LOCATION: /src/hooks/useXxxXxx.ts
 * PURPOSE: What problem does this solve?
 * USED BY: Which components use this?
 * 
 * USAGE EXAMPLE:
 * ```tsx
 * import { useXxxXxx } from '@/hooks/useXxxXxx';
 * 
 * function MyComponent() {
 *   const { data, loading, error } = useXxxXxx();
 *   
 *   if (loading) return <div>Loading...</div>;
 *   if (error) return <div>Error: {error}</div>;
 *   
 *   return <div>{data}</div>;
 * }
 * ```
 */

"use client";

import { useState, useEffect } from 'react';

export function useXxxXxx() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Hook logic here
  }, []);

  return {
    data,
    loading,
    error,
    // Additional utilities...
  };
}
```

## 🔄 Common Hook Patterns

### State Management Hook
```typescript
function useToggle(initialValue = false) {
  const [value, setValue] = useState(initialValue);
  const toggle = useCallback(() => setValue(v => !v), []);
  return [value, toggle] as const;
}

// Usage
const [isOpen, toggleOpen] = useToggle(false);
```

### Data Fetching Hook
```typescript
function useApi<T>(url: string) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(setData)
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, [url]);

  return { data, loading, error };
}
```

### Local Storage Hook
```typescript
function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  };

  return [storedValue, setValue] as const;
}
```

## 🔄 Future Hooks (Potential)

Hooks that could be added as the application grows:

- `useLocalStorage.ts` - Persistent client-side storage
- `useDebounce.ts` - Debounced input handling  
- `useMediaQuery.ts` - Responsive design utilities
- `useAnalytics.ts` - Track user interactions
- `useFormValidation.ts` - Reusable form validation logic
- `useApi.ts` - Data fetching with caching
- `useToggle.ts` - Boolean state management
- `useTimeout.ts` - Timeout management
- `useInterval.ts` - Interval management

## 🏗️ Architecture Benefits

### Code Reusability
- Share logic between multiple components
- Consistent behavior across the application
- Easier testing and maintenance

### Separation of Concerns  
- Components focus on UI rendering
- Hooks handle business logic and state
- Clear responsibility boundaries

### Type Safety
- Full TypeScript support
- Compile-time error catching
- Better developer experience

## 📚 Resources

- [React Hooks Documentation](https://react.dev/reference/react)
- [Custom Hooks Best Practices](https://react.dev/learn/reusing-logic-with-custom-hooks)
- [TypeScript with React Hooks](https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/hooks)
- [CSRF Protection Guide](https://owasp.org/www-community/attacks/csrf)