import Image from "next/image";

export default function Home() {
  return (
    <>
      <div>weather forecast</div>
      <div>リアルタイム天気予報ダッシュボード</div>
      <form>
        <input placeholder="都市"/>
        <input placeholder="指標"/>
        <input placeholder="期間"/>
        <input placeholder="単位"/>
      </form>
      <div>
        折れ線グラフ
      </div>
    </>
  );
}
