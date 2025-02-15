import BigNumber from 'bignumber.js';
import { MutationObserverOptions, useMutation, useQuery } from 'react-query';

import fakeAddress from '__mocks__/models/address';
import { assetData } from '__mocks__/models/asset';
import fakeContractReceipt from '__mocks__/models/contractReceipt';
import { poolData } from '__mocks__/models/pools';
import proposals from '__mocks__/models/proposals';
import { vaults } from '__mocks__/models/vaults';
import voters from '__mocks__/models/voters';
import FunctionKey from 'constants/functionKey';

import { GetBalanceOfInput } from '../queries/getBalanceOf';

// Queries
export const getIsAddressAuthorized = vi.fn(accountAddress => fakeAddress !== accountAddress);
export const useGetIsAddressAuthorized = (accountAddress: string) =>
  useQuery(FunctionKey.GET_IS_ADDRESS_AUTHORIZED, () => getIsAddressAuthorized(accountAddress));

export const getBlockNumber = vi.fn();
export const useGetBlockNumber = () => useQuery(FunctionKey.GET_BLOCK_NUMBER, getBlockNumber);

export const getVaiCalculateRepayAmount = vi.fn();
export const useGetVaiCalculateRepayAmount = () =>
  useQuery(FunctionKey.GET_VAI_CALCULATE_REPAY_AMOUNT, getVaiCalculateRepayAmount);

export const getVaiRepayAmountWithInterests = vi.fn();
export const useGetVaiRepayAmountWithInterests = () =>
  useQuery(FunctionKey.GET_VAI_REPAY_AMOUNT_WITH_INTERESTS, getVaiRepayAmountWithInterests);

export const getVaiTreasuryPercentage = vi.fn();
export const useGetVaiTreasuryPercentage = () =>
  useQuery(FunctionKey.GET_VAI_TREASURY_PERCENTAGE, getVaiTreasuryPercentage);

export const getMainAssetsInAccount = vi.fn();
export const useGetMainAssetsInAccount = () =>
  useQuery(FunctionKey.GET_MAIN_ASSETS_IN_ACCOUNT, getMainAssetsInAccount);

export const getHypotheticalAccountLiquidity = vi.fn();

export const getMainMarkets = vi.fn();
export const useGetMainMarkets = () => useQuery(FunctionKey.GET_MAIN_MARKETS, getMainMarkets);

export const getMarketHistory = vi.fn();
export const useGetMarketHistory = () => useQuery(FunctionKey.GET_MARKET_HISTORY, getMarketHistory);

export const getVTokenBalancesAll = vi.fn();
export const useGetVTokenBalancesAll = vi.fn(() =>
  useQuery(FunctionKey.GET_V_TOKEN_BALANCES_ALL, getVTokenBalancesAll),
);

export const getMintedVai = vi.fn();
export const useGetMintedVai = () => useQuery(FunctionKey.GET_MINTED_VAI, getMintedVai);

export const getMintableVai = vi.fn();
export const useGetMintableVai = () => useQuery(FunctionKey.GET_MINTABLE_VAI, getMintableVai);

export const getPendingRewards = vi.fn();
export const useGetPendingRewards = () =>
  useQuery(FunctionKey.GET_PENDING_REWARDS, getPendingRewards);

export const getVTokenBalanceOf = vi.fn();
export const useGetVTokenBalanceOf = () =>
  useQuery(FunctionKey.GET_V_TOKEN_BALANCE, getVTokenBalanceOf);

export const getAllowance = vi.fn();
export const useGetAllowance = () => useQuery(FunctionKey.GET_TOKEN_ALLOWANCE, getAllowance);

export const getBalanceOf = vi.fn();
export const useGetBalanceOf = (input: Omit<GetBalanceOfInput, 'signer'>) =>
  useQuery(
    [
      FunctionKey.GET_BALANCE_OF,
      {
        accountAddress: input.accountAddress,
        tokenAddress: input.token.address,
      },
    ],
    () => getBalanceOf(input),
  );

export const getTokenBalances = vi.fn();
export const useGetTokenBalances = () => useQuery(FunctionKey.GET_TOKEN_BALANCES, getTokenBalances);

export const getVrtConversionEndTime = vi.fn();
export const useGetVrtConversionEndTime = () =>
  useQuery(FunctionKey.GET_VRT_CONVERSION_END_TIME, getVrtConversionEndTime);

export const getVrtConversionRatio = vi.fn();
export const useGetVrtConversionRatio = () =>
  useQuery(FunctionKey.GET_VRT_CONVERSION_RATIO, getVrtConversionRatio);

