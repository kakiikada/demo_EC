export interface UserData {
  name: string;
  kana: string;
  email: string;
  password: string;
  phone: string;
  postalCode: string;
  address: string;
  building: string;
}

export const initialUserData: UserData = {
  name: "山田 花子",
  kana: "ヤマダ ハナコ",
  email: "hanako@example.com",
  password: "test1234",
  phone: "090-1234-5678",
  postalCode: "999-1234",
  address: "東京都●●区●●",
  building: "サンプルマンション101",
};