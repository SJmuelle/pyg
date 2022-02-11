import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatepygComponent } from './updatepyg.component';

describe('UpdatepygComponent', () => {
  let component: UpdatepygComponent;
  let fixture: ComponentFixture<UpdatepygComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdatepygComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatepygComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
