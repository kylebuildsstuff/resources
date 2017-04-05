// import { createSelector } from 'reselect';

export const contactSelector = state => state.data.contact;
export const policiesSelector = state => state.data.policies;
export const formSelector = state => state.form;

export const autoPoliciesSelector = state => state.data.policies.filter(ap =>
  ap.line_of_business === 'auto'
)

export const habPoliciesSelector = state => state.data.policies.filter(ap =>
  ap.line_of_business === 'hab'
)
