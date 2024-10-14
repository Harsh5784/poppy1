import React, { useState } from 'react';
import './linkbar.css';
import youtubeIcon from '../../../assets/youtube_links.jpg';
import websiteIcon from '../../../assets/website.jpg';
import audioIcon from '../../../assets/audio.jpg';
import fileIcon from '../../../assets/document.jpg';

const SimplePage = () => {
    const [youtubeLinks, setYoutubeLinks] = useState(['']);
    const [websiteLinks, setWebsiteLinks] = useState(['']);
    const [audioFiles, setAudioFiles] = useState([null]);
    const [documentFiles, setDocumentFiles] = useState([null]);
    const [wikipediaTitle, setWikipediaTitle] = useState('');
    const [summary, setSummary] = useState('');
    const [loading, setLoading] = useState(false);

    const handleYoutubeLinkChange = (index, value) => {
        const newLinks = [...youtubeLinks];
        newLinks[index] = value;
        setYoutubeLinks(newLinks);
        autoSubmit(newLinks, websiteLinks, wikipediaTitle);
    };

    const handleWebsiteLinkChange = (index, value) => {
        const newLinks = [...websiteLinks];
        newLinks[index] = value;
        setWebsiteLinks(newLinks);
        autoSubmit(youtubeLinks, newLinks, wikipediaTitle);
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

    const handleAddYoutubeLink = () => {
        if (youtubeLinks.length < 5) {
            setYoutubeLinks([...youtubeLinks, '']);
        }
    };

    const handleRemoveYoutubeLink = (index) => {
        const newLinks = youtubeLinks.filter((_, i) => i !== index);
        setYoutubeLinks(newLinks);
    };

    const handleAddWebsiteLink = () => {
        if (websiteLinks.length < 5) {
            setWebsiteLinks([...websiteLinks, '']);
        }
    };

    const handleRemoveWebsiteLink = (index) => {
        const newLinks = websiteLinks.filter((_, i) => i !== index);
        setWebsiteLinks(newLinks);
    };

    const handleAddAudioFile = () => {
        if (audioFiles.length < 5) {
            setAudioFiles([...audioFiles, null]);
        }
    };

    const handleRemoveAudioFile = (index) => {
        const newFiles = audioFiles.filter((_, i) => i !== index);
        setAudioFiles(newFiles);
    };

    const handleAddDocumentFile = () => {
        if (documentFiles.length < 5) {
            setDocumentFiles([...documentFiles, null]);
        }
    };

    const handleRemoveDocumentFile = (index) => {
        const newFiles = documentFiles.filter((_, i) => i !== index);
        setDocumentFiles(newFiles);
    };

    const autoSubmit = async (youtubeLinks, websiteLinks, wikipediaTitle) => {
        const formData = new URLSearchParams();
        formData.append('username', 'Harsh');

        youtubeLinks.forEach((link, index) => {
            if (link) formData.append(`youtube_link${index + 1}`, link);
        });

        websiteLinks.forEach((link, index) => {
            if (link) formData.append(`website_url${index + 1}`, link);
        });

        if (wikipediaTitle) {
            formData.append('wikipedia_title1', wikipediaTitle);
        }

        setLoading(true);

        try {
            const response = await fetch('http://15.206.73.250:5000/api/summary', {
                method: 'POST',
                body: formData,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
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
                                    <button className="remove-button" onClick={() => handleRemoveYoutubeLink(index)}>X</button>
                                )}
                                {index === youtubeLinks.length - 1 && youtubeLinks.length < 5 && (
                                    <button onClick={handleAddYoutubeLink} className="add-button">+</button>
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
                                    <button className="remove-button" onClick={() => handleRemoveWebsiteLink(index)}>X</button>
                                )}
                                {index === websiteLinks.length - 1 && websiteLinks.length < 5 && (
                                    <button onClick={handleAddWebsiteLink} className="add-button">+</button>
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
                                    <button className="remove-button" onClick={() => handleRemoveAudioFile(index)}>X</button>
                                )}
                                {index === audioFiles.length - 1 && audioFiles.length < 5 && (
                                    <button onClick={handleAddAudioFile} className="add-button">+</button>
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
                                    <button className="remove-button" onClick={() => handleRemoveDocumentFile(index)}>X</button>
                                )}
                                {index === documentFiles.length - 1 && documentFiles.length < 5 && (
                                    <button onClick={handleAddDocumentFile} className="add-button">+</button>
                                )}
                            </div>
                        </div>
                        {index > 0 && <div className="vertical-line" />}
                    </div>
                ))}

            </div>

            {loading ? (
                <p>Generating summary...</p>
            ) : (
                summary && (
                    <div className="summary-result">
                        <h3>Summary:</h3>
                        <p>{summary}</p>
                    </div>
                )
            )}
        </div>
    );
};

export default SimplePage;
