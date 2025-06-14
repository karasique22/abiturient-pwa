import React from 'react';

import { studentMenu } from '../studentMenu';
import AccountHome from '../AccountHome';

export default function Page() {
  return (
    <AccountHome
      fullName='Кашникова Полина Руслановна'
      menu={studentMenu}
    />
  );
}
