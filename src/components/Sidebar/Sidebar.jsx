import React, { useState } from 'react'
import './Sidebar.css'
import { assets } from '../../assets/assets'

export const Sidebar = () => {

    const [extented, setExtented] = useState(false)

    return (
        <div className='sidebar'>
            <div className='top'>
                <div onClick={()=>setExtented(prev=>!prev)} className='menu'>
                    <img src={assets.sidebar} alt="" />
                    <img src={assets.right} alt="" /> 
                </div>
                <div className="new-chat">
                    <img src={assets.plus} alt="" />
                    <p>New Chat</p>
                </div>

                
                <div className="recent">
                        <p className="recent-title">Recent</p>
                        <div className="recent-entry">
                            <img src={assets.comment} alt="" />
                            <p>What is My Ai ?</p>
                        </div>
                        <div className="recent-entry">
                            <img src={assets.comment} alt="" />
                            <p>What is Android and..</p>
                        </div>
                        <div className="recent-entry">
                            <img src={assets.comment} alt="" />
                            <p>Deep Learning in..</p>
                        </div>
                    </div>
                    

            </div>
            <div className="bottom">
                <div className="bottom-item">
                    <img src={assets.question_icon} alt="" />
                     <p>Help</p> 
                </div>
                <div className="bottom-item">
                    <img src={assets.setting_icon} alt="" />
                    <p>Settings</p> 
                </div>
                
                
            </div>



        </div>

    )
}
