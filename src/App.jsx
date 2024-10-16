import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar/Sidebar';
import { Main } from './components/Main/Main';
import SimplePage from './components/Sidebar/Links_bar/linkbar'; // Ensure the path is correct
import './App.css'; // Import your CSS for styles
import showSidebarIcon from '../src/assets/left.png';

const App = () => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  const [summary, setSummary] = useState('');

  const toggleSidebar = () => {
    setIsSidebarVisible(prev => !prev);
  };

  return (
    <>
      {isSidebarVisible ? (
        <Sidebar setIsSidebarVisible={setIsSidebarVisible} />
      ) : (
        <div className='menu_logo_slidebar'>
          <img 
            src={showSidebarIcon} 
            alt="Show Sidebar" 
            className="show-sidebar-icon" 
            onClick={toggleSidebar} 
            style={{ cursor: 'pointer' }} 
          />
        </div>
      )}
      
      <SimplePage setSummary={setSummary} />
      <Main summary={summary} />
    </>
  );
}

export default App;
