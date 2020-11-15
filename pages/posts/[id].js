import { useRouter } from "next/router";

const Comment = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <>
      <h1>PostId: {id}</h1>
    </>
  );
};

export default Comment;
