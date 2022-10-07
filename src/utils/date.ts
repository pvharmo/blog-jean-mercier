let getEnglishFormattedDate = (date: any) => {
    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];
    const dateObj = new Date(date);
    return `${
        months[dateObj.getMonth()]
    } ${dateObj.getDate()}, ${dateObj.getFullYear()}`;
};
  
let getFrenchFormattedDate = (date: any) => {
    const months = [
        "janvier",
        "février",
        "mars",
        "avril",
        "mai",
        "juin",
        "juillet",
        "août",
        "septembre",
        "octobre",
        "novembre",
        "décembre",
    ];
    const dateObj = new Date(date);
    return `${dateObj.getDate()} ${months[dateObj.getMonth()]} ${dateObj.getFullYear()}`;
};
  
export const getFormattedDate = (date: any, lang: string) => {
    if (lang === 'fr') {
        return getFrenchFormattedDate(date)
    }
    return getEnglishFormattedDate(date)
}