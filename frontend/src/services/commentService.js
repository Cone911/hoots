import sendRequest from "./sendRequest";

const BASE_URL = '/api'

export function create (hootId, commentFormData){
    return sendRequest(`${BASE_URL}/hoots/${hootId}/comments`, 'POST', commentFormData);
}