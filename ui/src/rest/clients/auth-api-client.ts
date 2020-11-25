import axios, { AxiosResponse } from 'axios';
import { IAuthClient } from './authclient';

export class AuthApiClient implements IAuthClient {
    private readonly baseUrl = process.env.REACT_APP_AUTH_ENDPOINT;

    public async login(username: string, password: string, onSuccess: Function, onError: Function): Promise<void> {
        try {
            await axios.post(`/auth`);
            onSuccess();
        } catch (e) {
            onError(e.message);
        }
    }

    public async setNewPasswordAndLogin(
        username: string,
        tempPassword: string,
        newPassword: string,
        onSuccess: Function,
        onError: Function
    ): Promise<void> {
        try {
            await axios.post(`/auth`);
            onSuccess();
        } catch (e) {
            onError(e.message);
        }
    }

    public async signOut(onSuccess: Function, onError: Function): Promise<void> {
        try {
            await axios.post(`/auth`);
            onSuccess();
        } catch (e) {
            onError(e.message);
        }
    }
}
