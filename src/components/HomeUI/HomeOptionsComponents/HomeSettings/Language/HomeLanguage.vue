<template>
	<HomeSettingsOptionContainer>
		<HomeSettingsOption :title="t('home.settings.language-select')" :active-option="getLanguage"
			:translate-path="'home.settings'" :choose-option="chooseLanguage" :options="getAvailableLanguages()" />
	</HomeSettingsOptionContainer>
</template>

<script setup lang="ts">
import HomeSettingsOption from '@/components/UI/HomeSettingsOption/HomeSettingsOption.vue';
import HomeSettingsOptionContainer from '@/components/UI/HomeSettingsOption/HomeSettingsOptionContainer.vue';
import { useGetTranslator } from '@/Composables/useGetTranslator';
import { Languages } from '@/Enums/Languages';
import { useGlobalLanguage } from '@/store/globalLanguage'

const { getAvailableLanguages, getLanguage, setLanguage } = useGlobalLanguage()

const chooseLanguage = (value: string) => {
	setLanguage(value as Languages)
}

const { t } = useGetTranslator()

</script>

<style lang="scss">

</style>