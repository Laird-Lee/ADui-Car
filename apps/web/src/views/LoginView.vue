<script setup lang="ts">
import {
  TranslationOutlined,
  KeyOutlined,
  WechatOutlined,
  MailOutlined,
  UserOutlined,
  LockOutlined
} from '@ant-design/icons-vue';
import { useI18n } from 'vue-i18n';
import { useLocaleStore } from '@/stores/locale.store';
import { useHttp } from '@/hooks';
import { userApis } from '@/api/user.api';

interface FormState {
  username: string;
  password: string;
  remember: boolean;
}

const formState = reactive<FormState>({
  username: '',
  password: '',
  remember: true
});
const onFinish = (values: any) => {
  console.log('Success:', values);
};

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo);
};
const disabled = computed(() => {
  return !(formState.username && formState.password);
});
const i18n = useI18n();
const { setLocale } = useLocaleStore();
const toggleLang = (locale: string) => {
  i18n.locale.value = locale;
  setLocale(locale);
};

const activeType = ref<string>('password');
const handleActiveType = (type: string) => {
  activeType.value = type;
};
const { http } = useHttp();
http(userApis.getUserInfoById);
</script>

<template>
  <div class="login_bg">
    <a-card hoverable :title="$t('login.title')" :bodyStyle="{ height: '300px' }">
      <template #extra>
        <a-dropdown :trigger="['click']" placement="bottom">
          <a style="font-size: 18px">
            <translation-outlined />
          </a>
          <template #overlay>
            <a-menu>
              <a-menu-item key="0">
                <a @click="toggleLang('zh')">中文简体</a>
              </a-menu-item>
              <a-menu-item key="1">
                <a @click="toggleLang('en')">English</a>
              </a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>
      </template>
      <a-form
        v-if="activeType === 'password'"
        :model="formState"
        name="normal_login"
        layout="vertical"
        hideRequiredMark
        @finish="onFinish"
        @finishFailed="onFinishFailed"
      >
        <a-form-item
          :label="$t('login.username') as any"
          name="username"
          :rules="[{ required: true, message: 'Please input your username!' }]"
        >
          <a-input v-model:value="formState.username">
            <template #prefix>
              <UserOutlined class="site-form-item-icon" />
            </template>
          </a-input>
        </a-form-item>

        <a-form-item
          :label="$t('login.password') as any"
          name="password"
          :rules="[{ required: true, message: 'Please input your password!' }]"
        >
          <a-input-password v-model:value="formState.password">
            <template #prefix>
              <LockOutlined class="site-form-item-icon" />
            </template>
          </a-input-password>
        </a-form-item>

        <a-form-item>
          <a-form-item name="remember" no-style>
            <a-checkbox v-model:checked="formState.remember">{{ $t('login.remember') }}</a-checkbox>
          </a-form-item>
          <a class="login-form-forgot" href="">{{ $t('login.forgot') }}</a>
        </a-form-item>

        <a-form-item>
          <a-button
            :disabled="disabled"
            type="primary"
            html-type="submit"
            class="login-form-button"
          >
            {{ $t('login.login') }}
          </a-button>
          {{ $t('login.or') }}
          <a href="">{{ $t('login.register') }}</a>
        </a-form-item>
      </a-form>

      <div style="display: flex; justify-content: center; align-items: center">
        <a-qrcode
          v-if="activeType === 'wechat'"
          :size="250"
          value="https://next.antdv.com/components/qrcode-cn"
        />
      </div>

      <template #actions>
        <div key="password" @click="handleActiveType('password')">
          <key-outlined />
          {{ $t('login.account') }}
        </div>
        <div key="wechat" @click="handleActiveType('wechat')">
          <wechat-outlined />
          {{ $t('login.wechat') }}
        </div>
        <div key="email" @click="handleActiveType('email')">
          <mail-outlined />
          {{ $t('login.mail') }}
        </div>
      </template>
    </a-card>
  </div>
</template>

<style lang="less" scoped>
.login_bg {
  background: url('../assets/img/carpool-animate.svg') center center;
  background-size: cover;
  width: 100%;
  height: 100vh;
  position: relative;
}

.ant-card {
  width: 400px;
  position: absolute;
  top: 10%;
  right: 10%;
  box-shadow: 0 0 20px 0 rgb(103, 211, 213);
}
</style>
