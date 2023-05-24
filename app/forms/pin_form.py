from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SubmitField, TextAreaField
from wtforms.validators import DataRequired

class PinForm(FlaskForm):
    name = StringField('Name', validators=[DataRequired()])
    description = TextAreaField('Description', validators=[DataRequired()])
    user_id = IntegerField('User_id', validators=[DataRequired()])
    keyword = StringField('Keyword', validators=[DataRequired()])
    submit = SubmitField('Submit')
