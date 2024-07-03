import { db } from "../firebase.config"
import { doc, getDoc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
// Fetch User Watchlist
const fetchUserWatchlist = async (userId, mediaType) => {
    try {
        const userRef = doc(db, 'users', userId);
        const docSnap = await getDoc(userRef);
        if (docSnap.exists()) {
            return docSnap.data()[mediaType === "movies" ? "moviesList" : "seriesList"] || [];
        } else {
            throw new Error('User not found');
        }
    } catch (error) {
        console.error('Error fetching user watchlist:', error);
    }
};
// Add movie to watch list
export const addMediaToWatchList = async (userId, mediaId, mediaType) => {
    try {
        const watchList = await fetchUserWatchlist(userId, mediaType);
        if (!watchList.includes(mediaId)) {
            const userRef = doc(db,"users", userId);
            if (mediaType === "movies") {
                await updateDoc(userRef, {
                    moviesList: arrayUnion(mediaId)
                });
                console.log("Movie Added To Watch List!");
            }
            else if (mediaType === "series") {
                await updateDoc(userRef, {
                    seriesList: arrayUnion(mediaId)
                });
                console.log("Series Added To Watch List!");
            } else {
                console.error("wrong media type.")
            }
        } else {
            console.error("Item is already in your watch list.")
        }
    } catch (err) {
        console.error(err)
    }
}

// Remove Movie from watch list
export const removeMediaFromWatchList = async (userId, mediaId, mediaType) => {
    try {
        const userRef = doc(db,"users", userId);
        if (mediaType === "movies") {
            await updateDoc(userRef,{
                moviesList: arrayRemove(mediaId)
            });
            console.log("Movie Removed From Watch List!");
        }
        else if (mediaType === "series") {
            await updateDoc(userRef,{
                seriesList: arrayRemove(mediaId)
            });
            console.log("Series Removed From Watch List!");
        }
    } catch (err) {
        console.error(err)
    }
}

// Is Item in watchlist ?
export const isItemInWatchList = async (userId, mediaId, mediaType) => {
    try {
        const userRef = doc(db, 'users', userId);
        const docSnap = await getDoc(userRef);
        if (docSnap.exists()) {
            const list = docSnap.data()[mediaType === "movies" ? "moviesList" : "seriesList"] || [];
            return list.includes(mediaId);
        }
        return false;
    } catch (err) {
        console.error(err)
    }
    return false;
}