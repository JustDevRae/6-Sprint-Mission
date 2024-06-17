import Link from 'next/link';

export default function ErrorPage() {
  return (
    <div className="mt-[150px] flex flex-col items-center gap-[20px]">
      <h1 className="text-[150px] font-bold text-blue-active">404</h1>
      <h2 className="text-[30px] font-bold text-blue-active">
        페이지를 찾을 수 없습니다.
      </h2>
      <div className="text-center text-[18px] font-bold leading-[24px]">
        <p>페이지가 존재하지 않거나, 사용할 수 없는 페이지입니다.</p>
        <p>입력하신 주소가 정확한지 다시 한 번 확인해주세요.</p>
      </div>

      <Link href="/">
        <button
          type="button"
          className="h-[100px] w-[300px] rounded-[50px] bg-blue-active text-[25px] font-bold text-white hover:bg-blue-hover"
        >
          홈으로 돌아가기
        </button>
      </Link>
    </div>
  );
}
