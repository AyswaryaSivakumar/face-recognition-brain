import React from 'react';
import './Logo.css';
import Tilt from 'react-parallax-tilt';
import brain from './brain.png';

const Logo = () => {
	return(
		<div className='ma4 mt0'>
			<Tilt className='Tilt br2 shadow-2' style={{ width: 150 }}>
		      <div className='pa3'>
		        <img style={{ paddingTop: '5px'}} className='center' alt='Logo' src={brain} /> 
		      </div>
		    </Tilt>
	    </div>
	);
}

export default Logo;