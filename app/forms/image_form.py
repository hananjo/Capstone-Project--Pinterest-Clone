from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SubmitField
from wtforms.validators import DataRequired
from flask_wtf.file import FileField, FileAllowed, FileRequired
from app.aws import ALLOWED_EXTENSIONS

class ImageForm(FlaskForm):
    image_url = FileField('Image File', validators=[FileRequired(), FileAllowed(list(ALLOWED_EXTENSIONS))])
    # image_url = StringField("Image", validators=[DataRequired()])
    pin_id = IntegerField("Pin_id", validators=[DataRequired()])
    size = StringField('Size', validators=[DataRequired()])
    submit = SubmitField('Submit')
