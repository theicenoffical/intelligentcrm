import { INDUSTRIES_1 } from "./industries-1";
import { INDUSTRIES_2 } from "./industries-2";

export const INDUSTRIES = [...INDUSTRIES_1, ...INDUSTRIES_2];

export const getIndustry = (slug) => INDUSTRIES.find((i) => i.slug === slug);
