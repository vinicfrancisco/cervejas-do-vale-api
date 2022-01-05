import { v4 as uuid } from 'uuid';
import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import BeerBrand from '@models/BeerBrand';
import BeerType from '@models/BeerType';
import Beer from '@models/Beer';

export default class BeersSeeder implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    try {
      const handwerkId = uuid();
      const schornsteinId = uuid();
      const borckId = uuid();

      await connection
        .createQueryBuilder()
        .insert()
        .into(BeerBrand)
        .values([
          {
            id: handwerkId,
            name: 'Handwerk',
          },
          {
            id: schornsteinId,
            name: 'Schornstein',
          },
          {
            id: borckId,
            name: 'Borck',
          },
        ])
        .execute();

      const pilsenId = uuid();
      const weissId = uuid();
      const witbierId = uuid();
      const apaId = uuid();
      const ipaId = uuid();
      const bockId = uuid();
      const stoutId = uuid();
      const redLargerId = uuid();
      const malzbierId = uuid();
      const weizenbierId = uuid();
      const belgianBlondAle = uuid();

      await connection
        .createQueryBuilder()
        .insert()
        .into(BeerType)
        .values([
          {
            id: pilsenId,
            name: 'Pilsen',
          },
          {
            id: weissId,
            name: 'Weiss',
          },
          {
            id: witbierId,
            name: 'Witbier',
          },
          {
            id: apaId,
            name: 'APA',
          },
          {
            id: ipaId,
            name: 'IPA',
          },
          {
            id: bockId,
            name: 'Bock',
          },
          {
            id: stoutId,
            name: 'Stout',
          },
          {
            id: redLargerId,
            name: 'Red Larger',
          },
          {
            id: malzbierId,
            name: 'Malzbier',
          },
          {
            id: weizenbierId,
            name: 'Weizenbier',
          },
          {
            id: belgianBlondAle,
            name: 'Belgian Blonde Ale',
          },
        ])
        .execute();

      await connection
        .createQueryBuilder()
        .insert()
        .into(Beer)
        .values([
          {
            id: uuid(),
            name: 'Borck Red Larger',
            beer_brand_id: borckId,
            beer_type_id: redLargerId,
            alcoholic_degree: 0.5,
            volume: 600,
            price: 15,
            rating: 0,
            image: 'Borck-Red-Larger.png',
          },
          {
            id: uuid(),
            name: 'Borck Pilsen',
            beer_brand_id: borckId,
            beer_type_id: pilsenId,
            alcoholic_degree: 0.45,
            volume: 600,
            price: 15,
            rating: 0,
            image: 'Borck-Pilsen.png',
          },
          {
            id: uuid(),
            name: 'Borck Malzbier',
            beer_brand_id: borckId,
            beer_type_id: malzbierId,
            alcoholic_degree: 0.45,
            volume: 600,
            price: 15,
            rating: 0,
            image: 'Borck-Malzbier.png',
          },
          {
            id: uuid(),
            name: 'Borck Weizenbier',
            beer_brand_id: borckId,
            beer_type_id: weizenbierId,
            alcoholic_degree: 0.45,
            volume: 600,
            price: 15,
            rating: 0,
            image: 'Borck-Weizenbier.png',
          },
          {
            id: uuid(),
            name: 'Borck IPA',
            beer_brand_id: borckId,
            beer_type_id: ipaId,
            alcoholic_degree: 0.8,
            volume: 600,
            price: 15,
            rating: 0,
            image: 'Borck-IPA.png',
          },
          {
            id: uuid(),
            name: 'Shornstein Pilsen',
            beer_brand_id: schornsteinId,
            beer_type_id: pilsenId,
            alcoholic_degree: 0.45,
            volume: 500,
            price: 16,
            rating: 0,
            image: 'Shornstein-Pilsen.png',
          },
          {
            id: uuid(),
            name: 'Shornstein Weiss',
            beer_brand_id: schornsteinId,
            beer_type_id: weissId,
            alcoholic_degree: 0.5,
            volume: 500,
            price: 16,
            rating: 0,
            image: 'Shornstein-Weiss.png',
          },
          {
            id: uuid(),
            name: 'Shornstein Witbier',
            beer_brand_id: schornsteinId,
            beer_type_id: witbierId,
            alcoholic_degree: 0.5,
            volume: 500,
            price: 16,
            rating: 0,
            image: 'Shornstein-Witbier.png',
          },
          {
            id: uuid(),
            name: 'Shornstein APA',
            beer_brand_id: schornsteinId,
            beer_type_id: apaId,
            alcoholic_degree: 0.5,
            volume: 500,
            price: 16,
            rating: 0,
            image: 'Shornstein-APA.png',
          },
          {
            id: uuid(),
            name: 'Shornstein IPA',
            beer_brand_id: schornsteinId,
            beer_type_id: ipaId,
            alcoholic_degree: 0.65,
            volume: 500,
            price: 16,
            rating: 0,
            image: 'Shornstein-IPA.png',
          },
          {
            id: uuid(),
            name: 'Shornstein Bock',
            beer_brand_id: schornsteinId,
            beer_type_id: bockId,
            alcoholic_degree: 0.7,
            volume: 500,
            price: 16,
            rating: 0,
            image: 'Shornstein-BOCK.png',
          },
          {
            id: uuid(),
            name: 'Shornstein Stout',
            beer_brand_id: schornsteinId,
            beer_type_id: stoutId,
            alcoholic_degree: 0.8,
            volume: 500,
            price: 16,
            rating: 0,
            image: 'Shornstein-Stout.png',
          },
          {
            id: uuid(),
            name: 'Handwerk Ipa',
            beer_brand_id: handwerkId,
            beer_type_id: ipaId,
            alcoholic_degree: 0.6,
            volume: 500,
            price: 14,
            rating: 0,
            image: 'Handwerk-IPA.png',
          },
          {
            id: uuid(),
            name: 'Handwerk Belgian Blond Ale',
            beer_brand_id: handwerkId,
            beer_type_id: belgianBlondAle,
            alcoholic_degree: 0.7,
            volume: 500,
            price: 14.5,
            rating: 0,
            image: 'Handwerk-Blond-Ale.png',
          },
          {
            id: uuid(),
            name: 'Handwerk Witbier',
            beer_brand_id: handwerkId,
            beer_type_id: witbierId,
            alcoholic_degree: 0.49,
            volume: 500,
            price: 14.5,
            rating: 0,
            image: 'Handwerk-Witbier.png',
          },
          {
            id: uuid(),
            name: 'Handwerk APA',
            beer_brand_id: handwerkId,
            beer_type_id: apaId,
            alcoholic_degree: 0.5,
            volume: 500,
            price: 14.5,
            rating: 0,
            image: 'Handwerk-APA.png',
          },
          {
            id: uuid(),
            name: 'Handwerk Weiss',
            beer_brand_id: handwerkId,
            beer_type_id: weissId,
            alcoholic_degree: 0.58,
            volume: 500,
            price: 14,
            rating: 0,
            image: 'Handwerk-Weiss.png',
          },
        ])
        .execute();
    } catch (err) {
      console.log('Beers already created');
    }
  }
}
