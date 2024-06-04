import { TestBed } from '@angular/core/testing';
import { FilmsService } from './films.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

describe('FilmsService', () => {
  let service: FilmsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(FilmsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return an empty array if starship does not have films', async () => {
    const starship = {
      name: '',
      model: '',
      manufacturer: '',
      cost_in_credits: '',
      length: '',
      max_atmosphering_speed: '',
      crew: '',
      passengers: '',
      cargo_capacity: '',
      consumables: '',
      hyperdrive_rating: '',
      MGLT: '',
      starship_class: '',
      pilots: [],
      films: [],
      created: '',
      edited: '',
      url: '',
      pilotsData: [],
      filmsData: [],
    };

    const response = await service.getFilmData(starship);
    expect(response).toEqual([]);
  });
});
