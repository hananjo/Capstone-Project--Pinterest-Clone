import { useParams } from "react-router-dom";
import { getBoardDetails } from "../../store/board";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
const BoardDetails = () => {
  //   const history = useHistory();
  const dispatch = useDispatch();
  const { userId, id } = useParams();
  console.log(userId, id, "USERID");

  //   const user = useSelector((state) => {
  //     return state.session.user.id;
  //   });

  const board = useSelector((state) => {
    return state?.board.details;
  });
  console.log(board, "BOARD DETAIL STATE");
  useEffect(() => {
    dispatch(getBoardDetails(userId, id));
  }, [dispatch, userId, id]);

  return (
    <div>
      {board && board?.id ? (
        <div>
          <p>{board.name}</p>
          <p>{board.description}</p>
          {board?.pins?.map((pin) => {
            return (
              <div>
                <p>{pin?.images[0]?.image_url}</p>
                <p>{pin?.name}</p>
              </div>
            );
          })}
        </div>
      ) : (
        "Page not Found"
      )}
    </div>
  );
};

export default BoardDetails;
