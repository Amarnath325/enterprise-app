import React from 'react';
import { Helmet } from 'react-helmet';

const Head = ({ title = 'FixHR', children }) => {
  return (
    <Helmet>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta
        name="description"
        content="Fix HR: Advanced time and expense tracking solution for modern businesses. Streamline attendance, leave management, gate pass requests, and TA/DA claims with detailed tracking, flexible methods, and automated reports for improved accuracy and efficiency."
      />
      <meta
        name="keywords"
        content="Fix HR, time tracking, attendance management, leave management, gate pass, TA/DA integration, automated reports, payroll processing, workforce management, HR software, business efficiency, real-time tracking, compliance, expense tracking"
      />
      <meta name="author" content="Fixing Dots" />
      <title>{`FixHR | ${title}`}</title>
      {children}
    </Helmet>
  );
};

export default Head;