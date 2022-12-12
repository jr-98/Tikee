import { useState } from "react";
import { useSignIn } from 'react-auth-kit'
import { useNavigate } from "react-router-dom";
import { helpFormData } from "src/utils/formData/helpFormData";
import { fetchDataPromise } from "src/utils/services/fetchData";

export const useLogin = () => {

	const signIn = useSignIn()
	const navigate = useNavigate()
	const [dataLogin, setDataLogin] = useState({ data: [], loading: false })
	const { setErrorField, setClearField } = helpFormData()

	const [isShowPassword, setIsShowPassword] = useState(false)

	const handleShowPassword = () => {
		setIsShowPassword(!isShowPassword)
	}

	const handleLogin = async ({ userName, password }) => {
		setDataLogin({ data: [], loading: true })
		const responseLogin = await fetchDataPromise({
			URLApi: 'http://127.0.0.1:8000/login',
			additionalData: {
				userName,
				password
			}
		});
		if (responseLogin?.results[0].status === 200) {

			setClearField()
			setDataLogin({ data: responseLogin.results, loading: false })

			const responseEntity = await fetchDataPromise({
				URLApi: 'http://127.0.0.1:8000/get_entity',
				dataUser: responseLogin?.results[0]
			});
			if (responseEntity?.results[0].status === 200) {
				if (signIn(
					{
						token: responseLogin?.results[0].dataResponse[0].access_token,
						expiresIn: 10,
						tokenType: responseLogin?.results[0].dataResponse[0].token_type,
						authState: responseEntity?.results[0].dataResponse[0].dataEntity
					}
				)) {
					navigate('/dashboard')
				}
			} else {
				setErrorField()
				setDataLogin({ data: responseEntity.results, loading: false })
			}
		} else {
			setErrorField()
			setDataLogin({ data: responseLogin.results, loading: false })
		}
	}

	return {
		handleLogin,
		dataLogin,
		handleShowPassword,
		isShowPassword
	}
}
