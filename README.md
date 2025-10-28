# README

## Fantasy Calculator - Vue 3 Frontend

A minimal, clean Vue 3 frontend setup using the Composition API.

### Project Structure

```
/src
  /components     # Reusable UI components
  /views         # Page-level components
  /assets        # Static assets (images, fonts, etc.)
  /composables   # Reusable composition functions
  App.vue        # Root component
  main.js        # Application entry point
```

### Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start development server:
   ```bash
   npm run dev
   ```

3. Build for production:
   ```bash
   npm run build
   ```

### Adding New Components

- **Views**: Add page-level components in `/src/views/`
- **Components**: Add reusable components in `/src/components/`
- **Composables**: Add reusable logic in `/src/composables/`

### Example Usage

The app includes:
- A `HomeView` component demonstrating view structure
- A `WelcomeCard` component showing props and reactive state
- Clean CSS styling with scoped styles
- Comments explaining where to add new features

### Dependencies

- Vue 3 (Composition API)
- Vite (build tool)
- No additional libraries - keep it simple!
