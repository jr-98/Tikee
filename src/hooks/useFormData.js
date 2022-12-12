import { useCallback, useState } from "react"
import { helpFormData } from "src/utils/formData/helpFormData"

export const useFormData = () => {

	const [dataForm, setDataForm] = useState()
	const [isDisabledButton, setIsDisabledButton] = useState(true)

	const { handleOnKeyUp } = helpFormData()

	const customOnKeyUp = useCallback(() => {
		handleOnKeyUp({ setDataForm, setIsDisabledButton })
	}, [setDataForm, setIsDisabledButton])

	return {
		customOnKeyUp,
		dataForm,
		isDisabledButton,
	}
}
