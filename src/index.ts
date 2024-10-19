/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Bind resources to your worker in `wrangler.toml`. After adding bindings, a type definition for the
 * `Env` object can be regenerated with `npm run cf-typegen`.
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

// 環境変数の定義
interface Env {
    ENV: string;
}

async function wait(seconds: number): Promise<void> {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve();
      }, seconds * 1000);
    });
}

export default {
    async fetch(request, env, ctx): Promise<Response> {
        return new Response('Hello World!');
    },
    // トリガー起動用の処理を追加
    async scheduled(
        controller: ScheduledController,
        env: Env,
        ctx: ExecutionContext,
    ) {
        console.log("トリガー起動により実行されました！！");
        console.log(`ENV: ${env.ENV}`);

        await wait(10);
        console.log("10秒経過");

        await wait(10);
        console.log("さらに10秒経過。完了です。");

    },
} satisfies ExportedHandler<Env>;
