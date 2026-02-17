import { createHandler, StartServer } from "@solidjs/start/server";

export default createHandler(() => (
  <StartServer
    document={({ assets, children, scripts }) => (
      <html lang="en" class="min-h-screen bg-[url('/bkground.jpg')] bg-cover bg-fixed bg-center">
        <head>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <title>web-memo</title>
          <link rel="icon" href="/favicon.ico" />
          {assets}
        </head>
        <body class="m-0 min-h-screen bg-[linear-gradient(to_bottom,#fff_100px,transparent_700px)] pt-[130px] pb-5 font-sans text-[14px] leading-6">
          <div id="app">{children}</div>
          {scripts}
        </body>
      </html>
    )}
  />
));
