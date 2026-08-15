import BlogTableOfContents from "@/components/shared/blogs/BlogTableOfContents";
import AuthorDisplay from "@/components/shared/AuthorDisplay";
import { btnMetallicWhiteClass } from "@/components/shared/buttons/ButtonPrimary";
import BlogSidebar from "@/components/shared/sidebar/BlogSidebar";
import countCommentLength from "@/libs/countCommentLength";
import {
  extractHeadings,
  wordCountFromHtml,
} from "@/libs/extractHeadings";
import makePath from "@/libs/makePath";
import sliceText from "@/libs/sliceText";
import Link from "next/link";
import Image from "next/image";

const BlogDetailsPrimary = ({
  prevId,
  nextId,
  blog,
  pervblog,
  nextblog,
  isPrevBlog,
  isNextBlog,
}) => {
  const {
    title,
    desc,
    blogTopList,
    category,
    author,
    comments,
    tags,
    keyTakeaways,
    coverImage,
    coverImageAlt,
  } = blog ? blog : {};
  const { title: prevBlogTitle } = pervblog || {};
  const { title: nextBlogTitle } = nextblog || {};

  const rawHtml = blog?.html || "";
  const { headings, htmlWithIds } = extractHeadings(rawHtml);
  const h2Count = headings.filter((h) => h.level === 2).length;
  const words = wordCountFromHtml(rawHtml);
  const showToc = h2Count >= 4 || words >= 1500;

  return (
    <section id="blogs">
      <div className="py-12 sm:py-16 md:py-20 bg-[#f3f4f6] dark:bg-black-color">
        <div className="container">
          <div className="lg:grid lg:gap-6 lg:grid-cols-12">
            {/* <!-- blog details --> */}
            <div className="lg:col-start-1 lg:col-span-8 min-w-0">
              <article className="wow fadeInUp" data-wow-delay=".3s">
                {/* category */}
                {category ? (
                  <Link
                    href={`/blogs?category=${makePath(category)}`}
                    className={`text-size-13 uppercase px-15px py-10px rounded-50px leading-1 inline-block mb-4 ${btnMetallicWhiteClass}`}
                  >
                    {category}
                  </Link>
                ) : null}

                {/* meta: date, author, comments */}
                <ul className="flex flex-wrap gap-x-15px md:gap-x-25px gap-y-10px items-center mb-15px md:mb-5">
                  {blogTopList?.length
                    ? blogTopList.map(({ iconName, name, path }, idx) => (
                        <li
                          key={1000 + idx}
                          className="text-[#374151] dark:text-[#9aa3af]"
                        >
                          {path ? (
                            <AuthorDisplay
                              author={author || name}
                              className="text-[#374151] dark:text-[#9aa3af]"
                            />
                          ) : (
                            <>
                              <i
                                className={`${iconName} mr-1 text-teal-700 dark:text-[#5eead4] transition-all duration-500`}
                              ></i>{" "}
                              {name}
                            </>
                          )}
                        </li>
                      ))
                    : ""}
                  {comments && comments.length > 0 && (
                    <li className="text-[#374151] dark:text-[#9aa3af]">
                      <i className="fa-regular fa-comments mr-1 text-teal-700 dark:text-[#5eead4] transition-all duration-500"></i>{" "}
                      <Link
                        href="#comment-reply"
                        className="text-[#374151] dark:text-[#9aa3af] hover:text-teal-700 dark:hover:text-[#5eead4] transition-all duration-500"
                      >
                        Comments ({countCommentLength(comments)})
                      </Link>
                    </li>
                  )}
                </ul>

                {/* sole H1 for the post page */}
                <h1 className="text-[#0b0d10] dark:text-[#f3f4f6] capitalize text-size-28 md:text-4xl font-bold leading-tight mb-4">
                  {title}
                </h1>

                {/* lead / summary */}
                {desc ? (
                  <p className="text-[#374151] dark:text-[#9aa3af] text-lg leading-relaxed mb-6 max-w-[65ch]">
                    {desc}
                  </p>
                ) : null}

                {/* cover image (absent on legacy posts) */}
                {coverImage ? (
                  <div className="relative aspect-[16/9] overflow-hidden rounded-lg mb-8">
                    <Image
                      src={coverImage}
                      alt={coverImageAlt || ""}
                      fill
                      sizes="(max-width: 1024px) 100vw, 800px"
                      className="object-cover"
                      priority
                    />
                  </div>
                ) : null}

                {/* key takeaways high on page (body HTML no longer includes this section) */}
                {keyTakeaways?.length ? (
                  <div className="mb-8 max-w-[65ch]">
                    <h2 className="text-[#0b0d10] dark:text-[#f3f4f6] text-2xl font-bold mb-4">
                      Key Takeaways
                    </h2>
                    <ul>
                      {keyTakeaways.map((takeaway, idx) => (
                        <li
                          key={idx}
                          className="pl-25px mb-10px relative before:content-['\f058'] before:font-fontawesome before:absolute before:left-0 before:top-0 before:text-teal-700 dark:before:text-[#5eead4] before:font-bold"
                        >
                          <span
                            className="text-[#374151] dark:text-[#9aa3af] text-lg leading-[1.5]"
                            // takeaway comes from portfolio-blog's takeawayToHtml():
                            // HTML-escaped first, then only <strong>/<em>/<code> are
                            // reintroduced via allowlist regex — never raw author HTML.
                            // nosemgrep: typescript.react.security.audit.react-dangerouslysetinnerhtml.react-dangerouslysetinnerhtml
                            dangerouslySetInnerHTML={{ __html: takeaway }}
                          />
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}

                {showToc ? <BlogTableOfContents headings={headings} /> : null}

                {/* post body: ~18px / 1.5 lh / ~65ch measure */}
                <div
                  className="prose prose-lg dark:prose-invert max-w-[65ch] text-lg leading-normal break-words prose-p:leading-[1.5] prose-li:leading-[1.5] prose-headings:text-[#0b0d10] dark:prose-headings:text-[#f3f4f6] prose-p:text-[#374151] dark:prose-p:text-[#9aa3af] prose-strong:text-[#0b0d10] dark:prose-strong:text-[#f3f4f6] prose-a:text-teal-700 dark:prose-a:text-[#5eead4] prose-li:text-[#374151] dark:prose-li:text-[#9aa3af] prose-pre:overflow-x-auto prose-img:rounded-lg"
                  // htmlWithIds derives from portfolio-blog's generated/blogs.json
                  // "html" field: raw HTML disabled in remark-rehype, then
                  // rehype-sanitize (defaultSchema), then independently re-verified
                  // by scripts/verify-safety.mjs (parses output, asserts zero
                  // executable nodes) gating that repo's CI before publish.
                  // nosemgrep: typescript.react.security.audit.react-dangerouslysetinnerhtml.react-dangerouslysetinnerhtml
                  dangerouslySetInnerHTML={{ __html: htmlWithIds }}
                />
              </article>

              {/* <!-- tags and social --> */}
              <div className="flex gap-5 md:gap-x-30px flex-wrap md:flex-nowrap md:items-center md:justify-between py-30px mt-50px border-y border-[#e5e7eb] dark:border-[#262b33]">
                {/* <!-- tags --> */}
                <div className="flex gap-x-5 md:gap-x-30px items-center">
                  <div>
                    <h3>
                      <span className="text-[#0b0d10] dark:text-[#f3f4f6] capitalize relative z-0 text-size-22 md:text-2xl font-bold">
                        Tags:
                      </span>
                    </h3>
                  </div>
                  <div>
                    <ul className="flex flex-wrap gap-10px items-center">
                      {tags?.length
                        ? tags.map((tag, idx) => (
                            <li key={5000000 + idx} className="font-medium">
                              <Link
                                href={`/blogs?tag=${makePath(tag)}`}
                                className={`py-11px px-15px rounded-50px leading-1 ${btnMetallicWhiteClass}`}
                              >
                                {tag}
                              </Link>
                            </li>
                          ))
                        : ""}
                    </ul>
                  </div>
                </div>
                {/* <!-- socials --> */}
                <div>
                  <ul className="flex gap-x-5">
                    <li>
                      <Link
                        href="https://www.linkedin.com/in/mohansagark/"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="LinkedIn"
                        className="text-teal-700 dark:text-[#5eead4] border border-teal-700 dark:border-[#5eead4] hover:bg-teal-700 hover:text-white dark:hover:bg-[#5eead4] dark:hover:text-[#0b0d10] w-10 h-10 rounded-full flex items-center justify-center overflow-hidden transition-colors"
                      >
                        <i className="fa-brands fa-linkedin-in"></i>
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="https://github.com/mohansagark"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="GitHub"
                        className="text-teal-700 dark:text-[#5eead4] border border-teal-700 dark:border-[#5eead4] hover:bg-teal-700 hover:text-white dark:hover:bg-[#5eead4] dark:hover:text-[#0b0d10] w-10 h-10 rounded-full flex items-center justify-center overflow-hidden transition-colors"
                      >
                        <i className="fa-brands fa-github"></i>
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="https://mohansagark.medium.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Medium"
                        className="text-teal-700 dark:text-[#5eead4] border border-teal-700 dark:border-[#5eead4] hover:bg-teal-700 hover:text-white dark:hover:bg-[#5eead4] dark:hover:text-[#0b0d10] w-10 h-10 rounded-full flex items-center justify-center overflow-hidden transition-colors"
                      >
                        <i className="fa-brands fa-medium"></i>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>

              {/* <!-- prev / next blog --> */}
              <div className="py-30px border-b border-[#e5e7eb] dark:border-[#262b33]">
                <div className="flex flex-wrap md:flex-nowrap md:grid gap-5 xl:gap-30px md:grid-cols-2">
                  {/* prev */}
                  <div>
                    {isPrevBlog ? (
                      <div className="group flex gap-x-5 max-w-355px md:max-w-full w-full relative overflow-hidden rounded-2xl border border-[#e5e7eb] dark:border-[#262b33] bg-white dark:bg-[#12151a] px-5 py-30px md:px-25px md:py-35px">
                        <div>
                          <Link
                            href={isPrevBlog ? `/blogs/${prevId}` : "#"}
                            className="uppercase text-teal-700 dark:text-[#5eead4] mb-1.5 inline-flex gap-2 items-center"
                          >
                            <i className="fa-regular fa-angle-double-left"></i>
                            <span> previous</span>
                          </Link>
                          <h3>
                            <Link
                              href={isPrevBlog ? `/blogs/${prevId}` : "#"}
                              className="text-[#0b0d10] dark:text-[#f3f4f6] hover:text-teal-700 dark:hover:text-[#5eead4] capitalize relative z-0 text-lg font-medium"
                            >
                              {sliceText(prevBlogTitle, 45)}
                            </Link>
                          </h3>
                        </div>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                  {/* next */}
                  <div className="ml-auto md:ml-0">
                    {isNextBlog ? (
                      <div className="group flex items-start gap-x-5 max-w-355px md:max-w-full w-full relative overflow-hidden rounded-2xl border border-[#e5e7eb] dark:border-[#262b33] bg-white dark:bg-[#12151a] px-5 py-30px md:px-25px md:py-35px">
                        <div>
                          <div className="relative z-10 flex flex-col items-end">
                            <Link
                              href={isNextBlog ? `/blogs/${nextId}` : "#"}
                              className="uppercase text-teal-700 dark:text-[#5eead4] mb-1.5 inline-flex gap-2 items-center"
                            >
                              <span> Next</span>
                              <i className="fa-regular fa-angle-double-right"></i>
                            </Link>
                            <h3>
                              <Link
                                href={isNextBlog ? `/blogs/${nextId}` : "#"}
                                className="text-[#0b0d10] dark:text-[#f3f4f6] hover:text-teal-700 dark:hover:text-[#5eead4] capitalize relative z-0 text-lg font-medium text-end"
                              >
                                {sliceText(nextBlogTitle, 45)}
                              </Link>
                            </h3>
                          </div>
                        </div>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </div>
            </div>
            {/* <!-- sidebar --> */}
            <BlogSidebar />
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogDetailsPrimary;
