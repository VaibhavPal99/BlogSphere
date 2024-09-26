import { Appbar } from "./Appbar";
import { Blog } from "../hooks";
import { Avatar } from "./BlogCard";
import DOMPurify from 'dompurify';

export const FullBLog = ({ blog }: { blog: Blog }) => {
    const sanitizedContent = DOMPurify.sanitize(blog.content);

    return (
        <div>
            <Appbar />
            <div className="flex justify-center">
                <div className="grid grid-cols-1 md:grid-cols-12 px-10 w-full pt-12 max-w-screen-xl">
                    {/* Author details section */}
                    <div className="col-span-1 md:col-span-4 mb-6 md:mb-0">
                        <div className="text-slate-600 text-lg">Author</div>
                        <div className="flex w-full">
                            <div className="pr-4 flex flex-col justify-center">
                                <Avatar size="big" name={blog.author.name || "Anonymous"} />
                            </div>
                            <div>
                                <div className="text-xl font-bold">
                                    {blog.author.name || "Anonymous"}
                                </div>
                                <div className="pt-2 text-slate-500">
                                    Member of Medium for 2 months
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Blog title and content section */}
                    <div className="col-span-1 md:col-span-8">
                        <div className="text-5xl font-extrabold mb-4">
                            {blog.title}
                        </div>
                        <div className="text-slate-500 pt-2">
                            Posted on 2nd February 2023
                        </div>
                        <div className="pt-4">
                            <div dangerouslySetInnerHTML={{ __html: sanitizedContent }}></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
