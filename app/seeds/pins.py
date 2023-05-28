from app.models import db, Pin, environment, SCHEMA
from sqlalchemy.sql import text

def seed_pins():
    curly = Pin(
        name='Curly hair', description='Curly girl method to get those bouncy curls you\'ve always wanted', keyword='hair, curly, hairstyle', user_id=1
    )
    updo = Pin(
        name='Updo', description='This updo is perfect for any formal occasian, its so easy to do, you don\'t need a stylist to get this look!', keyword='updo, bridal, wedding hair', user_id=2
    )
    princess = Pin(
        name='Princess hair', description='Extra long hair vine, perfect for bridal. Princess feel.', keyword='princess hair, hairstyle, hair, bridal', user_id=3
    )
    half_up = Pin(
        name='Half up half down hairstyle', description='Half up half down hairstyle is very versatile and stylish.', keyword='half up, half up half down, hair, hairstyle', user_id=1
    )
    waves = Pin(
        name='Waves hair', description='This hair style has taken popularity in the last few years. The perfect bridal look. It\'s elegance and class all in one look.', keyword='waves, hair, hairstyle, bridal', user_id=2
    )
    money_piece = Pin(
        name='Moneypiece', description='This money piece frames the face nicely to give you more definition in your look.', keyword='moneypiece, hair, hairstyle', user_id=3
    )
    bun = Pin (
        name='Classy bun', description='This bun will look good on every occasian, whether you\'re out shopping or going to a formal event. This look is versatile.', keyword='bun, hair, hairstyle', user_id=2
    )
    messy_bun = Pin (
        name='Messy bun', description='The messy bun that\'s so easy and effortless to put together.', keyword='messy bun, hair, hairstyle', user_id=3
    )
    balayage = Pin (
        name ='Balayage', description='Beautiful balayage', keyword='balayage, hair, hairstyle, blonde', user_id=2
    )
    blonde = Pin (
        name='Blonde hair', description='Beautiful, luscious, blonde hair', keyword='hair, hair color, hairstyle, blonde', user_id=3
    )
    bridal_dress1 = Pin (
        name='Bridal mermaid style dress', description='', keyword='white dress, bridal dresses, wedding gown, mermaid style', user_id=2
    )
    bridal_dress2 = Pin (
        name='Bridal a line dress', description='', keyword='white dress, bridal dresses, wedding gown, a line', user_id=3
    )
    bridal_dress3 = Pin (
        name='Bridal ball gown dress', description='', keyword='white dress, bridal dresses, wedding gown, ball gown', user_id=2
    )
    bridal_dress4 = Pin (
        name='Bridal mermaid style dress', description='', keyword='white dress, bridal dresses, wedding gown, mermaid style', user_id=3
    )
    bridal_dress5 = Pin (
        name='Bridal ball gown dress', description='', keyword='white dress, bridal dresses, wedding gown, ball gown', user_id=2
    )
    bridesmaid_dress1 = Pin (
        name='Bridesmaid black dress', description='', keyword='dress, bridal dresses, wedding gown, black bridesmaid dress, bridesmaid dress teal ', user_id=3
    )
    bridesmaid_dress2 = Pin (
        name='Bridesmaid champagne color dress', description='', keyword='white dress, bridal dresses, wedding gown, champagne bridesmaid dress, cream bridesmaid dress, beige bridesmaid dress', user_id=2
    )
    bridesmaid_dress3 = Pin (
        name='Bridesmaid teal dress', description='', keyword='white dress, bridal dresses, wedding gown, teal bridesmaid dress, bridesmaid dress teal', user_id=3
    )
    bridesmaid_dress4 = Pin (
        name='Bridal champagne color dress', description='', keyword='white dress, bridal dresses, wedding gown, champagne bridesmaid dress, cream bridesmaid dress, beige bridesmaid dress', user_id=2
    )
    bridesmaid_dress5 = Pin (
        name='Bridal soft pink dress', description='', keyword='white dress, bridal dresses, wedding gown, champagne bridesmaid dress, cream bridesmaid dress, beige bridesmaid dress', user_id=3
    )
    paris_honeymoon = Pin (
        name='Paris', description='How to plan a romantic honeymoon in Paris', keyword='Paris, honeymoon destinations', user_id=2
    )
    maldives_honeymoon = Pin (
        name='Maldives', description='How to plan a romantic honeymoon in Maldives', keyword='Maldives, honeymoon destinations', user_id=3
    )
    greece_honeymoon = Pin (
        name='Greece', description='How to plan a romantic honeymoon in Greece', keyword='Greece, honeymoon destinations', user_id=2
    )
    dubai_honeymoon = Pin (
        name='Maldives', description='How to plan a romantic honeymoon in Dubai', keyword='Dubai, honeymoon destinations', user_id=3
    )
    bali_honeymoon = Pin (
        name='Bali', description='How to plan a romantic honeymoon in Bali', keyword='Bali, honeymoon destinations', user_id=2
    )
    stage1 = Pin(
        name='Sequin Wedding Arch', description='Sequin drapping over hexagonal shape arch', keyword='staging, flowers, wedding decor', user_id=3
    )
    stage2 = Pin(
        name='Wedding arch with pompas grass', description='Circular wedding arch with greenery and pompas grass', keyword='staging, flowers, wedding decor, wedding arch', user_id=2
    )
    stage3 = Pin(
        name='Custom neon sign', description='Neon sign custom made for your backdrop or staging needs', keyword='staging, neon sign, wedding decor', user_id=3
    )
    stage4 = Pin(
        name='Wedding decor neon sign', description='Neon sign custom made for your backdrop', keyword='staging, flowers, neon sign, wedding decor', user_id=2
    )
    center_piece1 = Pin(
        name='Harlow centerpiece', description='Harlow stands make an elegant piece for floral centerpieces', keyword='centerpieces, flowers, harlow stands', user_id=3
    )
    center_piece2 = Pin(
        name='Wedding flower centerpieces', description='2023 Wedding flower trends you\'ll love', keyword='centerpieces, flowers, wedding decor', user_id=2
    )
    center_piece3 = Pin(
        name='Candle centerpieces', description='Candle centerpieces are an elegant and affordable option to have an elegant yet cost effective centerpiece', keyword='centerpieces, candles, wedding decor', user_id=3
    )
    solitare = Pin (
        name='Solitare ring', description='Solitare setting beautiful ring', keyword='wedding rings, solitare ring', user_id=2
    )
    halo = Pin (
        name='Halo ring', description='Halo setting beautiful ring', keyword='wedding rings, halo ring', user_id=3
    )
    vintage = Pin (
        name='Vintage ring', description='Vintage setting beautiful ring', keyword='wedding rings, vintage ring', user_id=2
    )
    princess_cut = Pin (
        name='Princess cut ring', description='Princess cut beautiful ring', keyword='wedding rings, princess cut ring', user_id=3
    )
    cushion_cut = Pin (
        name='Cushion cut ring', description='Cushion cut beautiful ring', keyword='wedding rings, cushion cut ring', user_id=2
    )
    ring_chart = Pin (
        name='Ring cuts chart', description='Fine jewelry rings for women ', keyword='wedding rings, ring chart', user_id=3
    )


    db.session.add(curly)
    db.session.add(updo)
    db.session.add(princess)
    db.session.add(half_up)
    db.session.add(waves)
    db.session.add(money_piece)
    db.session.add(bun)
    db.session.add(messy_bun)
    db.session.add(balayage)
    db.session.add(blonde)
    db.session.add(bridal_dress1)
    db.session.add(bridal_dress2)
    db.session.add(bridal_dress3)
    db.session.add(bridal_dress4)
    db.session.add(bridal_dress5)
    db.session.add(bridesmaid_dress1)
    db.session.add(bridesmaid_dress2)
    db.session.add(bridesmaid_dress3)
    db.session.add(bridesmaid_dress4)
    db.session.add(bridesmaid_dress5)
    db.session.add(paris_honeymoon)
    db.session.add(maldives_honeymoon)
    db.session.add(greece_honeymoon)
    db.session.add(dubai_honeymoon)
    db.session.add(bali_honeymoon)
    db.session.add(stage1)
    db.session.add(stage2)
    db.session.add(stage3)
    db.session.add(stage4)
    db.session.add(center_piece1)
    db.session.add(center_piece2)
    db.session.add(center_piece3)
    db.session.add(solitare)
    db.session.add(halo)
    db.session.add(vintage)
    db.session.add(princess_cut)
    db.session.add(cushion_cut)
    db.session.add(ring_chart)

def undo_pins():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.pins RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM pins"))

    db.session.commit()
