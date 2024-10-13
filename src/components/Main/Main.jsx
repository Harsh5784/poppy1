import React from 'react'
import './Main.css'
import { assets } from '../../assets/assets'
import upArrow from '../../assets/up_arrow.png'; // Adjust the path as necessary


export const Main = () => {
    return (
        <div className='main'>
            <div className="nav">
                <img src={assets.logo} alt="" />
                <div className='nav-right'>
                    <img src={assets.home_icon} alt="" />
                    <img src={assets.calendar} alt="" />
                    <img src={assets.notification_bell} alt="" />
                    <img src={assets.chat_icon} alt="" />
                    <img src={assets.tool_icon} alt="" />
                    <img src={assets.user_icon} alt="" />
                </div>
            </div>

            <div className="main-container">


                <div className='box'>
                    <div className="greet">
                        <img className="logo" src={assets.logo} alt="" />
                        
                        <div className="greet-text">
                            <p><span>Hello, User</span></p>
                            <p>How can I help you today?</p>
                        </div>
                    </div>
                    <p className='bottom-info'>
                        Ask anything from multiple resources
                    </p>
                    <div className="cards">
                        <div className="card">
                            <h3 className='yt'>Youtube Videos</h3>
                            <p>Prompt using a youtube video link</p>
                        </div>
                        <div className="card">
                            <h3 className='image'>Image</h3>
                            <p>Prompt using a picture</p>
                        </div>
                        <div className="card">
                            <h3 className='audio'>Audio File</h3>
                            <p>Prompt using a recorded audio files</p>
                        </div>
                        <div className="card">
                            <h3 className='website'>Website link</h3>
                            <p>Prompt using a website link</p>
                        </div>
                    </div>
                </div>


                <div className="main-bottom">
                    <div className='search-box'>
                        <input type="text" placeholder='Message' />
                        <div><img src={upArrow} alt="Send" /> {/* Use the imported image here */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
