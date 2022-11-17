import { MessageSchema } from "@/i18n/Schema"
import { useI18n } from "vue-i18n"

export const useGetTranslator = () => {
	return useI18n<{ message: MessageSchema }, 'en-US' | 'ru-RU'>({
		useScope: 'global'
	})
}


