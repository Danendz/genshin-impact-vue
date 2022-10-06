import { useShowCharactersSelectionList } from "@/store/showCharactersSelectionList"
import { useHideMainCharactersLayout } from "@/store/hideMainCharactersLayout"
import { useShowDemoBGVideo } from "@/store/showDemoBGVideo"

const useSetDefaultLayout = () => {
    const hideLayout = useHideMainCharactersLayout()
    const showCharactersSelectionList = useShowCharactersSelectionList()
    const showDemoBGVideo = useShowDemoBGVideo()

    //set layout to default values
    const setLayout = () => {
        hideLayout.hide = false
        showCharactersSelectionList.show = false
        showDemoBGVideo.show = false
    }
    return {setLayout}
}

export default useSetDefaultLayout