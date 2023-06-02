from app.models import db, Board, environment, SCHEMA
from sqlalchemy.sql import text


def seed_board_pins():
    hair = Board_Pin(
        board_id=1, pin_id=1
    )
    dresses = Board_Pin(
        board_id=2, pin_id=12
    )
    honeymoon = Board_Pin(
       board_id=3, pin_id=25
    )
    wedding_decor = Board_Pin (
        board_id=4, pin_id=31
    )
    ring = Board_Pin (
        board_id=5, pin_id=33
    )

    db.session.add(hair)
    db.session.add(dresses)
    db.session.add(honeymoon)
    db.session.add(wedding_decor)
    db.session.add(ring)

    db.session.commit()


def undo_board_pins():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.board_pins RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM board_pins"))

    db.session.commit()
