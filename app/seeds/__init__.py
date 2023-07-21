from flask.cli import AppGroup
from .users import seed_users, undo_users
from .pins import seed_pins, undo_pins
from .boards import seed_boards, undo_boards
from .comments import seed_comments, undo_comments
from .images import seed_images, undo_images
from app.models.db import db, environment, SCHEMA


seed_commands = AppGroup('seed')



@seed_commands.command('all')
def seed():
    if environment == 'production':

        undo_comments()
        undo_images()
        undo_pins()
        undo_boards()
        undo_users()
    seed_users()
    seed_boards()
    seed_pins()
    seed_images()
    seed_comments()


@seed_commands.command('undo')
def undo():
    undo_comments()
    undo_images()
    undo_pins()
    undo_boards()
    undo_users()
