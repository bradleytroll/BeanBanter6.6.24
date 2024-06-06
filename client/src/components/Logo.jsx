import React from 'react';

const Logo = () => {
  return (
    <iframe 
      src="https://giphy.com/embed/6mQJBnWCQWLlmAz9ht" 
      width="280px" height="280px" 
      className="giphy-embed" 
      //frameBorder={0}
      style={{ position: 'left' }}
      title="Giphy Logo"
      padding="0"
    ></iframe>
  );
};

export default Logo;
