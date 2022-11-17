import { createI18n } from "vue-i18n";
import messages from './translations/index'
import { MessageSchema } from "./Schema";

const i18n = createI18n<[MessageSchema], 'en-US' | 'ru-RU'>({
	legacy: false,
	fallbackLocale: 'en-US',
	messages
})

export default i18n