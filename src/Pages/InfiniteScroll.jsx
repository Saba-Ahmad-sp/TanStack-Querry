import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchUsers } from "../API/api";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

export const InfiniteScroll = () => {
  const {
    data,
    hasNextPage,
    fetchNextPage,
    status,
    error,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
    getNextPageParam: (lastPage, allPages) => {
      console.log("lastPage", lastPage, allPages);
      return lastPage.length === 10 ? allPages.length + 1 : undefined;
    },
  });
  console.log(data);

  // const handleScroll = () => {
  //   const bottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 1;

  //   if(bottom && hasNextPage){
  //     fetchNextPage();
  //   }
  // };

  const { ref, inView } = useInView({
    threshold: 1,
  });

  useEffect(() => {
    // window.addEventListener('scroll', handleScroll);
    // return () => window.removeEventListener("scroll", handleScroll);
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage]);

  if (status === "loading") return <div>Loading...</div>;
  if (status === "error") return <div>Error fetching data</div>;

  return (
    <div>
      <h1 className="mb-8 text-center text-3xl">Infinite Scroll with React Query v5</h1>
      {data?.pages?.map((page, index) => (
        <ul key={index} >
          {page.map((user) => (
            <li className="grid grid-cols-2 h-36 w-full mb-2 "
              key={user.id}
              style={{ padding: "10px", border: "1px solid #ccc" }}
            >
              <p className="flex justify-center items-center text-2xl"> {user.login}</p>
              <img className="w-32 rounded-full "
                src={user.avatar_url}
                alt={user.login}
                width={50}
                height={50}
              />
            </li>
          ))}
        </ul>
      ))}
      <div ref={ref}>{isFetchingNextPage && <div>Loading more...</div>}</div>
    </div>
  );
};
