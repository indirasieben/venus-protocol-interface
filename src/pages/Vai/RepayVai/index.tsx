/** @jsxImportSource @emotion/react */
import BigNumber from 'bignumber.js';
import {
  ApproveTokenSteps,
  ApproveTokenStepsProps,
  ConnectWallet,
  Delimiter,
  FormikSubmitButton,
  FormikTokenTextField,
  LabeledInlineContent,
  NoticeWarning,
  SpendingLimit,
  Spinner,
} from 'components';
import { ContractReceipt } from 'ethers';
import React, { useMemo } from 'react';
import { useTranslation } from 'translation';
import { convertTokensToWei, convertWeiToTokens, getContractAddress } from 'utilities';

import {
  useGetBalanceOf,
  useGetMintedVai,
  useGetVaiRepayAmountWithInterests,
  useRepayVai,
} from 'clients/api';
import { DEFAULT_REFETCH_INTERVAL_MS } from 'constants/defaultRefetchInterval';
import MAX_UINT256 from 'constants/maxUint256';
import { TOKENS } from 'constants/tokens';
import { AmountForm, AmountFormProps } from 'containers/AmountForm';
import { useAuth } from 'context/AuthContext';
import useConvertWeiToReadableTokenString from 'hooks/useConvertWeiToReadableTokenString';
import useHandleTransactionMutation from 'hooks/useHandleTransactionMutation';
import useTokenApproval from 'hooks/useTokenApproval';

import { useStyles } from '../styles';
import TEST_IDS from '../testIds';
import RepayFee from './RepayFee';

const VAI_CONTROLLER_ADDRESS = getContractAddress('vaiController');

export interface IRepayVaiUiProps {
  disabled: boolean;
  isInitialLoading: boolean;
  isSubmitting: boolean;
  repayVai: (amountWei: BigNumber) => Promise<ContractReceipt | undefined>;
  isVaiApproved: ApproveTokenStepsProps['isTokenApproved'];
  approveVai: ApproveTokenStepsProps['approveToken'];
  isApproveVaiLoading: ApproveTokenStepsProps['isApproveTokenLoading'];
  isVaiApprovalStatusLoading: ApproveTokenStepsProps['isWalletSpendingLimitLoading'];
  isRevokeVaiWalletSpendingLimitLoading: boolean;
  revokeVaiWalletSpendingLimit: () => Promise<unknown>;
  vaiWalletSpendingLimitTokens?: BigNumber;
  userBalanceWei?: BigNumber;
  repayBalanceWei?: BigNumber;
  userMintedWei?: BigNumber;
}

const isPayingFullRepayBalance = (
  amount: string,
  repayBalanceWei: BigNumber | undefined,
): boolean => {
  if (amount && repayBalanceWei) {
    const amountWei = convertTokensToWei({ value: new BigNumber(amount), token: TOKENS.vai });
    return amountWei.isEqualTo(repayBalanceWei);
  }

  return false;
};

