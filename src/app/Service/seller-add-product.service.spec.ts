import { TestBed } from '@angular/core/testing';

import { SellerAddProductService } from './seller-add-product.service';

describe('SellerAddProductService', () => {
  let service: SellerAddProductService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SellerAddProductService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
