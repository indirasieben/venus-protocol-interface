/** @jsxImportSource @emotion/react */
import React from 'react';
import { useTranslation } from 'translation';
import { truncateAddress } from 'utilities';

import { useAuth } from 'context/AuthContext';

import { ButtonProps, SecondaryButton } from '../../Button';

export interface ConnectButtonProps extends ButtonProps {
  accountAddress?: string;
}

export const ConnectButtonUi: React.FC<ConnectButtonProps> = ({
  accountAddress,
  ...otherProps
}) => {
  const { t } = useTranslation();

  return (
    <SecondaryButton {...otherProps}>
      {!accountAddress ? t('connectButton.title') : truncateAddress(accountAddress)}
    </SecondaryButton>
  );
};

export const ConnectButton: React.FC<ButtonProps> = props => {
  const { accountAddress, openAuthModal } = useAuth();
  return (
    <ConnectButtonUi
      accountAddress={accountAddress}
      onClick={openAuthModal}
      variant={accountAddress ? 'secondary' : 'primary'}
      {...props}
    />
  );
};

export default ConnectButton;
