import { useParams } from "react-router-dom";
import { getBoardDetails } from "../../store/board";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
// import { deleteBoard } from "../../store/board";
// import { useModal } from "../../context/Modal";

const BoardDetails = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { userId, id } = useParams();
  // const { setModalContent } = useModal();
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

  // const handleDeleteBoard = () => {
  //   setModalContent(<DeleteBoardDetailModal />);
  //   dispatch(deleteBoard(userId, id));
  //   history.push(`/${userId}/boards`);
  // };
  return (
    <div>
      {board && board?.pins && board?.id ? (
        <div>
          <p>{board?.name}</p>
          <p>{board?.description}</p>
          {board?.pins?.map((pin) => {
            return (
              <div>
                <img
                  src={pin && pin?.images && pin?.images[0]?.image_url}
                  style={{ width: "450px", height: "400px" }}
                />
                {/* <p>{pin?.images[0]?.image_url}</p> */}
                <p>{pin?.name}</p>
              </div>
            );
          })}
          {/* <button onClick={() => handleDeleteBoard()}>Delete Board</button> */}
        </div>
      ) : (
        "Page not Found"
      )}
    </div>
  );
};

export default BoardDetails;
