const baseUrl = "http://localhost:3001";

const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Error: ${res.status}`);
};

export function getItems() {
  return fetch(`${baseUrl}/items`)
    .then(checkResponse)
    .then((data) =>
      data.map((item) => ({
        ...item,
        _id: item._id ?? item.id,
      }))
    );
}

export function addItem(item) {
  return fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(item),
  })
    .then(checkResponse)
    .then((data) => ({ ...data, _id: data._id ?? data.id })); // normalize on add
}

export function deleteItem(itemId) {
  return fetch(`${baseUrl}/items/${itemId}`, {
    method: "DELETE",
  }).then(checkResponse);
}
