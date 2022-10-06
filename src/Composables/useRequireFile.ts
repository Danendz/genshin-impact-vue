const useRequireFile = (url: string): string => {
    try {
        return require(`@/assets/${url}`)
    } catch (e) {
        return ''
    }
}

export default useRequireFile