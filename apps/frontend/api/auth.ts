// api/auth.js

const API_BASE_URL = "http://localhost:3001";

export const fetchUser = async (token: string, idUser: string) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/api/user/fetch-user-data/${idUser}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Fetch user failed: ${response.statusText}`);
    }
    return await response.json();
  } catch (error: any) {
    console.log(error);
    throw new Error(error.message);
  }
};

export const registerUser = async (
  email: string,
  password: string,
  name: string
) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/user/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password, name }),
    });

    const res = await response.json();

    if (!response.ok) {
      throw new Error(`${res.error}`);
    }

    return await res;
  } catch (error: any) {
    console.log(error);
    throw new Error(error.message);
  }
};

export const editUser = async (data: any, id: string, token: string) => {
  try {
    console.log(id);

    const response = await fetch(`${API_BASE_URL}/api/user/update-user-data`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ ...data, id }),
    });

    if (!response.ok) {
      throw new Error(`Edit failed: ${response.statusText}`);
    }
    return await response.json();
  } catch (error: any) {
    throw new Error(error.message);
  }
};
