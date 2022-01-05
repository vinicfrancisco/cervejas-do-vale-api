import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateBeers1639566489553 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'beers',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'volume',
            type: 'int',
          },
          {
            name: 'alcoholic_degree',
            type: 'decimal',
          },
          {
            name: 'price',
            type: 'decimal',
          },
          {
            name: 'rating',
            type: 'decimal',
          },
          {
            name: 'image',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'beer_brand_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'beer_type_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
        foreignKeys: [
          {
            name: 'BeerTypes',
            referencedTableName: 'beer_types',
            referencedColumnNames: ['id'],
            columnNames: ['beer_type_id'],
            onDelete: 'SET NULL',
            onUpdate: 'SET NULL',
          },
          {
            name: 'BeerBrands',
            referencedTableName: 'beer_brands',
            referencedColumnNames: ['id'],
            columnNames: ['beer_brand_id'],
            onDelete: 'SET NULL',
            onUpdate: 'SET NULL',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('beers');
  }
}
