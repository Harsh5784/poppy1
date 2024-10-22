import React, { useState } from 'react';
import './Sidebar.css';
import { assets } from '../../assets/assets';
import Linkbar from './Links_bar/linkbar'; // Ensure proper import of Linkbar
import toggleIcon from '../../assets/right.png'; // Import your toggle image

export const Sidebar = ({ setIsSidebarVisible }) => {
    const [isLinkbarVisible, setIsLinkbarVisible] = useState(false); // State for Linkbar visibility

    const handleCollapse = () => {
        setIsSidebarVisible(false);
        setIsLinkbarVisible(false); // Close Linkbar when sidebar is collapsed
    };

    const toggleLinkbarVisibility = () => {
        setIsLinkbarVisible(prev => !prev); // Toggle Linkbar visibility
    };

    return (
        <div className='sidebar-container'>
            <div className='sidebar'>
                <div className='top'>
                    <div onClick={handleCollapse} className='menu'>
                        <img src={assets.sidebar} alt="Sidebar Icon" />
                        
                    {/* Toggle Linkbar Image */}
                    <span  className="toggle-linkbar" onClick={toggleLinkbarVisibility}>
                        <img 
                            src={toggleIcon} 
                            alt="Toggle Linkbar" 
                            className="toggle-linkbar-icon"
                        />
                    </span>
                    </div>


                    <div className="new-chat">
                        <img src={assets.plus} alt="New Chat" />
                        <p>New Chat</p>
                    </div>

                    <div className="recent">
                        <p className="recent-title">Recent</p>
                        <div className="recent-entry">
                            <img src={assets.comment} alt="Comment Icon" />
                            <p>What is My AI?</p>
                        </div>
                        <div className="recent-entry">
                            <img src={assets.comment} alt="Comment Icon" />
                            <p>What is Android and..</p>
                        </div>
                        <div className="recent-entry">
                            <img src={assets.comment} alt="Comment Icon" />
                            <p>Deep Learning in..</p>
                        </div>
                    </div>
                </div>

                <div className="bottom">
                    <div className="bottom-item">
                        <img src={assets.question_icon} alt="Help Icon" />
                        <p>Help</p>
                    </div>
                    <div className="bottom-item">
                        <img src={assets.setting_icon} alt="Settings Icon" />
                        <p>Settings</p>
                    </div>
                </div>
            </div>
            {/* Only render Linkbar if it is visible */}
            {isLinkbarVisible && <Linkbar setSummary={() => {}} />} {/* Pass setSummary or handle accordingly */}
        </div>
    );
};
