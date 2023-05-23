from flask import Blueprint, jsonify, session, request, abort, redirect, url_for
from app.models import Pin, db
from flask_login import login_required, current_user

pin_routes = Blueprint('pins', __name__)

@pin_routes.route('/')
def get_all_pins():
    pins = Pin.query.all()

    pin_list = []
    for pin in pins:
        pin_dict = pin.to_dict()
        pin_list.append(pin_dict)
    return jsonify({'pins': pin_list})

@pin_routes.route('/<int:id>')
def get_pin_details(id):
    pin = Pin.query.get(id)
    if not pin:
        return jsonify({'error': 'Product not found'}), 404
    return jsonify(pin.to_dict())
