const host = process.env.NEXT_PUBLIC_BACKEND_URL;

const ENDPOINTS = {
  getProducts(page = 0, limit = 25) {
    return `${host}/api/v1/products?page=${page}&limit=${limit}`;
  },
};

export default ENDPOINTS;
