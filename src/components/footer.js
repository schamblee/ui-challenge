import React from 'react';


export default class Footer extends React.Component {
    //author's contact information
    render() {
        return (
            <footer className="footer">
                <span>Stephanie Chamblee</span>
                <a href="https://github.com/schamblee">
                <img className="github-link" src="https://konsolebox.info/images/logos/github-mark-light.svg" alt="GitHub"/></a>
                <a href="https://www.linkedin.com/in/stephaniechamblee/">
                <img className="linkedin-link" src="https://www.aecom.com/larivergateway/wp-content/uploads/2017/03/linkedin-logo-white.svg" alt="LinkedIn"/></a>
            </footer>
        ); 
    
  }
}