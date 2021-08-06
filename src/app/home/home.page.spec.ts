import { ComponentFixture, TestBed, waitForAsync,async, fakeAsync, tick } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { HTTP } from '@ionic-native/http/ngx';
import { HomePage } from './home.page';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { CrytoDetailsPage } from '../cryto-details/cryto-details.page';
import {Location} from '@angular/common';

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;
  // let router: Router;
  let mockRouter;
  let router = {
    navigate: jasmine.createSpy('navigate')
  }

  beforeEach(waitForAsync(() => {
    mockRouter = { navigate: jasmine.createSpy('navigate') };
    TestBed.configureTestingModule({
      declarations: [ HomePage ],
      imports: [IonicModule.forRoot(),RouterTestingModule.withRoutes([
        { path: 'cryto-details', component: CrytoDetailsPage }
    ])],
      providers:[HTTP,Location,{ provide: Router, useValue: router }]
    }).compileComponents();

    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
    router = TestBed.get(Router);
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('check title string', () => {
    expect(component.title).toContain("Crypto Currency List");
  });

  describe('When no response data is avaliable',()=>{
    beforeEach(()=>{
      component.responseData = [];
    })

    it('Try Again button not displayed on empty data',()=>{
      expect(component.showTryAgain).toBeFalsy(); 
    })
  })
  
});
