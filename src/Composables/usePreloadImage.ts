//helpers
import CharacterHelper from '@/helpers/CharacterHelper'

//enums
import { CharacterImage } from '@/Enums/CharacterEnums'

//vue
import { Ref, ref } from 'vue'

const usePreloadImage = (): [Ref<string>, (name_key: string, type: CharacterImage) => void] => {
    const preloadImage = ref('')
    let lastImageName = ''
    const loadImage = (name_key: string, type: CharacterImage) => {
        preloadImage.value = ''
        const img = new Image();

        //add name_key to array
        lastImageName = name_key

        const url = CharacterHelper.getCharacterImage(name_key, type);

        img.onload = () => {
            //check if loaded image is the last required 
            //if true - set url and clear queue
            if (lastImageName === name_key) {
                preloadImage.value = url;
                lastImageName = ''
            }
        }
        img.src = url;
    }
    return [preloadImage, loadImage]
}
export default usePreloadImage