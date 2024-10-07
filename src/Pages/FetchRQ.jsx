import { useQuery } from "@tanstack/react-query";
import { fetchPosts } from "../API/api";

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

  const { data, error, isLoading, isError} = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
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
              className="w-3/4 bg-gray-600 border-l-2 border-white rounded-md mb-4 h-auto p-6 max-w-screen-2xl text-gray-300 font-medium mx-auto my-auto"
            >
              <p>{title}</p>
              <p>{body}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
