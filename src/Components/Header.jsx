function Header({accessToken, setAccessToken, id, setID, posts, setPosts}) {
    const logout = () => {
        setAccessToken("");
        setID("");
        setPosts([]);
    }

    return (
        <div className="header-container">
            TopPicks
            {!accessToken || !id ? 
            null
                : 
                <button className="login-btn" onClick={logout}>Log out</button>
            }
        </div>
    )
}

export default Header;