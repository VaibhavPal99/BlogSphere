import { Appbar } from "../components/Appbar";
import { useDetails } from "../hooks";
import { BlogCard } from "../components/BlogCard";
import { Skeleton } from "../components/Skeleton";
import { useState } from "react";
import { DetailCard } from "../components/DetailCard";
import { DeleteBtn } from "../components/RandomBtn";

export const User = () => {
    const name = localStorage.getItem("name") || "Anonymous";
    const id = localStorage.getItem('authorId') || "";
    console.log(id);

    const { blogs, details, loading, handleDelete } = useDetails({ id });
    console.log(blogs);
   
    const [isDrop, setIsDrop] = useState(true);
    const [isDrop2, setIsDrop2] = useState(false);

    const toggler1 = () => {
        if (isDrop === false) {
            setIsDrop(!isDrop);
            setIsDrop2(!isDrop2);
        }
    };

    const toggler2 = () => {
        if (isDrop2 === false) {
            setIsDrop2(!isDrop2);
            setIsDrop(!isDrop);
        }
    };

    if (loading) {
        return (
            <div>
                <Appbar />
                <div className="flex justify-center">
                    <div>
                        {Array.from({ length: 5 }).map((_, index) => (
                            <Skeleton key={index} />
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div>
            <Appbar />
            <div>
                <div className="flex flex-col md:flex-row md:ml-24 pl-6 md:pl-20 pt-8 md:pt-12 items-center md:items-start">
                    <div
                        id="avatar"
                        className="w-16 h-16 relative inline-flex items-center justify-center overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600"
                    >
                        <span className="text-3xl text-gray-600 dark:text-gray-300">{name[0]}</span>
                    </div>
                    <div className="text-3xl md:text-5xl font-semibold font-sans mt-4 md:mt-0 pl-0 md:pl-4 text-center md:text-left">{name}</div>
                </div>
                <div className="md:ml-20 mt-6 md:mt-0">
                    <nav className="flex justify-center md:justify-start space-x-4 border-b mx-6 md:mx-32 px-4 md:px-10 mb-4 w-full max-w-screen-lg">
                        <div
                            className={`py-2 pt-6 md:pt-10 px-4 ${isDrop ? "border-b-2 border-black" : ""} cursor-pointer`}
                            onClick={toggler1}
                        >
                            Home
                        </div>
                        <div
                            className={`py-2 pt-6 md:pt-10 px-4 text-gray-500 ${isDrop2 ? "border-b-2 border-black" : ""} hover:text-black cursor-pointer`}
                            onClick={toggler2}
                        >
                            About
                        </div>
                    </nav>
                </div>
                {isDrop && (
                    <div className="flex justify-center">
                        <div className="w-full px-6 md:px-0 max-w-screen-lg">
                            {blogs.length > 0 ? (
                                <>
                                    <h2 className="text-2xl md:text-3xl font-bold mb-4 font-serif text-center md:text-left">Your Blogs</h2>
                                    {blogs.map((blog) => (
                                        <div className="flex flex-col md:flex-row items-center justify-between mb-6" key={blog.id}>
                                            <BlogCard
                                                id={blog.id}
                                                authorName={blog.author.name || "Anonymous"}
                                                title={blog.title}
                                                content={blog.content}
                                                publishedDate={"2nd Feb 2024"}
                                            />
                                            <div className="mt-4 md:mt-0 md:ml-4">
                                                <DeleteBtn blogId={blog.id} onDelete={handleDelete} />
                                            </div>
                                        </div>
                                    ))}
                                </>
                            ) : (
                                <p className="text-center">No Blogs</p>
                            )}
                        </div>
                    </div>
                )}

                {!isDrop && (
                    <div className="px-6 md:px-0 flex justify-center">
                        <DetailCard
                            id={details?.id || " "}
                            name={details?.name || "Anonymous"}
                            email={details?.email || "No email"}
                            password={details?.password || "No password"}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};
