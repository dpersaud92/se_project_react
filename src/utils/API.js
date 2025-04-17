// const baseUrl = "http://localhost:3001";

// function getItems() {
//   return fetch(`${baseUrl}/items`).then((res) => {
//     return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
//   });
// }

// export { getItems };

const baseUrl = "http://localhost:3001";

export function getItems() {
  return fetch(`${baseUrl}/items`).then((res) => {
    if (!res.ok) throw new Error("Network response was not ok");
    return res.json();
  });
}
