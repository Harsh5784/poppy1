import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar/Sidebar';
import { Main } from './components/Main/Main';
import './App.css'; // Make sure to import your CSS for styles
import showSidebarIcon from '../src/assets/left.png';

const App = () => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(true); // State for sidebar visibility

  const toggleSidebar = () => {
    setIsSidebarVisible(prev => !prev); // Toggle sidebar visibility
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
          onClick={toggleSidebar} // Use the image to toggle visibility
          style={{ cursor: 'pointer' }} // Change cursor to pointer on hover
        />
        </div>
      )}
      <Main />
    </>
  );
}

export default App;
