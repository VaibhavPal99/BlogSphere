import { Appbar } from "../components/Appbar";
import { useDetails } from "../hooks";
import { BlogCard } from "../components/BlogCard";
import { Skeleton } from "../components/Skeleton";

export const User = () => {
    const name = localStorage.getItem("name") || "Anonymous";
    const id = localStorage.getItem('authorId') || "";
     // Use an empty string instead of " "
     console.log(id);

    // Fetch blogs and loading state using the id
    const { blogs, loading } = useDetails({ id });

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
                        <div className="py-2 pt-10 px-4 border-b-2 border-black">Home</div>
                        <div className="py-2 pt-10 px-4 text-gray-500 hover:text-black">About</div>
                    </nav>
                </div>
                <div className="flex justify-center">
                    <div>
                        {blogs.length > 0 ? (
                            blogs.map(blog => (
                                <BlogCard 
                                    key={blog.id} // Add key for each blog card
                                    id={blog.id}
                                    authorName={blog.author.name || "Anonymous"}
                                    title={blog.title}
                                    content={blog.content}
                                    publishedDate={"2nd Feb 2024"} // Consider using actual published date
                                />
                            ))
                        ) : (
                            <p>No blogs found.</p> // Handle the case of no blogs
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
