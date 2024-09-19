import { Appbar } from "../components/Appbar";
import { FullBLog } from "../components/FullBlog";
import { Skeleton } from "../components/Skeleton";
import { useBlog } from "../hooks"
import { useParams } from "react-router-dom";

export const Blog = ()=> {
    const {id} = useParams();
    const {loading, blog} = useBlog({
        id: id || " "
    });

    if(loading || !blog){
        return <div>
            <Appbar></Appbar>
            <div className=" flex justify-center ">
                <div>
                    <Skeleton></Skeleton>
                    <Skeleton></Skeleton>
                    <Skeleton></Skeleton>
                    <Skeleton></Skeleton>
                    <Skeleton></Skeleton>
                </div>
            </div>
        </div> 
    }
    return <div>
       <div>
      <FullBLog blog={blog}></FullBLog>
      </div>
    </div>

}