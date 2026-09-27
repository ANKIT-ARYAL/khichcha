import { prisma } from "@/lib/prisma";
import { products as fallbackProducts } from "@/lib/content";

export type ProductData = Omit<(typeof fallbackProducts)[number], "reviewUrl"> & {
  reviewUrl?: string;
  imageUrl?: string;
  brandName?: string;
  flavor?: string;
  ageRangeDescription?: string;
  itemForm?: string;
  specificUsesForProduct?: string;
  specialIngredients?: string;
  containerType?: string;
  breedRecommendation?: string;
  dogBreedSize?: string;
  animalFoodIngredientClaim?: string;
  productBenefits?: string;
  animalFoodNutrientContentClaim?: string;
  upc?: string;
  additionalFeatures?: string;
  recommendedUsesForProduct?: string;
  animalFoodDietType?: string;
  itemShape?: string;
  targetSpecies?: string;
  petType?: string;
  manufacturer?: string;
  asin?: string;
};

export async function getProducts(): Promise<ProductData[]> {
  try {
    const saved = await prisma.product.findMany({ orderBy: { createdAt: "asc" } });
    if (saved.length) return saved as ProductData[];
  } catch {
    // The public site remains available while the database is unavailable.
  }
  return fallbackProducts;
}

export function optionalProductFields(product: ProductData) {
  return [
    ["Brand Name", product.brandName], ["Flavor", product.flavor], ["Age Range Description", product.ageRangeDescription],
    ["Item Form", product.itemForm], ["Specific Uses For Product", product.specificUsesForProduct], ["Special Ingredients", product.specialIngredients],
    ["Container Type", product.containerType], ["Breed Recommendation", product.breedRecommendation], ["Dog Breed Size", product.dogBreedSize],
    ["Animal Food Ingredient Claim", product.animalFoodIngredientClaim], ["Product Benefits", product.productBenefits],
    ["Animal Food Nutrient Content Claim", product.animalFoodNutrientContentClaim], ["UPC", product.upc], ["Additional Features", product.additionalFeatures],
    ["Recommended Uses For Product", product.recommendedUsesForProduct], ["Animal Food Diet Type", product.animalFoodDietType],
    ["Item Shape", product.itemShape], ["Target Species", product.targetSpecies], ["Pet Type", product.petType],
    ["Manufacturer", product.manufacturer], ["ASIN", product.asin],
  ].filter((entry): entry is [string, string] => Boolean(entry[1]?.trim()));
}
