from .db import db, environment, SCHEMA, add_prefix_for_prod



class Board(db.Model):
    __tablename__ = 'boards'

    if environment == 'production':
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    name = db.Column(db.Text(50), nullable=False, unique=True)
    description = db.Column(db.Text(250))

    user = db.relationship('User', back_populates='board')
    pin = db.relationship('Pin', secondary=add_prefix_for_prod('board_pins'), back_populates='board')
    # board_pin = db.relationship('Board_Pin', back_populates='board', cascade='all, delete-orphan')

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'name': self.name,
            'description': self.description
        }