export const RepayVaiUi: React.FC<IRepayVaiUiProps> = ({
  disabled,
  userBalanceWei,
  repayBalanceWei,
  userMintedWei,
  isVaiApproved,
  approveVai,
  isApproveVaiLoading,
  isVaiApprovalStatusLoading,
  isInitialLoading,
  isSubmitting,
  isRevokeVaiWalletSpendingLimitLoading,
  revokeVaiWalletSpendingLimit,
  vaiWalletSpendingLimitTokens,
  repayVai,
}) => {
  const styles = useStyles();
  const { t, Trans } = useTranslation();

  const handleTransactionMutation = useHandleTransactionMutation();

  const limitTokens = React.useMemo(() => {
    const limitWei =
      userBalanceWei && userMintedWei
        ? BigNumber.minimum(userBalanceWei, userMintedWei)
        : new BigNumber(0);

    let tmpLimitTokens = convertWeiToTokens({ valueWei: limitWei, token: TOKENS.vai });

    if (isVaiApproved && vaiWalletSpendingLimitTokens) {
      tmpLimitTokens = BigNumber.minimum(tmpLimitTokens, vaiWalletSpendingLimitTokens);
    }

    return tmpLimitTokens.toFixed();
  }, [userBalanceWei, userMintedWei, vaiWalletSpendingLimitTokens, isVaiApproved]);

  // Convert repay balance (minted + interests) into VAI
  const readableRepayableVai = useConvertWeiToReadableTokenString({
    valueWei: repayBalanceWei,
    token: TOKENS.vai,
  });

  const readableWalletBalance = useConvertWeiToReadableTokenString({
    valueWei: userBalanceWei,
    token: TOKENS.vai,
  });

  const walletBalanceTokens = useMemo(
    () => userBalanceWei && convertTokensToWei({ value: userBalanceWei, token: TOKENS.vai }),
    [userBalanceWei],
  );

  const hasRepayableVai = userMintedWei?.isGreaterThan(0) || false;

  const onSubmit: AmountFormProps['onSubmit'] = async amountTokens => {
    const amountWei = convertTokensToWei({
      value: new BigNumber(amountTokens),
      token: TOKENS.vai,
    });

    return handleTransactionMutation({
      mutate: () => repayVai(amountWei),
      successTransactionModalProps: contractReceipt => ({
        title: t('vai.repayVai.successfulTransactionModal.title'),
        content: t('vai.repayVai.successfulTransactionModal.message'),
        amount: {
          valueWei: amountWei,
          token: TOKENS.vai,
        },
        transactionHash: contractReceipt.transactionHash,
      }),
    });
  };

  return (
    <ConnectWallet message={t('vai.repayVai.connectWallet')}>
      {isInitialLoading ? (
        <Spinner />
      ) : (
        <AmountForm onSubmit={onSubmit}>
          {({ values, isValid, dirty, setValues }) => (
            <>
              <FormikTokenTextField
                name="amount"
                css={styles.getRow({ isLast: true })}
                token={TOKENS.vai}
                max={limitTokens}
                disabled={disabled || isSubmitting || !hasRepayableVai}
                rightMaxButton={{
                  label: t('vai.repayVai.rightMaxButtonLabel'),
                  onClick: () =>
                    setValues(currentValues => ({ ...currentValues, amount: limitTokens })),
                }}
                data-testid={TEST_IDS.repayTextField}
              />

              <div css={styles.getRow({ isLast: true })}>
                <LabeledInlineContent
                  css={styles.getRow({ isLast: false })}
                  label={t('vai.repayVai.walletBalance')}
                >
                  {readableWalletBalance}
                </LabeledInlineContent>

                <SpendingLimit
                  token={TOKENS.vai}
                  walletBalanceTokens={walletBalanceTokens}
                  walletSpendingLimitTokens={vaiWalletSpendingLimitTokens}
                  onRevoke={revokeVaiWalletSpendingLimit}
                  isRevokeLoading={isRevokeVaiWalletSpendingLimitLoading}
                  data-testid={TEST_IDS.spendingLimit}
                />
              </div>

              <Delimiter css={styles.getRow({ isLast: true })} />

              <LabeledInlineContent
                css={styles.getRow({ isLast: false })}
                iconSrc={TOKENS.vai}
                label={t('vai.repayVai.repayVaiBalance')}
                tooltip={t('vai.repayVai.repayVaiBalanceTooltip')}
              >
                {readableRepayableVai}
              </LabeledInlineContent>

              <RepayFee repayAmountTokens={values.amount} />

              {isPayingFullRepayBalance(values.amount, repayBalanceWei) && (
                <NoticeWarning
                  css={styles.noticeWarning}
                  description={<Trans i18nKey="vai.repayVai.fullRepayWarning" />}
                />
              )}

              <ApproveTokenSteps
                token={TOKENS.vai}
                hideTokenEnablingStep={!isValid || !dirty}
                isTokenApproved={isVaiApproved}
                approveToken={approveVai}
                isApproveTokenLoading={isApproveVaiLoading}
                isWalletSpendingLimitLoading={isVaiApprovalStatusLoading}
              >
                <FormikSubmitButton
                  loading={isSubmitting}
                  disabled={
                    disabled ||
                    !dirty ||
                    isVaiApprovalStatusLoading ||
                    isApproveVaiLoading ||
                    !isVaiApproved ||
                    isRevokeVaiWalletSpendingLimitLoading
                  }
                  enabledLabel={t('vai.repayVai.submitButtonLabel')}
                  disabledLabel={t('vai.repayVai.submitButtonDisabledLabel')}
                  fullWidth
                />
              </ApproveTokenSteps>
            </>
          )}
        </AmountForm>
      )}
    </ConnectWallet>
  );
};

