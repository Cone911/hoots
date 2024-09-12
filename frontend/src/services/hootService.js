import sendRequest from "./sendRequest";

const BASE_URL = '/api/hoots'

export function index() {
    return sendRequest(BASE_URL, 'GET');
}