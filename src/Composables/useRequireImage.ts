const useRequireImage = (name: string): string => {
    try {
        return require(`@/assets/CharactersCards/${name}.jpg`)
    } catch (e) {
        return ''
    }
}

export default useRequireImage