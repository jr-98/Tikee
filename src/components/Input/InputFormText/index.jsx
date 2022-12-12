import { memo } from 'react'
import { FormHelperText, Grid, TextField } from '@mui/material'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { colors } from 'src/theme/base/colors'
// import LabelTitle from 'src/components/Text/LabelTitle'
const InputText = (
	{
		// PROPS INput
		id,
		name,
		className,
		type,
		title,
		placeHolder,
		handleOnKeyUp,
		textLink,
		navigateLinkTo,
		inputProps,
		startAdornment,
		endAdornment,

		// PROPS USE FORM
		register,
		validation,
		errorMessage,
		error,
		// ADDITIONAL PROPS
		...rest
	}) => {

	const defaultInputProps = {
		required: true,
		maxLength: 30,
		minLength: 3,
		...inputProps
	}

	const defaultErrorMessage = {
		required: 'Este campo es requerido',
		maxLength: 'Número máximo de caracteres permitidos 30',
		minLength: 'Número mínimo de caracteres permitidos 3',
		...errorMessage
	}
	const defaultValidation = {
		required: true,
		maxLength: 30,
		minLength: 3,
		...validation
	}

	const InputProps = {
		...(startAdornment && { startAdornment: startAdornment }),
		...(endAdornment && { endAdornment: endAdornment }),
	}

	const errorField = error && error[name]

	return (
		<Grid item>
			{/* {
				title
				&&
				<LabelTitle text={title} />
			} */}

			<TextField
				id={id}
				name={name}
				className={`${className} ${errorField ? 'Mui-error' : ''}`}
				type={type}
				placeholder={placeHolder}
				onKeyUp={handleOnKeyUp}
				fullWidth
				variant={'outlined'}
				autoComplete={'off'}
				inputProps={defaultInputProps}
				label={title}
				// eslint-disable-next-line react/jsx-no-duplicate-props
				InputProps={InputProps}
				{...register(`${name}`, defaultValidation)}
				{...rest}
			/>
			{
				errorField
				&&
				<FormHelperText error id={`${id}-error`}>
					{defaultErrorMessage[errorField['type']]}
				</FormHelperText>
			}
			{
				textLink
				&&
				<Link to={navigateLinkTo} style={{ textDecoration: 'none', color: colors.info.dark }} >{textLink}</Link>

			}
		</Grid>
	)
}

InputText.propTypes = {
	id: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	className: PropTypes.string,
	type: PropTypes.string,
	placeHolder: PropTypes.string,
	title: PropTypes.string,
	onKeyUp: PropTypes.func,
	textLink: PropTypes.string,
	navigateLinkTo: PropTypes.string,
	inputProps: PropTypes.object,

	register: PropTypes.func,
	validation: PropTypes.object,
	errorMessage: PropTypes.object,
	error: PropTypes.object
}

InputText.defaultProps = {
	type: 'text',
	navigateLinkTo: '#',
	className: '',
}

export default memo(InputText)