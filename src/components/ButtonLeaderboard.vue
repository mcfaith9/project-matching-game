<template>

  <AppModal @close="toggleModal" :modalActive="modalActive">
    <h3 class="modal-title">Player Ranking</h3>
    <div class="modal-content">
      <table>
        <thead>
          <tr>
            <th style="width: 20%;">Rank</th>
            <th style="width: 60%;"></th>
            <th style="width: 20%;">Score</th>
          </tr>
        </thead>
        <tbody v-for="rank in rankinglist" :key="rank.id">
          <tr>
            <td>{{ rank.rank + 1 }}</td>
            <td>
              <div class="progress">
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
import r4nktApi from '/src/features/r4nktApi'
import AppModal from '@/components/AppModal'
import AppPagination from '@/components/AppPagination'

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
    const headers = {
      "Authorization": process.env.VUE_APP_R4NKT_API_TOKEN,
      "Accept": "application/json"
    } 

    const fetchAnotherData = async (link) => {
      const unpackerRankList = []
      const unpackerPaginationLinks = []

      axios.get(link, { headers })
      .then((response) => nextData.value = response.data)
      .catch(error => console.log(error.response))
      
      if(nextData.value == undefined) return
        unpackerRankList.value = nextData.value.data
        unpackerPaginationLinks.value = nextData.value.meta.links

        rankinglist.value = unpackerRankList.value
        paginationLinks.value =  unpackerPaginationLinks.value

        console.log("unpack =>", unpackerRankList.value, unpackerPaginationLinks.value)
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
      nextData
    }
  }
}
</script>