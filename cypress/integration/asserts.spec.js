/// <reference types="cypress" />

it("Equality", ()=>{
    const a = 1;

    expect(a).equal(1);
    expect(a, "Deveria ser 1").to.be.equal(1);
    expect(a).to.be.equal(1);
    expect(a).not.to.be.equal(2);
})

it("Truthy", ()=>{
    const a = true;
    const b= null;
    let c;

    expect(a).equal(true);
    expect(b, "Deveria ser null").not.to.be.true;
    expect(b).to.be.null;
    expect(a).to.be.true;
    expect(a).not.to.be.null;
    expect(c).to.be.undefined;
})