import PropTypes from 'prop-types'
import { helpIcon } from 'src/helpers/helpIcon'

const RenderIcon = ({ icon, color, ...rest }) => {

	const { iconObject } = helpIcon()
	const Icon = iconObject[icon] ? iconObject[icon] : iconObject['default']
	return (
		<Icon color={color} {...rest} />
	)
}

RenderIcon.propTypes = {
	icon: PropTypes.string,
	color: PropTypes.string,
}

RenderIcon.defaultProps = {
	icon: 'default',
	color: 'primary',
}

export default RenderIcon