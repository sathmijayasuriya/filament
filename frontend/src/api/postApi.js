import axiosInstance from "../axiosInstance";

//get all posts
export const fetchPosts = async ({queryKey}) => {
    const [_key, { from, to }] = queryKey;

    const params = {};
    if (from) params.from = from;
    if (to) params.to = to;

    const response = await axiosInstance.get("/posts/posts");
    console.log("RAW RESPONSE:", response);
    return response.data;
};

// delete post by slug
export const deletePost = async (selectedPostSlug) => {
    const response = await axiosInstance.delete(
        `/posts/delete/${selectedPostSlug}`
    );
    console.log("response data: ", response.data);
    return response.data;
};

// fetch post by slug
export const fetchPostBySlug = async (slug) => {
    const response = await axiosInstance.get(`/posts/view/${slug}`);
    console.log("response data: ", response.data);
    return response.data;
};

// edit post by slug
export const editPost = async (slug, data) => {
    const response = await axiosInstance.put(`/posts/edit/${slug}`, data);
    console.log("response data: ", response.data);
    return response.data;
};

// create post
 export const createPost = async(postData) =>{
    const response = await axiosInstance.post(`/posts/create`,
        postData,);
    console.log("response data: ", response.data);
    return response.data;
 };



