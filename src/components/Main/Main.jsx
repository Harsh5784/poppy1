import React, { useState } from 'react';
import './Main.css';
import { assets } from '../../assets/assets';
import upArrow from '../../assets/up_arrow.png';
import axios from 'axios';

export const Main = ({ summary }) => {
  const defaultUsername = 'Harsh';
  const isErrorMessage = summary === 'An error occurred while fetching the summary.';
  const hasOutput = summary && !isErrorMessage;
  const [apiSummary, setApiSummary] = useState('');
  const [loading, setLoading] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [actionType, setActionType] = useState('summary');

  const parseSummary = (text) => {
    const sections = text.replace(/\*\*/g, '').split('\n').map(section => section.trim());
    return sections.map(section => section.trim()).filter(sub => sub);
  };

  const extractLinks = (data) => {
    const links = {
      youtube: data.youtubeLinks?.filter(link => link) || [],
      website: data.websiteLinks?.filter(link => link) || [],
      wikipedia: data.wikipediaTitles?.filter(title => title) || [],
      uploadedFiles: data.uploadedFiles?.filter(file => file) || [],
    };
    return links;
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

    if (validLinks.youtube.length === 0 && validLinks.website.length === 0) {
      alert("Please provide at least one valid link.");
      return;
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
      alert(`Error: ${error.response?.data.error || 'Bad Request'}`);
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
      alert(`Error: ${error.response?.data.error || 'Bad Request'}`);
    } finally {
      setLoading(false);
    }
  };

  const handleActionChange = (e) => {
    const newActionType = e.target.value;
    setActionType(newActionType);

    if (newActionType === 'summary' && hasOutput) {
      const parsedData = JSON.parse(summary);
      const validLinks = extractLinks(parsedData);
      sendDataToAPI(validLinks);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (actionType === 'qna' && inputMessage.trim()) {
      askQuestion(inputMessage);
    } else if (actionType === 'summary') {
      const parsedData = JSON.parse(summary);
      const validLinks = extractLinks(parsedData);
      sendDataToAPI(validLinks);
    }
  };

  const summaries = apiSummary ? parseSummary(apiSummary) : [];

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
          {!loading && !apiSummary && (
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
          )}

          {loading ? (
            <div className="loading">Loading...</div>
          ) : (
            apiSummary && (
              <div className="summary-display">
                <ul className="summary-list">
                  {summaries.map((summary, index) => (
                    <li key={index} className="subtitle">{summary}</li>
                  ))}
                </ul>
              </div>
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
                disabled={actionType === 'summary'} // Disable input in summary mode
              />
              
              <button type="submit" className="submit-button" disabled={actionType === 'summary'}>
    <img src={upArrow} alt="Send" />
</button>

            </div>
          </form>
          {actionType === 'summary' && (
            <p className="switch-message"></p>
          )}
        </div>
      </div>
    </div>
  );
};
