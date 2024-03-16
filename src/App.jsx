import { useEffect, useState } from 'react';
import './App.css'
import Header from './Components/Header';
import SearchBar from './Components/SearchBar';
import Posts from './Components/Posts';

function App() {
    const URL = "https://www.facebook.com/v19.0/dialog/oauth?";
    const CLIENT_ID = process.env.CLIENT_ID;
    const REDIRECT_URI = process.env.REDIRECT_URI;
    const STATE = "12345";
    const SCOPE = "pages_show_list,ads_management,business_management,instagram_basic,instagram_manage_insights,pages_read_engagement,public_profile";
    const [accessToken, setAccessToken] = useState("");
    const [id, setID] = useState("");
    const [posts, setPosts] = useState([]);


    useEffect(() => {
        const hash = window.location.hash;
        setAccessToken(hash.split('=')[1]);
        getInstaID(hash.split('=')[1]);
        window.history.pushState(null, null, REDIRECT_URI)
    }, [])

    const getInstaID = async (token) => {
        const result = await fetch(`https://graph.facebook.com/v19.0/me/accounts?access_token=${token}`)
        const response = await result.json();

        for(let i = 0; i < response.data.length; i++) {
            const instaResult = await fetch(`https://graph.facebook.com/v19.0/${response.data[i].id}?fields=instagram_business_account&access_token=${token}`)
            const instaResponse = await instaResult.json();
            if(instaResponse.instagram_business_account) {
                setID(instaResponse.instagram_business_account.id);
                break;
            }
        }
        console.log(id);
        setTimeout(() => {
            if(!id) {
                console.log("You need a business insta account");
            }
        },1000)
    }

    const handleSearch = async (query) => {
        const result = await fetch(`https://graph.facebook.com/${id}?fields=business_discovery.username(${query}){media{comments_count,like_count,permalink,media_url,thumbnail_url}}&access_token=${accessToken}`)
        const response = await result.json();
        let data = response.business_discovery.media.data;
        data.sort((a, b) => b.like_count - a.like_count);
        for(let i = 0; i < data.length; i++) {
            if(data[i].thumbnail_url) {
                data[i].media_url = data[i].thumbnail_url;
            }
        }
        setPosts(data);
    }

    return (
        <>  
            <Header accessToken={accessToken} setAccessToken={setAccessToken} id={id} setID={setID} posts={posts} setPosts={setPosts}/>
            {!accessToken && !id ?
                <a onClick href={`${URL}client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&state=${STATE}&response_type=token&scope=${SCOPE}`}>Login</a>

                : 
                <>
                    <SearchBar handleSearch={handleSearch}/>
                    <Posts posts={posts}/>
                </>
                
                
                
                }
        </>
    )
}

export default App;