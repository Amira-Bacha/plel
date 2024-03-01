import axios from 'axios';

const apiUrl = `${process.env.REACT_APP_API}/api/upload/`;

export const singleFileUploadWithName = async(data, name, id) => {
    const config = {
        headers: { authorization: `Bearer ${id}`, name: `name/${name}`, 'X-Requested-With': 'XMLHttpRequest', "Access-Control-Allow-Origin": `${process.env.REACT_APP_API}`, "Access-control-request-methods": "POST, GET, DELETE, PUT, PATCH, COPY, HEAD, OPTIONS" },
        "withCredentials": true
    };
    try {
        await axios.post(apiUrl + 'singleFilewithTitle', data, config);
    } catch (error) {
        throw error;
    }
}

export const singleFileUpload = async(data, id) => {
    const config = {
        headers: { authorization: `Bearer ${id}`, 'X-Requested-With': 'XMLHttpRequest', "Access-Control-Allow-Origin": `${process.env.REACT_APP_API}`, "Access-control-request-methods": "POST, GET, DELETE, PUT, PATCH, COPY, HEAD, OPTIONS" },
        "withCredentials": true
    };
    try {
        await axios.post(apiUrl + 'singleFile', data, config);
    } catch (error) {
        throw error;
    }
}



export const multipleFilesUploadWithName = async(data, name, id, type) => {
    const config = {
        headers: { authorization: `Bearer ${id}`, name: `name/${name}`, type: `type/${type}`, 'X-Requested-With': 'XMLHttpRequest', "Access-Control-Allow-Origin": `${process.env.REACT_APP_API}`, "Access-control-request-methods": "POST, GET, DELETE, PUT, PATCH, COPY, HEAD, OPTIONS" },
        "withCredentials": true
    };
    try {
        console.log("here Multiple videos from api file")
        await axios.post(apiUrl + 'multipleFileswithTitle', data, config);
    } catch (error) {
        console.log(error);
    }
}


export const getSingleFiles = async() => {
    try {
        const { data } = await axios.post(apiUrl + 'getSingleFiles', {}, { headers: { 'X-Requested-With': 'XMLHttpRequest', "Access-Control-Allow-Origin": `${process.env.REACT_APP_API}`, "Access-control-request-methods": "POST, GET, DELETE, PUT, PATCH, COPY, HEAD, OPTIONS" } }, { "withCredentials": true });
        console.log(data)

        return data;
    } catch (error) {
        throw error;
    }
}

export const multipleFilesUpload = async(data, name, id, courseId) => {
    try {
        await axios.post(apiUrl + 'multipleFiles', data, { headers: { authorization: `Bearer ${id}`, courseid: `courseId/${courseId}`, name: `name/${name}`, 'X-Requested-With': 'XMLHttpRequest', "Access-Control-Allow-Origin": `${process.env.REACT_APP_API}`, "Access-control-request-methods": "POST, GET, DELETE, PUT, PATCH, COPY, HEAD, OPTIONS" } }, { "withCredentials": true });
    } catch (error) {
        console.log(error);
    }
}
export const getMultipleFiles = async() => {
    try {
        const { data } = await axios.post(apiUrl + 'getMultipleFiles', {}, { headers: { 'X-Requested-With': 'XMLHttpRequest', "Access-Control-Allow-Origin": `${process.env.REACT_APP_API}`, "Access-control-request-methods": "POST, GET, DELETE, PUT, PATCH, COPY, HEAD, OPTIONS" } }, { "withCredentials": true });
        return data;
    } catch (error) {
        throw error;
    }
}