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
import CalculatorForm from '../components/CalculatorForm.vue'

// This is the main calculator view
// Add any view-specific logic here:
// - Data fetching for league settings
// - User authentication state
// - Navigation between calculator steps
// - Global state management
</script>
