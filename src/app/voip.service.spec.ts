import { TestBed } from '@angular/core/testing';

import { VoipService } from './voip.service';

describe('VoipService', () => {
  let service: VoipService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VoipService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
