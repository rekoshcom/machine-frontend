import axios from "axios";
import { useEffect } from "react";
import { useNavigate, useLocation } from 'react-router-dom';

import {
    setTokens,
    isAuthPath,
    getJwtToken,
    removeTokens,
    getRefreshToken,
    authTranslations,
    triggerLoginEventListener,
    triggerLogoutEventListener,
    activateLoginEventListener,
    activateLogoutEventListener
} from '../services';


// TODO: We may implement AbortController, link: https://03balogun.medium.com/practical-use-case-of-the-abortcontroller-and-axios-cancel-token-7c75bf85f3ea
const useApi = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const client = axios.create({
        baseURL: process.env.REACT_APP_API_URL,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
        },
    });

    useEffect(() => {
        activateLoginEventListener(navigate);
        activateLogoutEventListener(navigate);
    }, []);



    /* ========================== */
    /* ===== Login & Logout ===== */
    /* ========================== */
    const _login = (access_token, refresh_token) => {
        setTokens(access_token, refresh_token);
        triggerLoginEventListener();
    };

    const _logout = () => {
        removeTokens();
        triggerLogoutEventListener();
    };

    const redirectIfIsAuthPath = () => {
        if (isAuthPath(location.pathname)) navigate('/');
    };



    /* ================================================= */
    /* ===== Request :: Prepare, Execute, Complete ===== */
    /* ================================================= */
    /* === Headers === */
    const _getHeaderAuthorizationIfAny = () => {
        const access_token = getJwtToken();
        return access_token
            ? { 'Authorization': 'Bearer ' + access_token }
            : {}
    };

    const _getHeaderRefresh = () => {
        const refresh_token = getRefreshToken();
        return refresh_token
            ? { 'Authorization': 'Bearer ' + refresh_token }
            : {}
    };

    const _getHeaderWithCredentials = () => {
        return { 'Access-Control-Allow-Credentials': true }
    };

    const _combineHeaders = (headerOne, headerTwo) => {
        return Object.assign({}, headerOne, headerTwo);
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
    const _handle_refresh = async (
        method,
        url,
        payload,
        error,
        requireRefresh,
        redirectIfRefreshFails
    ) => {
        if (error.response.status !== 401) return error.response;
        if (!(requireRefresh && getRefreshToken())) {
            _logout();
            if (redirectIfRefreshFails) {
                navigate('/login');
                return error.response;
            }
        }

        return await api.refresh().then(async responseRefresh => {
            if (!responseRefresh.ok) return responseRefresh;

            switch(method) {
                case 'POST':
                    return await _post(url, payload, false);
                case 'PUT':
                    return await _put(url, payload, false);
                case 'GET':
                    return await _get(url, payload, false);
                case 'DELETE':
                    return await _delete(url, payload, false);
                default:
                    break;
            }
        });
    };

    const _get = async (
        url,
        payload = {},
        requireRefresh = true,
        redirectIfRefreshFails = true
    ) => {
        try {
            const options = { headers: _getHeaderAuthorizationIfAny() };
            const urlParams = new URLSearchParams(payload).toString();
            const response = await client.get(
                    url + (urlParams === '' ? '' : '?' + urlParams),
                    options
                )
                .then(response => response)
                .catch(async error => {
                    return await _handle_refresh(
                        'GET',
                        url,
                        payload,
                        error,
                        requireRefresh,
                        redirectIfRefreshFails
                    );
                });

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

    const _post = async (
        url,
        payload = {},
        requireRefresh = true,
        redirectIfRefreshFails = true
    ) => {
        try {
            const options = { headers: _getHeaderAuthorizationIfAny() };
            const response = await client.post(url, payload, options)
                .then(response => response)
                .catch(async error => {
                    return await _handle_refresh(
                        'POST',
                        url,
                        payload,
                        error,
                        requireRefresh,
                        redirectIfRefreshFails
                    );
                });

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

    const _put = async (
        url,
        payload = {},
        requireRefresh = true,
        redirectIfRefreshFails = true
    ) => {
        try {
            const options = { headers: _getHeaderAuthorizationIfAny() };
            const response = await client.put(url, payload, options)
                .then(response => response)
                .catch(async error => {
                    return await _handle_refresh(
                        'PUT',
                        url,
                        payload,
                        error,
                        requireRefresh,
                        redirectIfRefreshFails
                    );
                });

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

    const _delete = async (
        url,
        payload = {},
        requireRefresh = true,
        redirectIfRefreshFails = true
    ) => {
        try {
            const options = {
                data: payload,
                headers: _getHeaderAuthorizationIfAny()
            };
            const response = await client.delete(url, options)
                .then(response => response)
                .catch(async error => {
                    return await _handle_refresh(
                        'DELETE',
                        url,
                        payload,
                        error,
                        requireRefresh,
                        redirectIfRefreshFails
                    );
                });

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

    };

    return api;
};

export default useApi