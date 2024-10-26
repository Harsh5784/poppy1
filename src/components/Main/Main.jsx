import React, { useState, useEffect } from 'react';
import './Main.css';
import axios from 'axios';
import upArrow from '../../assets/up_arrow.png';

export const Main = ({ summary }) => {
  const defaultUsername = 'Harsh';
  const [apiSummary, setApiSummary] = useState('');
  const [loading, setLoading] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [actionType, setActionType] = useState('summary');

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

  const handleActionChange = (e) => {
    setActionType(e.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (actionType === 'qna' && inputMessage.trim()) {
      // handle Q&A here
    }
  };

  return (
    <div className='main'>
      <div className="nav">
        <h1>My Application</h1>
        <select value={actionType} onChange={handleActionChange} className="nav-dropdown">
          <option value="summary">Summary</option>
          <option value="qna">Q&A</option>
        </select>
      </div>

      <div className="main-container">
        <div className='box'>
          {loading ? (
            <div className="loading">Loading...</div>
          ) : (
            apiSummary && (
              <div className="summary-display">
                <ul className="summary-list">
                  {apiSummary.split('\n').filter(Boolean).map((summary, index) => (
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
                disabled={actionType === 'summary'}
              />
              <button type="submit" className="submit-button" disabled={actionType === 'summary'}>
                <img src={upArrow} alt="Send" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
