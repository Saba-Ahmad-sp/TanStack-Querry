import { useQuery } from "@tanstack/react-query";
import { NavLink, useParams } from "react-router-dom";
import { fetchIndvPost } from "../../API/api";

export const FetchIndv = () => {
  // id = URL;
  // function fetchIndvPost(id) {
  // }

  const { id } = useParams();

  const { data, isPending, isError, error } = useQuery({
    queryKey: ["post", id],
    queryFn: () => fetchIndvPost(id),
  });

  if (isPending) return <p>Loading...</p>;
  if (isError) return <p>Error: {error.message || "error loading posts"}</p>;

  console.log(data);

  return (
    <div className="flex-col text-center">
      <h1 className="my-4">Post Id Number - {id}</h1>
      <div
        key={id}
        className="w-3/4 bg-gray-600 border-l-2 border-white rounded-md mb-4 h-auto p-6 max-w-screen-2xl text-gray-300 font-medium mx-auto my-auto cursor-pointer"
      >
        <p>ID: {data.id}</p>
        <p>Title: {data.title}</p>
        <p>Body: {data.body}</p>
      </div>
      <NavLink to="/rq">
        <button className="bg-green-600 w-20 h-10 mb-10 mt-4 rounded-md">Go back</button>
      </NavLink>
    </div>
  );
};
