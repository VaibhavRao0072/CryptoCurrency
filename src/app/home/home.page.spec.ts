import { ComponentFixture, TestBed, waitForAsync,async, fakeAsync, tick, inject } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { HTTP } from '@ionic-native/http/ngx';
import { HomePage } from './home.page';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { CrytoDetailsPage } from '../cryto-details/cryto-details.page';
import {Location} from '@angular/common';
import { IonLoaderService } from '../services/ion-loader.service';

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;
  
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ HomePage ],
      imports: [IonicModule.forRoot(),RouterTestingModule.withRoutes([
        { path: 'cryto-details', component: CrytoDetailsPage }
    ])],
      providers:[HTTP,Location,IonLoaderService]
    }).compileComponents();

    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('check title string', () => {
    expect(component.title).toContain("Crypto Currency List");
  });

  it('If We get error from HTTP API call we need to show try again button',()=>{
    expect(component.showTryAgain).toBeTruthy(); 
  })

  it('Navigate to cryto details page.', inject([Router], (mockRouter: Router) => {
    const spy = spyOn(mockRouter, 'navigate').and.stub();
    component.goToDetails({test: '1'})
    expect(spy.calls.first().args[0]).toContain('/cryto-details');
 }));
  
});
