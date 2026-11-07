type Props = {
  stock: number;
};

const StockStatus = ({ stock }: Props) => {
  if (stock >= 5) {
    return <span className="stockIcon stockIcon-full">在庫あり</span>;
  }

  if (stock >= 1) {
    return <span className="stockIcon stockIcon-few">残りわずか</span>;
  }

  return <span className="stockIcon stockIcon-none">在庫なし</span>;
};

export default StockStatus;