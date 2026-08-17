export function ExternalLinkDoc({
  title,
  description,
  linkLabel,
  linkHref,
}: {
  title: string
  description: string
  linkLabel: string
  linkHref: string
}) {
  return (
    <article className="mx-auto max-w-2xl">
      <h1 className="text-3xl font-semibold tracking-tight">{title}</h1>
      <p className="mt-3 leading-relaxed text-muted-foreground">
        {description}{" "}
        <a
          href={linkHref}
          target="_blank"
          rel="noreferrer"
          className="text-foreground underline-offset-4 hover:underline"
        >
          {linkLabel}
        </a>
        .
      </p>
    </article>
  )
}
