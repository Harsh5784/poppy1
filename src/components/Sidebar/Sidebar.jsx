import React, { useState, useEffect, useCallback } from 'react';
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
import downloadIcon from '../../assets/download.png'; // Import the download icon

export const Sidebar = ({ setIsSidebarVisible, setSummary }) => {
    const [isSidebarVisible, setIsSidebarVisibleState] = useState(true);
    const [isLinkbarVisible, setIsLinkbarVisible] = useState(true);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [reports, setReports] = useState([]);
    const username = "Devam"; // Hardcoded username

    const handleCollapse = useCallback(() => {
        setIsSidebarVisibleState(prev => !prev);
    }, []);

    const toggleLinkbarVisibility = useCallback(() => {
        setIsLinkbarVisible(prev => !prev);
    }, []);

    const toggleDropdown = useCallback(() => {
        setIsDropdownOpen(prev => !prev);
    }, []);

    useEffect(() => {
        const fetchReports = async () => {
            try {
                const response = await fetch('http://15.206.73.250:5000/api/list_reports', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ username }), // Sending the username in the required format
                });

                if (!response.ok) {
                    const errorMessage = await response.text();
                    console.error('Error fetching reports:', response.status, errorMessage);
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                const sortedReports = (data.reports || []).sort((a, b) => {
                    return new Date(b.timestamp) - new Date(a.timestamp); // Sort by timestamp descending
                });
                setReports(sortedReports);
            } catch (error) {
                console.error('Error fetching reports:', error);
            }
        };

        fetchReports();
    }, [username]);

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
                                {reports.slice(0, 3).map((report, index) => ( // Limit to first 3 reports
                                    <div key={index} className="dropdown-option">
                                        <img src={downloadIcon} alt="Download Icon" className="download-icon" /> {/* Download icon */}
                                        {report.video_title ? report.video_title : "No title available"} {/* Show title or "No title available" */}
                                        <span className="three-dots">...</span>
                                    </div>
                                ))}
                                {reports.length === 0 && (
                                    <div className="dropdown-option">No reports available.</div>
                                )}
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
