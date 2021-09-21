<template>

  <AppModal @close="toggleModal" :modalActive="modalActive">
    <h3 class="modal-title">Player Ranking</h3>
    <div class="modal-content">
      <table :class="[tbLoadingStatus ? 'loading' : ' ']">
        <thead>
          <tr>
            <th style="width: 20%;">Rank</th>
            <th style="width: 60%;"></th>
            <th style="width: 20%;">Score</th>
          </tr>
        </thead>
        <tbody v-for="(rank, rankKey) in rankinglist" :key="rankKey">
          <tr>
            <td>
              <template v-if="rank.rank < '3'"><fa icon="crown" :class="[rank.rank == '0' ? 'gold' : '', rank.rank == '1' ? 'silver' : '', rank.rank == '2' ? 'bronze' : '']"></fa></template>
              <template v-else>{{ rank.rank + 1 }}</template>
            </td>
            <td>
              <div class="progress">    
                <div class="animal-wrapper">
                  <span class="player-rand-image" :style="`width:${ (rank.score/5000) * 100 }%; left:${ (rank.score/5000) * 100 / 2 }px`">
                    <fa :icon="faAnimalIcon[rankKey]">${ rank.custom_player_id.slice(0, 6)</fa>
                  </span>
                </div>
                <p class="progress-text">ID: {{ rank.custom_player_id.slice(0, 12) }}</p>
                <div class="progress-bar">                    
                  <div data-progress="0" :style="`width:${ (rank.score/5000) * 100 }%`"></div>
                </div>
              </div>
            </td>
            <td>{{ rank.score }}</td>
          </tr>
        </tbody>        
      </table>
      <AppPagination :links="paginationLinks" @paginate="fetchAnotherData"/>
    </div>
  </AppModal>

  <button class="button" @click="toggleModal">
    <img src="/images/star-medal.svg" alt="Leaderboard Icon" class="img-leaderboard"/>Leaderboard
  </button>
</template>

<script>
import { ref } from 'vue'
import axios from 'axios'
import r4nktApi from '@/features/r4nktApi'
import AppModal from '@/components/AppModal'
import AppPagination from '@/components/AppPagination'
import faAnimalIcon from '@/data/font-awesome-animal.json'

export default {
  components: {
    AppModal,
    AppPagination
  },
  setup() {
    const { rankingData } = r4nktApi()  
    const modalActive = ref(false)
    const rankinglist = ref([])
    const paginationLinks = ref([])
    const nextData = []
    const tbLoadingStatus = ref(false)

    const headers = {
      "Authorization": process.env.VUE_APP_R4NKT_API_TOKEN,
      "Accept": "application/json"
    } 

    const fetchAnotherData = async (link) => {
      tbLoadingStatus.value = true

      axios.get(link, { headers })
      .then((response) => {
        nextData.value = response.data

        rankinglist.value = nextData.value.data
        paginationLinks.value =  nextData.value.meta.links
        tbLoadingStatus.value = false
      })
      .catch(error => console.log(error.response))
    }

    const toggleModal = () => {
      rankinglist.value = rankingData.value.data
      paginationLinks.value = rankingData.value.meta.links
      modalActive.value = !modalActive.value
    }

    return {
      rankingData,
      modalActive,
      toggleModal,
      rankinglist,
      paginationLinks,
      fetchAnotherData,
      nextData,
      tbLoadingStatus,
      faAnimalIcon
    }
  }
}
</script>