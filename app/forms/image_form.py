from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SubmitField
from wtforms.validators import DataRequired


class ImageForm(FlaskForm):
    image_url = StringField("Image", validators=[DataRequired()])
    user_id = IntegerField("User_id", validators=[DataRequired()])
    size = StringField('Size', validators=[DataRequired()])
