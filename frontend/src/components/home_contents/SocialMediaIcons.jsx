import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faInstagram, faTwitter, faLinkedin } from '@fortawesome/free-brands-svg-icons';

const SocialMediaIcons = () => {
  return (
    <div className="social-media-icons">
      <a href="https://www.instagram.com" target="_blank" rel="noreferrer">
        <FontAwesomeIcon icon={faInstagram} size="2x" />
      </a>
      <a href="https://www.facebook.com" target="_blank" rel="noreferrer">
        <FontAwesomeIcon icon={faFacebookF} size="2x" />
      </a>
      <a href="https://www.twitter.com" target="_blank" rel="noreferrer">
        <FontAwesomeIcon icon={faTwitter} size="2x" />
      </a>
      <a href="https://www.linkedin.com" target="_blank" rel="noreferrer">
        <FontAwesomeIcon icon={faLinkedin} size="2x" />
      </a>
    </div>
  );
};

export default SocialMediaIcons;