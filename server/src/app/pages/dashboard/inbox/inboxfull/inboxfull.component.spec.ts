import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InboxfullComponent } from './inboxfull.component';

describe('InboxfullComponent', () => {
  let component: InboxfullComponent;
  let fixture: ComponentFixture<InboxfullComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InboxfullComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InboxfullComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
