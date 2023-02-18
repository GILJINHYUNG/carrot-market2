import {
	NextRequest,
	NextFetchEvent,
	userAgent,
	NextResponse,
} from "next/server";

export default function middleware(req: NextRequest, ev: NextFetchEvent) {
	if (req.nextUrl.pathname.startsWith("/chats")) {
		console.log("chats Only middleware");
	}
	const ua = userAgent(req);
	if (ua?.isBot) {
		return new Response("Plz don't be a bot. Be human.", { status: 403 });
	}
	if (req.nextUrl.pathname.startsWith("/api")) {
		if (!req.url.includes("/enter") && !req.cookies.get("carrotsession")) {
			console.log("carrotsession");
			NextResponse.redirect(`${req.nextUrl.origin}/enter`);
		}
	}
	return NextResponse.next();
}
