import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceMetadataComponent } from './device-metadata.component';

describe('DeviceMetadataComponent', () => {
  let component: DeviceMetadataComponent;
  let fixture: ComponentFixture<DeviceMetadataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeviceMetadataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceMetadataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
