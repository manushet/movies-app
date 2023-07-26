function returnResponseData(res) {
    return res.data;
}

export default function(axios) {
    axios.interceptors.response.use(returnResponseData);
}