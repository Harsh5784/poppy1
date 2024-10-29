import React, { useState } from 'react';
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
  const [isButtonClicked, setIsButtonClicked] = useState(false);

  const extractLinks = (data) => {
    return {
      youtube: data.youtubeLinks || [],
      website: data.websiteLinks || [],
      wikipedia: data.wikipediaTitles || [],
      uploadedFiles: [...(data.audioFiles || []), ...(data.documentFiles || [])].filter(file => file),
    };
  };

  const getApiEndpoint = () => {
    return actionType === 'summary'
      ? 'http://15.206.73.250:5000/api/summary'
      : 'http://15.206.73.250:5000/api/ask_question';
  };

  const sendDataToAPI = async (validLinks, question = '') => {
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

    if (question) {
      formData.append('question', question);
    }

    if (!validLinks.youtube.length && !validLinks.website.length && !question) {
      return; // Do not send if no links or question is available
    }

    setLoading(true);
    try {
      const response = await axios.post(getApiEndpoint(), formData, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });
      setApiSummary(actionType === 'summary' ? response.data.summary : response.data.answer);
    } catch (error) {
      console.error('Error sending data to API:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleActionChange = (e) => {
    setActionType(e.target.value);
    setApiSummary(''); // Clear summary when switching actions
    setSubmittedMessages([]); // Clear submitted messages when switching actions
    setInputMessage(''); // Clear input field when switching actions
    setIsButtonClicked(false); // Reset button click state
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsButtonClicked(true); // Set button clicked state to true
  
    // Check if summary is a string and parse it if needed
    const parsedSummary = typeof summary === 'string' ? JSON.parse(summary) : summary;
    const validLinks = extractLinks(parsedSummary); // Extract links from summary
  
    if (actionType === 'qna' && inputMessage.trim()) {
      setSubmittedMessages([...submittedMessages, inputMessage]);
      sendDataToAPI(validLinks, inputMessage); // Send input message to API
      setInputMessage(''); // Clear input field after submission
    } else if (actionType === 'summary') {
      sendDataToAPI(validLinks); // Send data for summary if applicable
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

  const formatSummary = (summaryText) => {
    return summaryText.split('\n').map((line, index) => {
      line = line.trim();

      // Check for main headings
      if (line.startsWith('**') && line.endsWith('**')) {
        return <h3 key={index} className="summary-heading">{line.replace(/\*\*/g, '').trim()}</h3>;
      }
      
      // Check for subheadings (which start with a single asterisk)
      else if (line.startsWith('*') && !line.startsWith('**')) {
        return (
          <div key={index} className="summary-subheading" style={{ marginLeft: '20px', fontWeight: 'bold' }}>
            {line.replace(/^\*/, '').trim()}
          </div>
        );
      }

      // Check for regular paragraphs that aren't empty
      else if (line) {
        return <p key={index} className="summary-paragraph">{line}</p>;
      }

      // Skip empty lines
      return null;
    });
  };

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
            <div className="loader"></div> // Circular loader
          )  : (
            apiSummary ? (
              <div className="summary-display">
                {formatSummary(apiSummary)}
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

                {renderCards()}
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
                disabled={actionType === 'summary'}
                onChange={(e) => setInputMessage(e.target.value)} // Allow typing regardless of action type
              />
              <button type="submit" className="submit-button">
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
