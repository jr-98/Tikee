const configAPI = ({ URLApi, strOperation, additionalData, dataUser }) => {

	// const originalData = {
	// }
	// const body = Object.assign(originalData, additionalData);
	return (

		{
			// globalURL: `${process.env.REACT_APP_BACK_ADDRESS}/${strOperation}`,
			// eslint-disable-next-line no-unneeded-ternary
			globalURL: URLApi ? URLApi : `${process.env.REACT_APP_BACK_ADDRESS_PROD}/${strOperation}`,
			body: additionalData,
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json',
				...(dataUser && { 'Authorization': `Bearer ${dataUser.dataResponse[0].access_token}` })
			}
		}
	)
}
export default configAPI