import Layout from "@components/layout";
import matter from "gray-matter";
import { readdirSync, readFileSync } from "fs";
import { NextPage } from "next";
import Link from "next/link";

interface Post {
	title: string;
	date: string;
	category: string;
	slug: string;
}

const Blog: NextPage<{ posts: Post[] }> = ({ posts }) => {
	return (
		<Layout title="Blog" seoTitle="Blog">
			<div className="space-x-5">
				{" "}
				<h1 className="font-semibold text-xl mt-5 mb-10 text-center">
					Latest Posts:
				</h1>
				<ul>
					{posts.map((post, index) => (
						<div key={index} className="mb-5">
							<Link href={`/blog/${post.slug}`}>
								<span className="text-lg text-orange-500">{post.title}</span>
								<div>
									<span>
										{post.date} / {post.category}
									</span>
								</div>
							</Link>
						</div>
					))}
				</ul>
			</div>
		</Layout>
	);
};

export async function getStaticProps() {
	const blogPosts = readdirSync("./posts").map((file) => {
		const content = readFileSync(`./posts/${file}`, "utf-8");
		const [slug, _] = file.split(".");
		return { ...matter(content).data, slug };
	});
	console.log(blogPosts);
	return {
		props: { posts: blogPosts },
	};
}

export default Blog;
