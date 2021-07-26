import { TestBed } from '@angular/core/testing';

import { VoipconectService } from './voipconect.service';

describe('VoipconectService', () => {
  let service: VoipconectService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VoipconectService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
