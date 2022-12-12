/* eslint-disable no-else-return */
import $ from "jquery"

export const helpFormData = () => {

	const handleOnKeyUp = ({ setDataForm, setIsDisabledButton }) => {
		const fields = $("input[id*='field-']")
		const arrayFields = [...fields]

		let checkFields = arrayFields.every(field => {
			field.classList.remove('Mui-error')
			if (field.required && (field.value.length >= field.minLength) && (field.value.length <= field.maxLength)) {
				return true
			} else if (field.required === false && field.value.length === 0) {
				return true
			} else if ((field.required === false) && (field.value.length >= field.minLength) && (field.value.length <= field.maxLength)) {
				return true
			} else if ((field.required === false) && (field.minLength === -1 && field.minLength === -1)) {
				return true
			} else if ((field.required === false) && (field.minLength === -1 || field.minLength === -1)) {
				return true
			} else {
				return false
			}
		})
		if (checkFields) {
			setIsDisabledButton(false)
			const valuesForm = {}
			arrayFields.forEach(field => {
				valuesForm[field.name] = field.value
			})
			setDataForm(valuesForm)
		} else {
			setIsDisabledButton(true)
			setDataForm([])
		}
	}

	const setErrorField = () => {
		const fields = $("div[class*='MuiFormControl-root']")
		const arrayFields = [...fields]
		arrayFields.forEach(field => field.classList.add('Mui-error'))
	}
	const setClearField = () => {
		const fields = $("div[class*='MuiFormControl-root']")
		const arrayFields = [...fields]
		arrayFields.forEach(field => field.classList.remove('Mui-error'))
	}

	return {
		handleOnKeyUp,
		setErrorField,
		setClearField
	}
}
