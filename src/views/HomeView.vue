<template>
  <div class="home-view">
    <div class="home-content">
      <!-- Left side: Calculator -->
      <div class="calculator-section">
        <div class="calculator-title">
          <h2>Fantasy Trade Calculator</h2>
          <p>Configure your league settings to get started</p>
        </div>
        <CalculatorForm />
      </div>

      <!-- Right side: Trending -->
      <div class="trending-section">
        <div class="trending-header">
          <h3 class="trending-title">Trending</h3>
          <span v-if="trendingData" class="trending-source">{{ trendingData.source }}</span>
        </div>

        <!-- Loading State -->
        <div v-if="isLoadingTrending" class="trending-loading">
          <span>Loading...</span>
        </div>

        <!-- Error State -->
        <div v-else-if="trendingError" class="trending-error">
          <span>{{ trendingError }}</span>
        </div>

        <!-- Trending List -->
        <div v-else-if="trendingData" class="trending-list">
          <div
            v-for="item in trendingData.trending"
            :key="item.symbol"
            class="trending-item"
          >
            <span class="trending-rank">#{{ item.rank }}</span>
            <span class="trending-symbol">{{ item.symbol }}</span>
            <div class="trending-stats">
              <span class="trending-mentions">{{ item.mentionCount }} mentions</span>
            </div>
          </div>
        </div>
      </div>
    </div>
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

    if (data.error) {
      console.error('Failed to fetch trending:', data.error)
      trendingError.value = data.error
    } else if (data.trending && data.trending.length > 0) {
      trendingData.value = data
    } else {
      trendingError.value = 'No trending data available'
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

<style scoped>
.home-content {
  display: flex;
  gap: var(--space-xl);
  align-items: flex-start;
  width: 100%;
  max-width: 1000px;
}

.calculator-section {
  flex: 1;
  min-width: 0;
}

.trending-section {
  width: 280px;
  flex-shrink: 0;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: var(--space-lg);
  max-height: 500px;
  overflow-y: auto;
}

.trending-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--space-md);
  padding-bottom: var(--space-sm);
  border-bottom: 1px solid var(--color-border);
}

.trending-title {
  font-size: var(--font-size-base);
  font-weight: 700;
  color: var(--color-text-primary);
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.trending-source {
  font-size: var(--font-size-xs);
  color: var(--color-text-muted);
  font-style: italic;
}

.trending-loading,
.trending-error {
  text-align: center;
  padding: var(--space-xl);
  color: var(--color-text-secondary);
  font-size: var(--font-size-sm);
}

.trending-error {
  color: var(--color-accent-orange);
}

.trending-list {
  display: flex;
  flex-direction: column;
  gap: var(--space-xs);
}

.trending-item {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  padding: var(--space-sm);
  background: var(--color-surface-elevated);
  border-radius: var(--radius-sm);
  transition: all var(--theme-transition);
}

.trending-item:hover {
  background: var(--color-border);
  transform: translateX(2px);
}

.trending-rank {
  font-size: var(--font-size-xs);
  color: var(--color-text-muted);
  width: 24px;
  flex-shrink: 0;
}

.trending-symbol {
  font-size: var(--font-size-sm);
  font-weight: 700;
  color: var(--color-accent-orange);
  flex: 1;
}

.trending-stats {
  text-align: right;
}

.trending-mentions {
  font-size: var(--font-size-xs);
  color: var(--color-text-secondary);
}

/* Responsive: stack on smaller screens */
@media (max-width: 768px) {
  .home-content {
    flex-direction: column;
  }

  .trending-section {
    width: 100%;
    max-height: 300px;
  }
}
</style>
