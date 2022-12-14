export const useGetLocalStorageData = (key: string) => {
	return JSON.parse(localStorage.getItem(key) ?? "{}")
}

export const useSetLocalStorageData = <T>(localstorageKey: string, value: number | string | T, exactlyKey?: string,) => {
	let newLocalStorageData = value
	if (typeof value === 'string' || typeof value === 'number') {
		if (!exactlyKey) throw new Error('Используйте определенный ключ для назначения определенного значения')
		newLocalStorageData = {
			...useGetLocalStorageData(localstorageKey),
			[exactlyKey]: value
		}
	}
	localStorage.setItem(localstorageKey, JSON.stringify(newLocalStorageData))
}