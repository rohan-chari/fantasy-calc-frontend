<template>
  <div id="app">
    <header class="app-header">
      <div class="app-header__content">
        <div class="app-header__title">
          <h1>Fantasy Trade Calculator</h1>
          <p>Make smarter trades with data-driven insights</p>
        </div>
        <ThemeToggle />
      </div>
    </header>
    
    <main class="app-main">
      <!-- 
        Router view will display the current page component
        - HomeView for setup page
        - TradeView for trade calculator
        - Future views can be added here
      -->
      <div :class="containerClass">
        <router-view />
      </div>
    </main>
    
    <footer class="app-footer">
      <p>&copy; 2024 Fantasy Trade Calculator</p>
    </footer>
  </div>
</template>

<script setup>
// Import components
import ThemeToggle from './components/ThemeToggle.vue'
import { computed } from 'vue'
import { useRoute } from 'vue-router'

// Get current route
const route = useRoute()

// Computed property to determine container class based on route
const containerClass = computed(() => {
  return route.name === 'trade' ? 'trade-calculator-container' : 'calculator-container'
})

// This is the root component - keep it simple
// Add global state, providers, or other app-level logic here if needed
// Views are now handled by Vue Router
</script>
