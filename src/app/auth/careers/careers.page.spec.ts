import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CareersPage } from './careers.page';

describe('CareersPage', () => {
  let component: CareersPage;
  let fixture: ComponentFixture<CareersPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CareersPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CareersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
