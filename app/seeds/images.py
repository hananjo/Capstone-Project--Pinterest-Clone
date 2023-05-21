from app.models import db, Image, environment, SCHEMA
from sqlalchemy.sql import text

def seed_images():
    curly_image = Image(
        image_url='image_url', pin_id=1, size='small'
    )
    updo_image = Image(
        image_url='image_url', pin_id=2, size='large'
    )
    princess_image = Image(
        image_url='image_url', pin_id=3, size='medium'
    )
    half_up_image = Image(
        image_url='image_url', pin_id=4, size='large'
    )
    waves_image = Image(
        image_url='image_url', pin_id=5, size='small'
    )
    money_piece_image = Image(
        image_url='image_url', pin_id=6, size='medium'
    )
    bun_image = Image(
        image_url='image_url', pin_id=7, size='medium'
    )
    messy_bun_image = Image(
        image_url='image_url', pin_id=8, size='large'
    )
    balayage_image = Image(
        image_url ='image_url', pin_id=9, size='small'
    )
    blonde_image = Image(
        image_url='image_url', pin_id=10, size='medium'
    )
    bridal_dress1_image = Image(
        image_url='image_url', pin_id=11, size='small'
    )
    bridal_dress2_image = Image(
        image_url='image_url', pin_id=12, size='large'
    )
    bridal_dress3_image = Image(
        image_url='image_url', pin_id=13, size='medium'
    )
    bridal_dress4_image = Image(
        image_url='image_url', pin_id=14, size='small'
    )
    bridal_dress5_image = Image(
        image_url='image_url', pin_id=15, size='small'
    )
    bridesmaid_dress1_image = Image(
        image_url='image_url', pin_id=16, size='large'
    )
    bridesmaid_dress2_image = Image(
        image_url='image_url', pin_id=17, size='medium'
    )
    bridesmaid_dress3_image = Image(
        image_url='image_url', pin_id=18, size='small'
    )
    bridesmaid_dress4_image = Image(
        image_url='image_url', pin_id=19, size='medium'
    )
    bridesmaid_dress5_image = Image(
        image_url='image_url', pin_id=20, size='large'
    )
    paris_honeymoon_image = Image(
        image_url='image_url', pin_id=21, size='medium'
    )
    maldives_honeymoon_image = Image(
        image_url='image_url', pin_id=22, size='small'
    )
    greece_honeymoon_image = Image(
        image_url='image_url', pin_id=23, size='large'
    )
    dubai_honeymoon_image = Image(
        image_url='image_url', pin_id=24, size='small'
    )
    bali_honeymoon_image = Image(
        image_url='image_url', pin_id=25, size='medium'
    )
    stage1_image = Image(
        image_url='image_url', pin_id=26, size='small'
    )
    stage2_image = Image(
        image_url='image_url', pin_id=27, size='large'
    )
    stage3_image = Image(
        image_url='image_url', pin_id=28, size='small'
    )
    stage4_image = Image(
        image_url='image_url', pin_id=29, size='medium'
    )
    center_piece1_image = Image(
        image_url='image_url', pin_id=30, size='large'
    )
    center_piece2_image = Image(
        image_url='image_url', pin_id=31, size='small'
    )
    center_piece3_image = Image(
        image_url='image_url', pin_id=32, size='medium'
    )
    solitare_image = Image (
        image_url='image_url', pin_id=33, size='large'
    )
    halo_image = Image (
        image_url='image_url', pin_id=34, size='small'
    )
    vintage_image = Image (
        image_url='image_url', pin_id=35, size='medium'
    )
    princess_cut_image = Image (
        image_url='image_url', pin_id=36, size='small'
    )
    cushion_cut_image = Image (
        image_url='image_url', pin_id=37, size='large'
    )
    ring_chart_image = Image (
        image_url='image_url', pin_id=38, size='medium'
    )


    db.session.add(curly_image)
    db.session.add(updo_image)
    db.session.add(princess_image)
    db.session.add(half_up_image)
    db.session.add(waves_image)
    db.session.add(money_piece_image)
    db.session.add(bun_image)
    db.session.add(messy_bun_image)
    db.session.add(balayage_image)
    db.session.add(blonde_image)
    db.session.add(bridal_dress1_image)
    db.session.add(bridal_dress2_image)
    db.session.add(bridal_dress3_image)
    db.session.add(bridal_dress4_image)
    db.session.add(bridal_dress5_image)
    db.session.add(bridesmaid_dress1_image)
    db.session.add(bridesmaid_dress2_image)
    db.session.add(bridesmaid_dress3_image)
    db.session.add(bridesmaid_dress4_image)
    db.session.add(bridesmaid_dress5_image)
    db.session.add(paris_honeymoon_image)
    db.session.add(maldives_honeymoon_image)
    db.session.add(greece_honeymoon_image)
    db.session.add(dubai_honeymoon_image)
    db.session.add(bali_honeymoon_image)
    db.session.add(stage1_image)
    db.session.add(stage2_image)
    db.session.add(stage3_image)
    db.session.add(stage4_image)
    db.session.add(center_piece1_image)
    db.session.add(center_piece2_image)
    db.session.add(center_piece3_image)
    db.session.add(solitare_image)
    db.session.add(halo_image)
    db.session.add(vintage_image)
    db.session.add(princess_cut_image)
    db.session.add(cushion_cut_image)
    db.session.add(ring_chart_image)

def undo_images():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.images RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM images"))

    db.session.commit()