export const getXvsWithdrawableAmount = vi.fn();
export const useGetXvsWithdrawableAmount = () =>
  useQuery(FunctionKey.GET_XVS_WITHDRAWABLE_AMOUNT, getXvsWithdrawableAmount);

export const getVTokenInterestRateModel = vi.fn();
export const useGetVTokenInterestRateModel = () =>
  useQuery(FunctionKey.GET_V_TOKEN_INTEREST_RATE_MODEL, getVTokenInterestRateModel);

export const getVTokenApySimulations = vi.fn();
export const useGetVTokenApySimulations = () =>
  useQuery(FunctionKey.GET_V_TOKEN_APY_SIMULATIONS, getVTokenApySimulations);

export const getVTokenSupplyRate = vi.fn();

export const getVTokenBorrowRate = vi.fn();

export const getVenusVaiVaultDailyRate = vi.fn();
export const useGetVenusVaiVaultDailyRate = () =>
  useQuery(FunctionKey.GET_VENUS_VAI_VAULT_DAILY_RATE, getVenusVaiVaultDailyRate);

export const getTransactions = vi.fn();
export const useGetTransactions = vi.fn(() =>
  useQuery([FunctionKey.GET_TRANSACTIONS, {}], getTransactions),
);

export const getXvsVaultPoolCount = vi.fn();
export const useGetXvsVaultPoolCount = () =>
  useQuery(FunctionKey.GET_XVS_VAULT_POOLS_COUNT, getXvsVaultPoolCount);

export const getXvsVaultPendingWithdrawalsFromBeforeUpgrade = vi.fn();
export const useGetXvsVaultPendingWithdrawalsFromBeforeUpgrade = () =>
  useQuery(
    FunctionKey.GET_XVS_VAULT_PENDING_WITHDRAWALS_FROM_BEFORE_UPGRADE,
    getXvsVaultPendingWithdrawalsFromBeforeUpgrade,
  );

export const useGetTreasuryTotals = vi.fn();

export const useGetMainPoolTotalXvsDistributed = vi.fn();

export const useGetIsolatedPools = vi.fn(() => ({
  isLoading: false,
  data: {
    pools: poolData.slice(1),
  },
}));

export const useGetMainPool = vi.fn(() => ({
  isLoading: false,
  data: {
    pool: poolData[0],
  },
}));

export const useGetPool = vi.fn(() => ({
  isLoading: false,
  data: {
    pool: poolData[0],
  },
}));

export const useGetPools = vi.fn(() => ({
  isLoading: false,
  data: {
    pools: poolData,
  },
}));

export const useGetMainAssets = vi.fn(() => ({
  isLoading: false,
  data: {
    assets: assetData,
  },
}));

export const useGetAsset = vi.fn(() => ({
  isLoading: false,
  data: {
    assets: assetData[0],
  },
}));

export const useGetVaults = vi.fn(() => ({
  isLoading: false,
  data: vaults,
}));

export const getXvsVaultPoolInfo = vi.fn();
export const useGetXvsVaultPoolInfo = () =>
  useQuery(FunctionKey.GET_XVS_VAULT_POOL_INFOS, getXvsVaultPoolInfo);

export const getXvsVaultRewardPerBlock = vi.fn();
export const useGetXvsVaultRewardPerBlock = () =>
  useQuery(FunctionKey.GET_XVS_VAULT_REWARD_PER_BLOCK, getXvsVaultRewardPerBlock);

export const getXvsVaultTotalAllocationPoints = vi.fn();
export const useGetXvsVaultTotalAllocationPoints = () =>
  useQuery(FunctionKey.GET_XVS_VAULT_TOTAL_ALLOCATION_POINTS, getXvsVaultTotalAllocationPoints);

export const getXvsVaultLockedDeposits = vi.fn();
export const useGetXvsVaultLockedDeposits = () =>
  useQuery(FunctionKey.GET_XVS_VAULT_WITHDRAWAL_REQUESTS, getXvsVaultLockedDeposits);

export const getXvsVaultUserInfo = vi.fn();
export const useGetXvsVaultUserInfo = () =>
  useQuery(FunctionKey.GET_XVS_VAULT_USER_INFO, getXvsVaultUserInfo);

export const getCurrentVotes = vi.fn(() => new BigNumber(100000000000000000));
export const useGetCurrentVotes = () => useQuery(FunctionKey.GET_CURRENT_VOTES, getCurrentVotes);

export const getProposals = vi.fn();
export const useGetProposals = () => useQuery(FunctionKey.GET_PROPOSALS, getProposals);

export const getProposal = vi.fn(() => proposals[0]);
export const useGetProposal = () => useQuery(FunctionKey.GET_PROPOSAL, getProposal);

