import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 px-4 text-center">
      <p className="text-7xl md:text-9xl font-semibold text-primary-color">404</p>
      <h1 className="text-2xl md:text-4xl font-semibold text-seondary-color dark:text-white-color">
        Page not found
      </h1>
      <p className="text-base md:text-lg text-body-color max-w-md">
        The page you are looking for doesn&apos;t exist or may have been moved.
      </p>
      <Link
        href="/"
        className="mt-2 inline-block rounded-full bg-primary-color px-8 py-3 font-bold text-white"
      >
        Back to home
      </Link>
    </div>
  );
}
