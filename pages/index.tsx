import FloatingButton from "@components/floating-button";
import Item from "@components/item";
import Layout from "@components/layout";
import useUser from "@libs/client/useUser";
import { Product } from "@prisma/client";
import Head from "next/head";
import Image from "next/image";
import useSWR, { SWRConfig } from "swr";
import client from "@libs/server/client";
import { NextPage } from "next";

export interface ProductWithCount extends Product {
	_count: {
		favs: number;
	};
}

interface ProductResponse {
	ok: boolean;
	products: ProductWithCount[];
}
const Home: NextPage = () => {
	const { user, isLoading } = useUser();
	const { data } = useSWR<ProductResponse>("/api/products");
	return (
		<Layout title="홈" hasTabBar>
			<div className="flex flex-col space-y-5 divide-y">
				<Head>
					<title>Home</title>
				</Head>
				{data?.products.map((product) => (
					<Item
						image={product.image}
						id={product.id}
						key={product.id}
						title={product.name}
						price={product.price}
						hearts={product._count?.favs || 0}
					/>
				))}
				<FloatingButton href="/products/upload">
					<svg
						className="h-6 w-6"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						aria-hidden="true"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
							d="M12 6v6m0 0v6m0-6h6m-6 0H6"
						/>
					</svg>
				</FloatingButton>
			</div>
		</Layout>
	);
};

const Page: NextPage<{ products: ProductWithCount[] }> = ({ products }) => {
	return (
		<SWRConfig
			value={{
				fallback: {
					"/api/products": {
						ok: true,
						products,
					},
				},
			}}
		>
			<Home />
		</SWRConfig>
	);
};

export async function getServerSideProps() {
	console.log("SSR");
	const products = await client.product.findMany({});
	console.log(products);
	return {
		props: {
			products: JSON.parse(JSON.stringify(products)),
		},
	};
}

export default Page;
