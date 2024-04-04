const { expect } = require('chai');
const { describe, it } = require('mocha');
const { userPreferencesSchema } = require('../../models/preference.model');

describe('User Preferences Schema', () => {
  it('should require username field', () => {
    const preference = new userPreferencesSchema();
    preference.validate((err) => {
      expect(err.errors.username).to.exist;
    });
  });

  it('should create createdAt and updatedAt fields', () => {
    const preference = new userPreferencesSchema();
    expect(preference.createdAt).to.exist;
    expect(preference.updatedAt).to.exist;
  });
});