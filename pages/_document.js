import React from 'react'
import Document, {Head, Html, NextScript, Main} from 'next/document'
import createEmotionServer from '@emotion/server/create-instance'
import createCache from '@emotion/cache'

export default class MyDocument extends Document {
  render () {
    return (
      <Html lang='en'>
        <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
          <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap" rel="stylesheet"/>
        </Head>
        <body>
        <Main>  
          <NextScript/>
        </Main>
        </body>
      </Html>
    )
  }
}


MuDocument.getInitialProps = async (ctx) => {
  const originalRenderPage = ctx.renderPage
  const cache = createCache({key:'css'});
  const {extractCriticalToChunks} = createEmotionServer(cache);
  ctx.renderPage = () => oroginalRenderPage({
    enhaceApp: (App) => (props) => <App emotionCache={cache} {..props}/>
  });
  const initialProps = await Document.getInitialProps(ctx);
  const emotionStyles = extractCriticalToChunks(initialProps.html);
  const emotionStyleTags = emotionStyles.styles.map((style) => (
    <style data-emotion={`${style.key} ${style.ids.join(' ')}`} key={style.key} 
    dangerouslySetInnerHTML = {{_html:style.css}}
    />
    
    
  ));
  return {
    ...initialProps, 
    styles: [
      ...React.Children.toArray(initialProps.styles),
      ...emotionStyleTags,
    ],
  }
}