import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar/Sidebar';
import { Main } from './components/Main/Main';
import SimplePage from './components/Sidebar/Links_bar/linkbar'; 
import './App.css'; 
import showSidebarIcon from '../src/assets/left.png';

const App = () => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  const [summary, setSummary] = useState({
    youtubeLinks: [],
    websiteLinks: [],
    wikipediaTitles: [],
    audioFiles: [],
    documentFiles: [],
  });

  return (
    <>
      {isSidebarVisible ? (
        <Sidebar setIsSidebarVisible={setIsSidebarVisible} setSummary={setSummary} />
      ) : (
        <div className='menu_logo_slidebar'>
          <img src={showSidebarIcon} alt="Show Sidebar" onClick={() => setIsSidebarVisible(true)} />
        </div>
      )}
      
      <Main summary={summary} />
    </>
  );
}

export default App;
