import {FiSearch} from "react-icons/fi";
import {useEffect, useState} from "react"
import {CgTv} from "react-icons/cg";
import {BiCameraMovie} from "react-icons/bi";
import {SlPeople} from "react-icons/sl";
import {IoIosClose} from "react-icons/io";
import {multiSearch, options, getImagesURL} from "../api/api";
import {Link} from "react-router-dom";

function Search() {
    const [history, setHistory] = useState(JSON.parse(localStorage.getItem("searchHistory")) || [])
    // Add Item to search history
    const addItemToSearchHistory = (item) => {
        let newSearchItem = {
            id: item.id,
            name: item.name || item.original_title,
            imgPath: item.poster_path || item.profile_path,
            mediaType: item.media_type,
        }
        setHistory((old) => {
            const newHistory = old.filter(el => el.mediaType !== newSearchItem.mediaType || el.id !== newSearchItem.id);
            localStorage.setItem("searchHistory", JSON.stringify([newSearchItem, ...newHistory]));
            return [newSearchItem, ...newHistory];
        })
    }
    // Remove Item from search history
    const removeItemFromSearchHistory = (item) => {
        setHistory((old) => {
            const newHistory = old.filter(el => el.mediaType !== item.mediaType || el.id !== item.id);
            localStorage.setItem("searchHistory", JSON.stringify(newHistory));
            return newHistory;
        })

    }


    // TODO: Search filtering

    const searchCategories = {
        multi: "multi",
        movies: "movies",
        series: "tv",
        person: "person",
    }

    const [query, setQuery] = useState("");

    const [suggestions, setSuggestions] = useState([]);
    const [loadingSuggestion, setLoadingSuggestions] = useState(true);
    const [errorSuggestions, setErrorSuggestions] = useState("")

    useEffect(() => {
        const fetchSuggestions = async () => {
            setLoadingSuggestions(true);
            setSuggestions([])
            setErrorSuggestions("")
            if (query.length < 3) {
                setLoadingSuggestions(false);
                return;
            }
            try {
                const response = await fetch(multiSearch("multi", query), options())
                const data = await response.json()
                setSuggestions(data.results.slice(0, 5))
            }catch(err ) {
                setErrorSuggestions("Something went wrong.")
            } finally {
                setLoadingSuggestions(false)
            }
        }

        // Debouncing
        const timer = setTimeout(fetchSuggestions, 300)

        return () =>
            clearTimeout(timer)

    }, [query]);

    return (
        <div className={"search"}>
            <div className={"search__search-box"}>
                <FiSearch />
                <input
                    className={"search__search-box__input"}
                    type={"text"}
                    name={"search"}
                    value={query}
                    onInput={(e) => setQuery(e.target.value)}
                    placeholder={"Search for Movies, Series, People ...."}
                    autoComplete={"off"}
                />
            </div>
            <hr />
            <div className={"search__filtering"}>
                <p>I'm looking for ...</p>
                <div className="search__filtering__items">
                    <div className={"search__filtering__item"}><BiCameraMovie /><p>Movie</p><IoIosClose /></div>
                    <div className={"search__filtering__item"}><CgTv /> <p>TV Shows</p><IoIosClose /></div>
                    <div className={"search__filtering__item"}><SlPeople /> <p>People</p><IoIosClose /></div>
                </div>
            </div>
            <div className={"search__suggestions"}>
                { loadingSuggestion ? <center>Loading ... </center> : errorSuggestions ? <center>{errorSuggestions}</center> :
                    suggestions.length > 0 ?
                        <>
                            <p>Do you mean ...</p>
                            {
                                suggestions?.map(item =>
                                    (
                                        <Link
                                            onClick={() => addItemToSearchHistory(item)}
                                            to={`/${item.media_type}/${item.id}`}
                                            key={item.id}
                                            className={"search__suggestions__item"}
                                        >
                                            <div className={"search__suggestions__item__poster"}>
                                                <img
                                                    src={`${getImagesURL()}/${item?.poster_path || item?.profile_path}`}
                                                    alt={item.name}
                                                />
                                            </div>
                                            <HighlightedSubString
                                                title={item.name || item.original_title}
                                                query={query.trim()}
                                            />
                                        </Link>
                                    )
                                )
                        }
                        </>
                            : (
                                <>
                                    <p>Last search <span>{history?.length || ""}</span></p>
                                    {
                                        history.length > 0 ?
                                            history.map((item) => (
                                            <Link
                                                to={`/${item.mediaType}/${item.id}`}
                                                key={item.id}
                                                className={"search__suggestions__item history"}
                                            >
                                                <div className={"search__suggestions__item__poster"}>
                                                    <img
                                                        src={`${getImagesURL()}/${item.imgPath}`}
                                                        alt={item.name}/>
                                                </div>
                                                <h4 className={"search__suggestions__item__title"}>{item.name}</h4>
                                                <button onClick={(e) => {
                                                    e.preventDefault();
                                                    removeItemFromSearchHistory(item)
                                                }} className={"search__suggestions__item__action"}>
                                                    <IoIosClose />
                                                </button>
                                            </Link>
                                            )

                                        ) : <center>No items in the search history.</center>
                                    }
                                </>
                            )
                }
            </div>
        </div>
    )
}

export default Search;

function HighlightedSubString({title, query}) {
    const [start, setStart] = useState("");
    const [end, setEnd] = useState("");
    const [subString, setSubString] = useState(query)

    const highlightSubString = (str, sub) => {

        if (sub.length < 3) return "Less than 3 characters is not allowed."

        const startIndex = str.toLowerCase().indexOf(sub.toLowerCase())

        if (startIndex === -1) return null;

        const endIndex = startIndex + sub.length;

        setStart(str.substring(0, startIndex));
        setEnd(str.substring(endIndex));
        setSubString(str.substring(startIndex, endIndex))
    }
    useEffect(() => {
        highlightSubString(title, query)
    }, [subString])

    return (
        <h4 className={"search__suggestions__item__title"}>
            {start}<span>{subString}</span>{end}
        </h4>
    )
}
