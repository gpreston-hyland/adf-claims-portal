import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StartClaimComponent } from './start-claim.component';

describe('StartClaimComponent', () => {
  let component: StartClaimComponent;
  let fixture: ComponentFixture<StartClaimComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StartClaimComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StartClaimComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
