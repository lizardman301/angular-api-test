import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from "@angular/router/testing";
import { AssetDetailComponent } from './asset-detail.component';
import { CurrencyPipe } from '@angular/common';

describe('AssetDetailComponent', () => {
  let component: AssetDetailComponent;
  let fixture: ComponentFixture<AssetDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssetDetailComponent],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule
      ],
      providers: [CurrencyPipe]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
