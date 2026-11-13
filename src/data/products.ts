
import { supabase } from "../lib/supabase";

import product_01_image from "../assets/product/product_01.png";
import product_02_image from "../assets/product/product_02.png";
import product_03_image from "../assets/product/product_03.png";
import product_04_image from "../assets/product/product_04.png";
import product_05_image from "../assets/product/product_05.png";
import product_06_image from "../assets/product/product_06.png";
import product_07_image from "../assets/product/product_07.png";
import product_08_image from "../assets/product/product_08.png";
import product_09_image from "../assets/product/product_09.png";
import product_10_image from "../assets/product/product_10.png";
import product_11_image from "../assets/product/product_11.png";
import product_12_image from "../assets/product/product_12.png";
import product_13_image from "../assets/product/product_13.png";
import product_14_image from "../assets/product/product_14.png";
import product_15_image from "../assets/product/product_15.png";
import product_16_image from "../assets/product/product_16.png";
import product_17_image from "../assets/product/product_17.png";
import product_18_image from "../assets/product/product_18.png";
import product_19_image from "../assets/product/product_19.png";
import product_20_image from "../assets/product/product_20.png";
import product_21_image from "../assets/product/product_21.png";
import product_22_image from "../assets/product/product_22.png";
import product_23_image from "../assets/product/product_23.png";
import product_24_image from "../assets/product/product_24.png";
import product_25_image from "../assets/product/product_25.png";
import product_26_image from "../assets/product/product_26.png";
import product_27_image from "../assets/product/product_27.png";
import product_28_image from "../assets/product/product_28.png";
import product_29_image from "../assets/product/product_29.png";
import product_30_image from "../assets/product/product_30.png";
import product_31_image from "../assets/product/product_31.png";
import product_32_image from "../assets/product/product_32.png";
import product_33_image from "../assets/product/product_33.png";
import product_34_image from "../assets/product/product_34.png";
import product_35_image from "../assets/product/product_35.png";
import product_36_image from "../assets/product/product_36.png";
import product_37_image from "../assets/product/product_37.png";
import product_38_image from "../assets/product/product_38.png";
import product_39_image from "../assets/product/product_39.png";
import product_40_image from "../assets/product/product_40.png";

const imageMap = {
  PP001: product_01_image,
  PP002: product_02_image,
  PP003: product_03_image,
  PP004: product_04_image,
  PP005: product_05_image,
  PP006: product_06_image,
  PP007: product_07_image,
  PP008: product_08_image,
  PP009: product_09_image,
  PP010: product_10_image,
  PP011: product_11_image,
  PP012: product_12_image,
  PP013: product_13_image,
  PP014: product_14_image,
  PP015: product_15_image,
  PP016: product_16_image,
  PP017: product_17_image,
  PP018: product_18_image,
  PP019: product_19_image,
  PP020: product_20_image,
  PP021: product_21_image,
  PP022: product_22_image,
  PP023: product_23_image,
  PP024: product_24_image,
  PP025: product_25_image,
  PP026: product_26_image,
  PP027: product_27_image,
  PP028: product_28_image,
  PP029: product_29_image,
  PP030: product_30_image,
  PP031: product_31_image,
  PP032: product_32_image,
  PP033: product_33_image,
  PP034: product_34_image,
  PP035: product_35_image,
  PP036: product_36_image,
  PP037: product_37_image,
  PP038: product_38_image,
  PP039: product_39_image,
  PP040: product_40_image,
};

export type Product = {
  id: string;
  name: string;
  categoryId: string;
  price: number;
  description: string | null;
  stock: number;
  isNew: boolean;
  createdAt: string;
  isRecommended: boolean;
  image: string;
};

type ProductRow = {
  id: string;
  name: string;
  category_id: string;
  price: number;
  description: string | null;
  stock: number;
  is_new: boolean;
  created_at: string;
  is_recommended: boolean;
};

export const getProducts = async (): Promise<Product[]> => {
  const { data, error } = await supabase
    .from("products")
    .select("*");

  if (error) {
    console.error("商品データ取得エラー:", error);
    throw error;
  }

  return (data as ProductRow[]).map((product) => ({
    id: product.id,
    name: product.name,
    categoryId: product.category_id,
    price: product.price,
    description: product.description,
    stock: product.stock,
    isNew: product.is_new,
    createdAt: product.created_at,
    isRecommended: product.is_recommended,
    image: imageMap[product.id as keyof typeof imageMap],
  }));
};
