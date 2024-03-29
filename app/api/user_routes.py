from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import User, Board, Pin, db
from app.forms.board_form import BoardForm

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    """
    Query for all users and returns them in a list of user dictionaries
    """
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    """
    Query for a user by id and returns that user in a dictionary
    """
    user = User.query.get(id)
    return user.to_dict()

@user_routes.route('<int:id>/boards')
def boards(id):
    boardsQuery = Board.query.filter(Board.user_id == id)
    boards = boardsQuery.all()
    boardCategories = []
    if(len(boards) > 0):
        for rel in boards:
            results = rel.to_dict()
            boardCategories.append(results)
    return boardCategories



@user_routes.route('<int:userId>/boards/<int:id>')
def board_details(userId, id):
    board = Board.query.get(id)
    if not board:
        return jsonify({'error': 'Board not found'}), 404
    return jsonify(board.to_dict())



@user_routes.route('<int:id>/boards', methods=['POST'])
# @login_required

def create_board(id):
    user = User.query.get(id)
    print(id, user, 'PRINT ID****************')
    form = BoardForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():

        name = form.name.data
        description = form.description.data
        user_id = id
        print(name, description, user_id, '*******&&&&&&&&&&&&&&&&')
        new_board = Board(
            name=name,
            description=description,
            user_id=user_id
        )

        db.session.add(new_board)
        db.session.commit()
        print (new_board.to_dict(), '*********NEW_BOARD******')
        return new_board.to_dict()
    else:
        return None

@user_routes.route('<int:userId>/boards/<int:boardId>/pins/<int:pinId>', methods=['POST'])
def add_pin_to_board(userId, boardId, pinId):

    user = User.query.get(userId)
    board = Board.query.get(boardId)
    added_pin = Pin.query.get(pinId)


    if added_pin not in board.pin:
        board.pin.append(added_pin)
        db.session.commit()
        return board.to_dict()

@user_routes.route('<int:userId>/boards/<int:id>', methods=['PUT'])
def update_board(userId, id):
    board = Board.query.get(id)
    user = User.query.get(userId)
    print(id, userId, '******** BOARD, USER *******')
    form = BoardForm()

    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        name = form.name.data
        description = form.description.data
        user_id = userId

        board.name = name
        board.description = description
        board.user_id = user_id

        db.session.commit()

        return board.to_dict()

@user_routes.route('<int:userId>/boards/<int:id>', methods=['DELETE'])
def delete_board(userId, id):
    print(userId, id, '********BACKEND*******ID******')
    board = Board.query.get(id)
    print(board, '******BACKEND******DELETE*******')
    if board:
        db.session.delete(board)
        db.session.commit()
        return jsonify({'message': 'Successfully deleted board'})
