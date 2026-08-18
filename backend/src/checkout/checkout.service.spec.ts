import { Test, TestingModule } from '@nestjs/testing';
import { CheckoutService } from './checkout.service';
import { CheckoutRequest, CheckoutResponse } from './checkout.types';
import { LoggerModule } from '../common/logger/logger.module';
import { ProductsModule } from '../products/products.module';
import { PromotionsModule } from '../promotions/promotions.module';

describe('CheckoutService', () => {
  let service: CheckoutService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [LoggerModule, ProductsModule, PromotionsModule],
      providers: [CheckoutService],
    }).compile();

    service = module.get<CheckoutService>(CheckoutService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return float number with two decimal place', () => {
    expect(service.currencyFormat(11.88999)).toEqual(11.88);
  });

  it('should return the result after promotion check', async () => {
    const req = <CheckoutRequest>{
      products: [{ id: 'wf', quantity: 2 }],
    };
    expect(await service.validation(req)).toEqual(<CheckoutResponse>{
      total: 399.98,
      discount: 0,
      payable: 399.98,
    });
  });

  it('should return the result after promotion check', async () => {
    const req = <CheckoutRequest>{
      promotionCode: 'RRD4D32',
      products: [{ id: 'wf', quantity: 6 }],
    };
    expect(await service.validation(req)).toEqual(<CheckoutResponse>{
      total: 1199.94,
      discount: 120,
      payable: 1079.94,
    });
  });

  it('should return the result after promotion check', async () => {
    const req = <CheckoutRequest>{
      promotionCode: 'YYGWKJD',
      products: [
        { id: 'wf', quantity: 1 },
        { id: 'form', quantity: 1 },
      ],
    };
    expect(await service.validation(req)).toEqual(<CheckoutResponse>{
      total: 299.98,
      discount: 10,
      payable: 289.98,
    });
  });

  it('should show invalid promotion code error', async () => {
    const req = <CheckoutRequest>{
      promotionCode: 'abcd',
      products: [{ id: 'wf', quantity: 1 }],
    };
    expect(await service.validation(req)).toEqual(<CheckoutResponse>{
      total: 199.99,
      discount: 0,
      payable: 199.99,
      error: 'invalid promotion code',
    });
  });

  it('should return all zero as the amount is zero', async () => {
    const req = <CheckoutRequest>{
      promotionCode: 'abcd',
      products: [{ id: 'wf', quantity: 0 }],
    };
    expect(await service.validation(req)).toEqual(<CheckoutResponse>{
      total: 0,
      discount: 0,
      payable: 0,
      error: 'invalid promotion code',
    });
  });
});
