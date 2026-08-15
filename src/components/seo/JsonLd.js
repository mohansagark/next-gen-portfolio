export default function JsonLd({ data }) {
  const payload = Array.isArray(data) ? data : [data];
  return (
    <>
      {payload.filter(Boolean).map((item, i) => (
        <script
          key={i}
          type="application/ld+json"
          // Escape "<" so a value containing "</script>" can't break out of
          // this tag; JSON.parse decodes the escape back correctly.
          // nosemgrep: typescript.react.security.audit.react-dangerouslysetinnerhtml.react-dangerouslysetinnerhtml
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(item).replace(/</g, "\\u003c"),
          }}
        />
      ))}
    </>
  );
}
