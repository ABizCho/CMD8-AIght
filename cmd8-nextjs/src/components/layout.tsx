import { useState, useEffect } from "react";

import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import TERMS from "./terms.json";
import { userState } from "@/atoms/user";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { logout } from "@/pages/api/accounts";
import { useRouter } from "next/router";

const siteTitle = "트렌디한 최고의 AI 서비스 모음, AIght";
const siteDescription =
  "AIght는 최신의 AI 도구 모음 및 추천 플랫폼입니다. 기술에 대체되지 않는 최고의 리더들을 지원합니다. 그림 AI, 대화형 AI, 동영상 AI 등 다양한 카테고리에서 최고의, 최신의 AI 서비스들을 쉽게 탐색하고, 찾아보고, 배워보고, 토론하세요.";

export default function Layout({
  children,
  home,
}: {
  children: React.ReactNode;
  home?: boolean;
}) {
  return (
    <div>
      <CapsulizedHead />
      <Header />
      <main>{children}</main>
      {!home && (
        <div>
          <Link href="/">← Back to home</Link>
        </div>
      )}
      <Footer />
    </div>
  );
}

const CapsulizedHead = (): JSX.Element => {
  return (
    <Head>
      <link rel="icon" href="/favicon.ico" />
      <meta name="description" content={siteDescription} />
      <meta
        property="og:image"
        content={`https://og-image.vercel.app/${encodeURI(
          siteTitle
        )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
      />
      <meta name="og:title" content={siteTitle} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content="cmd8.vercel.app"></meta>
      <meta name="twitter:title" content={siteTitle} />
      <meta name="twitter:description" content={siteDescription} />
      <meta name="twitter:image" content="/images/logo.png" />
    </Head>
  );
};

const Header = (): JSX.Element => {
  const [isOffCanvasOpen, setIsOffCanvasOpen] = useState(false);
  const user = useRecoilValue(userState);

  const onClickHamburger = () => {
    setIsOffCanvasOpen(!isOffCanvasOpen);
  };

  useEffect(() => {
    const closeMenuOnClickOutside = (event: any) => {
      if (
        !event.target.closest(".side-canvas") &&
        !event.target.closest("button")
      ) {
        setIsOffCanvasOpen(false);
      }
    };

    if (isOffCanvasOpen) {
      document.addEventListener("click", closeMenuOnClickOutside);
    } else {
      document.removeEventListener("click", closeMenuOnClickOutside);
    }

    return () => {
      document.removeEventListener("click", closeMenuOnClickOutside);
    };
  }, [isOffCanvasOpen]);

  return (
    <header>
      <nav className="header-nav shadow-md fixed w-full top-0 z-50 ">
        <div className="container mx-auto px-6 py-1 flex justify-between">
          <div className="flex items-center col-sapn-1">
            <Link href="/" className="flex items-center" passHref>
              <Image
                src="/images/logo.png"
                alt="Logo"
                height={50}
                width={50}
                className="h-9 w-9"
              />
              <h1 className="logo-text ml-1 text-xl">AIGHT</h1>
            </Link>
          </div>
          <div className="col-sapn-1 self-center">
            <div className="hidden md:flex items-center">
              <Link
                href="/"
                className="text-white font-inter text-sm px-4 py-2"
                passHref
              >
                홈
              </Link>
              <Link
                href="/"
                target="_blank"
                rel="noreferrer"
                className="text-pink-600 font-inter text-sm px-4 py-2 font-semibold"
                passHref
              >
                아티클
              </Link>
              <Link
                href="/"
                className="text-white font-inter text-sm px-4 py-2"
                passHref
              >
                커뮤니티
              </Link>
              <Link
                href="/"
                className="text-white font-inter text-xs px-4 py-2"
                passHref
              >
                About AIGHT
              </Link>
              <Link
                href="/"
                className="text-white font-inter text-xs px-4 py-2"
                passHref
              >
                CONTACT
              </Link>
            </div>
          </div>
          <div className="col-sapn-1 self-center">
            <div className="self-center">
              <div className="hidden md:flex text-white font-bold hover:text-gray-400">
                {user === null ? (
                  <Link href="/accounts/login" passHref>
                    로그인
                  </Link>
                ) : (
                  // <Link href="/" passHref>
                  //   {user?.nickname}
                  //   <span className="text-xs">님</span>
                  // </Link>
                  <UserDropdownButton nickname={user.nickname} />
                )}
              </div>
              <HamburgerButton onClickButton={onClickHamburger} />
              <SideCanvas
                isOffCanvasOpen={isOffCanvasOpen}
                onClickClose={onClickHamburger}
                user={user}
              />
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

const UserDropdownButton = ({ nickname }: { nickname: string }) => {
  const router = useRouter();
  const setUser = useSetRecoilState(userState);

  const onClickLogOut = async () => {
    const response = await logout();
    setUser(null); // Recoil 유저 상태 업데이트
    router.push("/");
  };

  return (
    <div className="relative">
      <Link href="/" passHref>
        <button className="text-white font-bold hover:text-gray-400">
          {nickname}
          <span className="text-xs">님</span>
        </button>
      </Link>
      <div className="absolute top-10 right-0 bg-white py-2 rounded-md shadow-lg">
        <Link href="/accounts/my-page" passHref>
          <span className="block px-4 py-2 hover:bg-gray-200">마이페이지</span>
        </Link>
        <button onClick={onClickLogOut}>
          <span className="block px-4 py-2 hover:bg-gray-200">로그아웃</span>
        </button>
      </div>
    </div>
  );
};

const Footer = () => {
  return (
    <footer className="doc-footer">
      <div className="inner_footer ">
        <section className="section_service-list"></section>
        <section className="section_address"></section>
        <section className="section_terms-wrapper">
          {TERMS.map((term, idx) => (
            <a
              key={idx}
              href={term.dest}
              role="button"
              aria-expanded="false"
              className="terms"
            >
              {term.name}
            </a>
          ))}
        </section>
        <ul className="section_social"></ul>
        <small className="txt_copyright">
          © <a href="https://www.ai-ght.com">AIGHT (cmd8)</a> All rights
          reserved.
        </small>
      </div>
    </footer>
  );
};

const SideCanvas = ({ onClickClose, isOffCanvasOpen, user }: any) => {
  return (
    <div className={`side-canvas ${isOffCanvasOpen ? "open" : ""}`}>
      <button className="text-white" onClick={onClickClose}>
        닫기
      </button>
      {user === null ? (
        <div>
          {" "}
          <Link
            href="/"
            className="block px-4 py-2 text-white font-inter text-sm"
            passHref
          >
            로그인
          </Link>
          <Link
            href="/"
            className="block px-4 py-2 text-white font-inter text-sm"
            passHref
          >
            회원가입
          </Link>
        </div>
      ) : (
        <Link
          href="/"
          passHref
          className="block px-4 py-2 text-white font-inter text-sm"
        >
          {user?.nickname}
        </Link>
      )}
    </div>
  );
};
const HamburgerButton = ({ onClickButton }: any): JSX.Element => {
  return (
    <button
      type="button"
      className="md:hidden text-white focus:outline-none"
      aria-label="Toggle menu"
      onClick={onClickButton}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        className="h-6 w-6 "
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M4 6h16M4 12h16M4 18h16"
        />
      </svg>
    </button>
  );
};
