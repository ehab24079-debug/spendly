import { factories } from "@strapi/strapi";

export default factories.createCoreController(
  "api::budget.budget",
  ({ strapi }) => ({
    async create(ctx) {
      const body = ctx.request.body as {
        data?: {
          limit?: unknown;
          category?: unknown;
        };
      };

      const data = body?.data;

      if (!data) {
        return ctx.badRequest("Budget data is required.");
      }

      const limit = Number(data.limit);

      if (!Number.isFinite(limit) || limit <= 0) {
        return ctx.badRequest(
          "Monthly limit must be greater than 0.",
        );
      }

      if (typeof data.category !== "string") {
        return ctx.badRequest(
          "A valid category is required.",
        );
      }

      const category = await strapi
        .documents("api::category.category")
        .findOne({
          documentId: data.category,
          status: "published",
        });

      if (!category) {
        return ctx.badRequest(
          "Selected category does not exist.",
        );
      }

      if (category.type !== "expense") {
        return ctx.badRequest(
          "Budgets can only be created for expense categories.",
        );
      }

      const existingBudgets = await strapi
        .documents("api::budget.budget")
        .findMany({
          filters: {
            category: {
              documentId: data.category,
            },
          },
          limit: 1,
        });

      if (existingBudgets.length > 0) {
        return ctx.badRequest(
          "A budget already exists for this category.",
        );
      }

      return super.create(ctx);
    },

    async update(ctx) {
      const body = ctx.request.body as {
        data?: {
          limit?: unknown;
          category?: unknown;
        };
      };

      const data = body?.data;

      if (!data) {
        return ctx.badRequest("Budget data is required.");
      }

      if (data.category !== undefined) {
        return ctx.badRequest(
          "Budget category cannot be changed after creation.",
        );
      }

      if (data.limit !== undefined) {
        const limit = Number(data.limit);

        if (!Number.isFinite(limit) || limit <= 0) {
          return ctx.badRequest(
            "Monthly limit must be greater than 0.",
          );
        }
      }

      return super.update(ctx);
    },
  }),
);