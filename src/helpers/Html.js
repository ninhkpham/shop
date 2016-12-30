import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom/server';
import serialize from 'serialize-javascript';
import Helmet from 'react-helmet';

/**
 * Wrapper component containing HTML metadata and boilerplate tags.
 * Used in server-side code only to wrap the string output of the
 * rendered route component.
 *
 * The only thing this component doesn't (and can't) include is the
 * HTML doctype declaration, which is added to the rendered output
 * by the server.js file.
 */
export default class Html extends Component {
  static propTypes = {
    assets: PropTypes.object,
    component: PropTypes.node,
    store: PropTypes.object
  };

  render() {
    const {assets, component, store} = this.props;
    const content = component ? ReactDOM.renderToString(component) : '';
    const head = Helmet.rewind();

    // const createMarkup = () => {
    //   return {
    //     __html: `
    //       window.fbAsyncInit = function() {
    //         FB.init({
    //           appId      : '1231037623689872',
    //           xfbml      : true,
    //           version    : 'v2.8'
    //         });
    //         FB.AppEvents.logPageView();
    //       };

    //       (function(d, s, id) {
    //         var js, fjs = d.getElementsByTagName(s)[0];
    //         if (d.getElementById(id)) return;
    //         js = d.createElement(s); js.id = id;
    //         js.src = "//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.8&appId=1231037623689872";
    //         fjs.parentNode.insertBefore(js, fjs);
    //       }(document, 'script', 'facebook-jssdk'));
          
            
    //         var statusChangeCallback = function(res) { console.log(JSON.stringify(res)); }

    //         FB.getLoginStatus(function(response) {
    //           statusChangeCallback(response);
    //         });
    //       `
    //   };
    // }

    return (
      <html lang="en-us">
        <head>
          {head.base.toComponent()}
          {head.title.toComponent()}
          {head.meta.toComponent()}
          {head.link.toComponent()}
          {head.script.toComponent()}

          <link rel="shortcut icon" href="/favicon.ico" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          {/* styles (will be present only in production with webpack extract text plugin) */}
          {Object.keys(assets.styles).map((style, key) =>
            <link href={assets.styles[style]} key={key} media="screen, projection"
              rel="stylesheet" type="text/css" charSet="UTF-8" />
          )}

          {/* (will be present only in development mode) */}
          {/* outputs a <style/> tag with all bootstrap styles + App.scss + it could be CurrentPage.scss. */}
          {/* can smoothen the initial style flash (flicker) on page load in development mode. */}
          {/* ideally one could also include here the style for the current page (Home.scss, About.scss, etc) */}
          {Object.keys(assets.styles).length === 0 ? <style dangerouslySetInnerHTML={{ __html: require('../theme/bootstrap.config.js') + require('../containers/App/App.scss')._style }} /> : null}

        </head>
        <body>
          <div id="fb-root"></div>
          <script id="facebook-jssdk" src="//connect.facebook.net/en_US/sdk.js#xfbml=1&amp;version=v2.8&amp;appId=1231037623689872"></script>
          <div id="content" dangerouslySetInnerHTML={{ __html: content }} />
          <script dangerouslySetInnerHTML={{ __html: `window.__data=${serialize(store.getState())};` }} charSet="UTF-8" />
          
          <script src={assets.javascript.main} charSet="UTF-8" />
        </body>
      </html>
    );
  }
}
