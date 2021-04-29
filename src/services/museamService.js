export default class MuseamService {
    _apiBase = 'http://217.66.18.54:8000';
    triggerVar = false;


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

    setItem = async (formId, url) => {
        const form = document.querySelector(formId);
        const data = new FormData(form);
        
        const response = await fetch(`${this._apiBase}${url}`, {
            method: 'POST',
            body: data
        });

        if (!response.ok) {
            console.log(response.status);
            throw new Error('Submit Error');
        }

        form.reset();
    }

    getItemById = async (url, id) => {
        return await this.getResource(`${url}?id=${+id}`);
    }

    editCollection = async (formId, dataId) => {
        const form = document.querySelector(formId);
        const data = new FormData(form);

        this.triggerVar = false;

        const response = await fetch(`${this._apiBase}/categories/${dataId}`, {
            method: 'PUT',
            body: data
        });

        if (response.ok) {
            this.triggerVar = true;
        }

        if (!response.ok) {
            
            throw new Error('Submit Error');
        }

        form.reset();
    }

    deleteCollection = async (dataId) => {
        this.triggerVar = false;

        const res = await fetch(`${this._apiBase}/categories/${dataId}/delete`, {
            method: 'DELETE'
        });

        if (res.ok) {
            this.triggerVar = true;
        }

        if (!res.ok) {
            throw new Error('Submit Error');
        }

        return res;
    }
}
