
export const authRequest = (url, options) => {
    const token = localStorage.getItem('token');
    return fetch(url, { ...options, headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` } })
}