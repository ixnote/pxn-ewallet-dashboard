import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="flex flex-col gap-8 w-full h-screen items-center justify-center bg-blue-300">
        <span className="text-6xl">What are you looking for?</span>
        <div className="flex gap-4 items-center justify-center">
          <Link
            href={"https://www.pxnewallet.com"}
            className="text-brand-main text-3xl hover:text-blue-600"
          >
            Site
          </Link>
          or
          <Link
            href={"/dashboard"}
            className="text-brand-main text-3xl hover:text-blue-600"
          >
            Dashboard
          </Link>
        </div>
      </div>
    </>
  );
}
