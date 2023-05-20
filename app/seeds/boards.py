from app.models import db, Board, environment, SCHEMA
from sqlalchemy.sql import text


def seed_boards():
    hair = Board(
        name='Hair', user_id=1, description='These are my hair inspired pics for my big wedding day!'
    )
    dresses = Board(
        name='Dresses', user_id=1, description='Wedding gown styles and inspo for bridal gowns and bridesmaids dresses'
    )
    honeymoon = Board(
        name='Honeymoon Destinations', user_id=1, description='Websites to plan the perfect honeymoon destination with my honey'
    )
    wedding_decor = Board (
        name='Wedding Decor', user_id=1, description='Wedding decor, backdrops, flowers, centerpieces, and staging'
    )
    ring = Board (
        name='Rings', user_id=1, description='Ring inspired pics, husband if you\'re stalking my Pinreact, these are the styles I like **hint** **hint**'
    )

    db.session.add(hair)
    db.session.add(dresses)
    db.session.add(honeymoon)
    db.session.add(wedding_decor)
    db.session.add(ring)

    db.session.commit()


def undo_boards():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.boards RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM boards"))

    db.session.commit()
