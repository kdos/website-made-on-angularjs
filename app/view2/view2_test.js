'use strict';

describe('myApp.view2 module', function() {

	it("should behave...", function() {
		expect(true).toBe(true);
	});
	it("should inject dependences", inject(function($controller) {
			expect($controller).toBeDefined();
	}));
});