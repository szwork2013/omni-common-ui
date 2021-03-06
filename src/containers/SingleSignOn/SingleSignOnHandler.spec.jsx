import React from 'react';
import Sinon from 'sinon';
import { expect } from 'chai';
import { mount } from 'enzyme';
import userManager from './userManager';
import _Config from 'domain/Config';

describe('<SingleSignOnHandler />', () => {
  let SingleSignOnHandler;
  let props;
  let signinRedirect;

  // eslint-disable-next-line import/no-webpack-loader-syntax, global-require
  const requireComponent = (Config) => require('inject?domain/Config&./userManager!./SingleSignOnHandler')({
    'domain/Config': _Config.merge(Config),
    './userManager': userManager,
  }).SingleSignOnHandler;

  const mountComponent = () => mount(<SingleSignOnHandler {...props}>
    <div id="inner" />
  </SingleSignOnHandler>);

  beforeEach(() => {
    signinRedirect = Sinon.stub(userManager, 'signinRedirectWithValidation');
    signinRedirect.returns();
    SingleSignOnHandler = requireComponent({ featureLogin: false });
    props = {
      fetchPrivilegesIfNeeded: Sinon.spy(),
      user: {
        expired: false,
        profile: {
          sub: '123',
        },
      },
    };
  });

  afterEach(() => {
    signinRedirect.restore();
  });

  context('when featureLogin is false', () => {
    it('does not call userManager.signinRedirect() even if the user is not valid', () => {
      props.user = null;
      mountComponent();
      expect(signinRedirect.called).to.be.false;
    });

    it('does not call userManager.signinRedirect() even if the user is expired', () => {
      props.user.expired = true;
      mountComponent();
      expect(signinRedirect.called).to.be.false;
    });

    it('does not call fetchPrivilegesIfNeeded even if the user is fine', () => {
      mountComponent();
      expect(props.fetchPrivilegesIfNeeded.called).to.be.false;
    });

    it('renders its children if the user is fine', () => {
      const wrapper = mountComponent();
      expect(wrapper).to.have.descendants('#inner');
    });

    it('renders its children even if the user is not valid', () => {
      props.user = null;
      const wrapper = mountComponent();
      expect(wrapper).to.have.descendants('#inner');
    });
  });

  context('when featureLogin is true', () => {
    beforeEach(() => {
      SingleSignOnHandler = requireComponent({ featureLogin: true });
    });

    it('calls userManager.signinRedirect() if the user is not valid', () => {
      props.user = null;
      mountComponent();
      expect(signinRedirect.called).to.be.true;
    });

    it('calls userManager.signinRedirect() if the user is expired', () => {
      props.user.expired = true;
      mountComponent();
      expect(signinRedirect.called).to.be.true;
    });

    it('calls fetchPrivilegesIfNeeded if the user is fine', () => {
      mountComponent();
      expect(props.fetchPrivilegesIfNeeded.called).to.be.true;
    });

    it('renders its children if the user is fine', () => {
      const wrapper = mountComponent();
      expect(wrapper).to.have.descendants('#inner');
    });

    it('does not render its children if the user is not valid', () => {
      props.user = null;
      const wrapper = mountComponent();
      expect(wrapper).to.not.have.descendants('#inner');
    });
  });
});
