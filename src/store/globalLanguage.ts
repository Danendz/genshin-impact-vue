import { useGetTranslator } from "@/Composables/useGetTranslator";
import { Languages } from "@/Enums/Languages";
import { LocalStorageData } from "@/Enums/LocalStorageData";
import { defineStore } from "pinia";
import { ref, computed } from 'vue'

export const useGlobalLanguage = defineStore('global language', () => {

	const localStorageLanguage = localStorage.getItem(LocalStorageData.LANGUAGE)

	const getInitLanguage = () => {
		if (!localStorageLanguage) return getNavigatorLanguage()
		if (Object.values(Languages).includes(localStorageLanguage as Languages)) {
			return (localStorageLanguage as Languages)
		}
		return Languages.EN
	}

	const getNavigatorLanguage = (): Languages => {
		const userLang = navigator.language
		if (Object.values(Languages).includes(userLang as Languages)) {
			return (userLang as Languages)
		}
		return Languages.EN
	}

	const language = ref<Languages>(getInitLanguage())
	const { locale } = useGetTranslator()

	const setLanguage = (value: Languages) => {
		language.value = value
		locale.value = language.value
		setLocalStorageLanguage()
	}

	const getLanguage = computed(() => {
		return language
	})

	const getShortLang = () => {
		return language.value.split('-').shift()
	}

	const setLocalStorageLanguage = () => {
		localStorage.setItem(LocalStorageData.LANGUAGE, language.value)
	}
	return { setLanguage, getLanguage, getShortLang }
})