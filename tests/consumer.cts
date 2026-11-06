import { curtainPlan } from '@lp-labs/curtain-pleats';
if (curtainPlan(2, 3).totalCutArea !== 12) throw new Error('Panels');
// @ts-expect-error invalid argument must be rejected by declarations
curtainPlan('2', 3);
