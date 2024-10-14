import React, { useState } from 'react';
import './linkbar.css';
import youtubeIcon from '../../../assets/youtube_links.jpg';
import websiteIcon from '../../../assets/website.jpg';
import audioIcon from '../../../assets/audio.jpg';
import fileIcon from '../../../assets/document.jpg';

const SimplePage = () => {
    const [youtubeLinks, setYoutubeLinks] = useState(['']);
    const [websiteLinks, setWebsiteLinks] = useState(['']);
    const [wikipediaTitles, setWikipediaTitles] = useState(['']);
    const [audioFiles, setAudioFiles] = useState([null]);
    const [documentFiles, setDocumentFiles] = useState([null]);
    const [loading, setLoading] = useState(false);
    const [summary, setSummary] = useState('');

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

    const autoSubmit = async () => {
        const formData = new FormData();
        formData.append('username', 'Harsh');

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

        console.log('Form Data:', Array.from(formData.entries())); // Debugging line

        setLoading(true);
        setSummary('');

        try {
            const response = await fetch('http://15.206.73.250:5000/api/summary', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            setSummary(data.summary);
        } catch (error) {
            console.error('Error fetching summary:', error);
            setSummary('An error occurred while fetching the summary.');
        } finally {
            setLoading(false);
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
                        {!index && <img src={youtubeIcon} alt="YouTube" className="input-icon" />}
                        <div className={`input-wrapper ${index > 0 ? 'sub-input' : ''}`} style={{ '--input-index': index }}>
                            <input
                                type="text"
                                placeholder="Paste YouTube Video Link"
                                value={link}
                                onChange={(e) => handleYoutubeLinkChange(index, e.target.value)}
                            />
                            <div className="button-container">
                                {index > 0 && (
                                    <button className="remove-button" onClick={() => removeInputField('youtube', index)}>X</button>
                                )}
                                {index === youtubeLinks.length - 1 && youtubeLinks.length < 5 && (
                                    <button onClick={() => addInputField('youtube')} className="add-button">+</button>
                                )}
                            </div>
                        </div>
                        {index > 0 && <div className="vertical-line" />}
                    </div>
                ))}

                {websiteLinks.map((link, index) => (
                    <div className="input-container" key={index}>
                        {!index && <img src={websiteIcon} alt="Website" className="input-icon" />}
                        <div className={`input-wrapper ${index > 0 ? 'sub-input' : ''}`} style={{ '--input-index': index }}>
                            <input
                                type="text"
                                placeholder="Paste Website Link"
                                value={link}
                                onChange={(e) => handleWebsiteLinkChange(index, e.target.value)}
                            />
                            <div className="button-container">
                                {index > 0 && (
                                    <button className="remove-button" onClick={() => removeInputField('website', index)}>X</button>
                                )}
                                {index === websiteLinks.length - 1 && websiteLinks.length < 5 && (
                                    <button onClick={() => addInputField('website')} className="add-button">+</button>
                                )}
                            </div>
                        </div>
                        {index > 0 && <div className="vertical-line" />}
                    </div>
                ))}

                {wikipediaTitles.map((title, index) => (
                    <div className="input-container" key={index}>
                        {!index && <img src={websiteIcon} alt="Wikipedia" className="input-icon" />}
                        <div className={`input-wrapper ${index > 0 ? 'sub-input' : ''}`} style={{ '--input-index': index }}>
                            <input
                                type="text"
                                placeholder="Paste Wikipedia Title"
                                value={title}
                                onChange={(e) => handleWikipediaTitleChange(index, e.target.value)}
                            />
                            <div className="button-container">
                                {index > 0 && (
                                    <button className="remove-button" onClick={() => removeInputField('wikipedia', index)}>X</button>
                                )}
                                {index === wikipediaTitles.length - 1 && wikipediaTitles.length < 5 && (
                                    <button onClick={() => addInputField('wikipedia')} className="add-button">+</button>
                                )}
                            </div>
                        </div>
                        {index > 0 && <div className="vertical-line" />}
                    </div>
                ))}

                {audioFiles.map((file, index) => (
                    <div className="input-container" key={index}>
                        {!index && <img src={audioIcon} alt="Audio" className="input-icon" />}
                        <div className={`input-wrapper ${index > 0 ? 'sub-input' : ''}`} style={{ '--input-index': index }}>
                            <input
                                type="file"
                                accept="audio/*"
                                onChange={(e) => handleAudioFileChange(index, e.target.files[0])}
                            />
                            <div className="button-container">
                                {index > 0 && (
                                    <button className="remove-button" onClick={() => removeInputField('audio', index)}>X</button>
                                )}
                                {index === audioFiles.length - 1 && audioFiles.length < 5 && (
                                    <button onClick={() => addInputField('audio')} className="add-button">+</button>
                                )}
                            </div>
                        </div>
                        {index > 0 && <div className="vertical-line" />}
                    </div>
                ))}

                {documentFiles.map((file, index) => (
                    <div className="input-container" key={index}>
                        {!index && <img src={fileIcon} alt="File" className="input-icon" />}
                        <div className={`input-wrapper ${index > 0 ? 'sub-input' : ''}`} style={{ '--input-index': index }}>
                            <input
                                type="file"
                                onChange={(e) => handleDocumentFileChange(index, e.target.files[0])}
                            />
                            <div className="button-container">
                                {index > 0 && (
                                    <button className="remove-button" onClick={() => removeInputField('document', index)}>X</button>
                                )}
                                {index === documentFiles.length - 1 && documentFiles.length < 5 && (
                                    <button onClick={() => addInputField('document')} className="add-button">+</button>
                                )}
                            </div>
                        </div>
                        {index > 0 && <div className="vertical-line" />}
                    </div>
                ))}
            </div>

            <button onClick={autoSubmit} disabled={loading}>Submit</button>

            {loading && <p>Loading...</p>}
            {summary && <div className="summary">{summary}</div>}
        </div>
    );
};

export default SimplePage;
