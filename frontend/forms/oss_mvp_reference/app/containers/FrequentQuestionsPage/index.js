/*
 *
 * FrequentQuestionsPage
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { selectGlobalJS } from '../App/selectors';
import PageHeader from '../../components/PageHeader';
import AccordionItem from '../../components/AccordionItem';
import LoginSignupBlock from '../../components/LoginSignupBlock';

import pages from '../../styles/pages.css';

export class FrequentQuestionsPage extends React.Component { // eslint-disable-line
  render() {
    return (
      <div className={pages.frequentQuestionsPage}>
        <Helmet title="QuickServe - Frequently Asked Questions" />
        <PageHeader mainTitle="Help" />
        <p>Do you have questions about:</p>
        <div className="clearfix">
          <div className={pages.faqBlock}>
            <AccordionItem
              question="Changing your address"
              answer="
                <h4>Why do we ask if the vehicle use has changed?</h4>
                <p>Sometimes vehicle use can change. For example, if you retire or go on maternity leave, you’ll no longer be commuting on a daily basis. A change like this can qualify you for additional savings.</p>
                <h4>Why do we ask about other drivers?</h4>
                <p>We want to make sure your information is up-to-date. For example, if other drivers have access to your car, they may need to be on your policy for legal reasons as well as for your protection. New drivers can build their own insurance experience – an important factor in insurability – by being listed as a secondary driver.<p>
                <h4>Why buy Tenants insurance?</h4>
                <p>Tenants insurance protects your personal belongings. Your landlords policy only covers the building. If the contents of your house were to burn in a fire, you would not be protected unless you purchased tenants insurance. A tenants policy also provides you with legal liability coverage anywhere in the world as a result of your unintentional actions. If necessary, your policy will even pay for your legal defence.</p><p>When you purchase both an auto and a tenants policy you become eligible for a multi-line discount. The savings to your auto policy as a result of this discount often offsets the cost of the tenants policy.</p>
                <h4>Why buy Condo insurance?</h4>
                <p>If you own a condominium, you have unique insurance needs. The condo association has its own insurance which covers the condominium building, commonly-owned property, and liability for the association. However, this insurance does not protect you against theft of personal property, damage to your unit, or injury to someone visiting your unit. This is why condo insurance is so important. Condo insurance also protects any upgrades and renovations to your unit, as well as providing coverage for unexpected repairs you may face that are not covered by condo association funds.</p><p>When you purchase both an auto and a condo policy you become eligible for a multi-line discount.</p>
                <h4>Why buy Homeowners insurance?</h4>
                <p>A homeowners policy protects your biggest investment – your home – as well as your personal property. It provides liability coverage anywhere in the world as a result of your unintentional actions and will pay for your legal defence if necessary. Mortgage companies also require you to have homeowners insurance.</p><p>When you purchase both an auto and a homeowners policy you become eligible for a multi-line discount which will discount the premium of both policies.</p>"
            />
          </div>
          <div className={pages.faqBlock}>
            <AccordionItem
              question="Adding a vehicle"
              answer="
                <h4>Why do we ask about other drivers?</h4>
                <p>We want to make sure your information is up-to-date. For example, if other drivers have access to your car, they may need to be on your policy for legal reasons as well as for your protection. New drivers can build their own insurance experience – an important factor in insurability – by being listed as a secondary driver.</p>
                <h4>Why do we ask about customizations or modifications?</h4>
                <p>We want to make sure you’re properly covered and that you receive the maximum payout available in the event of a claim. If we are unaware of customizations (i.e. an aftermarket paint job) or modifications (i.e. a wheelchair lift), your policy would only reflect a standard model, and in the event of a loss, the claim payout would not reflect the cost of the upgrades.<p>
                <h4>Why do we ask about pre-existing damage?</h4>
                <p>Our records should be updated with this information to avoid any disputes during the claims process. If pre-existing damage is not disclosed, it can slow down the process while insurance adjusters investigate how much damage was sustained in the loss and how much existed prior to the accident and may result in your claim being denied.</p>"
            />
          </div>
          <div className={pages.faqBlock}>
            <AccordionItem
              question="Replacing a vehicle"
              answer="
                <h4>Why do we ask about other drivers?</h4>
                <p>We want to make sure your information is up-to-date. For example, if other drivers have access to your car, they may need to be on your policy for legal reasons as well as for your protection. New drivers can build their own insurance experience – an important factor in insurability – by being listed as a secondary driver.</p>
                <h4>Why do we ask about customizations or modifications?</h4>
                <p>We want to make sure you’re properly covered and that you receive the maximum payout available in the event of a claim. If we are unaware of customizations (i.e. an aftermarket paint job) or modifications (i.e. a wheelchair lift), your policy would only reflect a standard model, and in the event of a loss, the claim payout would not reflect the cost of the upgrades.<p>
                <h4>Why do we ask about pre-existing damage?</h4>
                <p>Our records should be updated with this information to avoid any disputes during the claims process. If pre-existing damage is not disclosed, it can slow down the process while insurance adjusters investigate how much damage was sustained in the loss and how much existed prior to the accident and may result in your claim being denied.</p>"
            />
          </div>
          <div className={pages.faqBlock}>
            <AccordionItem
              question="Printing your pink slip"
              answer="
                <h4>Mandatory Automobile Coverages:</h4>
                <strong>Liability</strong> – This protects you if you’re sued as a result of your use, operation or ownership of a car.<br />
                <strong>Accident Benefits</strong> – These protect you and your family in the event of injury resulting from a car accident. They include medical rehabilitation, income replacement benefits, and more.<br />
                <strong>Uninsured Motorist</strong> – This covers you against vehicles or drivers that are not insured.
                <h4>Optional Automobile Coverages:</h4>
                <strong>Collision</strong> - This covers you against impact with another vehicle, object, or road surface.  Policy deductible may apply.<br />
                <strong>Comprehensive</strong> – This covers you against theft, fire, vandalism, glass breakage, falling objects, and more.  Policy deductible may apply.<br />
                <strong>All Perils</strong> – Collision + comprehensive + protection against theft from a person in the household or an employee.  Policy deductible may apply.<br />
                <strong>Loss of Use</strong> – Provides you with access to a rental vehicle while your car is being repaired due to a claim.</p><p>IMPORTANT - PLEASE READ: As of June 1, 2016, the Ontario government has introduced changes to auto insurance policies in an effort to make premiums more afforadable and allow you more flexibility when it comes to your coverage. As a result, we encourage everyone to carefully read their current and future policies to ensure the coverage meets their needs in the case of an accident.</p>"
            />
          </div>
          { !this.props.global.authed && <LoginSignupBlock /> }
        </div>
      </div>
    );
  }
}

FrequentQuestionsPage.propTypes = {
  global: React.PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  global: selectGlobalJS(),
});

export default connect(mapStateToProps)(FrequentQuestionsPage);
