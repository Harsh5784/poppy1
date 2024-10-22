import React, { useState, useEffect } from 'react';
import './linkbar.css';
import youtubeIcon from '../../../assets/youtube_links.jpg';
import websiteIcon from '../../../assets/website.jpg';
import audioIcon from '../../../assets/audio.jpg';
import fileIcon from '../../../assets/document.jpg';

const SimplePage = ({ setSummary }) => {
  const [youtubeLinks, setYoutubeLinks] = useState(['']);
  const [websiteLinks, setWebsiteLinks] = useState(['']);
  const [wikipediaTitles, setWikipediaTitles] = useState(['']);
  const [audioFiles, setAudioFiles] = useState([null]);
  const [documentFiles, setDocumentFiles] = useState([null]);

  const handleInputChange = (type, index, value) => {
    const newState = {
      youtubeLinks,
      websiteLinks,
      wikipediaTitles,
      audioFiles,
      documentFiles,
    };

    switch (type) {
      case 'youtube':
        newState.youtubeLinks[index] = value;
        setYoutubeLinks(newState.youtubeLinks);
        break;
      case 'website':
        newState.websiteLinks[index] = value;
        setWebsiteLinks(newState.websiteLinks);
        break;
      case 'wikipedia':
        newState.wikipediaTitles[index] = value;
        setWikipediaTitles(newState.wikipediaTitles);
        break;
      default:
        break;
    }
    
    // Update summary whenever inputs change
    setSummary(JSON.stringify(newState));
  };

  const handleFileChange = (type, index, file) => {
    const newState = {
      youtubeLinks,
      websiteLinks,
      wikipediaTitles,
      audioFiles,
      documentFiles,
    };

    switch (type) {
      case 'audio':
        newState.audioFiles[index] = file;
        setAudioFiles(newState.audioFiles);
        break;
      case 'document':
        newState.documentFiles[index] = file;
        setDocumentFiles(newState.documentFiles);
        break;
      default:
        break;
    }
    
    // Update summary whenever files change
    setSummary(JSON.stringify(newState));
  };

  const canAddField = (type) => {
    switch (type) {
      case 'youtube':
        return youtubeLinks.every(link => link.trim() !== '');
      case 'website':
        return websiteLinks.every(link => link.trim() !== '');
      case 'wikipedia':
        return wikipediaTitles.every(title => title.trim() !== '');
      case 'audio':
        return audioFiles.every(file => file !== null);
      case 'document':
        return documentFiles.every(file => file !== null);
      default:
        return false;
    }
  };

  const addInputField = (type) => {
    if (!canAddField(type)) return;

    switch (type) {
      case 'youtube':
        if (youtubeLinks.length < 5) setYoutubeLinks([...youtubeLinks, '']);
        break;
      case 'website':
        if (websiteLinks.length < 5) setWebsiteLinks([...websiteLinks, '']);
        break;
      case 'wikipedia':
        if (wikipediaTitles.length < 5) setWikipediaTitles([...wikipediaTitles, '']);
        break;
      case 'audio':
        if (audioFiles.length < 5) setAudioFiles([...audioFiles, null]);
        break;
      case 'document':
        if (documentFiles.length < 5) setDocumentFiles([...documentFiles, null]);
        break;
      default:
        break;
    }
  };

  const removeInputField = (type, index) => {
    switch (type) {
      case 'youtube':
        setYoutubeLinks(youtubeLinks.filter((_, i) => i !== index));
        break;
      case 'website':
        setWebsiteLinks(websiteLinks.filter((_, i) => i !== index));
        break;
      case 'wikipedia':
        setWikipediaTitles(wikipediaTitles.filter((_, i) => i !== index));
        break;
      case 'audio':
        setAudioFiles(audioFiles.filter((_, i) => i !== index));
        break;
      case 'document':
        setDocumentFiles(documentFiles.filter((_, i) => i !== index));
        break;
      default:
        break;
    }
    
    // Update summary after removing
    const newState = {
      youtubeLinks,
      websiteLinks,
      wikipediaTitles,
      audioFiles,
      documentFiles,
    };
    setSummary(JSON.stringify(newState));
  };

  return (
    <div className="simple-page">
      <div className="input-fields">
        {youtubeLinks.map((link, index) => (
          <div className="input-container" key={index}>
            <div className="vertical-line" style={{ left: `${index * 20}px` }} />
            {!index && <img src={youtubeIcon} alt="YouTube" className="input-icon" />}
            <div className={`input-wrapper`} style={{ marginLeft: `${index * 15}px` }}>
              <input
                type="text"
                value={link}
                onChange={(e) => handleYoutubeLinkChange(index, e.target.value)}
                placeholder='YouTube Link'
              />
              {index > 0 && (
                <span className="remove-button" onClick={() => removeInputField('youtube', index)}>X</span>
              )}
              <span className="add-button" onClick={() => addInputField('youtube')}>+</span>
            </div>
          </div>
        ))}

        {websiteLinks.map((link, index) => (
          <div className="input-container" key={index}>
            <div className="vertical-line" style={{ left: `${index * 20}px` }} />
            {!index && <img src={websiteIcon} alt="Website" className="input-icon" />}
            <div className={`input-wrapper`} style={{ marginLeft: `${index * 15}px` }}>
              <input
                type="text"
                value={link}
                onChange={(e) => handleWebsiteLinkChange(index, e.target.value)}
                placeholder='Website Link'
              />
              {index > 0 && (
                <span className="remove-button" onClick={() => removeInputField('website', index)}>X</span>
              )}
              <span className="add-button" onClick={() => addInputField('website')}>+</span>
            </div>
          </div>
        ))}

        {wikipediaTitles.map((title, index) => (
          <div className="input-container" key={index}>
            <div className="vertical-line" style={{ left: `${index * 20}px` }} />
            {!index && <img src={fileIcon} alt="Wikipedia" className="input-icon" />}
            <div className={`input-wrapper`} style={{ marginLeft: `${index * 15}px` }}>
              <input
                type="text"
                value={title}
                onChange={(e) => handleWikipediaTitleChange(index, e.target.value)}
                placeholder='Wikipedia Title'
              />
              {index > 0 && (
                <span className="remove-button" onClick={() => removeInputField('wikipedia', index)}>X</span>
              )}
              <span className="add-button" onClick={() => addInputField('wikipedia')}>+</span>
            </div>
          </div>
        ))}

        {audioFiles.map((file, index) => (
          <div className="input-container" key={index}>
            <div className="vertical-line" style={{ left: `${index * 20}px` }} />
            {!index && <img src={audioIcon} alt="Audio" className="input-icon" />}
            <div className={`input-wrapper`} style={{ marginLeft: `${index * 15}px` }}>
              <input
                type="file"
                accept="audio/*"
                onChange={(e) => handleAudioFileChange(index, e.target.files[0])}
              />
              {index > 0 && (
                <span className="remove-button" onClick={() => removeInputField('audio', index)}>X</span>
              )}
              <span className="add-button" onClick={() => addInputField('audio')}>+</span>
            </div>
          </div>
        ))}

        {documentFiles.map((file, index) => (
          <div className="input-container" key={index}>
            <div className="vertical-line" style={{ left: `${index * 20}px` }} />
            {!index && <img src={fileIcon} alt="Document" className="input-icon" />}
            <div className={`input-wrapper`} style={{ marginLeft: `${index * 15}px` }}>
              <input
                type="file"
                accept="application/pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,image/*"
                onChange={(e) => handleDocumentFileChange(index, e.target.files[0])}
              />
              {index > 0 && (
                <span className="remove-button" onClick={() => removeInputField('document', index)}>X</span>
              )}
              <span className="add-button" onClick={() => addInputField('document')}>+</span>
            </div>
          </div>
        ))}
      </div>
      {loading && <div>Loading...</div>} {/* Optional loading indicator */}
      {localSummary && <div className="summary">{localSummary}</div>} {/* Display summary */}
    </div>
  );
};

export default SimplePage;
