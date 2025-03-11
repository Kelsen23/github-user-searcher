import { CiSearch } from "react-icons/ci";
import { IoMoon } from "react-icons/io5";
import "./App.css";
import { useState } from "react";
import dayjs from "dayjs";
import { FaLocationDot, FaLink, FaTwitter } from "react-icons/fa6";
import { BsBuildingFill } from "react-icons/bs";

const App = () => {
  const [user, setUser] = useState(null);
  const [inputValue, setInputValue] = useState("");

  const getUser = async () => {
    if (inputValue !== "") {
      try {
        const res = await fetch(`https://api.github.com/users/${inputValue}`);
        const data = await res.json();
        if (res.ok) {
          setUser({
            username: data.login,
            bio: data.bio,
            joinDate: dayjs(data.created_at).format("D MMMM, YYYY"),
            repos: data.public_repos,
            followers: data.followers,
            following: data.following,
            profilePicture: data.avatar_url,
            location: data.location,
            twitter: data.twitter_username,
            githubProfile: data.html_url,
            blog: data.blog,
            company: data.company,
          })
        }
        setInputValue("");
      } catch(error) {
        console.error(`Something went wrong: ${error}`);
      }
    }
  };

  return (
    <div className="main">
      <div className="top-container">
        <h2 className="heading">devfinder</h2>
        <div className="top-rigth-container">
          <p className="mode">LIGHT</p>
          <IoMoon className="moon-icon" />
        </div>
      </div>

      <div className="search-container">
        <div className="left-input-container">
          <CiSearch className="search-icon" />
          <input
            className="input"
            type="text"
            placeholder="Search GitHub username..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
        </div>
        <button onClick={getUser} className="search-btn">
          Search
        </button>
      </div>

      {user ? (
        <div className="middle">
          <div className="user-container">
            <div className="pfp-container">
              <img className="pfp" src={user.profilePicture} />
            </div>

            <div className="info-container">
              <div className="username-container">
                <h2>{user.username}</h2>
                <p>Joined {user.joinDate}</p>
              </div>

              <div className="bio-container">
                <p>{user.bio}</p>
              </div>

              <div className="stats-container">
                <div className="repos">
                  <p>Repos</p>
                  <strong style={{fontSize: 22}}>{user.repos}</strong>
                </div>

                <div className="followers">
                  <p>Followers</p>
                  <strong style={{fontSize: 22}}>{user.followers}</strong>
                </div>

                <div className="following">
                  <p>Following</p>
                  <strong style={{fontSize: 22}}>{user.following}</strong>
                </div>
              </div>

              <div className="contactMe-container">
                {user.location && <div className="location"><FaLocationDot className="location-icon" /> {user.location}</div>}
                {user.githubProfile && (
                  <div className="githubProfile">
                     <FaLink className="link-icon" />
                    <a
                      href={user.githubProfile}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                     {user.githubProfile}
                    </a>
                  </div>
                )}
                {user.twitter && <div className="twitter"><FaTwitter className="twitter-icon" /> {user.twitter}</div>}

                {user.company && (
                  <div className="company">
                    <BsBuildingFill className="company-icon" />
                    <p>{user.company}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default App;
