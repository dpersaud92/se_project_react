import checkResponse from "./checkResponse";

const baseUrl = "http://localhost:3001";

function request(url, options) {
  return fetch(url, options).then(checkResponse);
}

export function updateUser(data, token) {
  return fetch(`${baseUrl}/users/me`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  }).then(checkResponse);
}

export function getItems() {
  return request(`${baseUrl}/items`).then((data) =>
    data.map((item) => ({
      ...item,
      _id: item._id ?? item.id,
    }))
  );
}

export function addItem(item) {
  const token = localStorage.getItem("jwt");

  return request(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(item),
  }).then((data) => ({ ...data, _id: data._id ?? data.id }));
}

export const deleteItem = (id, token) => {
  return fetch(`${baseUrl}/items/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  }).then(checkResponse);
};

export function addCardLike(cardId, token) {
  return fetch(`${baseUrl}/items/${cardId}/likes`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then(checkResponse);
}

export function removeCardLike(cardId, token) {
  return fetch(`${baseUrl}/items/${cardId}/likes`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then(checkResponse);
}
