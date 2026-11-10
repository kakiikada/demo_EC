export interface UserData {
  name: string;
  email: string;
  phone: string;
  postalCode: string;
  address: string;
  building: string;
}

export const initialUserData: UserData = {
  name: "山田 花子",
  email: "hanako@example.com",
  phone: "090-1234-5678",
  postalCode: "999-1234",
  address: "東京都●●区●●",
  building: "サンプルマンション101",
};