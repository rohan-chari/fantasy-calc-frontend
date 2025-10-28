<template>
  <div class="calculator-form">
    <!-- League Size Selection -->
    <div class="form-group">
      <label for="leagueSize">League Size</label>
      <select 
        id="leagueSize" 
        v-model="selectedSettings.leagueSize"
        @change="logSettings"
      >
        <option value="">Select league size</option>
        <option value="8">8 Teams</option>
        <option value="10">10 Teams</option>
        <option value="12">12 Teams</option>
        <option value="14">14 Teams</option>
      </select>
    </div>

    <!-- Scoring Format Selection -->
    <div class="form-group">
      <label for="scoringFormat">Scoring Format</label>
      <select 
        id="scoringFormat" 
        v-model="selectedSettings.scoringFormat"
        @change="logSettings"
      >
        <option value="">Select scoring format</option>
        <option value="standard">Standard</option>
        <option value="half-ppr">Half PPR</option>
        <option value="full-ppr">Full PPR</option>
      </select>
    </div>

    <!-- Superflex Type Selection -->
    <div class="form-group">
      <label for="superflexType">Superflex Type</label>
      <select 
        id="superflexType" 
        v-model="selectedSettings.superflexType"
        @change="logSettings"
      >
        <option value="">Select superflex type</option>
        <option value="none">None (Standard 1QB)</option>
        <option value="superflex">Superflex (QB/RB/WR/TE)</option>
        <option value="2qb">2QB</option>
      </select>
    </div>

    <!-- Continue Button -->
    <button 
      class="continue-button"
      :disabled="!isFormValid"
      @click="handleContinue"
    >
      Continue
    </button>

    <!-- 
      Future additions can go here:
      - Trade input fields
      - Player search components
      - Results display components
      - Settings panel
    -->
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

// Router for navigation
const router = useRouter()

// Reactive form data
const selectedSettings = ref({
  leagueSize: '',
  scoringFormat: '',
  superflexType: ''
})

// Computed property to check if form is valid
const isFormValid = computed(() => {
  return selectedSettings.value.leagueSize && 
         selectedSettings.value.scoringFormat && 
         selectedSettings.value.superflexType
})

// Log settings to console when any dropdown changes
const logSettings = () => {
  console.log('Current settings:', selectedSettings.value)
}

// Handle continue button click
const handleContinue = () => {
  if (isFormValid.value) {
    console.log('Form submitted with settings:', selectedSettings.value)
    
    // Navigate to trade calculator page
    router.push('/trade')
    
    // TODO: Store settings in global state or localStorage
    // This is where you would typically:
    // - Store league settings for use in trade calculator
    // - Make API calls to initialize trade data
    // - Show loading states
  }
}

// This component demonstrates:
// - Form handling with Vue 3 Composition API
// - Reactive data binding
// - Computed properties for validation
// - Event handling
// - Clean component structure for future expansion
</script>
