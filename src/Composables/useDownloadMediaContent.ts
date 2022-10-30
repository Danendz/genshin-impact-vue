import { ref } from 'vue'

export const downloadMediaContent = (links: string[]) => {
	const fetchedContent = ref<string[] | null>(null)
	const fetchContent = async () => {
		try {
			const res = await Promise.all(links.map(async url => {
				const resp = await fetch(url)
				return await resp.blob().then((blob: Blob) => URL.createObjectURL(blob))
			}));

			fetchedContent.value = res;
		} catch (e) {
			if (e instanceof Error) {
				throw new Error(e.message)
			}
		}
	}

	return { fetchedContent, fetchContent }
};
