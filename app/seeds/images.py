from app.models import db, Image, environment, SCHEMA
from sqlalchemy.sql import text

def seed_images():
    curly_image = Image(
        image_url='https://res.cloudinary.com/dwphwqyrn/image/upload/v1685646768/curly_hair_wedding_vej9jk.jpg', pin_id=1, size='medium'
    )
    updo_image = Image(
        image_url='https://res.cloudinary.com/dwphwqyrn/image/upload/v1685307147/updo_yrdskv.jpg', pin_id=2, size='medium'
    )
    princess_image = Image(
        image_url='https://res.cloudinary.com/dwphwqyrn/image/upload/v1685307146/princess_hair_tu8scv.jpg', pin_id=3, size='large'
    )
    half_up_image = Image(
        image_url='https://res.cloudinary.com/dwphwqyrn/image/upload/v1685307146/half_up_half_down_cehds9.jpg', pin_id=4, size='large'
    )
    waves_image = Image(
        image_url='https://res.cloudinary.com/dwphwqyrn/image/upload/v1685307147/wavy_hair_nh28mw.jpg', pin_id=5, size='large'
    )
    money_piece_image = Image(
        image_url='https://res.cloudinary.com/dwphwqyrn/image/upload/v1685307146/Moneypiece_upk9e1.jpg', pin_id=6, size='large'
    )
    bun_image = Image(
        image_url='https://res.cloudinary.com/dwphwqyrn/image/upload/v1685307147/bun_ovnstv.jpg', pin_id=7, size='small'
    )
    messy_bun_image = Image(
        image_url='https://res.cloudinary.com/dwphwqyrn/image/upload/v1685307146/messy_bun_cytjep.jpg', pin_id=8, size='small'
    )
    balayage_image = Image(
        image_url ='https://res.cloudinary.com/dwphwqyrn/image/upload/v1685307144/balayage_hdo57z.jpg', pin_id=9, size='large'
    )
    blonde_image = Image(
        image_url='https://res.cloudinary.com/dwphwqyrn/image/upload/v1685307144/blolnde_hair_gmoap8.jpg', pin_id=10, size='medium'
    )
    bridal_dress1_image = Image(
        image_url='https://res.cloudinary.com/dwphwqyrn/image/upload/v1685307144/bridal_dress_4_pjncrf.jpg', pin_id=11, size='large'
    )
    bridal_dress2_image = Image(
        image_url='https://res.cloudinary.com/dwphwqyrn/image/upload/v1685307144/bridal_dress_3_ewylga.jpg', pin_id=12, size='large'
    )
    bridal_dress3_image = Image(
        image_url='https://res.cloudinary.com/dwphwqyrn/image/upload/v1685307144/bridal_dress_5_hmelbe.jpg', pin_id=13, size='large'
    )
    bridal_dress4_image = Image(
        image_url='https://res.cloudinary.com/dwphwqyrn/image/upload/v1685307144/bridal_dress_2_tairdf.jpg', pin_id=14, size='large'
    )
    bridal_dress5_image = Image(
        image_url='https://res.cloudinary.com/dwphwqyrn/image/upload/v1685307144/bridal_dress_1_ezgats.jpg', pin_id=15, size='large'
    )
    bridesmaid_dress1_image = Image(
        image_url='https://res.cloudinary.com/dwphwqyrn/image/upload/v1685307144/bridesmaid_dress_1_mn7xc9.jpg', pin_id=16, size='large'
    )
    bridesmaid_dress2_image = Image(
        image_url='https://res.cloudinary.com/dwphwqyrn/image/upload/v1685307145/bridesmaid_dress_5_qdcst8.jpg', pin_id=17, size='large'
    )
    bridesmaid_dress3_image = Image(
        image_url='https://res.cloudinary.com/dwphwqyrn/image/upload/v1685307145/bridesmaid_dress_4_wlb6lw.jpg', pin_id=18, size='large'
    )
    bridesmaid_dress4_image = Image(
        image_url='https://res.cloudinary.com/dwphwqyrn/image/upload/v1685307144/bridesmaid_dress_3_qu13jw.jpg', pin_id=19, size='large'
    )
    bridesmaid_dress5_image = Image(
        image_url='https://res.cloudinary.com/dwphwqyrn/image/upload/v1685307145/bridesmaid_dress_4_wlb6lw.jpg', pin_id=20, size='large'
    )
    paris_honeymoon_image = Image(
        image_url='https://res.cloudinary.com/dwphwqyrn/image/upload/v1685307146/Paris_ra80u9.jpg', pin_id=21, size='large'
    )
    maldives_honeymoon_image = Image(
        image_url='https://res.cloudinary.com/dwphwqyrn/image/upload/v1685307145/Maldives_hkzhqb.jpg', pin_id=22, size='medium'
    )
    greece_honeymoon_image = Image(
        image_url='https://res.cloudinary.com/dwphwqyrn/image/upload/v1685307145/Greece_pdtlgx.jpg', pin_id=23, size='medium'
    )
    dubai_honeymoon_image = Image(
        image_url='https://res.cloudinary.com/dwphwqyrn/image/upload/v1685307145/dubai_l0bmfe.jpg', pin_id=24, size='medium'
    )
    bali_honeymoon_image = Image(
        image_url='https://res.cloudinary.com/dwphwqyrn/image/upload/v1685307144/Bali_kbw82l.jpg', pin_id=25, size='medium'
    )
    stage1_image = Image(
        image_url='https://res.cloudinary.com/dwphwqyrn/image/upload/v1685307147/wedding_decor_6_gp8z2r.jpg', pin_id=26, size='medium'
    )
    stage2_image = Image(
        image_url='https://res.cloudinary.com/dwphwqyrn/image/upload/v1685307147/wedding_decor_1_ienp5d.jpg', pin_id=27, size='large'
    )
    stage3_image = Image(
        image_url='https://res.cloudinary.com/dwphwqyrn/image/upload/v1685307147/wedding_decor_7_g4huim.jpg', pin_id=28, size='medium'
    )
    stage4_image = Image(
        image_url='https://res.cloudinary.com/dwphwqyrn/image/upload/v1685307147/Wedding_decor_2_fobqge.jpg', pin_id=29, size='medium'
    )
    center_piece1_image = Image(
        image_url='https://res.cloudinary.com/dwphwqyrn/image/upload/v1685307147/wedding_decor_5_idoxsd.jpg', pin_id=30, size='medium'
    )
    center_piece2_image = Image(
        image_url='https://res.cloudinary.com/dwphwqyrn/image/upload/v1685307147/wedding_decor_3_k77xyy.jpg', pin_id=31, size='large'
    )
    center_piece3_image = Image(
        image_url='https://res.cloudinary.com/dwphwqyrn/image/upload/v1685307147/wedding_decor_4_mheb6o.jpg', pin_id=32, size='large'
    )
    solitare_image = Image (
        image_url='https://res.cloudinary.com/dwphwqyrn/image/upload/v1685307146/solitaire_ring_iovvnc.jpg', pin_id=33, size='small'
    )
    halo_image = Image (
        image_url='https://res.cloudinary.com/dwphwqyrn/image/upload/v1685307146/Halo_ring_fushv4.jpg', pin_id=34, size='small'
    )
    vintage_image = Image (
        image_url='https://res.cloudinary.com/dwphwqyrn/image/upload/v1685307147/vintage_ring_xuhxni.jpg', pin_id=35, size='small'
    )
    princess_cut_image = Image (
        image_url='https://res.cloudinary.com/dwphwqyrn/image/upload/v1685307146/princess_cut_ring_e5p4kh.jpg', pin_id=36, size='small'
    )
    cushion_cut_image = Image (
        image_url='https://res.cloudinary.com/dwphwqyrn/image/upload/v1685307145/cushion_cut_uqw7vf.jpg', pin_id=37, size='medium'
    )
    ring_chart_image = Image (
        image_url='https://res.cloudinary.com/dwphwqyrn/image/upload/v1685307145/cut_chart_rings_vtx85z.jpg', pin_id=38, size='large'
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
