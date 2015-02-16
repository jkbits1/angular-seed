'use strict';

//"C:\Program Files\nodejs\node.exe" node_modules\protractor\lib\cli.js C:\Users\Jon\Documents\GitHub\episodesClient\e2e-tests\protractor.conf.js

/* https://github.com/angular/protractor/blob/master/docs/toc.md */

describe('my app', function() {

  browser.get('index.html');

  it('should automatically redirect to /view1 when location hash/fragment is empty', function() {
    expect(browser.getLocationAbsUrl()).toMatch("/view1");
  });


  describe('view1', function() {

    beforeEach(function() {
      browser.get('index.html#/view1');
    });


    //it('should render view1 when user navigates to /view1', function() {
    //  expect(element.all(by.css('[ng-view] p')).first().getText()).
    //    toMatch(/partial for view 1/);
    //});

    //it('should have an id field for the first file item', function() {
    //  expect(element.all(by.css('[data-index-num] p')).first().getText()).
    //    toMatch(/one/);
    //});

  });


  describe('view2', function() {

    beforeEach(function() {
      browser.get('index.html#/view2');
    });

    //it('should render view2 when user navigates to /view2', function() {
    //  expect(element.all(by.css('[ng-view] p')).first().getText()).
    //    toMatch(/partial for view 2/);
    //});
  });

  describe('choose program view', function () {

    beforeEach(function() {
      browser.get('index.html#/chooseProgramme');
    });

    it('should display title', function () {
      expect(element.all(by.css('h1')).first().getText()).toMatch(/Episode Guide - Choose Programme/);
    });

    describe('choose program behaviour', function () {

      beforeEach(function () {
        element(by.cssContainingText('option', 'Utopia')).click();
      });

      it('should display name of selected programme', function () {
        expect(element.all(by.css('div.row div.ng-binding')).first().getText()).toMatch(/Utopia/);

        element(by.cssContainingText('option', 'Stargate Atlantis')).click();
        expect(element.all(by.css('div.row div.ng-binding')).first().getText()).toMatch(/Stargate Atlantis/);
      });

      it('should navigate to selected programme on button click', function () {
        var btn = element(by.className('btn')).click();

        expect(element.all(by.css('h1')).first().getText()).toMatch(/Episode Guide - List of Broadcasts/);
        expect(element(by.tagName('h3')).getText()).toMatch(/Utopia/);
      });
    });

    describe('list of broadcasts view', function () {

      beforeEach(function () {
        browser.get('index.html#/chooseProgramme');
        element(by.cssContainingText('option', 'Utopia')).click();
        var btn = element(by.className('btn')).click();
      });

      it('should show correct heading', function () {
        expect(element.all(by.css('h1')).first().getText()).toMatch(/Episode Guide - List of Broadcasts/);
      });

      describe('programme info', function () {

        it('should show correct programme title', function () {
          expect(element(by.tagName('h3')).getText()).toMatch(/Utopia/);
        });
      });

      describe('row details', function () {
        var dateInfoRows = undefined;

        beforeEach(function () {
          dateInfoRows =
            element.all(by.repeater('dateInfo in fileDates'));
        });

        it('should display correct number of episodes', function () {
          expect(dateInfoRows.count()).toEqual(6);
        });

        it('should display correct date info', function () {

          //browser.pause();
          //browser.debugger();

          expect(dateInfoRows.get(0).getText()).toMatch(/2014  Jul 14/);
          expect(dateInfoRows.get(1).getText()).toMatch(/15/);
          expect(dateInfoRows.get(2).getText()).toMatch(/22/);
          expect(dateInfoRows.get(3).getText()).toMatch(/29/);
          expect(dateInfoRows.get(4).getText()).toMatch(/2014  Aug 05/);
          expect(dateInfoRows.get(5).getText()).toMatch(/12/);
        });
      });
    });
  });
});
