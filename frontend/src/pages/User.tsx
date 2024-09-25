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
     // Use an empty string instead of " "
     console.log(id);

    // Fetch blogs and loading state using the id
    const { blogs, details, loading, handleDelete } = useDetails({ id });
    console.log(blogs);
   

    const [isDrop, setIsDrop] = useState(true);
    const [isDrop2,setIsDrop2] = useState(false);

    const toggler1 = () => {
        if(isDrop===false){
        setIsDrop(!isDrop);
        setIsDrop2(!isDrop2)
        }
    }
    const toggler2 = () => {
        if(isDrop2===false){
        setIsDrop2(!isDrop2);
        setIsDrop(!isDrop)
        }
    }

   

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
                <div className="flex ml-24 pl-20 pt-12">
                    <div
                        id="avatar"
                        className="w-16 h-16 relative inline-flex items-center justify-center overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600"
                    >
                        <span className="text-3xl text-gray-600 dark:text-gray-300">{name[0]}</span>
                    </div>
                    <div className="text-5xl font-semibold font-sans my-0.5 pl-4">{name}</div>
                </div>
                <div className="ml-20">
                    <nav className="flex space-x-4 border-b mx-32 px-10 mb-4 w-screen max-w-screen-lg">
                        <div className={`py-2 pt-10 px-4 ${isDrop ?  "border-b-2 border-black": ""} cursor-pointer`} onClick={toggler1}>Home</div>
                        <div className={`py-2 pt-10 px-4 text-gray-500 ${isDrop2 ?  "border-b-2 border-black": ""} hover:text-black cursor-pointer`} onClick={toggler2}>About</div>
                    </nav>
                </div>
                {isDrop && (
                <div className="flex justify-center">
                    <div>
                        {blogs.length > 0 ? (
                            <>
                                <h2 className="text-3xl font-bold mb-4 font-serif">Your Blogs </h2> {/* Add heading only if blogs exist */}
                                {blogs.map((blog) => (
                                <div className="flex">
                                    <BlogCard 
                                        key={blog.id} // Add key for each blog card
                                        id={blog.id}
                                        authorName={blog.author.name || "Anonymous"}
                                        title={blog.title}
                                        content={blog.content}
                                        publishedDate={"2nd Feb 2024"} // Consider using actual published date
                                    >
                                    </BlogCard>
                                    <div className="pt-10">
                                        <DeleteBtn blogId={blog.id} onDelete={handleDelete}/>
                                    </div>
                                </div>
                        ))}
                            </>
                        ) : (
                            <p>No Blogs</p> // Handle the case of no blogs
                        )}
                    </div>
                </div>
                )}

                {!isDrop && (
                    <div>
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
}
