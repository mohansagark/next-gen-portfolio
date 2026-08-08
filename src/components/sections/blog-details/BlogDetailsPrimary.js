import BlogTableOfContents from "@/components/shared/blogs/BlogTableOfContents";
import AuthorDisplay from "@/components/shared/AuthorDisplay";
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
      <div className="py-60px md:py-20 lg:py-100px xl:py-30 dark:bg-black-color">
        <div className="container">
          <div className="lg:grid lg:gap-6 lg:grid-cols-12">
            {/* <!-- blog details --> */}
            <div className="lg:col-start-1 lg:col-span-8 min-w-0">
              <article className="wow fadeInUp" data-wow-delay=".3s">
                {/* category */}
                {category ? (
                  <Link
                    href={`/blogs?category=${makePath(category)}`}
                    className="text-size-13 uppercase px-15px py-10px rounded-50px leading-1 inline-block mb-4 text-white-color bg-gradient-secondary-2 bg-200 hover:bg-100"
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
                          className="text-primary-color dark:text-white-color"
                        >
                          {path ? (
                            <AuthorDisplay
                              author={author || name}
                              className="text-primary-color dark:text-white-color"
                            />
                          ) : (
                            <>
                              <i
                                className={`${iconName} mr-1 text-primary-color transition-all duration-500`}
                              ></i>{" "}
                              {name}
                            </>
                          )}
                        </li>
                      ))
                    : ""}
                  {comments && comments.length > 0 && (
                    <li className="text-primary-color dark:text-white-color">
                      <i className="fa-regular fa-comments mr-1 text-primary-color transition-all duration-500"></i>{" "}
                      <Link
                        href="#comment-reply"
                        className="text-primary-color dark:text-white-color hover:text-primary-color transition-all duration-500"
                      >
                        Comments ({countCommentLength(comments)})
                      </Link>
                    </li>
                  )}
                </ul>

                {/* sole H1 for the post page */}
                <h1 className="text-primary-color dark:text-white-color capitalize text-size-28 md:text-4xl font-bold leading-tight mb-4">
                  {title}
                </h1>

                {/* lead / summary */}
                {desc ? (
                  <p className="text-primary-color-light dark:text-white-color text-lg leading-relaxed mb-6 max-w-[65ch]">
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

                {showToc ? <BlogTableOfContents headings={headings} /> : null}

                {/* post body: ~18px / 1.5 lh / ~65ch measure */}
                <div
                  className="prose prose-lg dark:prose-invert max-w-[65ch] text-lg leading-normal break-words prose-p:leading-[1.5] prose-li:leading-[1.5] prose-headings:text-primary-color-light dark:prose-headings:text-white-color prose-p:text-primary-color-light dark:prose-p:text-white-color prose-strong:text-primary-color-light dark:prose-strong:text-white-color prose-a:text-primary-color prose-li:text-primary-color-light dark:prose-li:text-white-color prose-pre:overflow-x-auto prose-img:rounded-lg"
                  dangerouslySetInnerHTML={{ __html: htmlWithIds }}
                />

                {/* key takeaways (only when present) */}
                {keyTakeaways?.length ? (
                  <div className="mt-30px max-w-[65ch]">
                    <h2 className="text-primary-color-light dark:text-white-color text-2xl font-bold mb-4">
                      Key Takeaways
                    </h2>
                    <ul>
                      {keyTakeaways.map((takeaway, idx) => (
                        <li
                          key={idx}
                          className="pl-25px mb-10px relative before:content-['\f058'] before:font-fontawesome before:absolute before:left-0 before:top-0 before:text-primary-color before:font-bold"
                        >
                          <span
                            className="text-primary-color-light dark:text-white-color text-lg leading-[1.5]"
                            dangerouslySetInnerHTML={{ __html: takeaway }}
                          />
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}
              </article>

              {/* <!-- tags and social --> */}
              <div className="flex gap-5 md:gap-x-30px flex-wrap md:flex-nowrap md:items-center md:justify-between py-30px mt-50px border-y border-border-color dark:border-gray-color-3">
                {/* <!-- tags --> */}
                <div className="flex gap-x-5 md:gap-x-30px items-center">
                  <div>
                    <h3>
                      <span className="text-primary-color-light dark:text-white-color capitalize relative z-0 text-size-22 md:text-2xl font-bold">
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
                                className="py-11px px-15px bg-cream-light-color dark:bg-seondary-color hover:bg-primary-color dark:hover:bg-primary-color text-primary-color hover:text-white-color dark:text-white-color transition-all duration-500 rounded-50px leading-1"
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
                        className="text-primary-color dark:text-white-color border border-primary-color hover:bg-primary-color w-10 h-10 rounded-full flex items-center justify-center overflow-hidden"
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
                        className="text-primary-color dark:text-white-color border border-primary-color hover:bg-primary-color w-10 h-10 rounded-full flex items-center justify-center overflow-hidden"
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
                        className="text-primary-color dark:text-white-color border border-primary-color hover:bg-primary-color w-10 h-10 rounded-full flex items-center justify-center overflow-hidden"
                      >
                        <i className="fa-brands fa-medium"></i>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>

              {/* <!-- prev / next blog --> */}
              <div className="py-30px border-b border-border-color dark:border-gray-color-3">
                <div className="flex flex-wrap md:flex-nowrap md:grid gap-5 xl:gap-30px md:grid-cols-2">
                  {/* prev */}
                  <div>
                    {isPrevBlog ? (
                      <div className="group flex gap-x-5 max-w-355px md:max-w-full w-full relative overflow-hidden bg-cream-light-color dark:bg-primary-color-light px-5 py-30px md:px-25px md:py-35px">
                        <div>
                          <Link
                            href={isPrevBlog ? `/blogs/${prevId}` : "#"}
                            className="uppercase text-primary-color mb-1.5 inline-flex gap-2 items-center"
                          >
                            <i className="fa-regular fa-angle-double-left"></i>
                            <span> previous</span>
                          </Link>
                          <h3>
                            <Link
                              href={isPrevBlog ? `/blogs/${prevId}` : "#"}
                              className="text-primary-color-light dark:text-white-color hover:text-primary-color dark:hover:text-primary-color capitalize relative z-0 text-lg font-medium"
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
                      <div className="group flex items-start gap-x-5 max-w-355px md:max-w-full w-full relative overflow-hidden bg-cream-light-color dark:bg-primary-color-light px-5 py-30px md:px-25px md:py-35px">
                        <div>
                          <div className="relative z-10 flex flex-col items-end">
                            <Link
                              href={isNextBlog ? `/blogs/${nextId}` : "#"}
                              className="uppercase text-primary-color mb-1.5 inline-flex gap-2 items-center"
                            >
                              <span> Next</span>
                              <i className="fa-regular fa-angle-double-right"></i>
                            </Link>
                            <h3>
                              <Link
                                href={isNextBlog ? `/blogs/${nextId}` : "#"}
                                className="text-primary-color-light dark:text-white-color hover:text-primary-color dark:hover:text-primary-color capitalize relative z-0 text-lg font-medium text-end"
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
