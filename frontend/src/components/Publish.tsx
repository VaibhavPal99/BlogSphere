import { useState } from "react";
import { BACKEND_URL } from "../config";
import { Appbar } from "./Appbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export const Publish = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  const handlePublish = async () => {
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/blog`,
        { title, content },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      navigate(`/blog/${response.data.id}`);
    } catch (error) {
      console.error("Failed to publish the post:", error);
      // Handle error accordingly (e.g., display a notification)
    }
  };

  return (
    <div>
      <Appbar />
      <div className="flex flex-col items-center w-full pt-8 px-4">
        <div className="max-w-screen-lg w-full mb-4">
          <input
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            className="bg-transparent text-3xl md:text-4xl font-semibold text-gray-900 focus:outline-none w-full py-2 placeholder-gray-400 border-b border-gray-300"
            placeholder="Untitled"
            style={{ caretColor: "black" }}
          />
        </div>
        <div className="max-w-screen-lg w-full mb-4">
          <TextEditor
            onChange={(content: string) => {
              setContent(content);
            }}
          />
        </div>
        <button
          onClick={handlePublish}
          type="submit"
          className="mt-16 lg:mt-10 inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800 transition-all duration-200"
        >
          Publish Post
        </button>
      </div>
    </div>
  );
};

function TextEditor({ onChange }: { onChange: (content: string) => void }) {
  return (
    <div className="h-96">
      <ReactQuill
        theme="snow"
        onChange={onChange}
        placeholder="Write your thoughts here..."
        className="h-full"
      />
    </div>
  );
}
