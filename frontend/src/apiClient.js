// src/apiClient.js

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000/api';

async function handleResponse(response) {
  const contentType = response.headers.get('content-type');
  let data = null;

  if (contentType && contentType.includes('application/json')) {
    data = await response.json();
  } else {
    data = await response.text();
  }

  if (!response.ok) {
    const error = new Error(data?.message || 'Request failed');
    error.status = response.status;
    error.data = data;
    throw error;
  }

  return data;
}

export async function apiGet(path, options = {}) {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Accept': 'application/json',
      ...(options.headers || {}),
    },
  });
  return handleResponse(res);
}

export async function apiPost(path, body = {}, options = {}) {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
    body: JSON.stringify(body),
  });
  return handleResponse(res);
}

export async function apiPut(path, body = {}, options = {}) {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    method: 'PUT',
    credentials: 'include',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
    body: JSON.stringify(body),
  });
  return handleResponse(res);
}

export async function apiDelete(path, options = {}) {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    method: 'DELETE',
    credentials: 'include',
    headers: {
      'Accept': 'application/json',
      ...(options.headers || {}),
    },
  });
  return handleResponse(res);
}