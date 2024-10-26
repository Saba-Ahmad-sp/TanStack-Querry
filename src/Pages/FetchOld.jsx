import { useEffect, useState } from "react";
import { fetchPostsData } from "../API/api";

export const FetchOld = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const getPostsData = async () => {
    try {
      const res = await fetchPostsData();
      // console.log(res);
      if (res.status === 200) {
        setData(res.data);
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
      setIsError(true);
      setIsLoading(false);
    }
  };
  useEffect(() => {
    getPostsData();
  }, []);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Something went wrong</p>;
  return (
    <>
      <div className="flex justify-center">
        <ul className="section-accordion ">
          {data.map((curElem) => {
            const { id, title, body } = curElem;
            return (
              <li
                key={id}
                className="w-3/4 bg-gray-600 border-white border-l-2 rounded-md mb-4 h-auto p-6 max-w-screen-2xl text-gray-300 font-medium mx-auto my-auto cursor-pointer"
              >
                <p className="text-gray-900">{title}</p>
                <p>{body}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};
