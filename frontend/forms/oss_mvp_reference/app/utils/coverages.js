const coverages = {
  AB: {
    desc: 'Accident Benefits',
    help: 'Accident Benefits will provide payment if you are injured for medical payments, income replacement, and other financial assistance.',
  },
  ACB: {
    desc: 'Attendant Care Benefit',
    help: '',
  },
  ACCW: {
    desc: 'Accident Waiver',
    help: 'In the event of you being in an accident in which you are at fault, it will protect your driving record and forgive the accident.',
  },
  GLABR: {
    desc: 'Glass Breakage',
    help: '',
  },
  GLDED: {
    desc: 'Glass Deductible Endorsement',
    help: '',
  },
  PAK03: {
    desc: 'Loss of Use and Replacement Cost Coverage',
    help: 'Loss of Use: If your vehicle is in the shop due to an insured claim, you can be reimbursed up to your limit for a rental car, taxi cab, or whatever you need to get around.',
  },
  MCP: {
    desc: 'Minor Conviction Protection',
    help: 'In the event of your first Minor Conviction, this endorsement will prevent you from losing your Conviction Free discount.',
  },
  AP: {
    desc: 'All Perils',
    help: '',
  },
  SP: {
    desc: 'Specified Perils',
    help: '',
  },
  CHHMB: {
    desc: 'Caregiver, Housekeeping & Home Maintenance Benefit',
    help: '',
  },
  PAK05: {
    desc: 'Loss of Use Coverage, Replacement Cost Coverage, and Legal Liability for Damage to Non-Owned Automobile',
    help: 'Loss of Use: If your vehicle is in the shop due to an insured claim, you can be reimbursed up to your limit for a rental car, taxi cab, or whatever you need to get around. Legal Liability for Damage to Non-Owned Automobile: If you happen to rent a vehicle anywhere in Canada or the U.S., you do not need to purchase coverage for that rental vehicle, this policy covers any damage up to your limit.',
  },
  CMP: {
    desc: 'Comprehensive',
    help: 'Comprehensive covers you for such things as fire, theft, vandalism, and glass breakage.',
  },
  COL: {
    desc: 'Collision or Upset',
    help: 'Collision covers you for such things as at-fault accidents, hit and run accidents, and single vehicle accidents.',
  },
  CPP: {
    desc: 'Claims Protection Plan',
    help: 'In the event of you being in an accident in which you are at fault, it will protect your driving record and forgive the accident.',
  },
  DCB: {
    desc: 'Dependant Care Benefits',
    help: '',
  },
  DFB: {
    desc: 'Death and Funeral Benefits',
    help: '',
  },
  HL: {
    desc: 'Hospital Levy',
    help: '',
  },
  IDB: {
    desc: 'Indexation Benefit (Consumer Price Index)',
    help: '',
  },
  MEDRH: {
    desc: 'Medical and Rehabilitation Benefits',
    help: '',
  },
  PAK06: {
    desc: 'Loss of Use Coverage, and Legal Liability for Damage to Non-Owned Automobile',
    help: 'Loss of Use: If your vehicle is in the shop due to an insured claim, you can be reimbursed up to your limit for a rental car, taxi cab, or whatever you need to get around. Legal Liability for Damage to Non-Owned Automobile: If you happen to rent a vehicle anywhere in Canada or the U.S., you do not need to purchase coverage for that rental vehicle, this policy covers any damage up to your limit.',
  },
  TP: {
    desc: 'Third Party Liability',
    help: 'Liability will provide coverage in the event if a third party were to bring a judgement against you.',
  },
  TPBI: {
    desc: 'Third Party Liability - Bodily Injury',
    help: 'Liability will provide coverage in the event if a third party were to bring a judgement against you. Liability Bodily Injury will pay for the insured injuring someone else.',
  },
  TPDC: {
    desc: 'Third Party Liability - Direct Compensation',
    help: '',
  },
  TPPD: {
    desc: 'Third Party Liability - Property Damage',
    help: 'Liability will provide coverage in the event if a third party were to bring a judgement against you. Liability Property Damage will pay for damage the insured causes to someone else’s property.',
  },
  UA: {
    desc: 'Uninsured Automobile',
    help: 'Uninsured Auto will provide coverage to you if you are injured or to your vehicle if damaged by an uninsured or unidentified vehicle. If you were hit by or riding in an insured vehicle and are injured and there is no one to sue.',
  },
  WIB: {
    desc: 'Income Replacement Benefit',
    help: '',
  },
  2: {
    desc: 'Providing Coverage When Named Persons Drive Other Automobiles or Rent or Lease Other Automobiles',
    help: 'An Owner\'s policy covering a private passenger automobile may be extended to provide Liability Coverage, Accident Benefits, and Uninsured Automobile, for any person(s) named in this change form, personally driving any "Other Automobiles.',
  },
  3: {
    desc: 'Permission to Drive Government Vehicles',
    help: 'This change form is used on an Owner\'s Policy when the insured also uses a Government owned automobile and the insured is unprotected by insurance coverage.',
  },
  5: {
    desc: 'Permission to Rent or Lease',
    help: '',
  },
  8: {
    desc: 'Property Damage Reimbursement',
    help: '',
  },
  9: {
    desc: 'Marine Use Excluded',
    help: '',
  },
  16: {
    desc: 'Agreement for Suspension of Coverage',
    help: 'Cancels coverage for the use or operation of this vehicle, a newly acquired vehicle or temporary substitute until coverage is reinstated.  This vehicle will be continuously taken out of use and not operated.  In order to use this vehicle for any reason you must first speak with one of our insurance brokers to reinstate the required coverage. The coverage on your vehicle is limited to: Fire, Theft, Vandalism, Glass breakage and some accident benefits, while your vehicle is parked. Please also note that you do not have any coverage for hit and run.',
  },
  17: {
    desc: 'Reinstatement of Coverage',
    help: '',
  },
  19: {
    desc: 'Limitation of Amount Paid for Loss or Damage Coverage',
    help: '',
  },
  20: {
    desc: 'Loss of Use Coverage',
    help: 'If your vehicle is in the shop due to an insured claim, you can be reimbursed up to your limit for a rental car, taxi cab, or whatever you need to get around.',
  },
  25: {
    desc: 'Alteration',
    help: '',
  },
  26: {
    desc: 'Disappearing Deductible (All Perils of Collision)',
    help: 'This endorsement allows for a reduced deductible by 20% per year, of the original deductible around, for each consecutive claim free year.',
  },
  27: {
    desc: 'Legal Liability for Damage to Non-Owned Automobile',
    help: 'If you happen to rent a vehicle anywhere in Canada or the U.S., you do not need to purchase coverage for that rental vehicle, this policy covers any damage up to your limit.',
  },
  28: {
    desc: 'Reduction of Coverage for Named Persons',
    help: '',
  },
  30: {
    desc: 'Excluding Operation of Attached Machinery',
    help: '',
  },
  32: {
    desc: 'Motorized Recreational Vehicle',
    help: '',
  },
  DFP: {
    desc: 'Death and Funeral Income Replacement',
    help: '',
  },
  34: {
    desc: 'Injured Persons - Accident Benefits',
    help: '',
  },
  35: {
    desc: 'Emergency Service Expense',
    help: 'Provides reimbursement for towing and emergency service expenses with limits set out by your insurance company',
  },
  37: {
    desc: 'Limitation for Automobile Electronic Accessories',
    help: '',
  },
  38: {
    desc: 'Agreed Limit for Automobile Electronic Accessories',
    help: 'This change form limits theft coverage for electronic accessories, other than factory installed, to the actual cash value up to $1,500 in total, unless the equipment is listed, in which case the amount paid will be the limit shown or the actual cash value, whichever is the lesser.',
  },
  40: {
    desc: 'Fire and Theft Deductible',
    help: '',
  },
  43: {
    desc: 'Limited Waiver of Depreciation',
    help: 'In case you ever get into an accident which causes the full loss of your vehicle within the first few months you own it, you will be reimbursed for the purchase price, not the depreciated value of the vehicle.',
  },
  44: {
    desc: 'Family Protection',
    help: 'Covers you if you are hit and injured by an underinsured motorist. If you sue the negligent third party and they have insufficient insurance to cover your judgment, the OPCF 44R will top up your judgment to the limit of liability you carry on your policy.',
  },
  39: {
    desc: 'Accident Waiver',
    help: '',
  },
  47: {
    desc: 'Agreement Not to Rely On SABS Priority of Payment',
    help: '',
  },
  48: {
    desc: 'Optional Supplementary Benefits',
    help: '',
  },
  '13C': {
    desc: 'Restricting Glass Coverage',
    help: 'This endorsement will delete glass & windshield damage unless it is covered by a specific peril.',
  },
  '13D': {
    desc: 'Limited Glass Coverage',
    help: 'This endorsement will restrict glass coverage to Specified Perils plus vandalism to all windows except the front.',
  },
  '13H': {
    desc: 'Deletion Of Hail Coverage',
    help: 'This will remove hail damage coverage for vehicles that have existing hail damage.',
  },
  PAK13: {
    desc: 'Loss of Use Coverage, and Legal Liability for Damage to Non-Owned Automobile',
    help: 'Loss of Use: If your vehicle is in the shop due to an insured claim, you can be reimbursed up to your limit for a rental car, taxi cab, or whatever you need to get around. Legal Liability for Damage to Non-Owned Automobile: If you happen to rent a vehicle anywhere in Canada or the U.S., you do not need to purchase coverage for that rental vehicle, this policy covers any damage up to your limit.',
  },
  '19A': {
    desc: 'Agreed Valued of Automobile(s)',
    help: '',
  },
  '20A': {
    desc: 'Loss of Use Coverage',
    help: 'If your vehicle is in the shop due to an insured claim, you can be reimbursed up to your limit for a rental car, taxi cab, or whatever you need to get around.',
  },
  '23A': {
    desc: 'Mortgage Endorsement',
    help: '',
  },
  '44R': {
    desc: 'Family Protection',
    help: 'Covers you if you are hit and injured by an underinsured motorist. If you sue the negligent third party and they have insufficient insurance to cover your judgment, the OPCF 44R will top up your judgment to the limit of liability you carry on your policy.',
  },
  '28A': {
    desc: 'Excluded Driver',
    help: 'The driver specified on the form will have no insurance coverage under this policy, except for very limited Accident Benefits, if they drive the described automobile.',
  },
  '43A': {
    desc: 'Limited Waiver of Depreciation',
    help: 'In case you ever get into an accident which causes the full loss of your vehicle within the first few months you own it, you will be reimbursed for the purchase price, not the depreciated value of the vehicle.',
  },
  '43D': {
    desc: 'Limited Waiver of Depreciation',
    help: 'In case you ever get into an accident which causes the full loss of your vehicle within the first few months you own it, you will be reimbursed for the purchase price, not the depreciated value of the vehicle.',
  },
  '43E': {
    desc: 'Limited Waiver of Depreciation',
    help: 'In case you ever get into an accident which causes the full loss of your vehicle within the first few months you own it, you will be reimbursed for the purchase price, not the depreciated value of the vehicle.',
  },
  430: {
    desc: 'Replacement Cost',
    help: 'In case you ever get into an accident which causes the full loss of your vehicle within the first few months you own it, you will be reimbursed for the purchase price, not the depreciated value of the vehicle.',
  },
  '43R': {
    desc: 'Limited Waiver of Depreciation',
    help: 'In case you ever get into an accident which causes the full loss of your vehicle within the first few months you own it, you will be reimbursed for the purchase price, not the depreciated value of the vehicle.',
  },
  '43RL': {
    desc: 'Limited Waiver of Depreciation',
    help: 'In case you ever get into an accident which causes the full loss of your vehicle within the first few months you own it, you will be reimbursed for the purchase price, not the depreciated value of the vehicle.',
  },
  '5L': {
    desc: 'Permission to Rent or Lease',
    help: '',
  },
  PAK08: {
    desc: 'Loss of Use Coverage, Legal Liability for Damage to Non-Owned Automobile, Replacement Cost, and Roadside Assistance',
    help: 'Loss of Use: If your vehicle is in the shop due to an insured claim, you can be reimbursed up to your limit for a rental car, taxi cab, or whatever you need to get around. Legal Liability for Damage to Non-Owned Automobile: If you happen to rent a vehicle anywhere in Canada or the U.S., you do not need to purchase coverage for that rental vehicle, this policy covers any damage up to your limit.',
  },
  '6A': {
    desc: 'Permission to Carry Passengers for Compensation',
    help: 'When an insured uses an automobile to carry fellow employees to and from work for compensation. A limited exposure is acceptable as in the case of a private passenger automobile. Risks involving larger vans, mini-buses, etc., seating as many as nine to twelve passengers are not written. Volunteer workers, social workers and similar activities that involve the occasional transportation of “clients” do not need OPCF 6A, if they are simply provided with a mileage allowance or other minor form of remuneration.',
  },
  '8A': {
    desc: 'Property Damage Reimbursement',
    help: '',
  },
};

export default coverages;
