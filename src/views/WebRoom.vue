<template>
  <div class="w-4/5 mx-auto">
    <n-card class="mt-40px w-1/2 mx-auto">
      <div class="bold" style="font-size: 18px">聊天室</div>
      <n-scrollbar style="max-height: 500px" class="px-10px h-500px">
        <MessageBox
          :id="item.id"
          :time="item.time"
          :msg="item.msg"
          v-for="(item, index) of messageList"
          :key="index"
        >
        </MessageBox>
      </n-scrollbar>
      <n-input
        v-model:value="sendMessage"
        type="textarea"
        maxlength="100"
        show-count
        placeholder="你想说神魔? Say hello!"
        class="mt-20px"
      />
      <div class="flex">
        <div class="flex-1"></div>
        <n-button
          color="#0078D4"
          :loading="btnLoading"
          class="min-w-[72px] mt-2px"
          @click="sendTo"
          showPasswordOn="click"
          :input-props="{
            onKeyup: handleKeyupSend,
          }"
        >
          发射!
        </n-button>
      </div>
    </n-card>
  </div>
</template>

<script lang="ts" setup>
import { NScrollbar, NCard, NInput, NButton, useMessage } from 'naive-ui'
import { onBeforeMount, ref } from 'vue'
import MessageBox from '@/components/MessageBox.vue'
import axios from 'axios'
import { useStore } from 'vuex'

declare type messgae = {
  id: String
  time: String
  msg: String
}

const store = useStore()
const mess = useMessage()
const sendMessage = ref('')
const btnLoading = ref(false)

const sendTo = () => {
  btnLoading.value = true
  setTimeout(() => {
    btnLoading.value = false
  }, 500)
  context.id = store.state.userID
  if (sendMessage.value == '') {
    mess.error('输入内容不能为空!')
  } else {
    context.msg = sendMessage.value
    wsSend(context)
    sendMessage.value = ''
  }
}

const messageList: any = ref([])

const context = {
  id: '',
  msg: '',
}

const ws = new WebSocket('ws://118.31.51.147:8000/ws/')
//const ws = new WebSocket('ws://127.0.0.1:8001/ws/')
ws.onopen = () => {
  mess.success('连接服务端成功!')
}
ws.close = () => {
  mess.error('后台程序中断')
}
ws.onmessage = (msg) => {
  console.log(JSON.parse(msg.data))
  messageList.value.push(JSON.parse(msg.data))
}
const wsSend = (sendMessage: any) => {
  try {
    ws.send(JSON.stringify(sendMessage))
  } catch (e) {
    mess.error('发送失败!')
  }
}

const handleKeyupSend = (event: any) => {
  if (event.target !== event.currentTarget) return
  if (event.shiftKey || event.keyCode !== 13) return
  event.stopPropagation()
  event.preventDefault()
  sendTo()
}


onBeforeMount(() => {
  if (localStorage.getItem('store')) {
    store.replaceState(
      Object.assign({}, JSON.parse(localStorage.getItem('store') as any))
    )
  }
  //console.log(localStorage.getItem('store'))
  window.addEventListener('beforeunload', () => {
    localStorage.setItem('store', JSON.stringify(store.state))
  })
})
</script>
