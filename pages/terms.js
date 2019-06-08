import withData from "../lib/withData";
import React, { Component } from "react";
import { connect } from "react-redux";

class Index extends Component {
  render() {
    return (
      <div>
        <p>GrowReel Terms of Service </p>
        <p>Last Updated: October 10, 2018</p>
        <p>
          1. Who May Use the GrowReel Service AGE REQUIREMENT: You must be at
          least 13 years old to use the GrowReel Service. If you are at least
          13, but are still a minor (this depends on where you live), you must
          have your parent or legal guardian's permission to use the GrowReel
          Service. Please have him or her read this Agreement with you.
        </p>

        <p>
          NOTICE TO PARENTS AND GUARDIANS: By granting your child permission to
          use the GrowReel Service, you agree to the terms of this Agreement on
          behalf of your child. You are responsible for monitoring and
          supervising your child's use of the GrowReel Service. If your child is
          using the GrowReel Service and is either under 13 or does not have
          your permission, please contact us immediately so that we can disable
          his or her access. If you have questions about whether the GrowReel
          Service is appropriate for your child, please review our Frequently
          Asked Questions or contact us.
        </p>

        <p>
          WARNING: Even if you are old enough to use the GrowReel Service and/or
          have your parent's or guardian's permission, some of the content
          available within the GrowReel Service may not be appropriate for you.
          Some content may contain &quot;R-rated&quot; material, nudity,
          profanity, and mature subject matter. If you are under 18, do not view
          such content.
        </p>

        <p>
          2. License to Use the GrowReel Service LICENSE: GrowReel grants you a
          limited, non-exclusive license to access and use the GrowReel Service
          for your own personal, non-commercial purposes. This includes the
          right to view content available on the GrowReel Service. This license
          is personal to you and may not be assigned or sublicensed to anyone
          else.
        </p>

        <p>
          COMMERCIAL USE: You may not use the GrowReel Service for commercial
          purposes unless:
        </p>

        <p>
          You are a GrowReel PRO or higher subscriber, in which case you may use
          and access the GrowReel Service for commercial and non-commercial
          purposes, subject to compliance with the GrowReel Guidelines; or You
          are a small-scale independent production company, non-profit, or
          artist, in which case you may use the GrowReel Service to showcase or
          promote your own creative works. If you sell GrowReel-hosted videos
          directly to users other than through GrowReel On Demand, such usage
          will be deemed an &quot;Application&quot; under our API Terms (whether
          you use our API or not) and will be subject to our API Terms.
        </p>

        <p>
          RESTRICTIONS: Except as expressly permitted by GrowReel in writing,
          you will not scrape, reproduce, redistribute, sell, create derivative
          works from, decompile, reverse engineer, or disassemble the GrowReel
          Service or any source code therein. Nor will you attempt to circumvent
          any of GrowReel's technical measures or take any measures to interfere
          with or damage the GrowReel Service. All rights not expressly granted
          by GrowReel are reserved.
        </p>

        <p>
          MOBILE APP: Your use of the GrowReel Service through one of our mobile
          applications is also subject to our Mobile App Addendum.
        </p>

        <p>
          3. Privacy Your privacy rights are set forth in our Privacy Policy,
          which forms a part of this Agreement. Please review the Privacy Policy
          to learn about:
        </p>

        <p>
          What information we may collect about you; What we use that
          information for; and With whom we share that information. 4.
          Membership REGISTRATION: To fully use the GrowReel Service, you must
          register as a member by providing a user name, password, and valid
          email address. You must provide complete and accurate registration
          information to GrowReel and notify us if your information changes. If
          you are a business, government, or non-profit entity, the person whose
          email address is associated with the account must have the authority
          to bind the entity to this Agreement.
        </p>

        <p>
          USER NAME: We encourage you to use your real name. If you are a
          business, government, or non-profit entity, you must use the actual
          name of your organization. You may not use someone else's name, a name
          that violates any third party right, or a name that is obscene or
          otherwise objectionable.
        </p>

        <p>
          ACCOUNT SECURITY: You are responsible for all activity that occurs
          under your account, including any activity by authorized or
          unauthorized users. You must not allow others to use your account
          credentials and you must safeguard the confidentiality of those
          credentials. If you are using a computer that others have access to,
          you must log out of your account after using the GrowReel Service. If
          you become aware of an unauthorized access to your account, you must
          change your password and notify us immediately.
        </p>

        <p>
          SEAT ACCESS: If you are a PRO or Business subscriber, you may grant
          access to your account to other GrowReel members subject to a seat
          limit. You are responsible for the actions of those persons insofar as
          your account is concerned. If you are a GrowReel member who has been
          granted access to a PRO or Business account, you must comply with the
          terms of this Agreement in accessing that account.
        </p>

        <p>
          5. Subscriptions and Purchases SUBSCRIPTIONS: In addition to offering
          Basic (free) GrowReel memberships, we offer paid subscriptions. Please
          see our subscription pages for current features and pricing. Features
          and prices are subject to change. Storage limits are calculated based
          upon source files. We reserve the right to charge for excessive use of
          bandwidth where plays occur on third-party sites and applications
          outside the native GrowReel player or apps. Anyone who wishes to
          obtain storage capacity beyond what is offered with a particular
          subscription, or additional bandwidth for applications not using the
          GrowReel player may request a custom account. Additional terms and
          conditions (to be shown prior to purchase) apply to custom accounts.
          All fees may be subject to taxes.
        </p>

        <p>
          CANCELATION AND REFUNDS: Users who purchase annual subscriptions have
          thirty (30) days after their purchase to cancel and receive a full
          refund. Users who purchase monthly subscriptions have five (5) days
          after purchase to cancel and receive a full refund. In the case of
          Live subscription products, refunds are not available if the user has
          exceeded the storage or bandwidth threshold set forth in the refund
          policy presented at the time of purchase. After the cancelation period
          ends, all purchases are final and all fees paid are non-refundable,
          even if your account is later terminated by GrowReel. If your account
          is terminated due to your breach of this Agreement during the relevant
          cancelation period, you will not be refunded. If you have questions,
          please contact us.
        </p>

        <p>
          RENEWALS: Subject to the terms hereof, you may choose to renew your
          subscription at the end of the subscription period. By default, all
          subscriptions are set to automatically renew for the same period of
          time as the original subscription. You may decline to renew at any
          time prior to the commencement of a renewal subscription. GrowReel
          reserves the right to deny subscriptions, renewals, and other
          purchases for any reason. Unused storage, plays, and other limits do
          not roll over to subsequent subscription periods.
        </p>

        <p>
          END OF SUBSCRIPTION: When a paid subscription ends, the account
          automatically becomes a Basic (free) account and GrowReel may disable
          access to or delete any content to comply with Basic account limits.
          If you're using GrowReel for commercial purposes, you will need to
          maintain a GrowReel PRO or higher plan to continue hosting your
          videos. Your account and its content may be deleted if your
          subscription is not renewed.
        </p>

        <p>
          OTHER PURCHASES: Purchases of other products and services through the
          GrowReel Service are subject to our Payment Addendum and to other
          terms and conditions that are presented to you at the time of
          purchase.
        </p>

        <p>
          6. Term and Termination; Account Deletion TERM: This Agreement begins
          on the date you first use the GrowReel Service and continues as long
          as you have an account with us.
        </p>

        <p>
          ACCOUNT DELETION: You may delete your account at any time. Basic
          accounts may be deleted from the GrowReel Service if they remain
          inactive (i.e., the user fails to log in) for a continuous period of
          at least six (6) months. Paid subscription accounts will remain active
          until the end of the subscription term and any renewal term.
        </p>

        <p>
          TERMINATION FOR BREACH: GrowReel may suspend, disable, or delete your
          account (or any part thereof) or block or remove any content you
          submitted if GrowReel determines that you have violated any provision
          of this Agreement or that your conduct or content would tend to damage
          GrowReel's reputation and goodwill. If GrowReel deletes your account
          for the foregoing reasons, you may not re-register for the GrowReel
          Service. GrowReel may block your email address and Internet protocol
          address to prevent further registration.
        </p>

        <p>
          EFFECT OF TERMINATION/ACCOUNT DELETION: Upon termination, all licenses
          granted by GrowReel will terminate. Sections 6 and 11 though 16 shall
          survive termination. In the event of account deletion for any reason,
          content that you submitted may no longer be available. GrowReel shall
          not be responsible for the loss of such content.
        </p>

        <p>
          7. Content Restrictions You may not upload, post, or transmit
          (collectively, &quot;submit&quot;) any video, image, text, audio
          recording, or other work (collectively, &quot;content&quot;) that:
        </p>

        <p>
          Infringes any third party's copyrights or other rights (e.g.,
          trademark, privacy rights, etc.); Contains sexually explicit content
          or pornography (provided, however, that non-sexual nudity is
          permitted); Contains hateful, defamatory, or discriminatory content or
          incites hatred against any individual or group; Exploits minors;
          Depicts unlawful acts or extreme violence; Depicts animal cruelty or
          extreme violence towards animals; Promotes fraudulent or dubious
          business schemes; or Violates any law. All videos you submit must also
          comply with the GrowReel Guidelines, which are incorporated into this
          Agreement.
        </p>

        <p>
          8. Code of Conduct In using the GrowReel Service, you must behave in a
          civil and respectful manner at all times. Further, you will not:
        </p>

        <p>
          Act in a deceptive manner by, among other things, impersonating any
          person; Harass or stalk any other person; Harm or exploit minors;
          Distribute &quot;spam&quot;; Collect information about others; or
          Advertise or solicit others to purchase any product or service within
          the GrowReel Site (unless you are an official GrowReel partner or
          advertiser and have a written agreement with GrowReel). GrowReel has
          the right, but not the obligation, to monitor all conduct on and
          content submitted to the GrowReel Service.
        </p>

        <p>
          9. Licenses Granted by You 9.1 Videos LICENSE TO GrowReel: As between
          you and GrowReel, you own the video content (&quot;videos&quot;) that
          you submit to the GrowReel Service. By submitting a video, you grant
          GrowReel and its affiliates a limited, worldwide, non-exclusive,
          royalty-free license and right to copy, transmit, distribute, publicly
          perform and display (through all media now known or hereafter
          created), and make derivative works from your video for the purpose of
          (i) displaying the video within the GrowReel Service; (ii) displaying
          the video on third party websites and applications through a video
          embed or GrowReel's API subject to your video privacy choices; (iii)
          allowing other users to play, download, and embed on third party
          websites the video, subject to your video privacy choices; (iv)
          promoting the GrowReel Service, provided that you have made the video
          publicly available; and (v) archiving or preserving the video for
          disputes, legal proceedings, or investigations.
        </p>

        <p>
          LIVE STREAMS: For the purposes hereof, a &quot;video&quot; includes a
          live stream and you are deemed to have &quot;submitted&quot; a video
          when you live stream any content using the GrowReel Service,
          regardless of whether a permanent copy is created.
        </p>

        <p>
          LICENSE TO OTHER USERS: You further grant all users of the GrowReel
          Service permission to view your videos for their personal,
          non-commercial purposes. This includes the right to copy and make
          derivative works from the videos solely to the extent necessary to
          view the videos. The foregoing licenses are in addition to any license
          you may decide to grant (e.g., a Creative Commons license).
        </p>

        <p>
          DURATION OF LICENSES: The above licenses will continue unless and
          until you remove your videos from the GrowReel Service, in which case
          the licenses will terminate within a commercially reasonable period of
          time. Notwithstanding the foregoing, the license for legal
          archival/preservation purposes will continue indefinitely. Please note
          that removed videos may be cached in search engine indices after
          removal and that GrowReel has no control over such caching.
        </p>

        <p>
          9.2 Non-video Content As between you and GrowReel, you own all
          non-video content that you submit to the GrowReel Service. You grant
          GrowReel and its affiliates a worldwide, perpetual, irrevocable,
          non-exclusive, royalty-free license and right to copy, transmit,
          distribute, publicly perform and display (through all media now known
          or hereafter created), and make derivative works from your non-video
          content. In addition, you waive any so-called &quot;moral rights&quot;
          in your non-video content. You further grant all users of the GrowReel
          Service permission to view your non-video content for their personal,
          non-commercial purposes. If you make suggestions to GrowReel on
          improving or adding new features to the GrowReel Service, GrowReel
          shall have the right to use your suggestions without any compensation
          to you.
        </p>

        <p>
          10. Your Representations and Warranties For each piece of content that
          you submit, you represent and warrant that: (i) you have the right to
          submit the content to GrowReel and grant the licenses set forth above;
          (ii) GrowReel will not need to obtain licenses from any third party or
          pay royalties to any third party; (iii) the content does not infringe
          any third party's rights, including intellectual property rights and
          privacy rights; and (iv) the content complies with this Agreement and
          all applicable laws.
        </p>

        <p>
          11. Indemnification You will indemnify, defend, and hold harmless
          GrowReel and its affiliates, directors, officers, employees, and
          agents, from and against all third party actions that: (i) arise from
          your activities on the GrowReel Service; (ii) assert a violation by
          you of any term of this Agreement; or (iii) assert that any content
          you submitted to GrowReel violates any law or infringes any third
          party right, including any intellectual property or privacy right.
        </p>

        <p>
          12. Third Party Copyrights and Other Rights GrowReel respects the
          intellectual property rights of others. If you believe that your
          copyright has been infringed, please send us a notice as set forth in
          our Copyright and DMCA Policy, which is incorporated into this
          Agreement. For other intellectual property claims, please send us a
          notice at legal[at]GrowReel[dot]com.
        </p>

        <p>
          13. Disclaimers GrowReel reserves the right to modify the GrowReel
          Service. You are responsible for providing your own access (e.g.,
          computer, mobile device, Internet connection, etc.) to the GrowReel
          Service. GrowReel has no obligation to screen or monitor any content
          and does not guarantee that any content available on the GrowReel
          Service complies with this Agreement or is suitable for all users.
        </p>

        <p>
          GrowReel provides the GrowReel Service on an &quot;as is&quot; and
          &quot;as available&quot; basis. You therefore use the GrowReel Service
          at your own risk. GrowReel expressly disclaims any and all warranties
          of any kind, whether express or implied, including, but not limited to
          the implied warranties of merchantability, fitness for a particular
          purpose, non-infringement, and any other warranty that might arise
          under any law. Without limiting the foregoing, GrowReel makes no
          representations or warranties:
        </p>

        <p>
          That the GrowReel Service will be permitted in your jurisdiction; That
          the GrowReel Service will be uninterrupted or error-free; Concerning
          any content submitted by any member; Concerning any third party's use
          of content that you submit; That any content you submit will be made
          available on the GrowReel Service or will be stored by GrowReel; That
          the GrowReel Service will meet your business or professional needs;
          That GrowReel will continue to support any particular feature of the
          GrowReel Service; or Concerning sites and resources outside of the
          GrowReel Service, even if linked to from the GrowReel Service. To the
          extent any disclaimer or limitation of liability does not apply, all
          applicable express, implied, and statutory warranties will be limited
          in duration to a period of thirty (30) days after the date on which
          you first used the GrowReel Service, and no warranties shall apply
          after such period.
        </p>

        <p>
          14. Limitation of Liability To the fullest extent permitted by law:
          (i) GrowReel shall not be liable for any direct, indirect, incidental,
          special, consequential, or exemplary damages, including but not
          limited to damages for loss of profits, goodwill, use, data or other
          intangible losses; and (ii) GrowReel's total liability to you shall
          not exceed the amounts paid by you to GrowReel over the twelve (12)
          months preceding your claim(s).
        </p>

        <p>
          15. Compliance Notice Pursuant to 18 U.S.C. &sect; 2257 All pictures,
          graphics, videos, and other visual media displayed on the GrowReel
          Service are exempt from 18 U.S.C. &sect; 2257 and 28 C.F.R. 75 because
          they do not consist of depictions of conduct as specifically listed in
          18 U.S.C. &sect; 2256 (2) (A) - (D), but are merely, at most,
          depictions of non-sexually explicit nudity, or are depictions of
          simulated sexual conduct, or are otherwise exempt because the visual
          depictions were created prior to July 3, 1995. GrowReel is not the
          primary producer of the visual content contained in the GrowReel
          Service.
        </p>

        <p>
          16. General Provisions GOVERNING LAW: This Agreement shall be governed
          by the laws of the Province of British Columbia, Canada, without
          regard to principles of conflicts of law. The Uniform Commercial Code,
          the Uniform Computer Information Transaction Act, and the United
          Nations Convention of Controls for International Sale of Goods shall
          not apply.
        </p>

        <p>
          DISPUTES: Any action arising out of or relating to this Agreement or
          your use of the GrowReel Service must be commenced in the provincial
          or federal courts located in Vancouver, British Columbia, Canada (and
          you consent to the jurisdiction of those courts). In any such action,
          GrowReel and you irrevocably waive any right to a trial by jury.
        </p>

        <p>
          INTERPRETATION; SEVERABILITY; WAIVER; REMEDIES: Headings are for
          convenience only and shall not be used to construe the terms of this
          Agreement. If any term of this Agreement is found invalid or
          unenforceable by any court of competent jurisdiction, that term will
          be severed from this Agreement. No failure or delay by GrowReel in
          exercising any right hereunder will waive any further exercise of that
          right. GrowReel's rights and remedies hereunder are cumulative and not
          exclusive.
        </p>

        <p>
          SUCCESSORS; ASSIGNMENT; NO THIRD PARTY BENEFICIARIES: This Agreement
          is binding upon and shall inure to the benefit of both parties and
          their respective successors, heirs, executors, administrators,
          personal representatives, and permitted assigns. You may not assign
          this Agreement without GrowReel's prior written consent. No third
          party shall have any rights hereunder.
        </p>

        <p>
          NOTICES: You consent to receive all communications including notices,
          agreements, disclosures, or other information from GrowReel
          electronically. GrowReel may provide all such communications by email
          or by posting them on the GrowReel Service. For support-related
          inquiries, you may contact us. You may send notices of a legal nature
          to GrowReel at legal[at]GrowReel[dot]com or the following address:
        </p>

        <p>
          GrowReel, 112 East 6th Ave., Vancouver, BC, V5T 1J5 Attention: Legal
          Department
        </p>

        <p>
          Nothing herein shall limit GrowReel's right to object to subpoenas,
          claims, or other demands.
        </p>

        <p>
          MODIFICATION: This Agreement may not be modified except by a revised
          Terms of Service posted by GrowReel on the GrowReel Site or a written
          amendment signed by an authorized representative of GrowReel. A
          revised Terms of Service will be effective as of the date it is posted
          on the GrowReel Site.
        </p>

        <p>
          ENTIRE AGREEMENT: This Agreement incorporates the following documents
          by reference:
        </p>

        <p>
          Privacy Policy Cookie Policy Community Guidelines Copyright and DMCA
          Policy This Agreement constitutes the entire understanding between
          GrowReel and you concerning the subject matter hereof and supersedes
          all prior agreements and understandings regarding the same.
          Notwithstanding the foregoing, this Agreement does not govern any use
          of GrowReel's application protocol interface (API), which is governed
          by our API Agreement.{" "}
        </p>
      </div>
    );
  }
}

export default connect(state => state)(withData(Index));
