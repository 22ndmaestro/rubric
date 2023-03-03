import React, { useState, useEffect } from "react";
import { doc, collection, onSnapshot } from 'firebase/firestore';

import { db } from '../../api/firebase';

function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // create a reference to the users collection
    const usersRef = collection(db, "users");

    const unsubscribe = onSnapshot(usersRef, (snapshot) => {
      // get an array of user objects from the snapshot
      const usersData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      // update the state with the users data
      setUsers(usersData);
    });

    // return a function to unsubscribe from the snapshot listener
    return unsubscribe;
  }, []);

  return (
    <div>
      <h1>Users</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.firstname}</li>
        ))}
      </ul>
    </div>
  );
}

export default Users;