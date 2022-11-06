import { ErrorMessages } from "@/Enums/ErrorMessages";

export const useFetch = async (url: string, error: string): Promise<Response | string> => {
	return await fetch(url).then((res) => {
		if (res.ok) return res
		throw new Error(error)
	}).catch((e) => {
		if (e instanceof Error) {
			return e.message
		}
	}) ?? ErrorMessages.CANT_FETCH_DATA
}