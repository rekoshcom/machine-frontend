import axios from "axios";

import {
    authTranslations,
} from '../services';

const useApi = () => {
    const client = axios.create({
        baseURL: process.env.REACT_APP_API_URL,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
        },
    });



    /* ================================================= */
    /* ===== Request :: Prepare, Execute, Complete ===== */
    /* ================================================= */
    /* === Headers === */
    const _getHeader = () => {
        return {}
    };

    /* === Responses === */
    const _get_success_response = (response) => {
        return { 'data': response.data, 'error': false, 'ok': true }
    };

    const _get_error_response = (response) => {
        const data = response.data

        if (data === undefined || (data !== undefined && (
            !Object.hasOwn(data, 'error') || (
                Object.hasOwn(data, 'error') && (
                    !Object.hasOwn(data['error'], 'message')
                    || !Object.hasOwn(data['error'], 'code')
                )
            )
        ))) {
            return {
                'error': {
                    'message': authTranslations['UNEXPECTED_ERROR'],
                    'code': 'UNEXPECTED_ERROR'
                },
                'ok': false
            }
        }

        return {
            'error': {
                'message':
                    Object.hasOwn(authTranslations, data['error']['code'])
                    ? authTranslations[data['error']['code']]
                    : data['error']['message'],
                'code': data['error']['code']
            },
            'ok': false
        }
    };

    /* === Request Handlers === */
    const _get = async (url, payload = {}) => {
        try {
            const options = { headers: _getHeader() };
            const urlParams = new URLSearchParams(payload).toString();
            const response = await client.get(
                    url + (urlParams === '' ? '' : '?' + urlParams),
                    options
                )
                .then(response => response);

            if (Object.hasOwn(response, 'error') && Object.hasOwn(response, 'ok')) {
                return response;
            }

            return response.status !== 200
                ? _get_error_response(response)
                : _get_success_response(response);
        } catch (error) {
            return _get_error_response(error.response);
        }
    };

    const _post = async (url, payload = {}) => {
        try {
            const options = { headers: _getHeader() };
            const response = await client.post(url, payload, options)
                .then(response => response);

            if (Object.hasOwn(response, 'error') && Object.hasOwn(response, 'ok')) {
                return response;
            }

            return response.status !== 200 && response.status !== 201
                ? _get_error_response(response)
                : _get_success_response(response);
        } catch (error) {
            return _get_error_response(error.response);
        }
    };

    const _put = async (url, payload = {}) => {
        try {
            const options = { headers: _getHeader() };
            const response = await client.put(url, payload, options)
                .then(response => response)

            if (Object.hasOwn(response, 'error') && Object.hasOwn(response, 'ok')) {
                return response;
            }

            return response.status !== 200
                ? _get_error_response(response)
                : _get_success_response(response);
        } catch (error) {
            return _get_error_response(error.response);
        }
    };

    const _delete = async (url, payload = {}) => {
        try {
            const options = {
                data: payload,
                headers: _getHeader()
            };
            const response = await client.delete(url, options)
                .then(response => response);

            if (Object.hasOwn(response, 'error') && Object.hasOwn(response, 'ok')) {
                return response;
            }

            return response.status !== 200
                ? _get_error_response(response)
                : _get_success_response(response);
        } catch (error) {
            return _get_error_response(error.response);
        }
    };



    /* ===================== */
    /* ===== Endpoints ===== */
    /* ===================== */
    const api = {
        getState: async function() {
            const url = '/state';
            return await _get(url);
        },
        start: async function() {
            const url = '/start';
            return await _post(url);
        },
        stop: async function() {
            const url = '/stop';
            return await _post(url);
        },
        auth: async function(pin) {
            const url = '/auth?pin=' + pin;
            return await _get(url);
        },
        reboot: async function() {
            const url = '/reboot';
            return await _post(url);
        },
        shutdown: async function() {
            const url = '/shutdown';
            return await _post(url);
        },
    };

    return api;
};

export default useApi