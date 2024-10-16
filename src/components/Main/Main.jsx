import React from 'react';
import './Main.css';
import { assets } from '../../assets/assets';
import upArrow from '../../assets/up_arrow.png'; // Adjust the path as necessary

export const Main = ({ summary }) => { // Receive summary as a prop
    // Check if the summary is an error message
    const isErrorMessage = summary === 'An error occurred while fetching the summary.';
    const hasOutput = summary && !isErrorMessage;

    return (
        <div className='main'>
            <div className="nav">
                <img src={assets.logo} alt="Logo" />
                <div className='nav-right'>
                    <img src={assets.home_icon} alt="Home" />
                    <img src={assets.calendar} alt="Calendar" />
                    <img src={assets.notification_bell} alt="Notifications" />
                    <img src={assets.chat_icon} alt="Chat" />
                    <img src={assets.tool_icon} alt="Tools" />
                    <img src={assets.user_icon} alt="User" />
                </div>
            </div>

            <div className="main-container">
                <div className='box'>
                    <div className="greet">
                        {/* Conditionally render greeting based on output availability */}
                        {!hasOutput && (
                            <>
                        <img className="logo" src={assets.logo} alt="Logo" />
                            <div className="greet-text">
                                <p><span>Hello, User</span></p>
                                <p>How can I help you today?</p>
                            </div>
                            </>
                        )}
                    </div>

                    {/* Only show the default info if there's no output */}
                    {!hasOutput && (
                        <p className='bottom-info'>
                            Ask anything from multiple resources
                        </p>
                    )}

                    {/* Only render the cards if there's no output */}
                    {!hasOutput && (
                        <div className="cards">
                            <div className="card">
                                <h3 className='yt'>Youtube Videos</h3>
                                <p>Prompt using a YouTube video link</p>
                            </div>
                            <div className="card">
                                <h3 className='image'>Image</h3>
                                <p>Prompt using a picture</p>
                            </div>
                            <div className="card">
                                <h3 className='audio'>Audio File</h3>
                                <p>Prompt using recorded audio files</p>
                            </div>
                            <div className="card">
                                <h3 className='website'>Website Link</h3>
                                <p>Prompt using a website link</p>
                            </div>
                        </div>
                    )}

                    {/* Output display section */}
                    <div className="output">
                        {hasOutput && <div className="summary-display">{summary}</div>}
                    </div>
                </div>

                <div className="main-bottom">
                    <div className='search-box'>
                        <input type="text" placeholder='Message' />
                        <div>
                            <img src={upArrow} alt="Send" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
