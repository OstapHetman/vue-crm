import store from '../store'
import ua from '../locales/ua.json'
import en from '../locales/en.json'

const locales = {
  'ua-UA': ua,
  'en-US': en
}

export default function localizeFilter(key) {
  const locale = store.getters.info.locale || 'ua-UA'
  return locales[locale][key] || `[Localize error]: key ${key} not found`
}