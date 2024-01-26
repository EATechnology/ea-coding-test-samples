// festivals.service.integration.spec.ts
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { FestivalDataService } from '../core/data-services/festival-data.service';
import { FestivalBand } from '../core/models/festival.model';
import {FestivalsService} from "../festivals/festivals.service";

describe('FestivalsService Integration', () => {
  let service: FestivalsService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        FestivalsService,
        FestivalDataService
      ]
    });

    service = TestBed.inject(FestivalsService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should test the model structure and types from the service', () => {
    const testData: Array<{ name: string, bands: Array<{ name: string }> }> = [
      { name: 'Any Festival', bands: [{ name: 'Any Band 1' }, { name: 'Any Band 2' }] },
      { name: 'Another Festival', bands: [{ name: 'Any Band A' }, { name: 'Any Band B' }] }
    ];

    service.getFestivalsData().subscribe((festivalBands: FestivalBand[]) => {
      expect(Array.isArray(festivalBands)).toBe(true);

      festivalBands.forEach(band => {
        expect(band).toEqual(jasmine.objectContaining({
          bandName: jasmine.any(String),
          festivalName: jasmine.any(String)
        }));
      });
    });

    const req = httpTestingController.expectOne((request) => true); // This is a simple catch-all for demo purposes.

    expect(req.request.method).toEqual('GET');

    req.flush(testData, { status: 200, statusText: 'OK' });

    httpTestingController.verify();
  });

  afterEach(() => {
    httpTestingController.verify();
  });
});
