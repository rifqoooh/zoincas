export const budgetPlansKeys = {
  all: () => ['budget-plans'],
  budgetPlan: () => ['budget-plan'],
  budgetPlanId: ({ budgetPlanId }: { budgetPlanId?: string }) => [
    'budget-plan',
    { budgetPlanId },
  ],
};
