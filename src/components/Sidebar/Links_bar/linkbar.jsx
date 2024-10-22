import React, { useState } from 'react';
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
    switch (type) {
      case 'youtube':
        setYoutubeLinks(prev => prev.map((link, i) => (i === index ? value : link)));
        break;
      case 'website':
        setWebsiteLinks(prev => prev.map((link, i) => (i === index ? value : link)));
        break;
      case 'wikipedia':
        setWikipediaTitles(prev => prev.map((title, i) => (i === index ? value : title)));
        break;
      default:
        break;
    }
  };

  const handleFileChange = (type, index, file) => {
    switch (type) {
      case 'audio':
        setAudioFiles(prev => prev.map((audio, i) => (i === index ? file : audio)));
        break;
      case 'document':
        setDocumentFiles(prev => prev.map((doc, i) => (i === index ? file : doc)));
        break;
      default:
        break;
    }
  };

  const addInputField = (type) => {
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
        setYoutubeLinks(prev => prev.filter((_, i) => i !== index));
        break;
      case 'website':
        setWebsiteLinks(prev => prev.filter((_, i) => i !== index));
        break;
      case 'wikipedia':
        setWikipediaTitles(prev => prev.filter((_, i) => i !== index));
        break;
      case 'audio':
        setAudioFiles(prev => prev.filter((_, i) => i !== index));
        break;
      case 'document':
        setDocumentFiles(prev => prev.filter((_, i) => i !== index));
        break;
      default:
        break;
    }
  };

  return (
    <div className="simple-page">
      <div className="input-fields">
        {/* YouTube Links */}
        {youtubeLinks.map((link, index) => (
          <div className="input-container" key={index}>
            <div className="vertical-line" style={{ left: `${index * 20}px` }} />
            {!index && <img src={youtubeIcon} alt="YouTube" className="input-icon" />}
            <div className="input-wrapper" style={{ marginLeft: `${index * 15}px` }}>
              <input
                type="text"
                value={link}
                onChange={(e) => handleInputChange('youtube', index, e.target.value)}
                placeholder='YouTube Link'
              />
              {index > 0 && (
                <span className="remove-button" onClick={() => removeInputField('youtube', index)}>X</span>
              )}
              {index === youtubeLinks.length - 1 && (
                <span className="add-button" onClick={() => addInputField('youtube')}>+</span>
              )}
            </div>
          </div>
        ))}

        {/* Website Links */}
        {websiteLinks.map((link, index) => (
          <div className="input-container" key={index}>
            <div className="vertical-line" style={{ left: `${index * 20}px` }} />
            {!index && <img src={websiteIcon} alt="Website" className="input-icon" />}
            <div className="input-wrapper" style={{ marginLeft: `${index * 15}px` }}>
              <input
                type="text"
                value={link}
                onChange={(e) => handleInputChange('website', index, e.target.value)}
                placeholder='Website Link'
              />
              {index > 0 && (
                <span className="remove-button" onClick={() => removeInputField('website', index)}>X</span>
              )}
              {index === websiteLinks.length - 1 && (
                <span className="add-button" onClick={() => addInputField('website')}>+</span>
              )}
            </div>
          </div>
        ))}

        {/* Wikipedia Titles */}
        {wikipediaTitles.map((title, index) => (
          <div className="input-container" key={index}>
            <div className="vertical-line" style={{ left: `${index * 20}px` }} />
            {!index && <img src={fileIcon} alt="Wikipedia" className="input-icon" />}
            <div className="input-wrapper" style={{ marginLeft: `${index * 15}px` }}>
              <input
                type="text"
                value={title}
                onChange={(e) => handleInputChange('wikipedia', index, e.target.value)}
                placeholder='Wikipedia Title'
              />
              {index > 0 && (
                <span className="remove-button" onClick={() => removeInputField('wikipedia', index)}>X</span>
              )}
              {index === wikipediaTitles.length - 1 && (
                <span className="add-button" onClick={() => addInputField('wikipedia')}>+</span>
              )}
            </div>
          </div>
        ))}

        {/* Audio Files */}
        {audioFiles.map((file, index) => (
          <div className="input-container" key={index}>
            <div className="vertical-line" style={{ left: `${index * 20}px` }} />
            {!index && <img src={audioIcon} alt="Audio" className="input-icon" />}
            <div className="input-wrapper" style={{ marginLeft: `${index * 15}px` }}>
              <input
                type="file"
                accept="audio/*"
                onChange={(e) => handleFileChange('audio', index, e.target.files[0])}
              />
              {index > 0 && (
                <span className="remove-button" onClick={() => removeInputField('audio', index)}>X</span>
              )}
              {index === audioFiles.length - 1 && (
                <span className="add-button" onClick={() => addInputField('audio')}>+</span>
              )}
            </div>
          </div>
        ))}

        {/* Document Files */}
        {documentFiles.map((file, index) => (
          <div className="input-container" key={index}>
            <div className="vertical-line" style={{ left: `${index * 20}px` }} />
            {!index && <img src={fileIcon} alt="Document" className="input-icon" />}
            <div className="input-wrapper" style={{ marginLeft: `${index * 15}px` }}>
              <input
                type="file"
                accept="application/pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,image/*"
                onChange={(e) => handleFileChange('document', index, e.target.files[0])}
              />
              {index > 0 && (
                <span className="remove-button" onClick={() => removeInputField('document', index)}>X</span>
              )}
              {index === documentFiles.length - 1 && (
                <span className="add-button" onClick={() => addInputField('document')}>+</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SimplePage;
