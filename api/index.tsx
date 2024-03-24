import { Button, Frog } from "@airstack/frog";
import { devtools } from "@airstack/frog/dev";
import { serveStatic } from "@hono/node-server/serve-static";
import { handle } from "@airstack/frog/vercel";

export const app = new Frog({
  apiKey: process.env.AIRSTACK_API_KEY as string,
  assetsPath: "/",
  basePath: "/api",
});

app.frame("/", async (c) => {
  const { status } = c;
  return c.res({
    image: (
      <div
        style={{
          color: "white",
          display: "flex",
          fontSize: 40,
        }}
      >
        {status === "initial" ? "Initial Frame" : "Response Frame"}
      </div>
    ),
    intents: [status === "initial" && <Button>Click Here</Button>],
  });
});

devtools(app, { serveStatic });
export const GET = handle(app);
export const POST = handle(app);