const RepayVai: React.FC = () => {
  const { accountAddress } = useAuth();
  const { data: mintedVaiData, isLoading: isGetMintedVaiLoading } = useGetMintedVai(
    {
      accountAddress,
    },
    {
      enabled: !!accountAddress,
    },
  );

  const { data: repayAmountWithInterests, isLoading: isGetVaiRepayAmountWithInterests } =
    useGetVaiRepayAmountWithInterests(
      {
        accountAddress,
      },
      {
        enabled: !!accountAddress,
      },
    );

  const { data: userVaiBalanceData, isLoading: isGetUserVaiBalance } = useGetBalanceOf(
    {
      accountAddress: accountAddress || '',
      token: TOKENS.vai,
    },
    {
      enabled: !!accountAddress,
      refetchInterval: DEFAULT_REFETCH_INTERVAL_MS,
    },
  );

  const {
    isTokenApproved: isVaiApproved,
    approveToken: approveVai,
    isApproveTokenLoading: isApproveVaiLoading,
    isWalletSpendingLimitLoading: isVaiApprovalStatusLoading,
    walletSpendingLimitTokens: vaiWalletSpendingLimitTokens,
    revokeWalletSpendingLimit: revokeVaiWalletSpendingLimit,
    isRevokeWalletSpendingLimitLoading: isRevokeVaiWalletSpendingLimitLoading,
  } = useTokenApproval({
    token: TOKENS.vai,
    spenderAddress: VAI_CONTROLLER_ADDRESS,
    accountAddress,
  });

  const { mutateAsync: contractRepayVai, isLoading: isSubmitting } = useRepayVai();

  const repayVai: IRepayVaiUiProps['repayVai'] = async amountWei => {
    const isRepayingFullLoan = amountWei.eq(
      convertTokensToWei({
        value: repayAmountWithInterests!.vaiRepayAmountWithInterests,
        token: TOKENS.vai,
      }),
    );

    return contractRepayVai({
      amountWei: isRepayingFullLoan ? MAX_UINT256 : amountWei,
    });
  };

  return (
    <RepayVaiUi
      disabled={!accountAddress}
      userBalanceWei={userVaiBalanceData?.balanceWei}
      repayBalanceWei={repayAmountWithInterests?.vaiRepayAmountWithInterests}
      userMintedWei={mintedVaiData?.mintedVaiWei}
      isInitialLoading={
        isGetMintedVaiLoading || isGetUserVaiBalance || isGetVaiRepayAmountWithInterests
      }
      isSubmitting={isSubmitting}
      repayVai={repayVai}
      isVaiApproved={isVaiApproved}
      approveVai={approveVai}
      isApproveVaiLoading={isApproveVaiLoading}
      isVaiApprovalStatusLoading={isVaiApprovalStatusLoading}
      vaiWalletSpendingLimitTokens={vaiWalletSpendingLimitTokens}
      isRevokeVaiWalletSpendingLimitLoading={isRevokeVaiWalletSpendingLimitLoading}
      revokeVaiWalletSpendingLimit={revokeVaiWalletSpendingLimit}
    />
  );
};

export default RepayVai;
