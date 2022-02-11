import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumenpygComponent } from './resumenpyg.component';

describe('ResumenpygComponent', () => {
  let component: ResumenpygComponent;
  let fixture: ComponentFixture<ResumenpygComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResumenpygComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResumenpygComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
