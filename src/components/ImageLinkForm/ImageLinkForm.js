import React from 'react';
import './ImageLinkForm.css';

const ImageLinkForm = ({ onInputChange, onPictureSubmit }) => {
	return(
		<div>
			<p className='f3 center fw5'>
				{'This Magic Brain will detect faces in your pictures. Give it a try!'}
			</p>
			<div className='center'>
				<div className='pa4 br3 shadow-5 form'>
					<input 
						id='imageInput'
						className='f4 pa2 w-70 b--transparent' 
						type='text' 
						onChange={onInputChange} />
					<button 
						className='f4 w-30 grow link ph3 pv2 white bg-light-purple b--transparent'
						onClick={onPictureSubmit} >
						Detect
					</button>
				</div>
			</div>
	    </div>
	);
}

export default ImageLinkForm;