export const getVoters = vi.fn(() => voters);
export const useGetVoters = vi.fn(() => useQuery(FunctionKey.GET_VOTERS, getVoters));

export const getVoterHistory = vi.fn();
export const useGetVoterHistory = () => useQuery(FunctionKey.GET_VOTER_HISTORY, getVoterHistory);

export const getVoterDetails = vi.fn();
export const useGetVoterDetails = () => useQuery(FunctionKey.GET_VOTER_DETAILS, getVoterDetails);

export const getVoteReceipt = vi.fn();
export const useGetVoteReceipt = () => useQuery(FunctionKey.GET_VOTE_RECEIPT, getVoteReceipt);

export const getVaiVaultUserInfo = vi.fn();
export const useGetVaiVaultUserInfo = () =>
  useQuery([FunctionKey.GET_VAI_VAULT_USER_INFO, fakeAddress], getVaiVaultUserInfo);

export const useGetVestingVaults = vi.fn();

export const getVoteDelegateAddress = vi.fn();
export const useGetVoteDelegateAddress = () =>
  useQuery([FunctionKey.GET_VOTE_DELEGATE_ADDRESS, fakeAddress], getVoteDelegateAddress);

export const getLatestProposalIdByProposer = vi.fn();
export const useGetLatestProposalIdByProposer = () =>
  useQuery(
    [FunctionKey.GET_LATEST_PROPOSAL_ID_BY_PROPOSER, fakeAddress],
    getLatestProposalIdByProposer,
  );
export const useGetActiveProposal = vi.fn();

export const getVoterAccounts = vi.fn();
export const useGetVoterAccounts = () => useQuery(FunctionKey.GET_VOTER_ACCOUNTS, getVoterAccounts);

export const getProposalThreshold = vi.fn(() => new BigNumber('10000000000000000000000'));
export const useGetProposalThreshold = () =>
  useQuery(FunctionKey.GET_PROPOSAL_THRESHOLD, getProposalThreshold);

export const getProposalState = vi.fn();
export const useGetProposalState = () => useQuery(FunctionKey.GET_PROPOSAL_STATE, getProposalState);

export const getProposalEta = vi.fn();
export const useGetProposalEta = () => useQuery(FunctionKey.GET_PROPOSAL_ETA, getProposalEta);

export const getPancakeSwapPairs = vi.fn();
export const useGetPancakeSwapPairs = () =>
  useQuery(FunctionKey.GET_PANCAKE_SWAP_PAIRS, getPancakeSwapPairs);

export const getVaiRepayApy = vi.fn();
export const useGetVaiRepayApy = () => useQuery(FunctionKey.GET_VAI_REPAY_APY, getVaiRepayApy);

// Mutations
export const approveToken = vi.fn();
export const useApproveToken = (_variables: never, options?: MutationObserverOptions) =>
  useMutation(FunctionKey.APPROVE_TOKEN, approveToken, options);

export const revokeSpendingLimit = vi.fn();
export const useRevokeSpendingLimit = (_variables: never, options?: MutationObserverOptions) =>
  useMutation(FunctionKey.REVOKE_SPENDING_LIMIT, revokeSpendingLimit, options);

export const convertVrt = vi.fn();
export const useConvertVrt = (options?: MutationObserverOptions) =>
  useMutation(FunctionKey.CONVERT_VRT, convertVrt, options);

export const mintVai = vi.fn();
export const useMintVai = (options?: MutationObserverOptions) =>
  useMutation(FunctionKey.MINT_VAI, mintVai, options);

export const repayVai = vi.fn();
export const useRepayVai = (options?: MutationObserverOptions) =>
  useMutation(FunctionKey.REPAY_VAI, repayVai, options);

export const enterMarkets = vi.fn();
export const useEnterMarkets = (options?: MutationObserverOptions) =>
  useMutation(FunctionKey.ENTER_MARKETS, enterMarkets, options);

export const exitMarket = vi.fn();
export const useExitMarket = (options?: MutationObserverOptions) =>
  useMutation(FunctionKey.EXIT_MARKET, exitMarket, options);

export const repay = vi.fn();
export const useRepay = (_variables: never, options?: MutationObserverOptions) =>
  useMutation(FunctionKey.REPAY, repay, options);

export const supply = vi.fn();
export const useSupply = (_variables: never, options?: MutationObserverOptions) =>
  useMutation(FunctionKey.SUPPLY, supply, options);

export const redeem = vi.fn();
export const useRedeem = (_variables: never, options?: MutationObserverOptions) =>
  useMutation(FunctionKey.REDEEM, redeem, options);

