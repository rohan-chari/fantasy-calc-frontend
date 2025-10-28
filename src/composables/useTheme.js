import { ref, computed, watch } from 'vue'

// Theme state management composable
export function useTheme() {
  // Reactive theme state
  const isDarkMode = ref(false)
  
  // Initialize theme from localStorage or default to dark
  const initializeTheme = () => {
    const savedTheme = localStorage.getItem('fantasy-calc-theme')
    if (savedTheme) {
      isDarkMode.value = savedTheme === 'dark'
    } else {
      // Default to dark mode for the NFL theme
      isDarkMode.value = true
    }
    applyTheme()
  }
  
  // Apply theme to document
  const applyTheme = () => {
    const root = document.documentElement
    if (isDarkMode.value) {
      root.classList.add('dark-theme')
      root.classList.remove('light-theme')
    } else {
      root.classList.add('light-theme')
      root.classList.remove('dark-theme')
    }
  }
  
  // Toggle theme function
  const toggleTheme = () => {
    isDarkMode.value = !isDarkMode.value
    applyTheme()
    // Save to localStorage
    localStorage.setItem('fantasy-calc-theme', isDarkMode.value ? 'dark' : 'light')
  }
  
  // Computed properties for easy access
  const currentTheme = computed(() => isDarkMode.value ? 'dark' : 'light')
  const themeIcon = computed(() => isDarkMode.value ? '☀️' : '🌙')
  const themeLabel = computed(() => isDarkMode.value ? 'Switch to Light Mode' : 'Switch to Dark Mode')
  
  // Watch for theme changes and apply immediately
  watch(isDarkMode, () => {
    applyTheme()
  })
  
  // Initialize theme on composable creation
  initializeTheme()
  
  return {
    isDarkMode,
    currentTheme,
    themeIcon,
    themeLabel,
    toggleTheme
  }
}
