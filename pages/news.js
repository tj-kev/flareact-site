import Link from "flareact/link";
import PageLayout from "../components/PageLayout";

export async function getEdgeProps() {
  const context = require.context("../news/", true, /\.md$/);

  const posts = context.keys().map((key) => {
    const post = context(key);

    return {
      slug: key.replace(/^\.\//, "").replace(/\.md$/, ""),
      ...post.attributes,
    };
  });

  return {
    props: {
      posts: posts.sort((a, b) => new Date(a.date) - new Date(b.date)),
    },
    revalidate: 60 * 10,
  };
}

export default function News({ posts }) {
  return (
    <PageLayout>
      <div className="relative max-w-lg mx-auto divide-y-2 divide-gray-200 lg:max-w-7xl">
        <div>
          <h2 className="text-3xl tracking-tight font-extrabold text-gray-900 sm:text-4xl">
            News
          </h2>
          <div className="mt-3 sm:mt-4 lg:grid lg:grid-cols-2 lg:gap-5 lg:items-center">
            <p className="text-xl text-gray-500">
              The latest on Flareact news, releases, development and more.
            </p>
          </div>
        </div>
        <div className="mt-6 pt-10 grid gap-16 lg:grid-cols-2 lg:gap-x-5 lg:gap-y-12">
          {posts.map((post) => (
            <div key={post.slug}>
              <p className="text-sm text-gray-500">
                <time dateTime={post.date}>{post.date}</time>
              </p>
              <Link href="/news/[slug]" as={`/news/${post.slug}`}>
                <a className="mt-2 block">
                  <p className="text-xl font-semibold text-gray-900">
                    {post.title}
                  </p>
                </a>
              </Link>
              <div className="mt-3">
                <Link href="/news/[slug]" as={`/news/${post.slug}`}>
                  <a className="text-base font-semibold text-indigo-600 hover:text-indigo-500">
                    View post
                  </a>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </PageLayout>
  );
}
