import React, { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { SearchHeader } from './component/SearchHeader';
import { CardDetails } from './component/CardDetails'
import { Link, Outlet } from 'react-router-dom';// Adjust the import statement
// export const cardContext = createContext();
function App() {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [filterData, setFilterData] = useState([]);
  // const [selectedUser, setSelectedUser] = useState(null);

  //https://jsonplaceholder.typicode.com/comments?postId=1 - post the comments.
  useEffect(() => {
    const fetchData = () => {
      if (page > 2) return;
      fetch(`https://jsonplaceholder.typicode.com/comments?postId=${page}`)
        .then(response => response.json())
        .then(data => {

          const newUsers = data.map(user => ({
            name: user.name,
            email: user.email,
            image: `https://robohash.org/${user.name.toLowerCase()}.png?set=set1&size=150x150`,
            id: user.id,
            body: user.body

          }));
          setUsers(prevUsers => [...prevUsers, ...newUsers]);

        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });

    };
    fetchData();
  }, [page]);

  useEffect(() => {
    setFilterData(users);
  }, [users]);

  const handleSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    if (searchTerm === '') {
      setFilterData(users);
    } else {
      const filteredData = users.filter(user => user.name.toLowerCase().includes(searchTerm));
      setFilterData(filteredData);
    }
  };

  const handleScroll = () => {
    const scrollPosition = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.body.scrollHeight;
    const scrollPercentage = (scrollPosition / (documentHeight - windowHeight)) * 100;
    if (scrollPercentage > 70) {
      setPage(page + 1);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [page]);

  // const handleCardClick = (user) => {
  //   setSelectedUser(user);
  // };

  const UserCard = ({ user }) => {
    return (
      <div className="user-card">
        <Link to={`/card-detail/${user.id}`} >
          <div>
            <img src={`https://robohash.org/${user.name}.png?set=set1&size=100x100`} alt={user.name} />
            <div>
              <h2>{user.name}</h2>
              <p>{user.email}</p>
            </div>
          </div>

        </Link>
        <Outlet />
      </div>
    );
  };
  return (
    <>
      {/* <cardContext.Provider value={{ selectedUser, setSelectedUser }}> */}
      <BrowserRouter>
        <div className="app">
          <Routes>
            <Route path="/" element={<>
              <SearchHeader handleSearch={handleSearch} />
              <div className="user-cards">
                {filterData.map((user, index) => (
                  <UserCard key={index} user={user} />
                ))}
              </div>
            </>} />
            <Route path="card-detail/:id" element={<CardDetails />} />
          </Routes>
        </div>
      </BrowserRouter>
      {/* </cardContext.Provider> */}
    </>
  );
}

export default App;



