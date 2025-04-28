import axiosInstance from "../axiosInstance";

// create category
export const createCategory = async ({
    name,
    slug,
    visibility,
    description,
}) => {
    const response = await axiosInstance.post("/categories/create", {
        name,
        slug,
        visibility,
        description,
    });
    console.log("response data: ", response.data);
    return response.data;
};

//fetch all categories
export const fetchCategories = async () => {
    const response = await axiosInstance.get("/categories");
    console.log("RAW RESPONSE:", response);

    return response.data;
};

//delete category
export const deleteCategory = async (slug) => {
    const response = await axiosInstance.delete(`/categories/delete/${slug}`);
    console.log("response data: ", response.data);
    return response.data;
};

// fetch category by slug
export const fetchCategoryBySlug = async (slug) => {
    const response = await axiosInstance.get(`/categories/${slug}`);
    console.log("response data: ", response.data);
    return response.data;
};

// edit category
export const editCategory = async (slug, data) => {
    const response = await axiosInstance.put(`/categories/${slug}`, data);
    console.log("response data: ", response.data);
    return response.data;
};
