from .db import db, environment, SCHEMA, add_prefix_for_prod
# from sqlalchemy.orm import relationship
# from sqlalchemy.schema import Column, ForeignKey, Table
# from sqlalchemy.types import Integer, String


class Image(db.Model):
    __tablename__ = 'images'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    image_url = db.Column(db.String(255), nullable=False)
    pin_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('pins.id')))
    size = db.Column(db.String(50))

    pin = db.relationship('Pin', back_populates='image')

    def to_dict(self):
        return {
            'id': self.id,
            'image_url': self.image_url,
            'pin_id': self.pin_id,
            'size': self.size
        }
