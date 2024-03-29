"""empty message

Revision ID: 5fea2042eacc
Revises: ffdc0a98111c
Create Date: 2023-05-20 16:21:50.220321

"""
from alembic import op
import sqlalchemy as sa


revision = '5fea2042eacc'
down_revision = 'ffdc0a98111c'
branch_labels = None
depends_on = None


def upgrade():

    op.create_table('boards',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('name', sa.Text, nullable=False),
    sa.Column('description', sa.Text, nullable=True),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('name')
    )
    op.create_table('pins',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.Text, nullable=False),
    sa.Column('description', sa.Text, nullable=True),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.Column('keyword', sa.Text, nullable=False),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('board_pins',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('board_id', sa.Integer(), nullable=False),
    sa.Column('pin_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['board_id'], ['boards.id'], ),
    sa.ForeignKeyConstraint(['pin_id'], ['pins.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('comments',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.Column('pin_id', sa.Integer(), nullable=True),
    sa.Column('comment', sa.Text, nullable=True),
    sa.ForeignKeyConstraint(['pin_id'], ['pins.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('images',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('image_url', sa.String(length=255), nullable=False),
    sa.Column('pin_id', sa.Integer(), nullable=True),
    sa.Column('size', sa.String(length=50), nullable=False),
    sa.ForeignKeyConstraint(['pin_id'], ['pins.id'], ),
    sa.PrimaryKeyConstraint('id')
    )



def downgrade():

    op.drop_table('images')
    op.drop_table('comments')
    op.drop_table('board_pins')
    op.drop_table('pins')
    op.drop_table('boards')