export const redeemUnderlying = vi.fn();
export const useRedeemUnderlying = (_variables: never, options?: MutationObserverOptions) =>
  useMutation(FunctionKey.REDEEM, redeemUnderlying, options);

export const borrow = vi.fn();
export const useBorrow = (_variables: never, options?: MutationObserverOptions) =>
  useMutation(FunctionKey.BORROW, borrow, options);

export const withdrawXvs = vi.fn();
export const useWithdrawXvs = (options?: MutationObserverOptions) =>
  useMutation(FunctionKey.WITHDRAW_XVS, withdrawXvs, options);

export const setVoteDelegate = vi.fn();
export const useSetVoteDelegate = (options?: MutationObserverOptions) =>
  useMutation(FunctionKey.SET_VOTE_DELEGATE, setVoteDelegate, options);

export const createProposal = vi.fn();
export const useCreateProposal = (options?: MutationObserverOptions) =>
  useMutation(FunctionKey.CREATE_PROPOSAL, createProposal, options);

export const cancelProposal = vi.fn(async () => fakeContractReceipt);
export const useCancelProposal = (options?: MutationObserverOptions) =>
  useMutation(FunctionKey.CANCEL_PROPOSAL, cancelProposal, options);

export const executeProposal = vi.fn(async () => fakeContractReceipt);
export const useExecuteProposal = (options?: MutationObserverOptions) =>
  useMutation(FunctionKey.EXECUTE_PROPOSAL, executeProposal, options);

export const queueProposal = vi.fn(async () => fakeContractReceipt);
export const useQueueProposal = (options?: MutationObserverOptions) =>
  useMutation(FunctionKey.QUEUE_PROPOSAL, queueProposal, options);

export const stakeInXvsVault = vi.fn();
export const useStakeInXvsVault = (_variables: never, options?: MutationObserverOptions) =>
  useMutation(FunctionKey.STAKE_IN_XVS_VAULT, stakeInXvsVault, options);

export const stakeInVaiVault = vi.fn();
export const useStakeInVaiVault = (options?: MutationObserverOptions) =>
  useMutation(FunctionKey.STAKE_IN_VAI_VAULT, stakeInVaiVault, options);

export const castVote = vi.fn();
export const useCastVote = (options?: MutationObserverOptions) =>
  useMutation(FunctionKey.CAST_VOTE, castVote, options);

export const castVoteWithReason = vi.fn();
export const useCastVoteWithReason = (options?: MutationObserverOptions) =>
  useMutation(FunctionKey.CAST_VOTE_WITH_REASON, castVoteWithReason, options);

export const withdrawFromVaiVault = vi.fn();
export const useWithdrawFromVaiVault = (options?: MutationObserverOptions) =>
  useMutation(FunctionKey.WITHDRAW_FROM_VAI_VAULT, withdrawFromVaiVault, options);

export const requestWithdrawalFromXvsVault = vi.fn();
export const useRequestWithdrawalFromXvsVault = (options?: MutationObserverOptions) =>
  useMutation(
    FunctionKey.REQUEST_WITHDRAWAL_FROM_XVS_VAULT,
    requestWithdrawalFromXvsVault,
    options,
  );

export const executeWithdrawalFromXvsVault = vi.fn();
export const useExecuteWithdrawalFromXvsVault = (
  _variables: never,
  options?: MutationObserverOptions,
) =>
  useMutation(
    FunctionKey.EXECUTE_WITHDRAWAL_FROM_XVS_VAULT,
    executeWithdrawalFromXvsVault,
    options,
  );

export const swapTokens = vi.fn(async () => fakeContractReceipt);
export const useSwapTokens = (options?: MutationObserverOptions) =>
  useMutation(FunctionKey.SWAP_TOKENS, swapTokens, options);

export const swapTokensAndRepay = vi.fn(async () => fakeContractReceipt);
export const useSwapTokensAndRepay = (options?: MutationObserverOptions) =>
  useMutation(FunctionKey.SWAP_TOKENS_AND_REPAY, swapTokensAndRepay, options);

export const swapTokensAndSupply = vi.fn(async () => fakeContractReceipt);
export const useSwapTokensAndSupply = (options?: MutationObserverOptions) =>
  useMutation(FunctionKey.SWAP_TOKENS_AND_SUPPLY, swapTokensAndSupply, options);

export const claimRewards = vi.fn();
export const useClaimRewards = (options?: MutationObserverOptions) =>
  useMutation(FunctionKey.CLAIM_REWARDS, claimRewards, options);

export const stake = vi.fn();
export const useStakeInVault = () => ({
  stake,
  isLoading: false,
});
