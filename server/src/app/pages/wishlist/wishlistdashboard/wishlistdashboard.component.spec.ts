import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WishlistdashboardComponent } from './wishlistdashboard.component';

describe('WishlistdashboardComponent', () => {
  let component: WishlistdashboardComponent;
  let fixture: ComponentFixture<WishlistdashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WishlistdashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WishlistdashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
