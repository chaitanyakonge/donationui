'use client';

import React from 'react';
import { Button, Input, Select, Card } from '@/components/ui';
import { useForm, useDonationSubmit } from '@/hooks';
import { DonationRequest, PaymentMode, DonationStatus } from '@/types';
import { PAYMENT_MODES, DONATION_STATUS, FORM_VALIDATION } from '@/constants';
import { validateEmail, validatePhone, validatePAN, validateAmount } from '@/utils';

const initialValues: DonationRequest = {
  firstName: '',
  lastName: '',
  contactNumber: '',
  email: '',
  panNumber: '',
  address: '',
  amount: 0,
  paymentMode: PaymentMode.UPI,
  bankReferenceNumber: '',
  eventDescription: '',
  status: DonationStatus.PENDING,
};

const DonationForm: React.FC = () => {
  const { submitDonation, loading, error, success, reset } = useDonationSubmit();

  const validate = (values: DonationRequest) => {
    const errors: Partial<Record<keyof DonationRequest, string>> = {};

    if (!values.firstName.trim()) {
      errors.firstName = 'First name is required';
    }

    if (!values.lastName.trim()) {
      errors.lastName = 'Last name is required';
    }

    if (!values.contactNumber.trim()) {
      errors.contactNumber = 'Contact number is required';
    } else if (!validatePhone(values.contactNumber)) {
      errors.contactNumber = 'Please enter a valid 10-digit mobile number';
    }

    if (values.email && !validateEmail(values.email)) {
      errors.email = 'Please enter a valid email address';
    }

    if (values.panNumber && !validatePAN(values.panNumber)) {
      errors.panNumber = 'Please enter a valid PAN number (e.g., ABCDE1234F)';
    }

    if (!values.amount || values.amount <= 0) {
      errors.amount = 'Amount is required and must be greater than 0';
    } else if (!validateAmount(values.amount)) {
      errors.amount = `Amount must be between ₹${FORM_VALIDATION.MIN_DONATION_AMOUNT} and ₹${FORM_VALIDATION.MAX_DONATION_AMOUNT}`;
    }

    return errors;
  };

  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    reset: resetForm,
  } = useForm({
    initialValues,
    validate,
    onSubmit: async (values) => {
      const result = await submitDonation(values);
      if (result) {
        resetForm();
      }
    },
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    handleChange(name as keyof DonationRequest, value);
  };

  const handleInputBlur = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
    handleBlur(e.target.name as keyof DonationRequest);
  };

  if (success) {
    return (
      <Card title="Donation Successful!" className="max-w-2xl mx-auto">
        <div className="text-center space-y-4">
          <div className="text-green-600">
            <svg className="mx-auto h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-900">Thank you for your donation!</h3>
            <p className="mt-2 text-sm text-gray-600">
              Transaction ID: <span className="font-mono font-medium">{success.transactionId}</span>
            </p>
            <p className="text-sm text-gray-600">{success.acknowledgement.message}</p>
          </div>
          <Button onClick={() => { reset(); resetForm(); }}>
            Make Another Donation
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <Card title="Make a Donation" subtitle="Support our cause with your generous contribution" className="max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-md p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">Error</h3>
                <div className="mt-2 text-sm text-red-700">{error}</div>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="First Name"
            name="firstName"
            placeholder="Enter your first name"
            required
            value={values.firstName}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
            error={touched.firstName ? errors.firstName : undefined}
          />

          <Input
            label="Last Name"
            name="lastName"
            placeholder="Enter your last name"
            required
            value={values.lastName}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
            error={touched.lastName ? errors.lastName : undefined}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="Contact Number"
            name="contactNumber"
            type="tel"
            placeholder="Enter 10-digit mobile number"
            required
            value={values.contactNumber}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
            error={touched.contactNumber ? errors.contactNumber : undefined}
          />

          <Input
            label="Email Address"
            name="email"
            type="email"
            placeholder="Enter your email address (optional)"
            value={values.email}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
            error={touched.email ? errors.email : undefined}
          />
        </div>

        <Input
          label="PAN Number"
          name="panNumber"
          placeholder="Enter PAN number (optional)"
          value={values.panNumber}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          error={touched.panNumber ? errors.panNumber : undefined}
        />

        <Input
          label="Address"
          name="address"
          placeholder="Enter your address (optional)"
          value={values.address}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          error={touched.address ? errors.address : undefined}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="Donation Amount"
            name="amount"
            type="number"
            placeholder="Enter amount in ₹"
            required
            value={values.amount || ''}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
            error={touched.amount ? errors.amount : undefined}
          />

          <Select
            label="Payment Mode"
            name="paymentMode"
            options={PAYMENT_MODES}
            required
            value={values.paymentMode}
            onChange={handleInputChange}
            error={touched.paymentMode ? errors.paymentMode : undefined}
          />
        </div>

        <Select
          label="Payment Status"
          name="status"
          options={DONATION_STATUS}
          required
          value={values.status}
          onChange={handleInputChange}
          error={touched.status ? errors.status : undefined}
        />

        {values.paymentMode !== PaymentMode.CASH && (
          <Input
            label="Bank Reference Number"
            name="bankReferenceNumber"
            placeholder="Enter transaction/reference number (optional)"
            value={values.bankReferenceNumber}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
            error={touched.bankReferenceNumber ? errors.bankReferenceNumber : undefined}
          />
        )}

        <Input
          label="Event Description"
          name="eventDescription"
          placeholder="Enter the purpose/event for this donation (optional)"
          value={values.eventDescription}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          error={touched.eventDescription ? errors.eventDescription : undefined}
        />

        <div className="flex justify-end space-x-4">
          <Button
            type="button"
            variant="secondary"
            onClick={() => { resetForm(); reset(); }}
            disabled={loading || isSubmitting}
          >
            Reset
          </Button>
          <Button
            type="submit"
            loading={loading || isSubmitting}
            disabled={loading || isSubmitting}
          >
            Submit Donation
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default DonationForm;