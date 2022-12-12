import React from 'react'
import { useIsAuthenticated } from 'react-auth-kit';
import { Navigate } from 'react-router-dom';

const AuthRote = ({ children }) => {
	const authenticatedFunc = useIsAuthenticated()
	const isAuthenticated = authenticatedFunc()
	return (
		<>
			{
				!isAuthenticated
					?
					<>
						{children}
					</>
					:
					<Navigate to={'/dashboard'} replace />
			}
		</>
	)
}


export default AuthRote