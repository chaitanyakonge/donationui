const IS_PROD = process.env.NEXT_PUBLIC_IS_PROD === 'true';

const API_URLS = {
  BETA: 'https://xkijq2set9.execute-api.ap-south-1.amazonaws.com',
  PROD: '', // Will be set later
};

export const API_BASE_URL = IS_PROD ? API_URLS.PROD : API_URLS.BETA;

export const API_ENDPOINTS = {
  DONATIONS: {
    PROCESS_UNIFIED: '/api/donations/processunifieddonation',
    GET_BY_ID: '/api/donations/getdonationbyid',
    GET_HISTORY: '/api/donations/getdonationhistoryfordonor',
    GET_IN_RANGE: '/api/donations/getdonationsinrange',
    GET_BY_PAYMENT_MODE: '/api/donations/getdonationsbypaymentmode',
    CALCULATE_TOTAL: '/api/donations/calculatetotaldonationsinrange',
    UPDATE_STATUS: '/api/donations/updatetransactionstatus',
    DELETE: '/api/donations/softdeletedonation',
  },
  DONORS: {
    GET_ALL: '/api/donors/getalldonors',
    SEARCH: '/api/donors/searchdonors',
    GET_BY_ID: '/api/donors/getdonorbyid',
    DELETE: '/api/donors/softdeletedonor',
  },
} as const;

export const PAYMENT_MODES = [
  { value: 'CASH', label: 'Cash' },
  { value: 'CHEQUE', label: 'Cheque' },
  { value: 'UPI', label: 'UPI' },
  { value: 'NET_BANKING', label: 'Net Banking' },
  { value: 'NEFT', label: 'NEFT' },
  { value: 'RTGS', label: 'RTGS' },
  { value: 'CARD', label: 'Card' },
  { value: 'OTHER', label: 'Other' },
];

export const DONATION_STATUS = [
  { value: 'SUCCESS', label: 'Success', color: 'green' },
  { value: 'PENDING', label: 'Pending', color: 'yellow' },
  { value: 'FAILED', label: 'Failed', color: 'red' },
];

export const FORM_VALIDATION = {
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE_REGEX: /^[6-9]\d{9}$/,
  PAN_REGEX: /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/,
  MIN_DONATION_AMOUNT: 1,
  MAX_DONATION_AMOUNT: 1000000,
} as const;

export const UI_CONSTANTS = {
  ITEMS_PER_PAGE: 10,
  NOTIFICATION_DURATION: 5000,
  DEBOUNCE_DELAY: 300,
} as const;
