const createUser = async (user) => {};

const getUsers = async (signal) => {
  try {
    let res = await fetch("/api/users", {
      method: "GET",
      signal: signal,
    });

    return await res.json();
  } catch (err) {
    console.log(err);
  }
};

const getUser = async (params, credentials, signal) => {
  try {
    let res = await fetch(`/api/users/${params.userId}`, {
      method: "GET",
      signal: signal,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${credentials.jwt}`,
      },
    });

    return await res.json();
  } catch (err) {
    console.log(err);
  }
};

const updateUser = async (params, credentials, user) => {
  try {
    let res = await fetch(`/api/users/${params.userId}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${credentials.jwt}`,
      },
      body: user,
    });

    return await res.json();
  } catch (err) {
    console.log(err);
  }
};

const deleteUser = async (params, credentials) => {
  try {
    let res = await fetch(`/api/users/${params.userId}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${credentials.jwt}`,
      },
    });

    return await res.json();
  } catch (err) {
    console.log(err);
  }
};

const follow = async (params, credentials, followId) => {
  try {
    let res = await fetch(`/api/users/follow`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${credentials.jwt}`,
      },
      body: JSON.stringify({ userId: params.userId, followId }),
    });

    return await res.json();
  } catch (err) {
    console.log(err);
  }
};

const unfollow = async (params, credentials, unfollowId) => {
  try {
    let res = await fetch(`/api/users/unfollow`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${credentials.jwt}`,
      },
      body: JSON.stringify({ userId: params.userId, unfollowId }),
    });

    return await res.json();
  } catch (err) {
    console.log(err);
  }
};

// Find Users to Follow Them
const findUsers = async (params, credentials, signal) => {
  try {
    let res = await fetch(`/api/users/find-users/${params.userId}`, {
      method: "GET",
      signal: signal,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${credentials.jwt}`,
      },
    });

    return await res.json();
  } catch (err) {
    console.log(err);
  }
};

export {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  follow,
  unfollow,
  findUsers,
};
