import * as admin from "firebase-admin";

if (!admin.apps.length) {
  admin.initializeApp();
}

/*
--------------------------------
Dispatch
--------------------------------
*/

export { dispatchBooking } from "./dispatch/dispatchBooking";
export { dispatchNextDriver } from "./dispatch/dispatchNextDriver";
export { dispatchQueueProcessor } from "./dispatch/dispatchQueueProcessor";
export { dispatchRetry } from "./dispatch/dispatchRetry";
export { dispatchTimeout } from "./dispatch/dispatchTimeout";

/*
--------------------------------
Driver
--------------------------------
*/

export * from "./driver/driverOnline";
export * from "./driver/driverOffline";
export * from "./driver/driverLocationUpdate";
export * from "./driver/driverTimeout";
export * from "./driver/driverAvailabilityCleanup";

/*
--------------------------------
Payments
--------------------------------
*/

export * from "./payments/verifyPayment";
export * from "./payments/razorpayWebhook";
export * from "./payments/generateInvoice";
export * from "./payments/refundProcessor";

/*
--------------------------------
Wallet
--------------------------------
*/

export * from "./wallet/walletSettlement";
export * from "./wallet/revenueSplit";
export * from "./wallet/payoutProcessor";
export * from "./wallet/payoutReconciliation";
export * from "./wallet/createPayout";
export * from "./wallet/releaseEscrow";
export * from "./wallet/ledgerIntegrity";

/*
--------------------------------
Analytics
--------------------------------
*/

export * from "./analytics/analyticsAggregator";
export * from "./analytics/cityAnalytics";
export * from "./analytics/dailyMetrics";
export * from "./analytics/gstReportGenerator";
export * from "./analytics/heatmapUpdate";
export * from "./analytics/investorAggregator";

/*
--------------------------------
Surge
--------------------------------
*/

export * from "./surge/surgeEngine";
export * from "./surge/surgeUpdate";

/*
--------------------------------
Risk
--------------------------------
*/

export * from "./risk/driverRiskScoring";
export * from "./risk/escrowIntegrityChecker";
export * from "./risk/fraudDetector";

/*
--------------------------------
Utils
--------------------------------
*/

export * from "./utils/sendPushNotification";
export * from "./utils/auditLogger";
export * from "./utils/idempotencyGuard";

/*
--------------------------------
Core
--------------------------------
*/

export * from "./calculateCommission";
export * from "./completeBooking";
export * from "./cronSettlement";