<template>
  <div>
    <n-layout>
      <n-layout-content
        class="h-screen pb-[60px] bg-transparent layout__content"
        :content-style="{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }"
      >
        <div class="w-[480px] p-12 reounded-sm z-10 content__main">
          <n-tabs
            default-value="login"
            justify-content="space-evenly"
            type="line"
          >
            <n-tab-pane name="login" tab="登录">
              <n-form
                :show-label="false"
                :rules="authRules"
                :model="authForm"
                ref="authFormRef"
              >
                <div class="mx-auto mt-5px mb-10px">
                  <img
                    src="@/assets/0.gif"
                    alt=""
                    class="w-80px h-80px mx-auto"
                  />
                </div>

                <n-form-item>
                  <n-input
                    v-model:value="authForm.username"
                    placeholder="输入你的名"
                  />
                </n-form-item>
                <n-form-item>
                  <n-input
                    type="password"
                    showPasswordOn="click"
                    v-model:value="authForm.password"
                    placeholder="输入迷马"
                    :input-props="{
                      onKeyup: handleKeyupEnter2AuthLogin,
                    }"
                  />
                </n-form-item>
              </n-form>
              <div class="flex justify-between items-center pt-4">
                <div></div>
                <n-button
                  color="#0078D4"
                  :loading="authLoginBtn.loading"
                  class="min-w-[72px]"
                  @click="authLogin"
                >
                  {{ authLoginBtn.text }}
                </n-button>
              </div>
            </n-tab-pane>
            <n-tab-pane name="register" tab="注册">
              <n-form
                :show-label="false"
                :rules="registerRules"
                :model="registerForm"
                ref="registerFormRef"
              >
                <div class="mx-auto mt-5px mb-10px">
                  <img
                    src="@/assets/0.gif"
                    alt=""
                    class="w-80px h-80px mx-auto"
                  />
                </div>
                <n-form-item>
                  <n-input
                    v-model:value="registerForm.id"
                    placeholder="输入用户名"
                  />
                </n-form-item>
                <n-form-item>
                  <n-input
                    type="password"
                    showPasswordOn="click"
                    v-model:value="registerForm.password"
                    placeholder="输入溺的密码"
                  />
                </n-form-item>
                <n-input
                  type="password"
                  v-model:value="registerForm.repassword"
                  showPasswordOn="click"
                  :disabled="!registerForm.password"
                  placeholder="Repeat!"
                  :input-props="{
                    onKeyup: handleKeyupEnter2AuthLogin,
                  }"
                />
              </n-form>
              <div class="flex justify-between items-center pt-4">
                <div></div>
                <n-button
                  color="#0078D4"
                  :loading="registerBtn.loading"
                  class="min-w-[72px]"
                  @click="register"
                >
                  {{ registerBtn.text }}
                </n-button>
              </div>
            </n-tab-pane>
          </n-tabs>
        </div>
      </n-layout-content>
    </n-layout>
  </div>
</template>

<script lang="ts" setup>
import { defineComponent, onBeforeMount, ref, Ref, watch } from 'vue'
import { onBeforeRouteLeave, useRoute, useRouter } from 'vue-router'
import {
  NLayout,
  NLayoutContent,
  NLayoutFooter,
  NForm,
  NFormItem,
  NInput,
  NButton,
  useMessage,
  NTabs,
  NTabPane,
  FormItemRule,
} from 'naive-ui'
import axios from 'axios'
import { useStore } from 'vuex'

declare type AuthForm = {
  username: string
  password: string
}

const store = useStore()
const authRules: any = {
  username: [
    {
      required: true,
      message: '请输入用户名',
      trigger: ['input', 'blur'],
    },
  ],
  password: [
    {
      required: true,
      message: '请输入密码',
    },
  ],
}

const registerRules: any = {
  id: [
    {
      require: true,
      message: '请输入你的ID捏',
      trigger: ['input', 'blur'],
      validator(rule: FormItemRule, value: string) {
        if (!value) {
          return new Error('给我输ID!')
        } else if (value.length > 18) {
          return new Error('ID不要那么长好吗,记不住 :(')
        }
        return true
      },
    },
  ],
  password: [
    {
      required: true,
      message: '看看你的密码',
      trigger: ['input', 'blur'],
      validator(rule: FormItemRule, value: string) {
        if (!value) {
          return new Error('给我输密码!')
        } else if (value.length > 18) {
          return new Error('密码不要那么长好吗,记不住 :(')
        }
        return true
      },
    },
  ],
  repassword: [
    {
      required: true,
      message: '让我再看看你的密码',
      trigger: ['input', 'blur'],
      validator(rule: FormItemRule, value: string) {
        if (!value) {
          return new Error('给我重复输密码!')
        } else if (value != registerForm.password) {
          return new Error('你好像输错了')
        }
        return true
      },
    },
  ],
}

