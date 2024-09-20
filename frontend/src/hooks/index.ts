import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";
import axios from "axios";

export interface Blog {
    content: string;
    title: string;
    id: string;
    author: {
        name: string;
    };
}

export const useBlog = ({ id }: { id: string }) => {
    const [loading, setLoading] = useState(true);
    const [blog, setBlog] = useState<Blog | null>(null); // Initialize as null

    useEffect(() => {
        const source = axios.CancelToken.source(); // Create a cancel token

        axios.get(`${BACKEND_URL}/api/v1/blog/${id}`, {
            headers: {
                Authorization: localStorage.getItem("token")
            },
            cancelToken: source.token // Attach the cancel token
        })
        .then(response => {
            setBlog(response.data.blog);
            setLoading(false);
        })
        .catch(error => {
            if (axios.isCancel(error)) {
                console.log("Request canceled", error.message);
            } else {
                console.error("Error fetching blog:", error);
            }
            setLoading(false);
        });

        return () => {
            source.cancel("Operation canceled by the user."); // Cancel the request on unmount
        };
    }, [id]);

    return {
        loading,
        blog
    };
};

export const useDetails = ({ id }: { id: string }) => {
    const [loading, setLoading] = useState(true);
    const [blogs, setBlogs] = useState<Blog[]>([]);

    useEffect(() => {
        const source = axios.CancelToken.source();

        axios.get(`${BACKEND_URL}/api/v1/user/${id}`, {
            headers: {
                Authorization: localStorage.getItem("token")
            },
            cancelToken: source.token
        })
        .then(response => {
            setBlogs(response.data.blogs); // Ensure this matches your API response structure
            setLoading(false);
        })
        .catch(error => {
            if (axios.isCancel(error)) {
                console.log("Request canceled", error.message);
            } else {
                console.error("Error fetching details:", error);
            }
            setLoading(false);
        });

        return () => {
            source.cancel("Operation canceled by the user.");
        };
    }, [id]);

    return {
        loading,
        blogs
    };
};

export const useBlogs = () => {
    const [loading, setLoading] = useState(true);
    const [blogs, setBlogs] = useState<Blog[]>([]);

    useEffect(() => {
        const source = axios.CancelToken.source();

        axios.get(`${BACKEND_URL}/api/v1/blog/bulk`, {
            headers: {
                Authorization: localStorage.getItem("token")
            },
            cancelToken: source.token
        })
        .then(response => {
            setBlogs(response.data.blogs); // Ensure this matches your API response structure
            setLoading(false);
        })
        .catch(error => {
            if (axios.isCancel(error)) {
                console.log("Request canceled", error.message);
            } else {
                console.error("Error fetching blogs:", error);
            }
            setLoading(false);
        });

        return () => {
            source.cancel("Operation canceled by the user.");
        };
    }, []);

    return {
        loading,
        blogs
    };
};
