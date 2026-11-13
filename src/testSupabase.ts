import { supabase } from "./lib/supabase";

const testSupabase = async () => {
  const { data, error } = await supabase
    .from("products")
    .select("*");

  if (error) {
    console.error("取得エラー:", error);
    return;
  }

  console.log("取得した商品データ:", data);
};

testSupabase();