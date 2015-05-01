var setLocation = require("../src/setLocation");
var chai = require("chai");
var expect = chai.expect;
var location = "";
describe("location tests", function () {
    it("will fail to parse if 'tsconfig.json' is not in the string", function () {
        expect(setLocation("empty")).to.equal(false);
        console.log(location);
    });
    it("will successfully parse if 'tsconfig.json' is in the string", function () {
        expect(setLocation("tsconfig.json")).to.equal(true);
        console.log(location);
    });
    console.log(location);
});
