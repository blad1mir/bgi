import { TestBed } from '@angular/core/testing';

import { ConexionbdService } from './conexionbd.service';

describe('ConexionbdService', () => {
  let service: ConexionbdService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConexionbdService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
