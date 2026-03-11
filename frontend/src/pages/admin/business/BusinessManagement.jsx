import React from 'react';

import BusinessList from '../../../Admin/components/admin/business/BusinessList';
import MasterLayout from '../../../Admin/components/admin/layout/MasterLayout';

const BusinessManagement = () => {
  return (
    <MasterLayout title="Business Management" version="v1.0.0">
      <BusinessList />
    </MasterLayout>
  );
};

export default BusinessManagement;
