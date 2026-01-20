<template>
  <div class="home-view">
    <div class="calculator-title">
      <h2>Fantasy Trade Calculator</h2>
      <p>Configure your league settings to get started</p>
    </div>
    
    <!-- Main calculator form component -->
    <CalculatorForm />
    
    <!-- 
      Future additions can go here:
      - Recent trades section
      - Quick stats
      - Help/FAQ section
      - User preferences
    -->
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import CalculatorForm from '../components/CalculatorForm.vue'

// Trending data state
const trendingData = ref(null)
const isLoadingTrending = ref(false)
const trendingError = ref(null)

// Fetch trending tickers
const fetchTrending = async () => {
  isLoadingTrending.value = true
  trendingError.value = null

  try {
    const response = await fetch('/api/trending?limit=20')
    const data = await response.json()

    if (data.trending) {
      trendingData.value = data
    } else {
      console.error('Failed to fetch trending:', data)
      trendingError.value = 'Failed to load trending'
    }
  } catch (error) {
    console.error('Error fetching trending:', error)
    trendingError.value = 'Failed to load trending'
  } finally {
    isLoadingTrending.value = false
  }
}

// Fetch trending on mount
onMounted(() => {
  fetchTrending()
})
</script>
