import home from './Home/index'
import characters from './Characters/index'

export default {
	'en-US': {
		...home.en,
		...characters.en
	},
	'ru-RU': {
		...home.ru,
		...characters.ru
	}
}