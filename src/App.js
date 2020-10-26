import React, { useState, useEffect } from "react";
import FriendCard from "./FriendCard";
import "./App.css";

function App() {


    const [friends, setFriends] = useState([]);

    /** Step 1: Fetch friends from the api by calling "/api/friends".
     */
    /*update friend state using hook*/
    useEffect(() => {
        const fetchFriends = async () => {
            const response = await fetch('/api/friends');
            const json = await response.json();
            setFriends(json);
        };
        fetchFriends();
    }, []);


  return (
    <div className="App">
      <div className="navbar navbar-dark bg-dark box-shadow">
        <span className="navbar-brand d-flex align-items-center">
          <strong>Activity Ideas</strong>
        </span>
      </div>
      <div className="container pt-4">
        <div className="card-deck">
          {friends.map((friend) => {
            return (
              <div key={friend.id} className="col-md-6">
                <FriendCard data={friend} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
