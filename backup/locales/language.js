import fr from "./fr/translations"
import en from "./en/translations"

export default (lang) => {
    if (lang === "fr") {
        return fr
    } else {
        return en
    }
}