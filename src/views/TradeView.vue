<template>
  <div class="trade-view">
    <!-- Header with Back Button -->
    <div class="trade-header">
      <button 
        class="back-button"
        @click="goBack"
        aria-label="Go back to setup"
      >
        ← Back
      </button>
      <h1 class="trade-title">Fantasy Trade Calculator</h1>
    </div>

    <!-- Trade Calculator Content -->
    <div class="trade-content">
      <!-- Team 1 Section -->
      <div class="team-section">
        <h2 class="team-title">Team 1</h2>
        <div class="search-container">
          <input
            v-model="searchQueryTeam1"
            type="text"
            placeholder="Search for players..."
            class="search-input"
            @input="handleSearchTeam1"
            @focus="showDropdownTeam1 = true"
            @blur="hideDropdownTeam1"
            ref="searchInputTeam1"
          />
          <!-- Search Results Dropdown for Team 1 -->
          <div 
            v-if="showDropdownTeam1 && searchResultsTeam1.length > 0" 
            class="search-dropdown"
          >
            <div 
              v-for="player in searchResultsTeam1" 
              :key="player.player_id"
              class="search-result-item"
              @click="selectPlayerTeam1(player)"
            >
              <div class="player-headshot">
                <img 
                  :src="player.headshot_url" 
                  :alt="player.full_name"
                  class="headshot-image"
                  @error="handleImageError"
                />
              </div>
              <div class="player-info">
                <span class="player-name">{{ player.full_name }}</span>
                <span class="player-details">{{ player.position }} • {{ player.team }}</span>
              </div>
            </div>
          </div>
          <!-- No Results Message -->
          <div 
            v-if="showDropdownTeam1 && searchResultsTeam1.length === 0 && searchQueryTeam1 && !isSearchingTeam1" 
            class="search-dropdown no-results"
          >
            <div class="no-results-message">No players found</div>
          </div>
          <!-- Loading State -->
          <div 
            v-if="isSearchingTeam1" 
            class="search-dropdown loading"
          >
            <div class="loading-message">Searching...</div>
          </div>
        </div>
        <div class="players-container">
          <div class="players-placeholder">
            <p class="placeholder-text">Selected players will appear here</p>
            <div class="placeholder-list">
              <div 
                v-for="player in team1Players" 
                :key="player.id"
                class="player-item"
              >
                <div class="player-headshot">
                  <img 
                    :src="player.headshot_url" 
                    :alt="player.name"
                    class="headshot-image"
                    @error="handleImageError"
                  />
                </div>
                <div class="player-info">
                  <span class="player-name">{{ player.name }}</span>
                  <span class="player-details">{{ player.position }} • {{ player.team }}</span>
                </div>
                <button 
                  class="remove-player-btn"
                  @click="removePlayerTeam1(player.id)"
                  aria-label="Remove player"
                >
                  ×
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Team 2 Section -->
      <div class="team-section">
        <h2 class="team-title">Team 2</h2>
        <div class="search-container">
          <input
            v-model="searchQueryTeam2"
            type="text"
            placeholder="Search for players..."
            class="search-input"
            @input="handleSearchTeam2"
            @focus="showDropdownTeam2 = true"
            @blur="hideDropdownTeam2"
            ref="searchInputTeam2"
          />
          <!-- Search Results Dropdown for Team 2 -->
          <div 
            v-if="showDropdownTeam2 && searchResultsTeam2.length > 0" 
            class="search-dropdown"
          >
            <div 
              v-for="player in searchResultsTeam2" 
              :key="player.player_id"
              class="search-result-item"
              @click="selectPlayerTeam2(player)"
            >
              <div class="player-headshot">
                <img 
                  :src="player.headshot_url" 
                  :alt="player.full_name"
                  class="headshot-image"
                  @error="handleImageError"
                />
              </div>
              <div class="player-info">
                <span class="player-name">{{ player.full_name }}</span>
                <span class="player-details">{{ player.position }} • {{ player.team }}</span>
              </div>
            </div>
          </div>
          <!-- No Results Message -->
          <div 
            v-if="showDropdownTeam2 && searchResultsTeam2.length === 0 && searchQueryTeam2 && !isSearchingTeam2" 
            class="search-dropdown no-results"
          >
            <div class="no-results-message">No players found</div>
          </div>
          <!-- Loading State -->
          <div 
            v-if="isSearchingTeam2" 
            class="search-dropdown loading"
          >
            <div class="loading-message">Searching...</div>
          </div>
        </div>
        <div class="players-container">
          <div class="players-placeholder">
            <p class="placeholder-text">Selected players will appear here</p>
            <div class="placeholder-list">
              <div 
                v-for="player in team2Players" 
                :key="player.id"
                class="player-item"
              >
                <div class="player-headshot">
                  <img 
                    :src="player.headshot_url" 
                    :alt="player.name"
                    class="headshot-image"
                    @error="handleImageError"
                  />
                </div>
                <div class="player-info">
                  <span class="player-name">{{ player.name }}</span>
                  <span class="player-details">{{ player.position }} • {{ player.team }}</span>
                </div>
                <button 
                  class="remove-player-btn"
                  @click="removePlayerTeam2(player.id)"
                  aria-label="Remove player"
                >
                  ×
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Future additions can go here:
      - Trade analysis section
      - Player comparison tools
      - Trade value calculations
      - Save/load trade functionality
    -->
  </div>
