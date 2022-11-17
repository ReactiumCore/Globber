import globber from "../index.js";
import { assert } from 'chai';

describe("@atomic-reactor/globber", () => {
  it("Async", (done) => {
    globber("**/*.js", { gitignore: true }).then((files) => {
      assert.notEqual(files.length, 0);
      done();
    });
  });

  it("Sync", (done) => {
    const files = globber.sync("**/*.js", { gitignore: true });
    assert.notEqual(files.length, 0);
    done();
  });
});
