export default function JsonLd({ data }) {
  const payload = Array.isArray(data) ? data : [data];
  return (
    <>
      {payload.filter(Boolean).map((item, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }}
        />
      ))}
    </>
  );
}
