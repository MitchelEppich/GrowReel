import withData from "../lib/withData";
import React, { Component } from "react";
import { connect } from "react-redux";

class Index extends Component {
  render() {
    return (
      <div>
        <p>GrowReel Cookie Policy </p>
        <p>Last Updated: October 10, 2018</p>

        <p>
          GrowReel, Inc. (&quot;GrowReel&quot;, &quot;we&quot;, or
          &quot;us&quot;) uses cookies and similar tracking technologies on
          GrowReel.com (and related sites), GrowReel-branded applications for
          connected devices (&quot;apps&quot;), and the GrowReel embeddable
          video player. By using our websites, apps, or video player, you
          consent to the placement and use of cookies and similar technologies
          on your device. This Cookie Policy forms part of the GrowReel Privacy
          Policy.
        </p>

        <p>
          Cookie Basics A cookie is a small text file that is stored in your web
          browser that allows GrowReel or a third party to recognize you using a
          unique identifier.
        </p>

        <p>
          Who sets them: First-party cookies are set by GrowReel. Third-party
          cookies are set by companies other than GrowReel, such as analytics
          providers and advertisers.
        </p>

        <p>
          What they do: &quot;Essential&quot; cookies enable services we offer.
          &quot;Non-essential&quot; cookies help us understand how our services
          are being used (i.e., analytics) and deliver advertisements. Some
          cookies may track you across multiple websites you visit (including
          ones not operated by us) to help deliver advertisements that may be
          relevant to you.
        </p>

        <p>
          How long they last: Cookies may be either &quot;session&quot; or
          &quot;persistent.&quot; A session cookie expires (i.e., is deleted)
          when you close your browser. A persistent cookie remains until it
          expires or you delete the cookies via your browser settings.
          Expiration dates are set in the cookies themselves and may vary in
          length, depending on the purpose of the cookie.
        </p>

        <p>
          Cookies Found on GrowReel Service We use all types of cookies in our
          web-based services.
        </p>

        <p>
          GrowReel websites: When you visit a GrowReel website, GrowReel and
          third parties will set cookies in your browser. GrowReel sets
          essential cookies to enable certain features and remember your
          preferences. For example, cookies keep you logged in, allow you to
          purchase items, and maintain your language and volume settings. Third
          parties set cookies for both essential and non-essential purposes
          including analytics (e.g., Google Analytics) and advertising (e.g.,
          Google DoubleClick for Publishers).
        </p>

        <p>
          GrowReel video player: GrowReel&rsquo;s embeddable video player uses
          first-party cookies that we consider essential to the video player
          experience. We do not use third-party analytics or advertising cookies
          when our video player appears on a third-party website. Please note
          that a third-party website may place cookies of its own. We have no
          control over third-party websites or the cookies they set.
        </p>

        <p>
          Changing Your Cookie Preferences You may limit the cookies set in your
          browser by taking the steps described below. Note that declining
          cookies may impact your ability to use our services.
        </p>

        <p>
          Browser settings: You may change your browser&rsquo;s settings to
          delete cookies that have already been set and to reject new cookies.
          To learn more, visit the help pages of your browser:
        </p>

        <p>
          Firefox Chrome Safari Microsoft Edge Internet Explorer You may also
          visit our sites in your browser&rsquo;s &quot;private&quot; or
          &quot;incognito&quot; mode, in which case cookies will be set, but
          deleted when you close browser.
        </p>

        <p>
          Third party advertising opt-outs: Certain third parties provide ways
          to opt out of advertising cookies across multiple sites. You can learn
          more by visiting the sites of the Network Advertising Initiative
          (https://optout.networkadvertising.org) or the Digital Advertising
          Alliance (https://www.aboutads.info). In addition, there are third
          party plug-ins and apps that help manage cookies.
        </p>

        <p>
          Google cookies: Google provides ways to manage or opt out certain of
          its advertising cookies (https://adssettings.google.com) and analytics
          cookies (https://tools.google.com/dlpage/gaoptout). You may read
          Google&rsquo;s Privacy Policy at https://policies.google.com/privacy.
        </p>

        <p>
          Similar Technologies We use technologies that resemble cookies to help
          track user activities and preferences. For example, we may use web
          beacons (tiny graphics with a unique identifier embedded on web pages
          or emails) to track your activities and communicate with cookies. You
          cannot opt out of web beacons used on webpages, but you can limit
          their use by opting out of the cookies they interact with. You can opt
          out of web beacons used in emails by setting your email client to
          render emails in text mode only.
        </p>

        <p>
          Mobile Apps Our apps (e.g., for iOS, tvOS, Android, and Roku) do not
          use cookies, but may use tracking technologies to, for example,
          authenticate you as a registered user, allow you to use the
          app&rsquo;s features, and help us understand how our apps are being
          used. You cannot opt out of these mobile tracking technologies, but
          you may delete your apps and use the web versions of our services
          instead.GrowReel Cookie Policy Last Updated: October 10, 2018
        </p>

        <p>
          GrowReel, Inc. (&quot;GrowReel&quot;, &quot;we&quot;, or
          &quot;us&quot;) uses cookies and similar tracking technologies on
          GrowReel.com (and related sites), GrowReel-branded applications for
          connected devices (&quot;apps&quot;), and the GrowReel embeddable
          video player. By using our websites, apps, or video player, you
          consent to the placement and use of cookies and similar technologies
          on your device. This Cookie Policy forms part of the GrowReel Privacy
          Policy.
        </p>

        <p>
          Cookie Basics A cookie is a small text file that is stored in your web
          browser that allows GrowReel or a third party to recognize you using a
          unique identifier.
        </p>

        <p>
          Who sets them: First-party cookies are set by GrowReel. Third-party
          cookies are set by companies other than GrowReel, such as analytics
          providers and advertisers.
        </p>

        <p>
          What they do: &quot;Essential&quot; cookies enable services we offer.
          &quot;Non-essential&quot; cookies help us understand how our services
          are being used (i.e., analytics) and deliver advertisements. Some
          cookies may track you across multiple websites you visit (including
          ones not operated by us) to help deliver advertisements that may be
          relevant to you.
        </p>

        <p>
          How long they last: Cookies may be either &quot;session&quot; or
          &quot;persistent.&quot; A session cookie expires (i.e., is deleted)
          when you close your browser. A persistent cookie remains until it
          expires or you delete the cookies via your browser settings.
          Expiration dates are set in the cookies themselves and may vary in
          length, depending on the purpose of the cookie.
        </p>

        <p>
          Cookies Found on GrowReel Service We use all types of cookies in our
          web-based services.
        </p>

        <p>
          GrowReel websites: When you visit a GrowReel website, GrowReel and
          third parties will set cookies in your browser. GrowReel sets
          essential cookies to enable certain features and remember your
          preferences. For example, cookies keep you logged in, allow you to
          purchase items, and maintain your language and volume settings. Third
          parties set cookies for both essential and non-essential purposes
          including analytics (e.g., Google Analytics) and advertising (e.g.,
          Google DoubleClick for Publishers).
        </p>

        <p>
          GrowReel video player: GrowReel&rsquo;s embeddable video player uses
          first-party cookies that we consider essential to the video player
          experience. We do not use third-party analytics or advertising cookies
          when our video player appears on a third-party website. Please note
          that a third-party website may place cookies of its own. We have no
          control over third-party websites or the cookies they set.
        </p>

        <p>
          Changing Your Cookie Preferences You may limit the cookies set in your
          browser by taking the steps described below. Note that declining
          cookies may impact your ability to use our services.
        </p>

        <p>
          Browser settings: You may change your browser&rsquo;s settings to
          delete cookies that have already been set and to reject new cookies.
          To learn more, visit the help pages of your browser:
        </p>

        <p>
          Firefox Chrome Safari Microsoft Edge Internet Explorer You may also
          visit our sites in your browser&rsquo;s &quot;private&quot; or
          &quot;incognito&quot; mode, in which case cookies will be set, but
          deleted when you close browser.
        </p>

        <p>
          Third party advertising opt-outs: Certain third parties provide ways
          to opt out of advertising cookies across multiple sites. You can learn
          more by visiting the sites of the Network Advertising Initiative
          (https://optout.networkadvertising.org) or the Digital Advertising
          Alliance (https://www.aboutads.info). In addition, there are third
          party plug-ins and apps that help manage cookies.
        </p>

        <p>
          Google cookies: Google provides ways to manage or opt out certain of
          its advertising cookies (https://adssettings.google.com) and analytics
          cookies (https://tools.google.com/dlpage/gaoptout). You may read
          Google&rsquo;s Privacy Policy at https://policies.google.com/privacy.
        </p>

        <p>
          Similar Technologies We use technologies that resemble cookies to help
          track user activities and preferences. For example, we may use web
          beacons (tiny graphics with a unique identifier embedded on web pages
          or emails) to track your activities and communicate with cookies. You
          cannot opt out of web beacons used on webpages, but you can limit
          their use by opting out of the cookies they interact with. You can opt
          out of web beacons used in emails by setting your email client to
          render emails in text mode only.
        </p>

        <p>
          Mobile Apps Our apps (e.g., for iOS, tvOS, Android, and Roku) do not
          use cookies, but may use tracking technologies to, for example,
          authenticate you as a registered user, allow you to use the
          app&rsquo;s features, and help us understand how our apps are being
          used. You cannot opt out of these mobile tracking technologies, but
          you may delete your apps and use the web versions of our services
          instead.
        </p>
      </div>
    );
  }
}

export default connect(state => state)(withData(Index));
