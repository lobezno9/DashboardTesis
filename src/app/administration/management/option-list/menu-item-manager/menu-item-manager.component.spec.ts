import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuItemManagerComponent } from './menu-item-manager.component';

describe('MenuItemManagerComponent', () => {
  let component: MenuItemManagerComponent;
  let fixture: ComponentFixture<MenuItemManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuItemManagerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuItemManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
