import React from 'react'
import PropTypes from 'prop-types'
import { Typography } from '@mui/material'

const LabelTitle = ({ text }) => {
	return (
		<Typography variant='body2' color={'input.title'} fontSize={'16px'}>{text}</Typography>
	)
}

LabelTitle.propTypes = {
	text: PropTypes.string
}

export default LabelTitle