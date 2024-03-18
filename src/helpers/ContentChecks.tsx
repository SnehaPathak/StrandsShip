export function IsBlank(str: string|undefined) {
    return (!str || /^\s*$/.test(str) || typeof str == 'undefined');
}

const ContentCheckProvider = {
    IsBlank
}

export default ContentCheckProvider;