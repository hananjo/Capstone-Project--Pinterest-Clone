from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SubmitField
from wtforms.validators import DataRequired

class CommentForm(FlaskForm):
    comment = StringField("Comment", validators=[DataRequired()])
    user_id = IntegerField("User_id", validators=[DataRequired()])
    pin_id = IntegerField("Pin_id", validators=[DataRequired()])
    submit = SubmitField("Submit")
