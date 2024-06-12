import {options} from "./api";

/* Fetch Movies and Series Lists
================================ */
export const getListsItems = async (url) => {
    if (typeof url !== 'string') {
        throw new Error("Invalid url types");
    }
    try {
        const response = await fetch(url, options());
        if (!response.ok) return "Server error."
        const data = await response.json();
        return data.results;
    } catch(err) {
        return err.message;
    }
}