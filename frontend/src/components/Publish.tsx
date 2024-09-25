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

  return (
    <div>
      <div>
        <Appbar></Appbar>
      </div>
      <div>
        <div className="flex justify-center w-full pt-8">
          <div className="max-w-screen-lg w-full">
            <input
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              className="bg-transparent text-4xl font-semibold text-gray-900 focus:outline-none w-full py-2 placeholder-gray-400"
              placeholder="Untitled"
              style={{ caretColor: "black" }}
            />
          </div>
        </div>
        <div className="flex justify-center w-full pt-8">
          <div className="max-w-screen-lg w-full">
            <TextEditor
              onChange={(content: string) => {
                setContent(content);
              }}
            />
            <button
              onClick={async () => {
                const response = await axios.post(
                  `${BACKEND_URL}/api/v1/blog`,
                  {
                    title,
                    content,
                  },
                  {
                    headers: {
                      Authorization: localStorage.getItem("token"),
                    },
                  }
                );
                navigate(`/blog/${response.data.id}`);
              }}
              type="submit"
              className="mt-16 inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800"
            >
              Publish post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

function TextEditor({ onChange }: { onChange: (content: string) => void }) {
  return (
    <div className="h-96">
      <ReactQuill
        theme="snow"
        onChange={(content) => {
          onChange(content);
        }}
        placeholder="Write your thoughts here..."
        className="h-full"
      />
    </div>
  );
}
