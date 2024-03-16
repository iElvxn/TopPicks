import likeHeart from '../assets/like_heart.png'
import commentImg from '../assets/comment.png'

function Posts({ posts }) {
    console.log("hello")
    return (
        <div className="posts-container">
            {posts.map((post) => {
                return (
                    <div key={post.id} className="post-container">
                        <a onClick href={post.permalink} className="media-btn">
                            <img className="media-img" src={post.media_url}></img>
                            <div className="overlay">
                                <div className="likes">
                                    <img className="overlay-img" src={likeHeart}></img>
                                    <div className="overlay-text">{post.like_count}</div>
                                </div>
                                <div className="comments">
                                    <img className="overlay-img" src={commentImg}></img>
                                    <div className="overlay-text">{post.comments_count}</div>
                                </div>
                            </div>
                        </a>
                    </div>
                );
            })}
        </div>
    );
}

export default Posts;