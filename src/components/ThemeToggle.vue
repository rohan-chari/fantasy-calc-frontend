<template>
  <button 
    class="theme-toggle"
    :class="{ 'theme-toggle--light': !isDarkMode }"
    @click="toggleTheme"
    :aria-label="themeLabel"
    :title="themeLabel"
  >
    <span class="theme-toggle__icon">{{ themeIcon }}</span>
  </button>
</template>

<script setup>
import { useTheme } from '../composables/useTheme.js'

// Use the theme composable
const { isDarkMode, themeIcon, themeLabel, toggleTheme } = useTheme()

// This component provides:
// - A circular toggle button with sun/moon icons
// - Accessibility labels and titles
// - Responsive design for mobile and desktop
// - Smooth transitions between themes
</script>
