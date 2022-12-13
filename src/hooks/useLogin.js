import { useState } from "react";
import { useSignIn } from 'react-auth-kit'
import { useNavigate } from "react-router-dom";
import { helpFormData } from "src/utils/formData/helpFormData";
import { fetchDataPromise } from "src/utils/services/fetchData";

export const useLogin = () => {

	const signIn = useSignIn()
	const navigate = useNavigate()
	const [dataLogin, setDataLogin] = useState({ dataResponse: [], loading: false })
	const { setErrorField, setClearField } = helpFormData()

	const [isShowPassword, setIsShowPassword] = useState(false)

	const handleShowPassword = () => {
		setIsShowPassword(!isShowPassword)
	}

	const handleLogin = async ({ username, password }) => {
		setDataLogin({ dataResponse: [], loading: true })
		const responseLogin = await fetchDataPromise({
			URLApi: 'http://localhost:3000/login',
			additionalData: {
				username,
				password
			}
		});
		if (responseLogin.status === 200) {
			setClearField()
			setDataLogin({ dataResponse: responseLogin.data[0], loading: false })
			const responseEntity = await fetchDataPromise({
				URLApi: 'http://localhost:3000/entity',
				additionalData: {
					id_entity: responseLogin.data[0].id_entidad
				}
			});
			if (responseEntity?.status === 200) {
				if (signIn(
					{
						token: responseLogin?.data[0].contrasenia,
						expiresIn: 10,
						tokenType: 'Bearer',
						authState: responseEntity?.data[0].dataEntity
					}
				)) {
					navigate('/dashboard')
				}
			} else {
				setErrorField()
				setDataLogin({ dataResponse: responseEntity.results, loading: false })
			}
		} else {
			setErrorField()
			setDataLogin({ dataResponse: responseLogin.results, loading: false })
		}
	}

	return {
		handleLogin,
		dataLogin,
		handleShowPassword,
		isShowPassword
	}
}
