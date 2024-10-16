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
  const [loading, setLoading] = useState(false);
  const [summary, setLocalSummary] = useState('');

  const autoSubmit = async () => {
    const formData = new FormData();
    formData.append('username', 'User');

    youtubeLinks.forEach((link, index) => {
      if (link) formData.append(`youtube_link${index + 1}`, link);
    });

    websiteLinks.forEach((link, index) => {
      if (link) formData.append(`website_url${index + 1}`, link);
    });

    wikipediaTitles.forEach((title, index) => {
      if (title) formData.append(`wikipedia_title${index + 1}`, title);
    });

    audioFiles.forEach((file, index) => {
      if (file) formData.append(`uploaded_file_audio${index + 1}`, file);
    });

    documentFiles.forEach((file, index) => {
      if (file) formData.append(`uploaded_file${index + 1}`, file);
    });

    setLoading(true);
    setLocalSummary('');

    try {
      const response = await fetch('http://15.206.73.250:5000/api/summary', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setLocalSummary(data.summary);
      setSummary(data.summary);
    } catch (error) {
      console.error('Error fetching summary:', error);
      setLocalSummary('An error occurred while fetching the summary.');
      setSummary('An error occurred while fetching the summary.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    autoSubmit();
  }, [youtubeLinks, websiteLinks, wikipediaTitles, audioFiles, documentFiles]);

  const handleYoutubeLinkChange = (index, value) => {
    const newLinks = [...youtubeLinks];
    newLinks[index] = value;
    setYoutubeLinks(newLinks);
  };

  const handleWebsiteLinkChange = (index, value) => {
    const newLinks = [...websiteLinks];
    newLinks[index] = value;
    setWebsiteLinks(newLinks);
  };

  const handleWikipediaTitleChange = (index, value) => {
    const newTitles = [...wikipediaTitles];
    newTitles[index] = value;
    setWikipediaTitles(newTitles);
  };

  const handleAudioFileChange = (index, file) => {
    const newFiles = [...audioFiles];
    newFiles[index] = file;
    setAudioFiles(newFiles);
  };

  const handleDocumentFileChange = (index, file) => {
    const newFiles = [...documentFiles];
    newFiles[index] = file;
    setDocumentFiles(newFiles);
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
    </div>
  );
};

export default SimplePage;
