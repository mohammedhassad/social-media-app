const create = async (credentials, post) => {
  try {
    let res = await fetch("/api/posts/create", {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + credentials.jwt,
      },
      body: post,
    });
    return await res.json();
  } catch (err) {
    console.log(err);
  }
};

const listByUser = async (params, credentials) => {
  try {
    let res = await fetch(
      `/api/posts/by/${params.userId}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + credentials.jwt,
        },
      }
    );
    return await res.json();
  } catch (err) {
    console.log(err);
  }
};

const listNewsFeed = async (credentials, signal) => {
  try {
    let res = await fetch(`/api/posts/feed`, {
      method: "GET",
      signal: signal,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + credentials.jwt,
      },
    });
    return await res.json();
  } catch (err) {
    console.log(err);
  }
};

const deletePost = async (params, credentials) => {
  try {
    let res = await fetch(`/api/posts/${params.postId}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + credentials.jwt,
      },
    });
    return await res.json();
  } catch (err) {
    console.log(err);
  }
};

const like = async (credentials, postId) => {
  try {
    let res = await fetch(`/api/posts/like`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + credentials.jwt,
      },
      body: JSON.stringify({ postId: postId }),
    });
    return await res.json();
  } catch (err) {
    console.log(err);
  }
};

const unlike = async (credentials, postId) => {
  try {
    let res = await fetch(`/api/posts/unlike`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + credentials.jwt,
      },
      body: JSON.stringify({ postId: postId }),
    });
    return await res.json();
  } catch (err) {
    console.log(err);
  }
};

const comment = async (credentials, postId, comment) => {
  try {
    let res = await fetch(`/api/posts/comment`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + credentials.jwt,
      },
      body: JSON.stringify({ postId: postId, comment: comment }),
    });
    return await res.json();
  } catch (err) {
    console.log(err);
  }
};

const uncomment = async (credentials, postId, comment) => {
  try {
    let res = await fetch(`/api/posts/uncomment`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + credentials.jwt,
      },
      body: JSON.stringify({ postId: postId, comment: comment }),
    });
    return await res.json();
  } catch (err) {
    console.log(err);
  }
};

export {
  listNewsFeed,
  listByUser,
  create,
  deletePost,
  like,
  unlike,
  comment,
  uncomment,
};
