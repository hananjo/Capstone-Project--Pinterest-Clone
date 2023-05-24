from flask import Blueprint, jsonify, session, request, abort, redirect, url_for
from app.models import Pin, Image, db
from flask_login import login_required, current_user
from app.forms.pin_form import PinForm

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
