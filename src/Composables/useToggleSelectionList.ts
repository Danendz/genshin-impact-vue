import { useHideMainCharactersLayout } from "@/store/hideMainCharactersLayout"
import { useShowCharactersSelectionList } from "@/store/showCharactersSelectionList"

const useToggleCharacterSelelectionList = () => {
    const hideLayout = useHideMainCharactersLayout()
    const showCharactersSelectionList = useShowCharactersSelectionList()
    const toggleSelectionList = (e?: MouseEvent, value?: boolean) => {
        if (value) {
            hideLayout.hide = value
            showCharactersSelectionList.show = value
        } else {
            if(hideLayout.hide && !showCharactersSelectionList.show){
                hideLayout.hide = false
            }
            hideLayout.setHide()
            showCharactersSelectionList.setShow()
        }

    }
    return { toggleSelectionList }
}

export default useToggleCharacterSelelectionList