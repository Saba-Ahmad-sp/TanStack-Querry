import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { deletePost, fetchPosts, updatePost } from "../API/api";
import { NavLink } from "react-router-dom";
import { useState } from "react";

export const FetchRQ = () => {
  //fetching from api
  // const getPostsData = async () => {
  //   try {
  //     const res = await fetchPosts();
  //     if (res.status === 200) {
  //       return res.data;
  //     } else {
  //       return [];
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     return [];
  //   }
  // };
  const [pageNumber, setPageNumber] = useState(0);
  const queryClient = useQueryClient();

  const { data, error, isLoading, isError } = useQuery({
    queryKey: ["posts", pageNumber],
    queryFn: () => fetchPosts(pageNumber),
    placeholderData: keepPreviousData,
    // gcTime: 1000,
    // staleTime: 10000,
    // refetchInterval: 1000,
    // refetchIntervalInBackground: true,
  });

  //mutation function to delete the post
  const deleteMutation = useMutation({
    mutationFn: (id) => deletePost(id),
    onSuccess: (data, id) => {
      queryClient.setQueryData(["posts", pageNumber], (curElem) => {
        return curElem?.filter((post) => post.id !== id);
      });
    },
  });

  //mutation function to delete the post
  const updateMutation = useMutation({
    mutationFn: (id) => updatePost(id),
    onSuccess: (apiData, postId) => {
      queryClient.setQueryData(["posts", pageNumber], (postsData) => {
        return postsData?.map((curPost) => {
         return curPost.id === postId ? {...curPost, title:apiData.data.title } : curPost;
        });
      });
    },
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error.message || "error loading posts"}</p>;

  return (
    <div>
      <ul className="section-accordion ">
        {data?.map((curElem) => {
          const { id, title, body } = curElem;
          return (
            <li
              key={id}
              className="w-3/4 bg-gray-600 border-l-2 border-white rounded-md mb-4 h-auto p-6 max-w-screen-2xl text-gray-300 font-medium mx-auto my-auto cursor-pointer"
            >
              <NavLink to={`/rq/${id}`}>
                <p>{id}</p>
                <p>{title}</p>
                <p>{body}</p>
              </NavLink>
              <button
                className="bg-green-600 w-20 h-8 rounded-sm mt-3"
                onClick={() => deleteMutation.mutate(id)}
              >
                DELETE
              </button>

              <button
                className="bg-green-600 w-20 h-8 ml-4 rounded-sm mt-3"
                onClick={() => updateMutation.mutate(id)}
              >
                UPDATE
              </button>
            </li>
          );
        })}
      </ul>

      <div className="flex space-x-4 my-8 justify-center">
        <button
          disabled={pageNumber === 0 ? true : false}
          className="bg-green-600 w-20 h-8 rounded-sm"
          onClick={() => setPageNumber((prev) => prev - 3)}
        >
          Prev
        </button>
        <h2>{pageNumber / 3}</h2>
        <button
          className="bg-green-600 w-20 h-8 rounded-sm"
          onClick={() => setPageNumber((prev) => prev + 3)}
        >
          Next
        </button>
      </div>
    </div>
  );
};
