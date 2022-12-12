import configAPI from "./configAPI";
import axios from 'axios';

export const fetchDataPromise = async ({ URLApi, strOperation, additionalData, dataUser }) => {
	const {
		globalURL,
		body,
		headers: customHeader
	} = configAPI({
		URLApi,
		strOperation,
		additionalData,
		dataUser
	});

	const headers = {
		headers: customHeader
	}

	const response = axios.post(globalURL, body, headers)
		.then(responseAPI => ({
			status: responseAPI.status,
			data: responseAPI.data.data
		}))
		.catch(error => ({
			results: [{
				status: error.response.status,
				info_response: error.response.data?.detail ? error.response.data?.detail : 'Ha ocurrido un error, por favor inténtalo de nuevo más tarde.'
			}]
		}))
	return response
}

const dataFetchWrap = ({ URLApi, strOperation, additionalData, dataUser }) => {
	const fetchPromise = fetchDataPromise
	return {
		data: wrapPromise({ fetchPromise, URLApi, strOperation, additionalData, dataUser })
	}

};

const wrapPromise = ({ fetchPromise, URLApi, strOperation, additionalData, dataUser }) => {
	let status = "pending";
	let result;
	const suspend = fetchPromise({ URLApi, strOperation, additionalData, dataUser }).then(
		response => {
			status = "success";
			result = response;
		},
		error => {
			status = "error";
			result = error;
		}
	);
	return {
		// eslint-disable-next-line consistent-return
		read() {
			if (status === "pending") {
				throw suspend;
			} else if (status === "error") {
				throw result;
			} else if (status === "success") {
				return result;
			}
		},
	};
};




export default dataFetchWrap;
