import { apiClient } from "./apiClient";

export function getContacts() {
    return apiClient("/contacts/");
}

export function getContact(id) {
    return apiClient(`/contacts/${id}`);
}

export function createContact(contactData) {
    return apiClient("/contacts/", {
        method: "POST",
        body: JSON.stringify(contactData),
    });
}

export function updateContact(id, contactData) {
    return apiClient(`/contacts/${id}`, {
        method: "PUT",
        body: JSON.stringify(contactData),
    });
}

export function deleteContact(id) {
    return apiClient(`/contacts/${id}`, {
        method: "DELETE",
    });
}