import { Prisma } from "@prisma/client";

export type TCategoryByIdWithProducts = Prisma.CategoryGetPayload<{
  include: {
    products: true;
  };
}>;
