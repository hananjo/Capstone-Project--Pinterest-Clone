from app.models import db, Comment, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_comments():

    comment1 = Comment(
        comment='Very beautiful', user_id=2, pin_id=1
    )
    comment2 = Comment(
        comment='Very beautiful', user_id=2, pin_id=1
    )
    comment3 = Comment(
        comment='Very beautiful', user_id=2, pin_id=1
    )
    comment4 = Comment(
        comment='Very beautiful', user_id=2, pin_id=1
    )
    comment5 = Comment(
        comment='Very beautiful', user_id=2, pin_id=1
    )
    comment6 = Comment(
        comment='Very beautiful', user_id=2, pin_id=1
    )
    comment7 = Comment(
        comment='Very beautiful', user_id=2, pin_id=1
    )
    comment8 = Comment(
        comment='Very beautiful', user_id=2, pin_id=1
    )
    comment9 = Comment(
        comment='Very beautiful', user_id=2, pin_id=1
    )
    comment10 = Comment(
        comment='Very beautiful', user_id=2, pin_id=1
    )
    comment11 = Comment(
        comment='Very beautiful', user_id=2, pin_id=1
    )
    comment12 = Comment(
        comment='Very beautiful', user_id=2, pin_id=1
    )
    comment13 = Comment(
        comment='Very beautiful', user_id=2, pin_id=1
    )
    comment14 = Comment(
        comment='Very beautiful', user_id=2, pin_id=1
    )
    comment15 = Comment(
        comment='Very beautiful', user_id=2, pin_id=1
    )
    comment16 = Comment(
        comment='Very beautiful', user_id=2, pin_id=1
    )
    comment17 = Comment(
        comment='Very beautiful', user_id=2, pin_id=1
    )
    comment18 = Comment(
        comment='Very beautiful', user_id=2, pin_id=1
    )
    comment19 = Comment(
        comment='Very beautiful', user_id=2, pin_id=1
    )
    comment20 = Comment(
        comment='Very beautiful', user_id=2, pin_id=1
    )
    comment21 = Comment(
        comment='Very beautiful', user_id=2, pin_id=1
    )
    comment22 = Comment(
        comment='Very beautiful', user_id=2, pin_id=1
    )
    comment23 = Comment(
        comment='Very beautiful', user_id=2, pin_id=1
    )
    comment24 = Comment(
        comment='Very beautiful', user_id=2, pin_id=1
    )
    comment25 = Comment(
        comment='Very beautiful', user_id=2, pin_id=1
    )
    comment26 = Comment(
        comment='Very beautiful', user_id=2, pin_id=1
    )
    comment27 = Comment(
        comment='Very beautiful', user_id=2, pin_id=1
    )
    comment28 = Comment(
        comment='Very beautiful', user_id=2, pin_id=1
    )
    comment29 = Comment(
        comment='Very beautiful', user_id=2, pin_id=1
    )
    comment30 = Comment(
        comment='Very beautiful', user_id=2, pin_id=1
    )
    comment31 = Comment(
        comment='Very beautiful', user_id=2, pin_id=1
    )
    comment32 = Comment(
        comment='Very beautiful', user_id=2, pin_id=1
    )
    comment33 = Comment(
        comment='Very beautiful', user_id=2, pin_id=1
    )
    comment34 = Comment(
        comment='Very beautiful', user_id=2, pin_id=1
    )
    comment35 = Comment(
        comment='Very beautiful', user_id=2, pin_id=1
    )
    comment36 = Comment(
        comment='Very beautiful', user_id=2, pin_id=1
    )
    comment37 = Comment(
        comment='Very beautiful', user_id=2, pin_id=1
    )
    comment38 = Comment(
        comment='Very beautiful', user_id=2, pin_id=1
    )



    db.session.add(comment1)
    db.session.add(comment2)
    db.session.add(comment3)
    db.session.add(comment4)
    db.session.add(comment5)
    db.session.add(comment6)
    db.session.add(comment7)
    db.session.add(comment8)
    db.session.add(comment9)
    db.session.add(comment10)
    db.session.add(comment11)
    db.session.add(comment12)
    db.session.add(comment13)
    db.session.add(comment14)
    db.session.add(comment15)
    db.session.add(comment16)
    db.session.add(comment17)
    db.session.add(comment18)
    db.session.add(comment19)
    db.session.add(comment20)
    db.session.add(comment21)
    db.session.add(comment22)
    db.session.add(comment23)
    db.session.add(comment24)
    db.session.add(comment25)
    db.session.add(comment26)
    db.session.add(comment27)
    db.session.add(comment28)
    db.session.add(comment29)
    db.session.add(comment30)
    db.session.add(comment31)
    db.session.add(comment32)
    db.session.add(comment33)
    db.session.add(comment34)
    db.session.add(comment35)
    db.session.add(comment36)
    db.session.add(comment37)
    db.session.add(comment38)

    db.session.commit()

def undo_comments():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.comments RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM comments"))

    db.session.commit()
