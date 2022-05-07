import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CoinCapService } from './coin-cap.service';

describe('CoinCapService', () => {
  let service: CoinCapService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(CoinCapService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
