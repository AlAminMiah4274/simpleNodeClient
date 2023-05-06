import './App.css';
import { useEffect, useState } from 'react';

function App() {

  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/users')
      .then(res => res.json())
      .then(data => setUsers(data))
  }, []);

  // to handle form 
  const handleAddUser = e => {

    // to prevent reloading of the form 
    e.preventDefault();

    const name = e.target.name.value;
    const email = e.target.email.value;
    const user = { name, email };

    // to send data to the database
    fetch('http://localhost:5000/users', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(user)
    })
      .then(res => res.json())
      .then(data => {
        console.log(data)

        // to show data on the client side
        const newUsers = [...users, data];
        setUsers(newUsers);
      })
      .catch(err => console.log(err))

    console.log(user);

    // to reset the form 
    e.target.reset();
  }

  return (
    <div className="App">
      <div>
        <h1>Users: {users.length}</h1>
      </div>
      <form onSubmit={handleAddUser}>
        <input type="text" name='name' placeholder='name' required />
        <br />
        <input type="email" name="email" id="" placeholder='email' required />
        <br />
        <button type="submit">Add User</button>
      </form>

      {/* to show data on the client side coming from the server side */}
      <div>
        {
          users.map(user => <p key={user._id}> {user.name} Email: {user.email}</p>)
        }
      </div>
    </div>
  );
}

export default App;