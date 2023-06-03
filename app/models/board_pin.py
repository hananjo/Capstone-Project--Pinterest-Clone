from .db import db, environment, SCHEMA, add_prefix_for_prod
# from sqlalchemy.types import Integer
# from sqlalchemy.schema import Column, ForeignKey, table


class Board_Pin(db.Model):
    __tablename__ = 'board_pins'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    board_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('boards.id')), nullable=False)
    pin_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('pins.id')), nullable=False)

    # board = db.relationship('Board', back_populates='board_pin')
    # pin = db.relationship('Pin', back_populates='board_pin')
