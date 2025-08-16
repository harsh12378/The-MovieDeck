
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/home';
import Header from './components/Header';
import Search from './components/search'
import NewReleases from './components/new-releases';
import TopRated from './components/top-rated';
import Popular from './components/popular';
import Chat from './components/Chatbot'
export default function App() {
  return (
    <Router>
      <Chat/>
      <Header/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />

        <Route path="/new-releases" element={<NewReleases />} />
        <Route path="/top-rated" element={<TopRated />} />
        <Route path="/popular" element={<Popular />} />
      </Routes>
    </Router>
  );
}
