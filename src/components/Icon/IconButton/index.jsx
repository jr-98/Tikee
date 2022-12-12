import { IconButton } from '@mui/material'
import PropTypes from 'prop-types'
import { helpIcon } from 'src/helpers/helpIcon'

const RenderIconButton = ({ icon, color, handleActionButton, ...rest }) => {
	const { iconObject } = helpIcon()
	const Icon = iconObject[icon] ? iconObject[icon] : iconObject['default']
	return (
		<IconButton onClick={handleActionButton}>
			<Icon color={color} {...rest} />
		</IconButton>
	)
}

RenderIconButton.propTypes = {
	icon: PropTypes.string,
	color: PropTypes.string,
	handleActionButton: PropTypes.func.isRequired,
}

RenderIconButton.defaultProps = {
	icon: 'default',
	color: 'primary',
}

export default RenderIconButton