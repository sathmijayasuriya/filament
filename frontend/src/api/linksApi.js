import axiosInstance from "../axiosInstance";

//create link
export const createLink = async (formData) => {
    const response = await axiosInstance.post("/links/create", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });

    console.log("response data: ", response.data);
    return response.data;
};

//edit link
export const editLink = async (id, data) => {
    const response = await axiosInstance.put(`/links/update/${id}`, data,{
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
    console.log("response data: ", response.data);
    return response.data;
};

// get all links
export const fetchLinks = async () => {
    const response = await axiosInstance.get("/links/getAll");
    console.log("RAW RESPONSE:", response);
    return response.data;
};

// delete link
export const deleteLink = async (id) => {
    const response = await axiosInstance.delete(`/links/delete/${id}`);
    console.log("response data: ", response.data);
    return response.data;
};

//get link by id
export const getLinkById = async (id) => {
    const response = await axiosInstance.get(`/links/${id}`);
    console.log("response data: ", response.data);
    return response.data[0]; 
};
