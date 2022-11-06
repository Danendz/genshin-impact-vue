import { ErrorMessages } from '@/Enums/ErrorMessages';
import { ref } from 'vue'
import { useFetch } from './useFetch';

export const downloadMediaContent = (links: string[]) => {
	const fetchedContent = ref<string[] | null>(null)
	const fetchContent = async () => {
		const res = await Promise.all(links.map(async url => {
			const resp = await useFetch(url, ErrorMessages.CANT_FETCH_DATA.replace('{url}', url))

			if (typeof resp === 'string') throw new Error(resp)

			return await resp.blob().then((blob: Blob) => URL.createObjectURL(blob))
		}));
		fetchedContent.value = res;
	}

	return { fetchedContent, fetchContent }
};
