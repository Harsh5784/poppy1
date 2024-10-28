import React, { useState } from 'react';
import './Sidebar.css';
import { assets } from '../../assets/assets';
import Linkbar from './Links_bar/linkbar'; 
import toggleIcon from '../../assets/right.png'; 
import reportIcon from '../../assets/report-analytics.png'; 
import upArrowIcon from '../../assets/chevron-up.png'; 
import downArrowIcon from '../../assets/chevron-down.png'; 
import icon1 from '../../assets/youtube.png'; 
import icon2 from '../../assets/world.png'; 
import icon3 from '../../assets/mic.png'; 
import icon4 from '../../assets/file-description.png'; 

export const Sidebar = ({ setIsSidebarVisible, setSummary }) => {
    const [isSidebarVisible, setIsSidebarVisibleState] = useState(true);
    const [isLinkbarVisible, setIsLinkbarVisible] = useState(true);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const handleCollapse = () => {
        setIsSidebarVisibleState(prev => !prev);
    };

    const toggleLinkbarVisibility = () => {
        setIsLinkbarVisible(prev => !prev);
    };

    const toggleDropdown = () => {
        setIsDropdownOpen(prev => !prev);
    };

    return (
        <div className='sidebar-container'>
            {isSidebarVisible ? (
                <div className='sidebar'>
                    <div className='top'>
                        <div className="toggle-container">
                            <span onClick={handleCollapse} className='menu'>
                                <img src={assets.sidebar} alt="Sidebar Icon" />
                            </span>
                            <span className="toggle-linkbar" onClick={toggleLinkbarVisibility}>
                                <img 
                                    src={toggleIcon} 
                                    alt="Toggle Linkbar" 
                                    className="toggle-linkbar-icon"
                                />
                            </span>
                        </div>
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

                    <div className="dropdown">
                        <div className="dropdown-title" onClick={toggleDropdown}>
                            <img src={reportIcon} alt="Report Icon" className="report-icon" />
                            Reports
                            <img 
                                src={isDropdownOpen ? upArrowIcon : downArrowIcon} 
                                alt="Toggle Dropdown" 
                                className="dropdown-arrow" 
                            />
                        </div>
                        {isDropdownOpen && (
                            <div className="dropdown-options">
                                <div className="dropdown-option">Option 1 <span className="three-dots">...</span></div>
                                <div className="dropdown-option">Option 2 <span className="three-dots">...</span></div>
                                <div className="dropdown-option">Option 3 <span className="three-dots">...</span></div>
                            </div>
                        )}
                    </div>

                    <div className="icon-container">
                        <img src={icon1} alt="Icon 1" onClick={toggleLinkbarVisibility} />
                        <img src={icon2} alt="Icon 2" onClick={toggleLinkbarVisibility} />
                        <img src={icon3} alt="Icon 3" onClick={toggleLinkbarVisibility} />
                        <img src={icon4} alt="Icon 4" onClick={toggleLinkbarVisibility} />
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
            ) : (
                <div className='collapsed-sidebar'>
                    <div className="toggle-container">
                        <span onClick={handleCollapse} className='menu'>
                            <img src={assets.sidebar} alt="Sidebar Icon" />
                        </span>
                        <span className="toggle-linkbar" onClick={toggleLinkbarVisibility}>
                            <img 
                                src={toggleIcon} 
                                alt="Toggle Linkbar" 
                                className="toggle-linkbar-icon"
                            />
                        </span>
                    </div>
                </div>
            )}
            {isLinkbarVisible && <Linkbar setSummary={setSummary} />}
        </div>
    );
};
