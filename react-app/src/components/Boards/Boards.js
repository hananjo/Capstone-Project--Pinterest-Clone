import { getAllBoards } from "../../store/board";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const Boards = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const boards = useSelector((state) => {
    return Object.values(state?.board);
  });
  console.log("BOARDS", boards);
  useEffect(() => {
    dispatch(getAllBoards(id));
  }, [dispatch, id]);

  return (
    <div>
      {boards?.map((board) => {
        return (
          <>
            <div>{board.name}</div>
            {/* <div>{board.description}</div> */}
          </>
        );
      })}
    </div>
  );
};

export default Boards;
