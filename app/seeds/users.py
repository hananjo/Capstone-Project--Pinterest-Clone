from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text



def seed_users():
    demo = User(
        username='Demo', email='demo@aa.io', password='password',
         bio='Planning my dream wedding, one pin at a time'
         )
    marnie = User(
        username='marnie', email='marnie@aa.io', password='password',
        bio='Here just for everyday inspiration'
        )
    bobbie = User(
        username='bobbie', email='bobbie@aa.io', password='password',
         bio='Here just for everyday inspo'
         )

    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)
    db.session.commit()



def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))

    db.session.commit()
