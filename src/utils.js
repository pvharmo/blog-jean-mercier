export let getPath = (path) => {
    let pathWithoutLang = path.substring(3);
    return pathWithoutLang;
}

export let getLang = (path) => {
    return path.substring(1,3);
}