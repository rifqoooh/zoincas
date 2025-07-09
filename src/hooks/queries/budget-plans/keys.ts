export const budgetPlansKeys = {
  all: () => ['budget-plans'],
  budgetPlan: ({ budgetPlanId }: { budgetPlanId?: string }) => [
    'budget-plan',
    { budgetPlanId },
  ],
};
