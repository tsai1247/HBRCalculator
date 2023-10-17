import { createI18n } from 'vue-i18n'
import zhTW from '@/i18n/zh-TW.json'
import enUS from '@/i18n/en-US.json'
import jp from '@/i18n/jp.json'


const i18n = createI18n({
  legacy: false, // 要把 legacy 設為 false，才可以使用 Composition API
  locale: 'zh-TW',
  fallbackLocale: 'zh-TW',
  globalInjection: true,
  messages: {
    'en-US': enUS,
    'jp': jp,
    'zh-TW': zhTW,
  }
})

export default i18n
