import { AppComponent } from './app.component';

import { async, ComponentFixture, ComponentFixtureAutoDetect, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';

import { RouterLinkStubDirective } from '../testing';
import { RouterOutletStubComponent } from '../testing';

let comp: AppComponent;
let fixture: ComponentFixture<AppComponent>;

describe('AppComponent', function () {
  let de: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent], imports: [RouterTestingModule],
      providers: [
        { provide: ComponentFixtureAutoDetect, useValue: true }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    comp = fixture.componentInstance;
    de = fixture.debugElement.query(By.css('h1'));
  });

  it('should create component', () => expect(comp).toBeDefined());

  it('true is true', () => expect(true).toBe(true));

  it('should have expected <h1> text List of Employees', () => {
    fixture.detectChanges();
    const h1 = de.nativeElement;
    expect(h1.innerText).toMatch(/List of Employees/i,
      '<h1> should say something about "List of Employees"');
  });

  it('should display original title with `fixture.detectChanges()`', () => {
    fixture.detectChanges();
    const h1 = de.nativeElement;
    expect(h1.textContent).toContain(comp.title);
  });

  it('should display original title without `fixture.detectChanges()`', () => {
    const h1 = de.nativeElement;
    expect(h1.textContent).toContain(comp.title);
  });
});

describe('AppComponent & TestModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        RouterLinkStubDirective, RouterOutletStubComponent
      ]
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(AppComponent);
        comp = fixture.componentInstance;
      });
  }));
  tests();
});

describe('AppComponent & NO_ERRORS_SCHEMA', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent, RouterLinkStubDirective],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(AppComponent);
        comp = fixture.componentInstance;
      });
  }));
  tests();
});

function tests() {
  let links: RouterLinkStubDirective[];
  let linkDes: DebugElement[];

  beforeEach(() => {
    fixture.detectChanges();
    linkDes = fixture.debugElement
      .queryAll(By.directive(RouterLinkStubDirective));
    links = linkDes
      .map(de => de.injector.get(RouterLinkStubDirective) as RouterLinkStubDirective);
  });

  it('can instantiate it', () => {
    expect(comp).not.toBeNull();
  });

  it('can get RouterLinks from template', () => {
    expect(links.length).toBe(2, 'should have 2 links');
    expect(links[0].linkParams).toBe('/employees', '1st link should go to List of Employees');
    expect(links[1].linkParams).toBe('/submitted-employees', '2nd link should go to List of Submitted Employees');
  });

  it('can click Employees link in template', () => {
    const employeesLinkDe = linkDes[0];
    const employeesLink = links[0];

    expect(employeesLink.navigatedTo).toBeNull('link should not have navigated yet');
    employeesLinkDe.triggerEventHandler('click', null);
    fixture.detectChanges();
    expect(employeesLink.navigatedTo).toBe('/employees');
  });

  it('can click Submitted Employees link in template', () => {
    const submittedEmployeesLinkDe = linkDes[1];
    const submittedEmployeesLink = links[1];

    expect(submittedEmployeesLink.navigatedTo).toBeNull('link should not have navigated yet');
    submittedEmployeesLinkDe.triggerEventHandler('click', null);
    fixture.detectChanges();
    expect(submittedEmployeesLink.navigatedTo).toBe('/submitted-employees');
  });
}