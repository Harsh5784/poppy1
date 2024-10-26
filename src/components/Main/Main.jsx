import React, { useState, useEffect } from 'react';
import './Main.css';
import { assets } from '../../assets/assets';
import upArrow from '../../assets/up_arrow.png';
import axios from 'axios';

export const Main = ({ summary }) => {
  const defaultUsername = 'Harsh';
  const [apiSummary, setApiSummary] = useState('');
  const [loading, setLoading] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [actionType, setActionType] = useState('summary');
  const [submittedMessages, setSubmittedMessages] = useState([]);

  useEffect(() => {
    // Automatically send data to API when summary changes
    if (summary && (summary.youtubeLinks?.length || summary.websiteLinks?.length)) {
      sendDataToAPI(extractLinks(summary));
    }
  }, [summary]);

  const extractLinks = (data) => {
    return {
      youtube: data.youtubeLinks || [],
      website: data.websiteLinks || [],
      wikipedia: data.wikipediaTitles || [],
      uploadedFiles: [...(data.audioFiles || []), ...(data.documentFiles || [])].filter(file => file),
    };
  };

  const sendDataToAPI = async (validLinks) => {
    const formData = new URLSearchParams();
    formData.append('username', defaultUsername);

    validLinks.youtube.forEach((link, index) => {
      formData.append(`youtube_link${index + 1}`, link);
    });

    validLinks.uploadedFiles.forEach((file, index) => {
      formData.append(`uploaded_file${index + 1}`, file);
    });

    validLinks.website.forEach((link, index) => {
      formData.append(`website_url${index + 1}`, link);
    });

    validLinks.wikipedia.forEach((title, index) => {
      formData.append(`wikipedia_title${index + 1}`, title);
    });

    if (!validLinks.youtube.length && !validLinks.website.length) {
      return; // Do not send if no links are available
    }

    setLoading(true);
    try {
      const response = await axios.post('http://15.206.73.250:5000/api/summary', formData, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });
      setApiSummary(response.data.summary);
    } catch (error) {
      console.error('Error sending data to API:', error);
    } finally {
      setLoading(false);
    }
  };

  const askQuestion = async (question) => {
    const formData = new URLSearchParams();
    formData.append('username', defaultUsername);
    formData.append('question', question);

    const parsedData = JSON.parse(summary);
    const validLinks = extractLinks(parsedData);
    validLinks.youtube.forEach((link, index) => {
      formData.append(`youtube_link${index + 1}`, link);
    });
    validLinks.uploadedFiles.forEach((file, index) => {
      formData.append(`uploaded_file${index + 1}`, file);
    });
    validLinks.website.forEach((link, index) => {
      formData.append(`website_url${index + 1}`, link);
    });
    validLinks.wikipedia.forEach((title, index) => {
      formData.append(`wikipedia_title${index + 1}`, title);
    });

    setLoading(true);
    try {
      const response = await axios.post('http://15.206.73.250:5000/api/ask_question', formData, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });
      setApiSummary(response.data.answer);
    } catch (error) {
      console.error('Error asking question:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleActionChange = (e) => {
    setActionType(e.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (actionType === 'qna' && inputMessage.trim()) {
      setSubmittedMessages([...submittedMessages, inputMessage]);
      askQuestion(inputMessage);
      setInputMessage('');
    }
  };

  const renderCards = () => (
    <div className="cards">
      <div className="card">
        <h3 className='yt'>YouTube Videos</h3>
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
  );

  return (
    <div className='main'>
      <div className="nav">
        <img src={assets.logo} alt="Logo" />
        <select 
          value={actionType} 
          onChange={handleActionChange}
          className="nav-dropdown"
        >
          <option value="summary">Summary</option>
          <option value="qna">Q&A</option>
        </select>
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
          {loading ? (
            <div className="loading">Loading...</div>
          ) : (
            apiSummary ? (
              <div className="summary-display">
                <ul className="summary-list">
                  {apiSummary.split('\n').filter(Boolean).map((summary, index) => (
                    <li key={index} className="subtitle">{summary}</li>
                  ))}
                </ul>
              </div>
            ) : (
              <>
              <div className="greet">
                <img className="logo" src={assets.logo} alt="Logo" />
                <div className="greet-text">
                  <p><span>Hello, {defaultUsername}</span></p>
                  <p>How can I help you today?</p>
                </div>
              </div>

              <p className='bottom-info'>Ask anything from multiple resources</p>

              <div className="cards">
                <div className="card">
                  <h3 className='yt'>YouTube Videos</h3>
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
            </>
            )
          )}
        </div>

        <div className="main-bottom">
          <form onSubmit={handleSubmit}>
            <div className='search-box'>
              <input 
                type="text" 
                placeholder={actionType === 'summary' ? 'Switch to Q&A to ask a question' : 'Message (optional)'} 
                value={inputMessage}
                onChange={(e) => actionType === 'qna' && setInputMessage(e.target.value)}
                disabled={actionType === 'summary'}
              />
              <button type="submit" className="submit-button" disabled={actionType === 'summary'}>
                <img src={upArrow} alt="Send" />
              </button>
            </div>
          </form>

          {actionType === 'qna' && submittedMessages.length > 0 && (
            <div className="submitted-messages">
              <h3>Submitted Messages:</h3>
              <ul>
                {submittedMessages.map((msg, index) => (
                  <li key={index}>{msg}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
