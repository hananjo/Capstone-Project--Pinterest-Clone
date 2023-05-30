from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SubmitField, TextAreaField
from wtforms.validators import DataRequired

class PinForm(FlaskForm):
    name = StringField('Name', validators=[DataRequired()])
    description = TextAreaField('Description', validators=[DataRequired()])
    user_id = IntegerField('User_id', validators=[DataRequired()])
    keyword = StringField('Keyword', validators=[DataRequired()])
    image_url = StringField('Image_url', validators=[DataRequired()])
    size = StringField('Size', validators=[DataRequired()])
    submit = SubmitField('Submit')
