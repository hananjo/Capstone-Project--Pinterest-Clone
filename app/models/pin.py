from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship
from sqlalchemy.schema import Column, ForeignKey, Table
from sqlalchemy.types import Integer, Text

class Pin(db.Model):
    __tablename__ = 'pins'

    if environment == 'production':
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.Text(50), nullable=False)
    description = db.Column(db.Text(250))
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')))
    keyword = db.Column(db.Text(250), nullable=False)

    user = db.relationship('User', back_populates='pin')
    board = db.relationship('Board', secondary=add_prefix_for_prod('board_pins'), back_populates='pin', cascade='all, delete-orphan')
    image = db.relationship('Image', back_populates='pin', cascade='all, delete-orphan', lazy=True)
    comment = db.relationship('Comment', back_populates='pin', cascade='all, delete-orphan')
    # board_pin = db.relationship('Board_Pin', back_populates='pin', cascade='all, delete-orphan')

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description,
            'user_id': self.user_id,
            'keyword': self.type
        }
