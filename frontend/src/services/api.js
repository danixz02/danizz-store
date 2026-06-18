const API_BASE = "https://danizz-store.onrender.com/api";
const TOKEN_KEY = "danizz_token";
const USER_KEY = "danizz_user";

function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

function getAuthHeaders() {
  const token = getToken();
  const headers = { "Content-Type": "application/json" };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return headers;
}

async function parseResponse(response) {
  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || "Erro na requisicao");
  }

  return data;
}

async function login(email, senha) {
  const response = await fetch(`${API_BASE}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, senha }),
  });

  return parseResponse(response);
}

async function getMe() {
  const response = await fetch(`${API_BASE}/auth/me`, {
    headers: getAuthHeaders(),
  });

  return parseResponse(response);
}

async function listProducts() {
  const response = await fetch(`${API_BASE}/produtos`);
  return parseResponse(response);
}

async function listCategories() {
  const response = await fetch(`${API_BASE}/categorias`);
  return parseResponse(response);
}

async function addCategory(categoria) {
  const response = await fetch(`${API_BASE}/categorias`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(categoria),
  });

  return parseResponse(response);
}

async function updateCategory(id, dadosAtualizados) {
  const response = await fetch(`${API_BASE}/categorias/${id}`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify(dadosAtualizados),
  });

  return parseResponse(response);
}

async function deleteCategory(id) {
  const response = await fetch(`${API_BASE}/categorias/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });

  return parseResponse(response);
}

async function getProduct(id) {
  const response = await fetch(`${API_BASE}/produtos/${id}`);
  return parseResponse(response);
}

async function adicionarProduto(novoProduto) {
  const response = await fetch(`${API_BASE}/produtos`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(novoProduto),
  });

  return parseResponse(response);
}

async function atualizarProduto(id, dadosAtualizados) {
  const response = await fetch(`${API_BASE}/produtos/${id}`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify(dadosAtualizados),
  });

  return parseResponse(response);
}

async function removerProduto(id) {
  const response = await fetch(`${API_BASE}/produtos/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });

  return parseResponse(response);
}

export const api = {
  login,
  getMe,
  listProducts,
  listCategories,
  addCategory,
  updateCategory,
  deleteCategory,
  getProduct,
  adicionarProduto,
  atualizarProduto,
  removerProduto,
};

export { TOKEN_KEY, USER_KEY, getToken };

export { adicionarProduto, atualizarProduto, removerProduto };
