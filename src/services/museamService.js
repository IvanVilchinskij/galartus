import axiosInstance from '../axios';

export default class MuseamService {
    _apiBase = 'http://217.66.18.54:8000';

    getResource = async (url) => {
        const res = await fetch(`${this._apiBase}${url}`);

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, received ${res.status}`);
        }
        
        return await res.json();
    }

    getList = async (url) => {
        return await this.getResource(url);
    }

    getUserInfo = async (accessToken) => {
        const myHeaders = new Headers();

        myHeaders.append('Authorization', `Bearer ${accessToken}`);

        const requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow',
        };

        const res = await fetch(`${this._apiBase}/users/`, requestOptions);

        return await res.json();
    }

    setItem = (url, form) => {
        /* const form = document.querySelector(formId);
        const data = new FormData(form); */
        
        /* const response = await fetch(`${this._apiBase}${url}`, {
            method: 'POST',
            body: form
        }); */

        /* if (!response.ok) {
            console.log(response.status);
            throw new Error('Submit Error');
        } */

        /* form.reset(); */

        axiosInstance.post(`${url}`, form);

    }

    getItemById = async (url, id) => {
        return await this.getResource(`${url}?id=${+id}`);
    }

    editItem = async (url, formId, dataId) => {
        const form = document.querySelector(formId);
        const data = new FormData(form);

        if (data.has('categories')) {
            console.log((data.get('categories')));
        }

        const response = await fetch(`${this._apiBase}${url}${dataId}`, {
            method: 'PUT',
            body: data
        });


        if (!response.ok) {
            
            throw new Error('Submit Error');
        }

        form.reset();
    }

    deleteItem = async (url, dataId) => {

        const res = await fetch(`${this._apiBase}${url}${dataId}/delete`, {
            method: 'DELETE'
        });

        if (!res.ok) {
            throw new Error('Submit Error');
        }

        return res;
    }
}
