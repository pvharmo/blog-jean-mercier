import fr from "./fr"
import en from "./en"

export default (lang) => {
    if (lang === "fr") {
        return fr
    } else {
        return en
    }
}