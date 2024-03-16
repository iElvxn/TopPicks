import { useState } from "react";

function SearchBar({ handleSearch }) {
    const [query, setQuery] = useState('');

    const handleInputChange = (event) => {
        setQuery(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        setQuery("");
        handleSearch(query);
    }

    return (
        <form className="search-bar" onSubmit={handleSubmit}>
            <input
                className="bar"
                type="text"
                placeholder="Search..."
                value={query}
                onChange={handleInputChange}
            />
            <button type="submit">Search</button>
        </form>
    )
}

export default SearchBar;