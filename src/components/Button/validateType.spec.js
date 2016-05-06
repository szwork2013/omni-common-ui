import { expect } from 'chai';
import { Type } from './';
import { validateType } from './type';

describe('Button', () => {
  describe('validateType', () => {
    it('accepts default', () => {
      expect(validateType(Type.default)).to.be.true;
    });

    it('accepts danger', () => {
      expect(validateType(Type.danger)).to.be.true;
    });

    it('throws error if invalid type is passed', () => {
      expect(() => validateType("faketype")).to.throw();
    });
  });
});