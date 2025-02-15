import BigNumber from 'bignumber.js';
import { LockedDeposit } from 'types';

import { XvsVault } from 'types/contracts';

const formatToLockedDeposit = ([amount, lockedUntil]: Awaited<
  ReturnType<XvsVault['getWithdrawalRequests']>
>[number]): LockedDeposit => {
  // lockedUntil is a timestamp expressed in seconds, so we convert it to milliseconds
  const lockedUntilMs = +lockedUntil * 1000;
  const unlockedAt = new Date(lockedUntilMs);

  return {
    amountWei: new BigNumber(amount.toString()),
    unlockedAt,
  };
};

export default formatToLockedDeposit;
