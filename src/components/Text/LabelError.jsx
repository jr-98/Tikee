import React from 'react'
import PropTypes from 'prop-types'
import { Typography } from '@mui/material'

const LabelError = ({ text, isFontWeight, color }) => {
	return (
		<Typography
			textAlign={'center'}
			fontWeight={isFontWeight ? 'bold' : 500}
			variant={'body1'}
			color={color}>
			{
				text || 'Ha ocurrido un error, por favor inténtalo de nuevo más tarde.'
			}
		</Typography>
	)
}

LabelError.propTypes = {
	text: PropTypes.string,
	isFontWeight: PropTypes.bool,
	color: PropTypes.string
}

LabelError.defaultProps = {
	isFontWeight: true,
}

export default LabelError