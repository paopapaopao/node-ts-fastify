import { desc, eq, lt } from 'drizzle-orm';
import {
  type FastifyInstance,
  type FastifyReply,
  type FastifyRequest,
} from 'fastify';

import { recipesTable } from '../schemas';

const DEFAULT_RECIPES_LIMIT = 10;
const MAX_RECIPES_LIMIT = 20;

const parsePositiveInteger = (value: string | undefined) => {
  if (value === undefined) {
    return undefined;
  }

  const number = Number(value);

  if (!Number.isInteger(number) || number < 1) {
    return undefined;
  }

  return number;
};

export const recipesRoutes = (app: FastifyInstance) => {
  app.post('/recipes', async (request: FastifyRequest, reply: FastifyReply) => {
    const {
      image,
      name,
      ingredients,
      instructions,

      prepTime,
      cookTime,
      difficulty,
      servings,
      calories,
      cuisine,
      tags,
      mealType,

      userId,
      reviewCount,
      rating,
    } = request.body as {
      image: string;
      name: string;
      ingredients: string[];
      instructions: string[];

      prepTime: number;
      cookTime: number;
      difficulty: string;
      servings: number;
      calories: number;
      cuisine: string;
      tags: string[];
      mealType: string[];

      userId: number;
      reviewCount: number;
      rating: number;
    };

    try {
      const [recipe] = await app.db
        .insert(recipesTable)
        .values({
          image,
          name,
          ingredients,
          instructions,

          prepTime: prepTime.toString(),
          cookTime: cookTime.toString(),
          difficulty,
          servings: servings.toString(),
          calories: calories.toString(),
          cuisine,
          tags,
          mealType,

          userId: userId.toString(),
          reviewCount: reviewCount.toString(),
          rating: rating.toString(),
        })
        .returning();

      return reply.send({
        success: true,
        message: 'Recipe created',
        data: recipe,
      });
    } catch (error) {
      console.error('error', error);

      throw error;
    }
  });

  app.get(
    '/recipes/:id',
    async (request: FastifyRequest, reply: FastifyReply) => {
      const { id } = request.params as { id: string };

      const [recipe] = await app.db
        .select()
        .from(recipesTable)
        .where(eq(recipesTable.id, Number(id)))
        .limit(1);

      if (recipe === undefined) {
        return reply.status(404).send({
          success: false,
          message: 'Recipe not found',
          data: null,
        });
      }

      return reply.send({
        success: true,
        message: 'Recipe read',
        data: recipe,
      });
    },
  );

  app.get('/recipes', async (request: FastifyRequest, reply: FastifyReply) => {
    const { cursor, limit } = request.query as {
      cursor?: string;
      limit?: string;
    };

    const cursorId = parsePositiveInteger(cursor);
    const requestedLimit = parsePositiveInteger(limit) ?? DEFAULT_RECIPES_LIMIT;
    const pageSize = Math.min(requestedLimit, MAX_RECIPES_LIMIT);

    const recipes =
      cursorId === undefined
        ? await app.db
            .select()
            .from(recipesTable)
            .orderBy(desc(recipesTable.id))
            .limit(pageSize + 1)
        : await app.db
            .select()
            .from(recipesTable)
            .where(lt(recipesTable.id, cursorId))
            .orderBy(desc(recipesTable.id))
            .limit(pageSize + 1);

    const hasNextPage = recipes.length > pageSize;
    const items = hasNextPage ? recipes.slice(0, pageSize) : recipes;
    const nextCursor = hasNextPage
      ? (items[items.length - 1]?.id ?? null)
      : null;

    return reply.send({
      success: true,
      message: 'Recipe read',
      data: {
        recipes: items,
        nextCursor,
        hasNextPage,
      },
    });
  });

  app.put(
    '/recipes/:id',
    async (request: FastifyRequest, reply: FastifyReply) => {
      const { id } = request.params as { id: string };

      const {
        image,
        name,
        ingredients,
        instructions,

        prepTime,
        cookTime,
        difficulty,
        servings,
        calories,
        cuisine,
        tags,
        mealType,

        userId,
        reviewCount,
        rating,
      } = request.body as {
        image: string;
        name: string;
        ingredients: string[];
        instructions: string[];

        prepTime: number;
        cookTime: number;
        difficulty: string;
        servings: number;
        calories: number;
        cuisine: string;
        tags: string[];
        mealType: string[];

        userId: number;
        reviewCount: number;
        rating: number;
      };

      const [recipe] = await app.db
        .update(recipesTable)
        .set({
          image,
          name,
          ingredients,
          instructions,

          prepTime: prepTime.toString(),
          cookTime: cookTime.toString(),
          difficulty,
          servings: servings.toString(),
          calories: calories.toString(),
          cuisine,
          tags,
          mealType,

          userId: userId.toString(),
          reviewCount: reviewCount.toString(),
          rating: rating.toString(),
        })
        .where(eq(recipesTable.id, Number(id)))
        .returning();

      if (recipe === undefined) {
        return reply.status(404).send({
          success: false,
          message: 'Recipe not found',
          data: null,
        });
      }

      return reply.send({
        success: true,
        message: 'Recipe updated',
        data: recipe,
      });
    },
  );

  app.delete(
    '/recipes/:id',
    async (request: FastifyRequest, reply: FastifyReply) => {
      const { id } = request.params as { id: string };

      const [recipe] = await app.db
        .delete(recipesTable)
        .where(eq(recipesTable.id, Number(id)))
        .returning();

      if (recipe === undefined) {
        return reply.status(404).send({
          success: false,
          message: 'Recipe not found',
          data: null,
        });
      }

      return reply.send({
        success: true,
        message: 'Recipe deleted',
        data: recipe,
      });
    },
  );
};
