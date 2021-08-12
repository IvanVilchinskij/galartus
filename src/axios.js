import axios from 'axios';

const baseURL = 'http://217.66.18.54:8000/';

const axiosInstance = axios.create({
	baseURL: baseURL,
	timeout: 30000,
	headers: {
		Authorization: localStorage.getItem('access_token') ?
			'Bearer ' + localStorage.getItem('access_token') :
			null,
		'Content-Type': 'application/json',
		accept: 'application/json',
	},
});

axiosInstance.interceptors.response.use(
	(response) => {
		return response;
	},
	async function (error) {
		const originalRequest = error.config;

		if (typeof error.response === 'undefined') {
            console.log(error.status);
            console.log(error.response.status);
			alert(
				'Ошибка сервера/сети. Приносим свои извинения, мы исправим это в ближайшее время'
			);

			return Promise.reject(error);
		}

		if (
			error.response.status === 401 &&
			originalRequest.url === baseURL + 'token/refresh/'
		) {
			window.location.href = '/';
			return Promise.reject(error);
		}

		if (
			error.response.data.code === 'token_not_valid' &&
			error.response.status === 401 &&
			error.response.statusText === 'Unauthorized'
		) {
			const refreshToken = localStorage.getItem('refresh_token');

			if (refreshToken) {
				const tokenParts = JSON.parse(atob(refreshToken.split('.')[1]));

				// exp date in token is expressed in seconds, while now() returns milliseconds:
				const now = Math.ceil(Date.now() / 1000);
                
				if (tokenParts.exp > now) {
					return axiosInstance
						.post('/token/refresh/', {
							refresh: refreshToken
						})
						.then((response) => {

							localStorage.setItem('access_token', response.data.access);
							localStorage.setItem('refresh_token', response.data.refresh);

							axiosInstance.defaults.headers['Authorization'] =
								'Bearer ' + response.data.access;
							originalRequest.headers['Authorization'] =
								'Bearer ' + response.data.access;

							return axiosInstance(originalRequest);
						})
						.catch((err) => {
							console.log(err);

                            localStorage.removeItem('access_token');
                            localStorage.removeItem('refresh_token');
        
                            axiosInstance.defaults.headers['Authorization'] = null;

                            window.location.href = '/';
                            window.location.reload();
						});
				} else {

                    localStorage.removeItem('access_token');
                    localStorage.removeItem('refresh_token');

					window.location.href = '/';
                    window.location.reload();
				}
			} else {
				console.log('Refresh token not available.');
				window.location.href = '/';
			}
		}

		// specific error handling done elsewhere
		return Promise.reject(error);
	}
);

export default axiosInstance;