const registerForm: any = ref({
  id: '',
  password: '',
  repassword: '',
})
const registerFormRef: any = ref(null)
const registerBtn = ref({
  text: '注册',
  loading: false,
})

const authFormRef: Ref<any> = ref(null)
const authForm: Ref<AuthForm> = ref({
  username: '',
  password: '',
})

const authLoginBtn = ref({
  text: '登录',
  loading: false,
})

const route = useRoute()
const redirect: Ref<any> = ref(null)

watch(
  () => route,
  () => {
    redirect.value = route.query && route.query.redirect
  },
  { immediate: true }
)

const router = useRouter()

const message = useMessage()

const authLogin = () => {
  authFormRef.value.validate(async (errors: any) => {
    try {
      const res = await axios
        .post('/api/chats/login/', {
          id: authForm.value.username,
          password: authForm.value.password,
        })
        .then((res: any) => {
          console.log(res.data)
          res = res.data
          if (res.status == 'true') {
            authLoginBtn.value.text = '登录中'
            authLoginBtn.value.loading = true
            localStorage.setItem('token', 'afa2707f08CJAS09CASH')
            setTimeout(() => {
              authLoginBtn.value.loading = false
              authLoginBtn.value.text = '登录'
              message.success('登录成功! ^_^')
              store.dispatch('update', authForm.value.username)
              localStorage.setItem('store', JSON.stringify(store.state))
              router.push({ path: '/webroom' })
            }, 500)
          }else{
            authLoginBtn.value.text = '登录中'
            authLoginBtn.value.loading = true
            localStorage.setItem('token', 'afa2707f08CJAS09CASH')
            setTimeout(() => {
              authLoginBtn.value.loading = false
              authLoginBtn.value.text = '登录'
              message.error(res.msg)
            }, 500)
          }
        })
    } catch {
      message.error('请求失败 哈哈 ^_^')
    }
  })
}

const register = async () => {
  if (!registerForm.value.id) {
    message.error('输入你的ID好吗')
    return
  } else if (registerForm.value.id > 15) {
    message.error('ID好像太长了 不超过15个字符好吗')
    return
  } else if (!registerForm.value.password) {
    message.error('输入密码好吗 求你了 最短6个字符')
    return
  } else if (registerForm.value.password.length < 6) {
    message.error('密码太短了分分钟给你盗了 :)')
    return
  } else if (registerForm.value.password.length > 15) {
    message.error('密码太长了记不住 :(')
    return
  } else if (!registerForm.value.repassword) {
    message.error('重复密码好吗 求你了')
    return
  } else if (registerForm.value.repassword != registerForm.value.password) {
    message.error('第二次密码好像输错了')
    return
  }
  try {
    const res = await axios
      .post('/api/chats/register/', {
        id: registerForm.value.id,
        password: registerForm.value.password,
      })
      .then((res: any) => {
        console.log(res)
        res = res.data
        if (res.status == 'success') {
          registerBtn.value.text = '注册中'
          localStorage.setItem('token', 'afa2707f08CJAS09CASH')
          registerBtn.value.loading = true
          setTimeout(() => {
            registerBtn.value.loading = false
            registerBtn.value.text = '注册'
            message.success('注册成功!')
            store.dispatch('update', registerForm.value.id)
            localStorage.setItem('store', JSON.stringify(store.state))
            router.push({ path: '/webroom' })
          }, 500)
        }
        if (res.status == 'error') {
          registerBtn.value.text = '注册中'
          registerBtn.value.loading = true
          setTimeout(() => {
            registerBtn.value.loading = false
            registerBtn.value.text = '注册'
            message.error(res.msg)
          }, 500)
        }
      })
  } catch {
    message.error('请求失败!')
  }
}

const handleKeyupEnter2AuthLogin = (event: any) => {
  if (event.target !== event.currentTarget) return
  if (event.shiftKey || event.keyCode !== 13) return
  event.stopPropagation()
  event.preventDefault()
  authLogin()
}

onBeforeRouteLeave(() => {
  window.addEventListener('beforeunload', () => {
    console.log(1, JSON.stringify(store.state))
    localStorage.setItem('store', JSON.stringify(store.state))
  })
})
</script>

<style scoped>
.content__main {
  backdrop-filter: blur(100px);
  border-radius: 10px;
  border: 2px solid #f7f7f7;
}

.layout__content {
  opacity: 0.85;
}
.words {
  font-size: 24px;
  text-align: center;
}
.footer__copyright {
  color: white;
}
</style>
