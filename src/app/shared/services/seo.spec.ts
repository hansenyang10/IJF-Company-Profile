import { TestBed } from '@angular/core/testing';

import { SeoService } from './seo.services';

describe('Seo', () => {
  let service: SeoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SeoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
