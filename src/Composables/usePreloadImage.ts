
//vue
import { Ref, ref } from 'vue'

const usePreloadImage = (): [Ref<string>, (url: string) => void] => {
    const preloadImage = ref('')
    let lastImageName = ''
    const loadImage = (url: string) => {
        preloadImage.value = ''
        const img = new Image();

        //add url to lastImage
        lastImageName = url

        /* const url = ; */

        img.onload = () => {
            //check if loaded image is the last required 
            //if true - set url and clear lastImag
            if (lastImageName === url) {
                preloadImage.value = url;
                lastImageName = ''
            }
        }
        img.src = url;
    }
    return [preloadImage, loadImage]
}
export default usePreloadImage