</template>

<script setup>
import { ref, watch, nextTick } from 'vue'
import { useRouter } from 'vue-router'

// Router for navigation
const router = useRouter()

// Reactive data for search queries
const searchQueryTeam1 = ref('')
const searchQueryTeam2 = ref('')

// Reactive data for search results
const searchResultsTeam1 = ref([])
const searchResultsTeam2 = ref([])

// Reactive data for dropdown visibility
const showDropdownTeam1 = ref(false)
const showDropdownTeam2 = ref(false)

// Reactive data for loading states
const isSearchingTeam1 = ref(false)
const isSearchingTeam2 = ref(false)

// Reactive data for selected players
const team1Players = ref([])
const team2Players = ref([])

// Debounce timers
let debounceTimerTeam1 = null
let debounceTimerTeam2 = null

// Refs for search inputs
const searchInputTeam1 = ref(null)
const searchInputTeam2 = ref(null)

// Navigation function
const goBack = () => {
  router.push('/')
}

// API call to search for players
const searchPlayers = async (query) => {
  try {
    const response = await fetch(`/api/players/search?name=${encodeURIComponent(query)}`)
    const data = await response.json()
    
    if (data.success) {
      return data.data
    } else {
      console.error('Search failed:', data)
      return []
    }
  } catch (error) {
    console.error('Error searching players:', error)
    return []
  }
}

// Debounced search for Team 1
const handleSearchTeam1 = () => {
  clearTimeout(debounceTimerTeam1)
  
  if (!searchQueryTeam1.value.trim()) {
    searchResultsTeam1.value = []
    showDropdownTeam1.value = false
    return
  }
  
  isSearchingTeam1.value = true
  showDropdownTeam1.value = true
  
  debounceTimerTeam1 = setTimeout(async () => {
    const results = await searchPlayers(searchQueryTeam1.value)
    searchResultsTeam1.value = results
    isSearchingTeam1.value = false
  }, 400)
}

// Debounced search for Team 2
const handleSearchTeam2 = () => {
  clearTimeout(debounceTimerTeam2)
  
  if (!searchQueryTeam2.value.trim()) {
    searchResultsTeam2.value = []
    showDropdownTeam2.value = false
    return
  }
  
  isSearchingTeam2.value = true
  showDropdownTeam2.value = true
  
  debounceTimerTeam2 = setTimeout(async () => {
    const results = await searchPlayers(searchQueryTeam2.value)
    searchResultsTeam2.value = results
    isSearchingTeam2.value = false
  }, 400)
}

// Select player for Team 1
const selectPlayerTeam1 = (player) => {
  // Add player to team 1 list
  team1Players.value.push({
    id: player.player_id,
    name: player.full_name,
    position: player.position,
    team: player.team,
    headshot_url: player.headshot_url
  })
  
  // Clear search and hide dropdown
  searchQueryTeam1.value = ''
  searchResultsTeam1.value = []
  showDropdownTeam1.value = false
  
  // Focus back to input
  nextTick(() => {
    if (searchInputTeam1.value) {
      searchInputTeam1.value.focus()
    }
  })
}

// Select player for Team 2
const selectPlayerTeam2 = (player) => {
  // Add player to team 2 list
  team2Players.value.push({
    id: player.player_id,
    name: player.full_name,
    position: player.position,
    team: player.team,
    headshot_url: player.headshot_url
  })
  
  // Clear search and hide dropdown
  searchQueryTeam2.value = ''
  searchResultsTeam2.value = []
  showDropdownTeam2.value = false
  
  // Focus back to input
  nextTick(() => {
    if (searchInputTeam2.value) {
      searchInputTeam2.value.focus()
    }
  })
}

// Hide dropdown for Team 1 (with delay to allow click events)
const hideDropdownTeam1 = () => {
  setTimeout(() => {
    showDropdownTeam1.value = false
  }, 150)
}

// Hide dropdown for Team 2 (with delay to allow click events)
const hideDropdownTeam2 = () => {
  setTimeout(() => {
    showDropdownTeam2.value = false
  }, 150)
}

// Remove player from Team 1
const removePlayerTeam1 = (playerId) => {
  team1Players.value = team1Players.value.filter(player => player.id !== playerId)
}

// Remove player from Team 2
const removePlayerTeam2 = (playerId) => {
  team2Players.value = team2Players.value.filter(player => player.id !== playerId)
}

// Handle image loading errors
const handleImageError = (event) => {
  // Replace with a placeholder image or hide the image
  event.target.style.display = 'none'
  // You could also set a fallback image:
  // event.target.src = '/path/to/placeholder-image.png'
}

// Watch for changes in search queries to handle focus/blur
watch(searchQueryTeam1, (newValue) => {
  if (!newValue.trim()) {
    showDropdownTeam1.value = false
    searchResultsTeam1.value = []
  }
})

watch(searchQueryTeam2, (newValue) => {
  if (!newValue.trim()) {
    showDropdownTeam2.value = false
    searchResultsTeam2.value = []
  }
})
</script>
