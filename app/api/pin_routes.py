from flask import Blueprint, jsonify, session, request, abort, redirect, url_for
from app.models import Pin, Image, Comment, db
from flask_login import login_required, current_user
from app.forms.pin_form import PinForm
from app.forms.image_form import ImageForm
from app.forms.comment_form import CommentForm
pin_routes = Blueprint('pins', __name__)

@pin_routes.route('/')
def get_all_pins():
    pins = Pin.query.all()

    pin_list = []
    for pin in pins:
        pin_dict = pin.to_dict()
        pin_list.append(pin_dict)
    return jsonify({'pins': pin_list})



@pin_routes.route('/', methods=['POST'])
def add_new_pin():
    form = PinForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        name = form.name.data
        description = form.description.data
        user_id = form.user_id.data
        keyword = form.keyword.data

        new_pin = Pin (
            name=name,
            description=description,
            user_id=user_id,
            keyword=keyword
        )

        db.session.add(new_pin)
        db.session.commit()

        return new_pin.to_dict()
    return None

# @pin_routes.route('/search', methods=['POST'])
# def search_pins():
#     keyword = request.form.get('keyword')
#     if not keyword:
#         return jsonify({'error': 'No keyword'})
#     keywords = [keyword.strip() for keyword in keyword.split(',')]
#     pins = Pin.query.filter(Pin.keyword.ilike(f'%{keyword}%')).all()

#     return jsonify([pin.to_dict() for pin in pins])

@pin_routes.route('/search', methods=['POST'])
def serach_pins():
    data = request.get_json()
    keyword = data.get('keyword')
    if not keyword:
        return jsonify({'error': 'No keyword given'})
    pins = Pin.query.filter(Pin.keyword.ilike(f'%{keyword}%')).all()
    return jsonify([pin.to_dict() for pin in pins])

@pin_routes.route('/<int:id>', methods=['PUT'])

def update_pin(id):
    pin = Pin.query.get(id)

    # image = Image.query.get(id)
    # print(image, '@@@@@@@@@@@@@@ IMAGE @@@@@@@@@@@@@')
    form = PinForm()

    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        name = form.name.data
        description = form.description.data
        keyword = form.keyword.data
        user_id = form.user_id.data
        # image_url = form.image_url.data

        pin.name = name
        pin.description = description
        pin.keyword = keyword
        pin.user_id = user_id

        # image.image_url = image_url


        db.session.commit()
        # pin.images.image_url = image_url
        # db.session.commit()
        # print(pin.to_dict(), '************PIN.IMAGES.IMAGE_URL****************')
        return pin.to_dict()
    else:
        return None

@pin_routes.route('/<int:id>')
def get_pin_details(id):
    pin = Pin.query.get(id)
    if not pin:
        return jsonify({'error': 'Product not found'}), 404
    return jsonify(pin.to_dict())

@pin_routes.route('/<int:id>/images')
def get_all_images(id):
    images = Image.query.filter_by(pin_id = id).all()
    if images:
        return jsonify([image.to_dict() for image in images])

@pin_routes.route('/<int:id>/comments')
def get_pin_comments(id):
    comments = Comment.query.filter_by(pin_id = id).all()
    if comments:
        return jsonify([comment.to_dict() for comment in comments])

@pin_routes.route('/<int:id>/comments', methods=['POST'])
def add_comment(id):
    form = CommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    comment = form.comment.data
    user_id = form.user_id.data
    pin_id = form.pin_id.data

    new_comment = Comment (
        comment=comment,
        user_id=user_id,
        pin_id=pin_id
    )

    db.session.add(new_comment)
    db.session.commit()

    return new_comment.to_dict()

@pin_routes.route('/<int:pinId>/comments/<int:id>', methods=['PUT'])
def update_comment(pinId, id):
    pin = Pin.query.get(pinId)
    selectedComment = Comment.query.get(id)
    print(selectedComment, '******COMMENT********')
    form = CommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        comment = form.comment.data
        user_id = form.user_id.data
        pin_id = pinId

        selectedComment.comment = comment
        selectedComment.user_id = user_id
        selectedComment.pin_id = pin_id

        db.session.commit()
        return selectedComment.to_dict()


@pin_routes.route('/<int:id>', methods=['DELETE'])
def delete_pin(id):
    pin = Pin.query.get(id)
    if pin:
        db.session.delete(pin)
        db.session.commit()
        return jsonify({'message': 'Succesfully delete pin'})

@pin_routes.route('/<int:pinId>/comments/<int:id>', methods=['DELETE'])
def delete_comment(pinId, id):
    comment = Comment.query.get(id)
    if comment or comment.pin_id == pinId:
        db.session.delete(comment)
        db.session.commit()
        return jsonify({'message': 'Successfully deleted comment'})
