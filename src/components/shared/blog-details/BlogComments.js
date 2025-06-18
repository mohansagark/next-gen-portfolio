import React from "react";
import BlogCommentSingle from "./BlogCommentSingle";

const BlogComments = ({ comments }) => {
  const isComments = comments?.length ? true : false;

  return (
    <div className="flex flex-col gap-y-30px">
      {isComments
        ? comments?.map((comment, idx) => {
            let replies = comment?.replies;
            const isReplies = replies?.length ? true : false;
            replies = isReplies ? replies : [];

            return (
              <React.Fragment key={idx + 100000000000}>
                <BlogCommentSingle comment={comment} />
                {isReplies ? (
                  <div className="pl-30px flex flex-col gap-y-30px">
                    {replies?.map((reply, idx2) => (
                      <BlogCommentSingle
                        key={idx2 + 500000000}
                        comment={reply}
                      />
                    ))}
                  </div>
                ) : (
                  ""
                )}
              </React.Fragment>
            );
          })
        : ""}
    </div>
  );
};
export default BlogComments;
