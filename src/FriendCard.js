import React, { useState } from "react";

const ACTIVITY_TYPES = [
  "education",
  "recreational",
  "social",
  "diy",
  "charity",
  "cooking",
  "relaxation",
  "music",
  "busywork",
];

function FriendCard({ data }) {
  const [friend, setFriend] = useState(data);

  /*Update friend when type is selected from dropdown*/
  const onTypeChange = (e) => {
    e.persist();
    setFriend((f) => {
      return { ...f, type: e.target.value };
    });
  };

  /*Part of Step 3*/
  /*Commit data to db*/
    function setData(f){
        fetch('/api/friends/' + f.id, {
                          method: 'PUT',
                          headers: {
                              'Content-Type': 'application/json',
                          },
                          body: JSON.stringify(f),
                      })
                          .then(response => response.json())
                          .catch((error) => {
                              console.error('Error:', error);
                          });
    }

    /*Part of Step 2*/
    /*call Bored API*/
    function fetchData(friend){
        return fetch('https://www.boredapi.com/api/activity?type=' + friend.type)
            .then(response => response.json())
            .then(function(response) {
                friend.activity = response.activity;
                setFriend(oldState=> ({ ...oldState, activity: response.activity }));
                return friend;
            })
            .catch(function(error) {
                console.log(error);
            });
    }

  return (
    <div className="card mb-2">
      <div className="card-body">
        <h5 className="card-title">{friend.name}</h5>
        <h6 className="card-subtitle mb-2 text-muted">{friend.email}</h6>
        <p className="card-text lead">{friend.activity}</p>
        <div className="form-group row justify-content-center">
          <select
            className="form-control col-sm-6"
            value={friend.type}
            id={`activity-type-select-${friend.id}`}
            onChange={onTypeChange}
          >
            {ACTIVITY_TYPES.map((type, idx) => {
              return (
                <option key={idx} value={type}>
                  {type}
                </option>
              );
            })}
          </select>
        </div>
        <button
          className="btn btn-success"
          onClick={() => {
              /** Step 2: Implement Button */
              const d = fetchData(friend);
              d.then((d) => {setData(d)});
          }}
        >
          Get New Idea
        </button>
      </div>
    </div>
  );
}

export default FriendCard;
