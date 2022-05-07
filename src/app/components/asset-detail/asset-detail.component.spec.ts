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

  it('usdTransform should transform correctly', () => {
    expect(component.usdTransform("1.50")).toEqual("$1.50");
  })

  it('usdTransform should handle empty data ', () => {
    expect(component.usdTransform("")).toEqual(null);
  })

  it('isEmpty should check for nulls', () => {
    expect(component.isEmpty(null)).toEqual(true);
  })

  it('isEmpty should return false for valid string', () => {
    expect(component.isEmpty("I am a string.")).toEqual(false);
  })

  it('calculateUSD should multiply correctly', () => {
    // Set asset value
    component.asset.priceUsd = "4.00"
    
    component.calculateUSD("2.00");

    expect(component.dollarAmountOfAsset).toEqual(8);
  })

});
