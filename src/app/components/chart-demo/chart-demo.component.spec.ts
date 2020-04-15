import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartDemoComponent } from './chart-demo.component';

describe('ChartDemoComponent', () => {
  let component: ChartDemoComponent;
  let fixture: ComponentFixture<ChartDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
