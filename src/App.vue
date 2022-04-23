<template>
  <n-config-provider
    :theme-overrides="themeOverrides"
    :locale="zhCN"
    :date-locale="dateZhCN"
  >
    <n-loading-bar-provider>
      <n-message-provider placement="top">
        <router-view v-slot="{ Component }">
          <transition :duration="200" name="fade-up" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </n-message-provider>
    </n-loading-bar-provider>
  </n-config-provider>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import {
  NConfigProvider,
  zhCN,
  dateZhCN,
  NLoadingBarProvider,
  NMessageProvider,
} from 'naive-ui'

export default defineComponent({
  components: {
    NConfigProvider,
    NLoadingBarProvider,
    NMessageProvider,
  },
  setup() {
    const themeOverrides = {
      common: {
        primaryColor: '#0078D4',
        primaryColorHover: '#40A9FF',
        infoColor: '#f4f7fe',
        warningColor: '#ffc80a',
        errorColor: '#fa4100',
      },
      DataTable: {
        thPaddingMedium: '14px 18px',
        tdPaddingMedium: '14px 18px',
      },
    }
    return {
      themeOverrides,
      zhCN,
      dateZhCN,
    }
  },
})
</script>

<style>
#app {
  font-family: 'AlibabaPuHuiTi', Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  overflow: hidden;
}
</style>

