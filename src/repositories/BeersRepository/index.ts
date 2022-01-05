import { getRepository, Repository } from 'typeorm';

import Beer from '@models/Beer';
import IBeersRepository, {
  IFindFavoritesOptions,
  IListBeersOptions,
  IListBeersResponse,
  ListBeersSort,
} from './IBeersRepository';

class BeersRepository implements IBeersRepository {
  private ormRepository: Repository<Beer>;

  constructor() {
    this.ormRepository = getRepository(Beer);
  }

  public async findAll({
    filters,
    pagination,
    sort,
  }: IListBeersOptions): Promise<IListBeersResponse> {
    let query = this.ormRepository
      .createQueryBuilder('beers')
      .leftJoinAndSelect('beers.beer_brand', 'beer_brand')
      .leftJoinAndSelect('beers.beer_type', 'beer_type')
      .groupBy('beers.id')
      .addGroupBy('beer_brand.id')
      .addGroupBy('beer_type.id')
      .offset(
        pagination ? pagination.per_page * (pagination.page - 1) : undefined,
      )
      .limit(pagination?.per_page);

    let totalBeersQuery = this.ormRepository
      .createQueryBuilder('beers')
      .leftJoin('beers.beer_brand', 'beer_brand')
      .leftJoin('beers.beer_type', 'beer_type');

    if (sort) {
      const order = sort.slice(0, 1);
      let sortType;

      if (order === '-') {
        sortType = sort.slice(1, sort.length) as ListBeersSort;
      } else {
        sortType = sort as ListBeersSort;
      }

      if (sortType === 'graduation') {
        query = query.orderBy(
          'beers.alcoholic_degree',
          order === '-' ? 'DESC' : 'ASC',
        );
      }

      if (sortType === 'price') {
        query = query.orderBy('beers.price', order === '-' ? 'DESC' : 'ASC');
      }

      if (sortType === 'rating') {
        query = query.orderBy('beers.rating', order === '-' ? 'DESC' : 'ASC');
      }
    }

    if (filters?.beer_brand_id) {
      query = query.andWhere('beer_brand.id = :beer_brand_id', {
        beer_brand_id: filters.beer_brand_id,
      });

      totalBeersQuery = totalBeersQuery.andWhere(
        'beer_brand.id = :beer_brand_id',
        {
          beer_brand_id: filters.beer_brand_id,
        },
      );
    }

    if (filters?.beer_type_id) {
      query = query.andWhere('beer_type.id = :beer_type_id', {
        beer_type_id: filters.beer_type_id,
      });

      totalBeersQuery = totalBeersQuery.andWhere(
        'beer_type.id = :beer_type_id',
        {
          beer_type_id: filters.beer_type_id,
        },
      );
    }

    if (filters?.search) {
      query = query.andWhere('beers.name ILIKE :search', {
        search: `%${filters.search}%`,
      });

      totalBeersQuery = totalBeersQuery.andWhere('beers.name ILIKE :search', {
        search: `%${filters.search}%`,
      });
    }

    const beers = await query.getMany();
    const totalBeers = await totalBeersQuery.getCount();

    return {
      data: beers,
      total: Math.ceil(totalBeers / (pagination?.per_page || 1)),
    };
  }

  public async findFavorites({
    user_id,
    pagination,
  }: IFindFavoritesOptions): Promise<IListBeersResponse> {
    let query = this.ormRepository
      .createQueryBuilder('beers')
      .innerJoin(
        'beers.favoriteUsers',
        'favoriteUsers',
        `favoriteUsers.user_id = '${user_id}'`,
      )
      .leftJoinAndSelect('beers.beer_brand', 'beer_brand')
      .leftJoinAndSelect('beers.beer_type', 'beer_type')
      .groupBy('beers.id')
      .addGroupBy('beer_brand.id')
      .addGroupBy('beer_type.id')
      .offset(
        pagination ? pagination.per_page * (pagination.page - 1) : undefined,
      )
      .limit(pagination?.per_page);

    let totalBeersQuery = this.ormRepository
      .createQueryBuilder('beers')
      .innerJoin(
        'beers.favoriteUsers',
        'favoriteUsers',
        `favoriteUsers.user_id = '${user_id}'`,
      )
      .leftJoin('beers.beer_brand', 'beer_brand')
      .leftJoin('beers.beer_type', 'beer_type');

    const beers = await query.getMany();
    const totalBeers = await totalBeersQuery.getCount();

    return {
      data: beers,
      total: Math.ceil(totalBeers / (pagination?.per_page || 1)),
    };
  }

  public async findById(id: string): Promise<Beer | undefined> {
    const beer = await this.ormRepository.findOne(id, {
      relations: ['beer_brand', 'beer_type'],
    });

    return beer;
  }

  public async save(beer: Beer): Promise<Beer> {
    return this.ormRepository.save(beer);
  }
}

export default BeersRepository;
