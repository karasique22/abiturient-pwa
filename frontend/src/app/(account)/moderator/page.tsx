import React from 'react';

import { moderatorMenu } from '../moderatorMenu';
import AccountHome from '../AccountHome';

export default function Page() {
  return (
    <AccountHome
      fullName='Кашникова Полина Руслановна'
      menu={moderatorMenu}
    />
  );
}
