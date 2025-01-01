import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ProductService } from './product.service';

describe('ProductService', () => {
  let service: ProductService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], // Use HttpClientTestingModule
    });
    service = TestBed.inject(ProductService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Ensure no unmatched requests
  });

  it('should fetch products', () => {
    const mockProducts = [{ id: 1, name: 'Product A' }, { id: 2, name: 'Product B' }];
    service.getAllProducts().subscribe((products) => {
      expect(products.length).toBe(2);
      expect(products).toEqual(mockProducts);
    });

    const req = httpMock.expectOne('http://localhost:8080/api/products');
    expect(req.request.method).toBe('GET');
    req.flush(mockProducts); // Respond with mock data
  });
});
