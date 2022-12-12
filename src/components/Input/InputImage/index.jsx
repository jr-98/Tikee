import React from 'react'
import PropTypes from 'prop-types'
import { Grid, Tooltip } from '@mui/material'
import { useInputImage } from 'src/hooks/useInputImage'
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import DeleteIcon from '@mui/icons-material/Delete';
import SuspenseLoader from 'src/components/SuspenseLoader';

const InputImage = ({ id, name, defaultImg, accept, onChange }) => {
	const { handleLoadImage, loading, src, resetImage } = useInputImage()
	return (
		<Grid item>
			<Grid container justifyContent={'space-evenly'}>
				<Grid item>
					<Tooltip arrow title='Imagen guardada'>
						<img src={defaultImg} height={100} />
					</Tooltip>
				</Grid>
				<Grid item>
					<input
						id={name}
						type="file"
						accept={accept}
						onChange={handleLoadImage}
						style={{ display: 'none' }} />
					<Grid container direction={'column'} justifyContent={'center'} height={'100%'}>
						<Grid item>
							<Tooltip arrow title='Subir imagen'>
								<label htmlFor={name}>
									<AddPhotoAlternateIcon color='primary' cursor={'pointer'} sx={{ fontSize: '4em !important' }} />
								</label>
							</Tooltip>
						</Grid>
						<Grid item>
							{
								src.length > 0
								&&
								<Tooltip arrow title='Eliminar imagen'>
									<DeleteIcon color='error' cursor={'pointer'} sx={{ fontSize: '4em !important' }} onClick={() => { resetImage(); onChange() }} />
								</Tooltip>
							}
						</Grid>
					</Grid>
				</Grid>
				<Grid item>
					{
						!loading
							?
							src.length > 0
							&&
							<>
								<Tooltip arrow title='Nueva img'>
									<img src={src} height={100} />
								</Tooltip>
							</>
							:
							<SuspenseLoader position='initial' />
					}
					<input id={id} name={name} type={'hidden'} value={src.length > 0 ? src : defaultImg} onChange={onChange} />
				</Grid>
			</Grid>
		</Grid>
	)
}

InputImage.propTypes = {
	id: PropTypes.string.isRequired,
	name: PropTypes.string,
	defaultImg: PropTypes.string.isRequired,
	accept: PropTypes.string,
	onChange: PropTypes.func.isRequired
}

InputImage.defaultProps = {
	accept: '.png, .jpeg, .jpg, .jpe'
}

export default InputImage