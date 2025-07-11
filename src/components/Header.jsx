
import logo1 from '../logo1.jpg';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

export default function Header() {

const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query.trim()) return;


    navigate(`/search?q=${encodeURIComponent(query)}`);
    setQuery('');


  }


  return (
    <div className="header-container">
  <div className="header">
    
    <h1><img src={logo1} alt="Logo" /> The MovieDeck</h1>

   
    <ul className="nav">
      <li><NavLink to="/" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'} >Home</NavLink></li>
      
      <li><NavLink to="/new-releases" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>New Releases</NavLink></li>
      <li><NavLink to="/top-rated" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Top Rated</NavLink></li>
      <li><NavLink to="/popular" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Popular</NavLink></li>
     
    </ul>
<div className='buttonL'>
 <ul>
  <li className='login-button'>Login</li>
  <li className='signup-button'>Sign Up</li>
 </ul>
</div>
   
    <div className="search-body">
      <form onSubmit={handleSubmit}>
        <input
          className="search-input"
          type="text"
          placeholder="Search for a movie..."
          value={query}
          onChange={(e)=>setQuery(e.target.value)}
        />
        <button className="search-button" type="submit">Search</button>
      </form>
    </div>
  </div>
</div>

  );
}
      