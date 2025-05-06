import axiosInstance from "../axiosInstance";

// fetch all users
export const fetchAuthors = async () => {
    try {
        const response = await axiosInstance.get("/authors/getall");
        if (response.status !== 200 && response.status !== 201) {
            throw new Error("Failed to fetch users");
        }
        console.log("Response authors data: ", response.data);
        return response.data;
    } catch (error) {
        console.error("Error fetching users:", error);
        throw error;
    }
}
//create author
export const createAuthor = async (data) => {
    try {
        const response = await axiosInstance.post("/authors/create", data);
        if (response.status !== 200 && response.status !== 201) {
            throw new Error("Failed to create author");
        }
        return response.data;
    } catch (error) {
        console.error("Error creating author:", error);
        throw error;
    }
}

//edit author
export const editAuthor = async (id,data) => {
    try {
        const response = await axiosInstance.put(`/authors/update/${id}`, data);
        if (response.status !== 200 && response.status !== 201) {
            throw new Error("Failed to update author");
        }
        return response.data;
    } catch (error) {
        console.error("Error updating author:", error);
        throw error;
    }
}

// delete author
export const deleteAuthor = async (id) => {
    try {
        const response = await axiosInstance.delete(`/authors/delete/${id}`);
        if (response.status !== 200 && response.status !== 201) {
            throw new Error("Failed to delete author");
        }
        return response.data;
    } catch (error) {
        console.error("Error deleting author:", error);
        throw error;
    }
}

// fetch author by id
export const fetchAuthorById = async (id) => {
    try {
        const response = await axiosInstance.get(`authors/${id}`);
        console.log("Response author data: ", response.data);
        if (response.status !== 200 && response.status !== 201) {
            throw new Error("Failed to fetch author");
        }
        return response.data;
    } catch (error) {
        console.error("Error fetching author:", error);
        throw error;
    }
}

// delete multiple authors
export const deleteMultipleAuthors = async (ids) => {
    try {
        const response = await axiosInstance.post("/authors/delete-bulk", { ids });
        if (response.status !== 200 && response.status !== 201) {
            throw new Error("Failed to delete authors");
        }
        return response.data;
    } catch (error) {
        console.error("Error deleting authors:", error);
        throw error;
    }
}