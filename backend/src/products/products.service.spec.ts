import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from './products.service';
import { mockProductsList } from './products.mock';
import { LoggerModule } from '../common/logger/logger.module';
import { HttpStatus } from '@nestjs/common';

describe('ProductsService', () => {
  let service: ProductsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [LoggerModule],
      providers: [ProductsService],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return list of all products', async () => {
    expect(await service.list()).toEqual(mockProductsList);
  });

  it('should return a product', async () => {
    expect(await service.getById('wf')).toEqual(mockProductsList[0]);
  });

  it('should return not found error', async () => {
    try {
      await service.getById('a');
      fail('should throw error');
    } catch (err) {
      expect(err.status).toEqual(HttpStatus.NOT_FOUND);
    }
  });

  it('should return bad request', async () => {
    try {
      await service.getByIds(['a']);
      fail('should throw error');
    } catch (err) {
      expect(err.status).toEqual(HttpStatus.BAD_REQUEST);
    }
  });

  it('should return multiple products', async () => {
    expect(await service.getByIds(['wf', 'docgen', 'form'])).toEqual(
      mockProductsList,
    );
  });
});
