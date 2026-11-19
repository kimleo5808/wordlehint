import { readFile } from "node:fs/promises";
import path from "node:path";
import Link from "next/link";
import Image from "next/image";
import { MDXRemote } from "next-mdx-remote-client/rsc";
import remarkGfm from "remark-gfm";
import { fraunces, plexMono, plexSans } from "@/app/fonts/newsprint";
import { BASE_URL } from "@/config/site";
import { breadcrumbSchema, JsonLd } from "@/lib/jsonld";
import "./puzzle-tools.css";

type Props = {
  kind: "word" | "bee" | "analyzer" | "maker";
  breadcrumbLabel?: string;
  content: string;
  title: string;
  subtitle: string;
  href: string;
  parent: { name: string; href: string };
  figure: { src: string; alt: string; caption: string };
  children: React.ReactNode;
};

function anchor(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9 ]/g, "")
    .trim()
    .replace(/ +/g, "-");
}

export default async function ToolLanding({
  kind,
  breadcrumbLabel,
  content,
  title,
  subtitle,
  href,
  parent,
  figure,
  children,
}: Props) {
  const source = await readFile(path.join(process.cwd(), "content", content, "en.mdx"), "utf8");
  const sections = [...source.matchAll(/^## (.+)$/gm)].map((match) => match[1].trim());
  return (
    <div
      className={`pt-page pt-${kind} ${plexSans.variable} ${plexMono.variable} ${kind === "bee" ? fraunces.variable : ""}`}
    >
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: BASE_URL },
          { name: parent.name, url: BASE_URL + parent.href },
          { name: title, url: BASE_URL + href },
        ])}
      />
      <div className="pt-fold">
        <div className="pt-wrap">
          <nav aria-label="Breadcrumb" className="pt-crumb">
            <Link href={parent.href}>{parent.name}</Link>
            <span aria-hidden="true">/</span>
            {breadcrumbLabel ?? { word: "Without vowels", bee: "Word history", analyzer: "Analyzer", maker: "Custom Wordle" }[kind]}
          </nav>
          <h1>{title}</h1>
          <p className="pt-intro">{subtitle}</p>
          {children}
        </div>
      </div>
      <div className="pt-reading">
        <div className="pt-reading-grid">
          <aside className="pt-toc">
            <nav aria-label="On this page">
              <p>On this page</p>
              {sections.map((heading) => (
                <a key={heading} href={`#${anchor(heading)}`}>
                  {heading}
                </a>
              ))}
            </nav>
          </aside>
          <article className="pt-article">
            <MDXRemote
              source={source}
              options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
              components={{
                h2: ({ children }) => <h2 id={anchor(String(children))}>{children}</h2>,
                StudyFigure: () => (
                  <figure>
                    <a href={figure.src} aria-label={`View full-size chart. ${figure.alt}`}>
                      <Image
                        src={figure.src}
                        alt={figure.alt}
                        width={1080}
                        height={720}
                        sizes="(max-width: 760px) 95vw, 720px"
                        unoptimized
                      />
                    </a>
                    <figcaption>{figure.caption}</figcaption>
                  </figure>
                ),
              }}
            />
          </article>
        </div>
      </div>
    </div>
  );
}
