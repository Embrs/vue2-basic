import Vue from "vue";
import VueI18n from "vue-i18n";
import iviewLangEN from "view-design/dist/locale/en-US";
import iviewLangZH from "view-design/dist/locale/zh-TW";

// chane item
iviewLangZH.i.page.item = "筆";
iviewLangZH.i.page.items = "筆";
iviewLangZH.i.page.page = "筆/頁";

const iviewLang = {
  en: iviewLangEN,
  zh: iviewLangZH
};

Vue.use(VueI18n);
function loadLocaleMessages() {
  const locales = require.context(
    "./locales",
    false,
    /[A-Za-z0-9-_,\s]+\.js$/i
  );
  const messages = {};
  locales.keys().forEach(key => {
    const matched = key.match(/([a-z0-9]+)\./i);
    if (matched && matched.length > 1) {
      const locale = matched[1];
      messages[locale] = locales(key).default;
      messages[locale].i = iviewLang[locale].i;
    }
  });
  return messages;
}

export default new VueI18n({
  locale: process.env.VUE_APP_I18N_LOCALE || "zh",
  fallbackLocale: process.env.nod || "zh",
  messages: loadLocaleMessages(),
  silentTranslationWarn: true
});
