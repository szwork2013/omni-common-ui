import { expect } from 'chai';
import { Type, validateType } from './type';

describe('Button', () => {
  describe('validateType', () => {
    it('accepts default', () => {
      expect(validateType(Type.default)).to.be.true;
    });

    it('accepts primary', () => {
      expect(validateType(Type.primary)).to.be.true;
    });

    it('accepts defaultInverse', () => {
      expect(validateType(Type.defaultInverse)).to.be.true;
    });

    it('accepts primaryInverse', () => {
      expect(validateType(Type.primaryInverse)).to.be.true;
    });

    it('throws error if invalid type is passed', () => {
      expect(() => validateType('faketype')).to.throw();
    });
  });
});
