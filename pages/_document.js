import Document, { Head, Main, NextScript } from "next/document";
import { JSONLD, Generic } from "react-structured-data";

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <html lang="en-us">
        <Head>
          <meta
            name="google-site-verification"
            content="t0wCI7UJ2sznUlhXMSCN0VfgX98d3ig6imiXco5i1iA"
          />
          <meta name="theme-color" content="#79B83E" />
          <title>GrowReel</title>
          <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
          <meta charSet="UTF-8" />
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
            key="viewport"
          />
          <meta httpEquiv="ScreenOrientation" content="autoRotate:disabled" />
          <meta name="robots" content="index, follow" />
          <meta
            name="keywords"
            content="video, growing, plant videos, plants, gardening"
          />
          <meta
            name="description"
            content="GrowReel is a video platform for growers and gardening enthusiasts."
          />
          <meta
            name="copyright"
            content="GrowReel is a registered trademark of GrowReel, Inc."
          />
          <meta
            name="p:domain_verify"
            content="5268890094d2b39407d49233a10276b6"
          />
          <link rel="manifest" href="/_next/static/manifest.json" />
          <link rel="stylesheet" href="/_next/static/style.css" />
          <link rel="icon" href="static/favicon.ico" />

          <JSONLD>
            <Generic
              type="webApplication"
              jsonldtype="WebApplication"
              schema={{
                applicationCategory: "Multimedia",
                browserRequirements: "requires HTML5 support"
              }}
            />
          </JSONLD>
        </Head>
        <body id="body">
          <Main />
          <NextScript />
          <noscript>
            <div className="w-full flex-1 h-screen content-center text-center">
              {/* <FontAwesomeIcon icon={faExclamationTriangle} className="img-error " /> */}
              <img
                src="../static/images/Thumbnail.png"
                alt="No JavaScript"
                className="img-error"
              />
              <h1 className="mt-10 title-message">JavaScript is Required.</h1>
              <h3 className="mt-2 subtitle-message">
                Enable JavaScript in your browser and try again.
              </h3>
            </div>
          </noscript>
        </body>
      </html>
    );
  }
}
