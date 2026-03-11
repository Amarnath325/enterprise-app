import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import PublicLayout from '../../../Admin/components/layout/PublicLayout';


const BusinessSetup = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    businessName: '',
    businessType: '',
    industry: '',
    taxId: '',
    email: '',
    phone: '',
    website: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'USA',
    employees: '',
    annualRevenue: '',
    fiscalYearStart: '',
    fiscalYearEnd: '',
    businessStructure: '',
    bankName: '',
    accountNumber: '',
    routingNumber: '',
    businessLicense: null,
    taxDocument: null,
  });
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const businessTypes = [
    'Sole Proprietorship',
    'Partnership',
    'LLC',
    'Corporation',
    'Non-Profit',
  ];

  const industries = [
    'Technology',
    'Retail',
    'Healthcare',
    'Finance',
    'Education',
    'Manufacturing',
    'Real Estate',
    'Consulting',
    'Hospitality',
    'Other',
  ];

  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'file' ? files[0] : value,
    });
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null,
      });
    }
  };

  const validateStep = () => {
    const newErrors = {};

    if (currentStep === 1) {
      if (!formData.businessName) newErrors.businessName = 'Business name is required';
      if (!formData.businessType) newErrors.businessType = 'Business type is required';
      if (!formData.industry) newErrors.industry = 'Industry is required';
      if (!formData.taxId) newErrors.taxId = 'Tax ID is required';
    }

    if (currentStep === 2) {
      if (!formData.email) newErrors.email = 'Email is required';
      else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
      if (!formData.phone) newErrors.phone = 'Phone number is required';
      if (!formData.address) newErrors.address = 'Address is required';
      if (!formData.city) newErrors.city = 'City is required';
      if (!formData.state) newErrors.state = 'State is required';
      if (!formData.zipCode) newErrors.zipCode = 'ZIP code is required';
    }

    if (currentStep === 3) {
      if (!formData.employees) newErrors.employees = 'Number of employees is required';
      if (!formData.businessStructure) newErrors.businessStructure = 'Business structure is required';
    }

    if (currentStep === 4) {
      if (!formData.bankName) newErrors.bankName = 'Bank name is required';
      if (!formData.accountNumber) newErrors.accountNumber = 'Account number is required';
      if (!formData.routingNumber) newErrors.routingNumber = 'Routing number is required';
      if (!formData.businessLicense) newErrors.businessLicense = 'Business license is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep()) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateStep()) {
      // send to backend or just log
      try {
        const token = localStorage.getItem('token');
        const payload = new FormData();
        // map fields; backend may expect different keys
        Object.entries(formData).forEach(([k, v]) => {
          if (v !== null && v !== undefined) {
            payload.append(k, v);
          }
        });
        await axios.post('/api/admin/businesses', payload, {
          headers: { Authorization: `Bearer ${token}` },
        });
        alert('Business setup completed successfully!');
        navigate('/businesses');
      } catch (err) {
        console.error(err);
      }
    }
  };

  const renderStepIndicator = () => {
    const steps = ['Basic Info', 'Contact', 'Business Details', 'Banking & Legal'];
    return (
      <div className="step-indicator">
        {steps.map((step, index) => (
          <div
            key={index}
            className={`step ${
              currentStep === index + 1 ? 'active' : ''
            } ${index + 1 < currentStep ? 'completed' : ''}`}
          >
            <div className="step-number">{index + 1}</div>
            <div className="step-label">{step}</div>
            {index < steps.length - 1 && <div className="step-line"></div>}
          </div>
        ))}
      </div>
    );
  };

  return (
    <PublicLayout>
      <div className="business-setup-container">
        <div className="setup-header">
          <h1>Set Up Your Business</h1>
          <p>Complete the following steps to configure your business profile</p>
        </div>

        {renderStepIndicator()}

        <form onSubmit={handleSubmit} className="setup-form">
          {currentStep === 1 && (
            <div className="form-step">
              <h2>Basic Information</h2>

              <div className="form-group">
                <label htmlFor="businessName">Business Name *</label>
                <input
                  type="text"
                  id="businessName"
                  name="businessName"
                  value={formData.businessName}
                  onChange={handleInputChange}
                  className={errors.businessName ? 'error' : ''}
                  placeholder="Enter your business name"
                />
                {errors.businessName && (
                  <span className="error-message">{errors.businessName}</span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="businessType">Business Type *</label>
                <select
                  id="businessType"
                  name="businessType"
                  value={formData.businessType}
                  onChange={handleInputChange}
                  className={errors.businessType ? 'error' : ''}
                >
                  <option value="">Select business type</option>
                  {businessTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
                {errors.businessType && (
                  <span className="error-message">{errors.businessType}</span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="industry">Industry *</label>
                <select
                  id="industry"
                  name="industry"
                  value={formData.industry}
                  onChange={handleInputChange}
                  className={errors.industry ? 'error' : ''}
                >
                  <option value="">Select industry</option>
                  {industries.map((industry) => (
                    <option key={industry} value={industry}>
                      {industry}
                    </option>
                  ))}
                </select>
                {errors.industry && (
                  <span className="error-message">{errors.industry}</span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="taxId">Tax ID / EIN *</label>
                <input
                  type="text"
                  id="taxId"
                  name="taxId"
                  value={formData.taxId}
                  onChange={handleInputChange}
                  className={errors.taxId ? 'error' : ''}
                  placeholder="XX-XXXXXXX"
                />
                {errors.taxId && (
                  <span className="error-message">{errors.taxId}</span>
                )}
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="form-step">
              <h2>Contact Information</h2>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="email">Business Email *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={errors.email ? 'error' : ''}
                    placeholder="business@example.com"
                  />
                  {errors.email && (
                    <span className="error-message">{errors.email}</span>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="phone">Phone Number *</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className={errors.phone ? 'error' : ''}
                    placeholder="(555) 123-4567"
                  />
                  {errors.phone && (
                    <span className="error-message">{errors.phone}</span>
                  )}
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="website">Website (Optional)</label>
                <input
                  type="url"
                  id="website"
                  name="website"
                  value={formData.website}
                  onChange={handleInputChange}
                  placeholder="https://www.example.com"
                />
              </div>

              <div className="form-group">
                <label htmlFor="address">Street Address *</label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className={errors.address ? 'error' : ''}
                  placeholder="123 Business St"
                />
                {errors.address && (
                  <span className="error-message">{errors.address}</span>
                )}
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="city">City *</label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className={errors.city ? 'error' : ''}
                    placeholder="City"
                  />
                  {errors.city && (
                    <span className="error-message">{errors.city}</span>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="state">State *</label>
                  <input
                    type="text"
                    id="state"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    className={errors.state ? 'error' : ''}
                    placeholder="State"
                  />
                  {errors.state && (
                    <span className="error-message">{errors.state}</span>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="zipCode">ZIP Code *</label>
                  <input
                    type="text"
                    id="zipCode"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleInputChange}
                    className={errors.zipCode ? 'error' : ''}
                    placeholder="12345"
                  />
                  {errors.zipCode && (
                    <span className="error-message">{errors.zipCode}</span>
                  )}
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="country">Country</label>
                <select
                  id="country"
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                >
                  <option value="USA">United States</option>
                  <option value="Canada">Canada</option>
                  <option value="UK">United Kingdom</option>
                  <option value="Australia">Australia</option>
                </select>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="form-step">
              <h2>Business Details</h2>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="employees">Number of Employees *</label>
                  <select
                    id="employees"
                    name="employees"
                    value={formData.employees}
                    onChange={handleInputChange}
                    className={errors.employees ? 'error' : ''}
                  >
                    <option value="">Select range</option>
                    <option value="1-10">1-10</option>
                    <option value="11-50">11-50</option>
                    <option value="51-200">51-200</option>
                    <option value="201-500">201-500</option>
                    <option value="500+">500+</option>
                  </select>
                  {errors.employees && (
                    <span className="error-message">{errors.employees}</span>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="annualRevenue">
                    Annual Revenue (Optional)
                  </label>
                  <select
                    id="annualRevenue"
                    name="annualRevenue"
                    value={formData.annualRevenue}
                    onChange={handleInputChange}
                  >
                    <option value="">Select range</option>
                    <option value="<100k">Less than $100k</option>
                    <option value="100k-500k">$100k - $500k</option>
                    <option value="500k-1M">$500k - $1M</option>
                    <option value="1M-5M">$1M - $5M</option>
                    <option value="5M+">$5M+</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="businessStructure">Business Structure *</label>
                <select
                  id="businessStructure"
                  name="businessStructure"
                  value={formData.businessStructure}
                  onChange={handleInputChange}
                  className={errors.businessStructure ? 'error' : ''}
                >
                  <option value="">Select structure</option>
                  {businessTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
                {errors.businessStructure && (
                  <span className="error-message">{errors.businessStructure}</span>
                )}
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="fiscalYearStart">
                    Fiscal Year Start (Optional)
                  </label>
                  <input
                    type="month"
                    id="fiscalYearStart"
                    name="fiscalYearStart"
                    value={formData.fiscalYearStart}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="fiscalYearEnd">
                    Fiscal Year End (Optional)
                  </label>
                  <input
                    type="month"
                    id="fiscalYearEnd"
                    name="fiscalYearEnd"
                    value={formData.fiscalYearEnd}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>
          )}

          {currentStep === 4 && (
            <div className="form-step">
              <h2>Banking & Legal Documents</h2>

              <div className="form-group">
                <label htmlFor="bankName">Bank Name *</label>
                <input
                  type="text"
                  id="bankName"
                  name="bankName"
                  value={formData.bankName}
                  onChange={handleInputChange}
                  className={errors.bankName ? 'error' : ''}
                  placeholder="Enter bank name"
                />
                {errors.bankName && (
                  <span className="error-message">{errors.bankName}</span>
                )}
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="accountNumber">Account Number *</label>
                  <input
                    type="text"
                    id="accountNumber"
                    name="accountNumber"
                    value={formData.accountNumber}
                    onChange={handleInputChange}
                    className={errors.accountNumber ? 'error' : ''}
                    placeholder="Enter account number"
                  />
                  {errors.accountNumber && (
                    <span className="error-message">{errors.accountNumber}</span>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="routingNumber">Routing Number *</label>
                  <input
                    type="text"
                    id="routingNumber"
                    name="routingNumber"
                    value={formData.routingNumber}
                    onChange={handleInputChange}
                    className={errors.routingNumber ? 'error' : ''}
                    placeholder="Enter routing number"
                  />
                  {errors.routingNumber && (
                    <span className="error-message">{errors.routingNumber}</span>
                  )}
                </div>
              </div>

              <div className="form-group file-upload">
                <label htmlFor="businessLicense">Business License *</label>
                <input
                  type="file"
                  id="businessLicense"
                  name="businessLicense"
                  onChange={handleInputChange}
                  accept=".pdf,.jpg,.jpeg,.png"
                  className={errors.businessLicense ? 'error' : ''}
                />
                {errors.businessLicense && (
                  <span className="error-message">{errors.businessLicense}</span>
                )}
                <small>Accepted formats: PDF, JPG, PNG (Max size: 5MB)</small>
              </div>

              <div className="form-group file-upload">
                <label htmlFor="taxDocument">Tax Document (Optional)</label>
                <input
                  type="file"
                  id="taxDocument"
                  name="taxDocument"
                  onChange={handleInputChange}
                  accept=".pdf,.jpg,.jpeg,.png"
                />
                <small>Upload your latest tax return or other tax documents</small>
              </div>
            </div>
          )}

          <div className="form-actions">
            {currentStep > 1 && (
              <button
                type="button"
                onClick={handlePrevious}
                className="btn btn-secondary"
              >
                Previous
              </button>
            )}

            {currentStep < 4 ? (
              <button
                type="button"
                onClick={handleNext}
                className="btn btn-primary"
              >
                Next Step
              </button>
            ) : (
              <button type="submit" className="btn btn-success">
                Complete Setup
              </button>
            )}
          </div>
        </form>

        <div className="setup-sidebar">
          <div className="sidebar-section">
            <h3>Why complete your business profile?</h3>
            <ul>
              <li>✓ Access all platform features</li>
              <li>✓ Receive personalized recommendations</li>
              <li>✓ Streamline your business operations</li>
              <li>✓ Ensure compliance with regulations</li>
            </ul>
          </div>

          <div className="sidebar-section">
            <h3>Need help?</h3>
            <p>
              Contact our support team at{' '}
              <a href="mailto:support@example.com">support@example.com</a>
            </p>
            <p>
              Or call us at{' '}
              <a href="tel:+1-555-123-4567">(555) 123-4567</a>
            </p>
          </div>

          <div className="sidebar-section">
            <h3>Your progress</h3>
            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{ width: `${(currentStep / 4) * 100}%` }}
              ></div>
            </div>
            <p>Step {currentStep} of 4 completed</p>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
};

export default BusinessSetup;
