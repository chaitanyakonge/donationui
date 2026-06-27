export interface Donor {
  id?: string;
  firstName: string;
  lastName: string;
  contactNumber: string;
  email: string;
  panNumber: string;
  address: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Donation {
  id?: string;
  donorId?: string;
  donor?: Donor;
  amount: number;
  paymentMode: PaymentMode;
  bankReferenceNumber?: string;
  eventDescription: string;
  transactionId?: string;
  status: DonationStatus;
  createdAt?: string;
  updatedAt?: string;
}

export enum PaymentMode {
  CASH = 'CASH',
  CHEQUE = 'CHEQUE',
  UPI = 'UPI',
  NET_BANKING = 'NET_BANKING',
  NEFT = 'NEFT',
  RTGS = 'RTGS',
  CARD = 'CARD',
  OTHER = 'OTHER'
}

export enum DonationStatus {
  SUCCESS = 'SUCCESS',
  PENDING = 'PENDING',
  FAILED = 'FAILED',
}

export interface DonationRequest {
  firstName: string;
  lastName: string;
  contactNumber: string;
  email: string;
  panNumber: string;
  address: string;
  amount: number;
  paymentMode: PaymentMode;
  bankReferenceNumber?: string;
  eventDescription: string;
}

export interface DonationResponse {
  transactionId: string;
  acknowledgement: {
    success: boolean;
    message: string;
  };
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}