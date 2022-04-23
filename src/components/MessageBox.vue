<template>
  <div>
    <div v-if="id != store.state.userID">
      <div class="w-full">
        <n-divider />
        <span class="firstText mr-10px" style="font-size: 16px">{{ id }} </span
        ><span class="firstText" style="font-size: 16px"> {{ time }}</span>
      </div>
      <div>
        <span class="ml-15px" style="font-size: 15px">{{ msg }}</span>
      </div>
    </div>
    <div v-if="id == store.state.userID">
      <div class="w-full">
        <n-divider />
        <span class="secText mr-10px" style="font-size: 16px">{{ id }} </span
        ><span class="secText" style="font-size: 16px"> {{ time }}</span>
      </div>
      <div>
        <span class="ml-15px" style="font-size: 15px">{{ msg }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, h, onMounted, ref, render } from 'vue'
import { NDivider } from 'naive-ui'
import { useStore } from 'vuex'

const store = useStore()
const props = defineProps({
  id: String,
  time: String,
  msg: String,
})
</script>

<style scoped>
.firstText {
  color: rgb(238, 79, 79);
}
.secText{
  color: rgb(164, 242, 47);
}
</style>
