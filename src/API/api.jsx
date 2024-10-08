import axios from "axios";

const api = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
});

// to fetch the data

export const fetchPostsData = () => {
  return api.get("/posts");
};

// to fetch the data from RQ
export const fetchPosts = async (pageNumber) => {
  try {
    const res = await api.get(`/posts?_start=${pageNumber}&_limit=4`);
    return res.status === 200 ? res.data : [];
  } catch (error) {
    console.log(error);
  }
};

// to fetch the indv. data

export const fetchIndvPost = async (id) => {
  try {
    const res = await api.get(`/posts/${id}`);
    return res.status === 200 ? res.data : [];
  } catch (error) {
    console.log(error);
  }
};

//to delete the post

export const deletePost = (id) => {
  return api.delete(`/posts/${id}`);
}

// to update the post

export const updatePost = (id) => {
  return api.patch(`/posts/${id}`, {title: "I have updated"});
}