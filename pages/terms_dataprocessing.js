import withData from "../lib/withData";
import React, { Component } from "react";
import { connect } from "react-redux";

class Index extends Component {
  render() {
    return (
      <div>
        <p>GrowReel Data Processing and Security Terms (Customers)</p>
        <p>Last modified: Oct 10, 2018</p>

        <p>
          The customer agreeing to these terms (&ldquo;Customer&rdquo;), and
          GrowReel, or any other entity that directly or indirectly controls, is
          controlled by, or is under common control with GrowReel (as
          applicable, &ldquo;GrowReel&rdquo;), have entered into an agreement
          under which GrowReel has agreed to provide GrowReel and related
          technical support to Customer (as amended from time to time, the
          &quot;Agreement&quot;).
        </p>

        <p>
          These Data Processing and Security Terms, including their appendices
          (the &ldquo;Terms&rdquo;) will be effective and replace any previously
          applicable data processing and security terms as from the Terms
          Effective Date (as defined below).
        </p>

        <p>
          These Terms supplement the Agreement. Where the Agreement was entered
          into offline with GrowReel Ireland Limited, these Terms supersede the
          &ldquo;Privacy&rdquo; Clause in that agreement (if applicable).
        </p>

        <p>
          1. Introduction These Terms reflect the parties&rsquo; agreement with
          respect to the terms governing the processing and security of Customer
          Data under the Agreement.
        </p>

        <p>
          2. Definitions 2.1 Capitalized terms used but not defined in these
          Terms have the meanings set out in the Agreement. In these Terms,
          unless stated otherwise:
        </p>

        <p>
          Additional Security Controls means security resources, features,
          functionality and/or controls that Customer may use at its option
          and/or as it determines, including the Admin Console and other
          features and/or functionality of the Services such as encryption,
          logging and monitoring, identity and access management, security
          scanning, and firewalls. Agreed Liability Cap means the maximum
          monetary or payment-based amount at which a party&rsquo;s liability is
          capped under the Agreement, either per annual period or event giving
          rise to liability, as applicable. Alternative Transfer Solution means
          a solution, other than the Model Contract Clauses, that enables the
          lawful transfer of personal data to a third country in accordance with
          Article 45 or 46 of the GDPR. Audited Services means the Services
          indicated as being in-scope for the relevant certification, as may be
          updated by GrowReel from time to time, provided that GrowReel may only
          remove a Deprecation Policy Service from such URL if that Service has
          been discontinued in accordance with the Deprecation Policy. Customer
          Data has the meaning given in the Agreement or, if no such meaning is
          given, means data provided by or on behalf of Customer or Customer End
          Users via the Services under the Account. Customer End Users has the
          meaning given in the Agreement or, if not such meaning is given, has
          the meaning given to &ldquo;End Users&rdquo; in the Agreement.
          Customer Personal Data means the personal data contained within the
          Customer Data. Data Incident means a breach of GrowReel&rsquo;s
          security leading to the accidental or unlawful destruction, loss,
          alteration, unauthorized disclosure of, or access to, Customer Data on
          systems managed by or otherwise controlled by GrowReel. &ldquo;Data
          Incidents&rdquo; will not include unsuccessful attempts or activities
          that do not compromise the security of Customer Data, including
          unsuccessful log-in attempts, pings, port scans, denial of service
          attacks, and other network attacks on firewalls or networked systems.
          EEA means the European Economic Area. European Data Protection
          Legislation means, as applicable: (a) the GDPR; and/or (b) the Federal
          Data Protection Act of 19 June 1992 (Switzerland). GDPR means
          Regulation (EU) 2016/679 of the European Parliament and of the Council
          of 27 April 2016 on the protection of natural persons with regard to
          the processing of personal data and on the free movement of such data,
          and repealing Directive 95/46/EC. GrowReel&rsquo;s Third Party Auditor
          means a GrowReel-appointed, qualified and independent third party
          auditor, whose then-current identity GrowReel will disclose to
          Customer. ISO 27001 Certification means an ISO/IEC 27001:2013
          certification or a comparable certification for the Audited Services.
          ISO 27017 Certification means an ISO/IEC 27017:2015 certification or a
          comparable certification for the Audited Services. ISO 27018
          Certification means an ISO/IEC 27018:2014 certification or a
          comparable certification for the Audited Services. Model Contract
          Clauses or MCCs mean the standard data protection clauses for the
          transfer of personal data to processors established in third countries
          which do not ensure an adequate level of data protection, as described
          in Article 46 of the GDPR. Non-European Data Protection Legislation
          means data protection or privacy legislation in force outside the
          European Economic Area and Switzerland. Notification Email Address
          means the email address(es) designated by Customer in the Admin
          Console, or in the Order Form or Ordering Document (as applicable), to
          receive certain notifications from GrowReel. Security Documentation
          means all documents and information made available by GrowReel under
          Section 7.5.1 (Reviews of Security Documentation). Security Measures
          has the meaning given in Section 7.1.1 (GrowReel&rsquo;s Security
          Measures). SOC 2 Report means a confidential Service Organization
          Control (SOC) 2 report (or a comparable report) on GrowReel&rsquo;s
          systems examining logical security controls, physical security
          controls, and system availability, as produced by GrowReel&rsquo;s
          Third Party Auditor in relation to the Audited Services. SOC 3 Report
          means a Service Organization Control (SOC) 3 report (or a comparable
          report), as produced by GrowReel&rsquo;s Third Party Auditor in
          relation to the Audited Services. Subprocessors means third parties
          authorized under these Terms to have logical access to and process
          Customer Data in order to provide parts of the Services and TSS. Term
          means the period from the Terms Effective Date until the end of
          GrowReel&rsquo;s provision of the Services, including, if applicable,
          any period during which provision of the Services may be suspended and
          any post-termination period during which GrowReel may continue
          providing the Services for transitional purposes. Terms Effective Date
          means the date on which Customer accepted, or the parties otherwise
          agreed to, these Terms. 2.2 The terms &ldquo;personal data&rdquo;,
          &ldquo;data subject&rdquo;, &ldquo;processing&rdquo;,
          &ldquo;controller&rdquo;, &ldquo;processor&rdquo; and
          &ldquo;supervisory authority&rdquo; as used in these Terms have the
          meanings given in the GDPR, and the terms &ldquo;data importer&rdquo;
          and &ldquo;data exporter&rdquo; have the meanings given in the Model
          Contract Clauses, in each case irrespective of whether the European
          Data Protection Legislation or Non-European Data Protection
          Legislation applies.
        </p>

        <p>
          3. Duration of these Terms These Terms will take effect on the Terms
          Effective Date and, notwithstanding expiry of the Term, will remain in
          effect until, and automatically expire upon, deletion of all Customer
          Data by GrowReel as described in these Terms.
        </p>

        <p>
          4. Scope of Data Protection Legislation 4.1 Application of European
          Legislation. The parties acknowledge and agree that the European Data
          Protection Legislation will apply to the processing of Customer
          Personal Data if, for example:
        </p>

        <p>
          the processing is carried out in the context of the activities of an
          establishment of Customer in the territory of the EEA; and/or the
          Customer Personal Data is personal data relating to data subjects who
          are in the EEA and the processing relates to the offering to them of
          goods or services in the EEA or the monitoring of their behaviour in
          the EEA. 4.2 Application of Non-European Legislation. The parties
          acknowledge and agree that Non-European Data Protection Legislation
          may also apply to the processing of Customer Personal Data.
        </p>

        <p>
          4.3 Application of Terms. Except to the extent these Terms state
          otherwise, these Terms will apply irrespective of whether the European
          Data Protection Legislation or Non-European Data Protection
          Legislation applies to the processing of Customer Personal Data.
        </p>

        <p>
          5. Processing of Data 5.1 Roles and Regulatory Compliance;
          Authorization.
        </p>

        <p>
          5.1.1 Processor and Controller Responsibilities. If the European Data
          Protection Legislation applies to the processing of Customer Personal
          Data, the parties acknowledge and agree that:
        </p>

        <p>
          the subject matter and details of the processing are described in
          Appendix 1; GrowReel is a processor of that Customer Personal Data
          under the European Data Protection Legislation; Customer is a
          controller or processor, as applicable, of that Customer Personal Data
          under European Data Protection Legislation; and each party will comply
          with the obligations applicable to it under the European Data
          Protection Legislation with respect to the processing of that Customer
          Personal Data. 5.1.2 Authorization by Third Party Controller. If the
          European Data Protection Legislation applies to the processing of
          Customer Personal Data and Customer is a processor, Customer warrants
          to GrowReel that Customer&rsquo;s instructions and actions with
          respect to that Customer Personal Data, including its appointment of
          GrowReel as another processor, have been authorized by the relevant
          controller.
        </p>

        <p>
          5.1.3 Responsibilities under Non-European Legislation. If Non-European
          Data Protection Legislation applies to either party&rsquo;s processing
          of Customer Personal Data, the parties acknowledge and agree that the
          relevant party will comply with any obligations applicable to it under
          that legislation with respect to the processing of that Customer
          Personal Data.
        </p>

        <p>5.2 Scope of Processing.</p>

        <p>
          5.2.1 Customer&rsquo;s Instructions. By entering into these Terms,
          Customer instructs GrowReel to process Customer Personal Data only in
          accordance with applicable law: (a) to provide the Services and TSS;
          (b) as further specified via Customer&rsquo;s use of the Services
          (including the Admin Console and other functionality of the Services)
          and TSS; (c) as documented in the form of the Agreement, including
          these Terms; and (d) as further documented in any other written
          instructions given by Customer and acknowledged by GrowReel as
          constituting instructions for purposes of these Terms.
        </p>

        <p>
          5.2.2 GrowReel&rsquo;s Compliance with Instructions. GrowReel will
          comply with the instructions described in Section 5.2.1
          (Customer&rsquo;s Instructions) (including with regard to data
          transfers) unless EU or EU Member State law to which GrowReel is
          subject requires other processing of Customer Personal Data by
          GrowReel, in which case GrowReel will inform Customer (unless that law
          prohibits GrowReel from doing so on important grounds of public
          interest) via the Notification Email Address.
        </p>

        <p>
          6. Data Deletion 6.1 Deletion by Customer. GrowReel will enable
          Customer to delete Customer Data during the Term in a manner
          consistent with the functionality of the Services. If Customer uses
          the Services to delete any Customer Data during the Term and that
          Customer Data cannot be recovered by Customer, this use will
          constitute an instruction to GrowReel to delete the relevant Customer
          Data from GrowReel&rsquo;s systems in accordance with applicable law.
          GrowReel will comply with this instruction as soon as reasonably
          practicable and within a maximum period of 180 days, unless EU or EU
          Member State law requires storage.
        </p>

        <p>
          6.2 Deletion on Termination. On expiry of the Term, Customer instructs
          GrowReel to delete all Customer Data (including existing copies) from
          GrowReel&rsquo;s systems in accordance with applicable law. GrowReel
          will, after a recovery period of up to 30 days following such expiry,
          comply with this instruction as soon as reasonably practicable and
          within a maximum period of 180 days, unless EU or EU Member State law
          requires storage. Without prejudice to Section 9.1 (Access;
          Rectification; Restricted Processing; Portability), Customer
          acknowledges and agrees that Customer will be responsible for
          exporting, before the Term expires, any Customer Data it wishes to
          retain afterwards.
        </p>

        <p>
          7. Data Security 7.1 GrowReel&rsquo;s Security Measures, Controls and
          Assistance.
        </p>

        <p>
          7.1.1 GrowReel&rsquo;s Security Measures. GrowReel will implement and
          maintain technical and organizational measures to protect Customer
          Data against accidental or unlawful destruction, loss, alteration,
          unauthorized disclosure or access as described in Appendix 2 (the
          &quot;Security Measures&quot;). As described in Appendix 2, the
          Security Measures include measures to encrypt personal data; to help
          ensure ongoing confidentiality, integrity, availability and resilience
          of GrowReel&rsquo;s systems and services; to help restore timely
          access to personal data following an incident; and for regular testing
          of effectiveness. GrowReel may update or modify the Security Measures
          from time to time provided that such updates and modifications do not
          result in the degradation of the overall security of the Services.
        </p>

        <p>
          7.1.2 Security Compliance by GrowReel Staff. GrowReel will take
          appropriate steps to ensure compliance with the Security Measures by
          its employees, contractors and Subprocessors to the extent applicable
          to their scope of performance, including ensuring that all persons
          authorized to process Customer Personal Data have committed themselves
          to confidentiality or are under an appropriate statutory obligation of
          confidentiality.
        </p>

        <p>
          7.1.3 Additional Security Controls. In addition to the Security
          Measures, GrowReel will make the Additional Security Controls
          available to: (a) allow Customer to take steps to secure Customer
          Data; and (b) provide Customer with information about securing,
          accessing and using Customer Data.
        </p>

        <p>
          7.1.4 GrowReel&rsquo;s Security Assistance. Customer agrees that
          GrowReel will (taking into account the nature of the processing of
          Customer Personal Data and the information available to GrowReel)
          assist Customer in ensuring compliance with any of Customer&rsquo;s
          obligations in respect of security of personal data and personal data
          breaches, including if applicable Customer&rsquo;s obligations
          pursuant to Articles 32 to 34 (inclusive) of the GDPR, by:
        </p>

        <p>
          implementing and maintaining the Security Measures in accordance with
          Section 7.1.1 (GrowReel&rsquo;s Security Measures); making the
          Additional Security Controls available to Customer in accordance with
          Section 7.1.3 (Additional Security Controls); complying with the terms
          of Section 7.2 (Data Incidents); and providing Customer with the
          Security Documentation in accordance with Section 7.5.1 (Reviews of
          Security Documentation) and the information contained in the Agreement
          including these Terms. 7.2 Data Incidents
        </p>

        <p>
          7.2.1 Incident Notification. If GrowReel becomes aware of a Data
          Incident, GrowReel will: (a) notify Customer of the Data Incident
          promptly and without undue delay after becoming aware of the Data
          Incident; and (b) promptly take reasonable steps to minimize harm and
          secure Customer Data.
        </p>

        <p>
          7.2.2 Details of Data Incident. Notifications made pursuant to this
          section will describe, to the extent possible, details of the Data
          Incident, including steps taken to mitigate the potential risks and
          steps GrowReel recommends Customer take to address the Data Incident.
        </p>

        <p>
          7.2.3 Delivery of Notification. Notification(s) of any Data
          Incident(s) will be delivered to the Notification Email Address or, at
          GrowReel&rsquo;s discretion, by direct communication (for example, by
          phone call or an in-person meeting). Customer is solely responsible
          for ensuring that the Notification Email Address is current and valid.
        </p>

        <p>
          7.2.4 No Assessment of Customer Data by GrowReel. GrowReel will not
          assess the contents of Customer Data in order to identify information
          subject to any specific legal requirements. Without prejudice to
          GrowReel&rsquo;s obligations under this Section 7.2 (Data Incidents),
          Customer is solely responsible for complying with incident
          notification laws applicable to Customer and fulfilling any third
          party notification obligations related to any Data Incident(s).
        </p>

        <p>
          7.2.5 No Acknowledgement of Fault by GrowReel. GrowReel&rsquo;s
          notification of or response to a Data Incident under this Section 7.2
          (Data Incidents) will not be construed as an acknowledgement by
          GrowReel of any fault or liability with respect to the Data Incident.
        </p>

        <p>7.3 Customer&rsquo;s Security Responsibilities and Assessment.</p>

        <p>
          7.3.1 Customer&rsquo;s Security Responsibilities. Customer agrees
          that, without prejudice to GrowReel&rsquo;s obligations under Section
          7.1 (GrowReel&rsquo;s Security Measures, Controls and Assistance) and
          Section 7.2 (Data Incidents):
        </p>

        <p>
          Customer is solely responsible for its use of the Services, including:
          making appropriate use of the Services and the Additional Security
          Controls to ensure a level of security appropriate to the risk in
          respect of the Customer Data; securing the account authentication
          credentials, systems and devices Customer uses to access the Services;
          backing up its Customer Data as appropriate; and GrowReel has no
          obligation to protect copies of Customer Data that Customer elects to
          store or transfer outside of GrowReel&rsquo;s and its
          Subprocessors&rsquo; systems (for example, offline or on-premises
          storage), or to protect Customer Data by implementing or maintaining
          Additional Security Controls except to the extent Customer has opted
          to use them. 7.3.2 Customer&rsquo;s Security Assessment.
        </p>

        <p>
          Customer is solely responsible for reviewing the Security
          Documentation and evaluating for itself whether the Services, the
          Security Measures, the Additional Security Controls and
          GrowReel&rsquo;s commitments under this Section 7 (Data Security) will
          meet Customer&rsquo;s needs, including with respect to any security
          obligations of Customer under the European Data Protection Legislation
          and/or Non-European Data Protection Legislation, as applicable.
          Customer acknowledges and agrees that (taking into account the state
          of the art, the costs of implementation and the nature, scope, context
          and purposes of the processing of Customer Personal Data as well as
          the risks to individuals) the Security Measures implemented and
          maintained by GrowReel as set out in Section 7.1.1 (GrowReel&rsquo;s
          Security Measures) provide a level of security appropriate to the risk
          in respect of the Customer Data. 7.4 Security Certifications and
          Reports. GrowReel will do the following to evaluate and help ensure
          the continued effectiveness of the Security Measures:
        </p>

        <p>
          maintain the ISO 27001 Certification, ISO 27017 Certification and ISO
          27018 Certification; and update the SOC 2 Report and SOC 3 Report at
          least once every 18 months. 7.5 Reviews and Audits of Compliance
        </p>

        <p>
          7.5.1 Reviews of Security Documentation. In addition to the
          information contained in the Agreement (including these Terms),
          GrowReel will make available for review by Customer the following
          documents and information to demonstrate compliance by GrowReel with
          its obligations under these Terms:
        </p>

        <p>
          the certificates issued in relation to the ISO 27001 Certification,
          the ISO 27017 Certification and the ISO 27018 Certification; the
          then-current SOC 3 Report; and the then-current SOC 2 Report,
          following a request by Customer in accordance with Section 7.5.3(a).
          7.5.2 Customer&rsquo;s Audit Rights.
        </p>

        <p>
          If the European Data Protection Legislation applies to the processing
          of Customer Personal Data, GrowReel will allow Customer or an
          independent auditor appointed by Customer to conduct audits (including
          inspections) to verify GrowReel&rsquo;s compliance with its
          obligations under these Terms in accordance with Section 7.5.3
          (Additional Business Terms for Reviews and Audits). GrowReel will
          contribute to such audits as described in Section 7.4 (Security
          Certifications and Reports) and this Section 7.5 (Reviews and Audits
          of Compliance). If Customer has entered into Model Contract Clauses as
          described in Section 10.2 (Transfers of Data Out of the EEA), GrowReel
          will, without prejudice to any audit rights of a supervisory authority
          under such Model Contract Clauses, allow Customer or an independent
          auditor appointed by Customer to conduct audits as described in the
          Model Contract Clauses in accordance with Section 7.5.3 (Additional
          Business Terms for Reviews and Audits). Customer may also conduct an
          audit to verify GrowReel&rsquo;s compliance with its obligations under
          these Terms by reviewing the Security Documentation (which reflects
          the outcome of audits conducted by GrowReel&rsquo;s Third Party
          Auditor). 7.5.3 Additional Business Terms for Reviews and Audits.
        </p>

        <p>
          Customer must send any requests for reviews of the SOC 2 Report under
          Section 7.5.1(c) or audits under Section 7.5.2(a) or 7.5.2(b) to
          GrowReel&rsquo;s Data Protection Team as described in Section 12 (Data
          Protection Team; Processing Records). Following receipt by GrowReel of
          a request under Section 7.5.3(a), GrowReel and Customer will discuss
          and agree in advance on: (i) the reasonable date(s) of and security
          and confidentiality controls applicable to any review of the SOC 2
          Report under Section 7.5.1(c); and (ii) the reasonable start date,
          scope and duration of and security and confidentiality controls
          applicable to any audit under Section 7.5.2(a) or 7.5.2(b). GrowReel
          may charge a fee (based on GrowReel&rsquo;s reasonable costs) for any
          review of the SOC 2 Report under Section 7.5.1(c) and/or audit under
          Section 7.5.2(a) or 7.5.2(b). GrowReel will provide Customer with
          further details of any applicable fee, and the basis of its
          calculation, in advance of any such review or audit. Customer will be
          responsible for any fees charged by any auditor appointed by Customer
          to execute any such audit. GrowReel may object in writing to an
          auditor appointed by Customer to conduct any audit under Section
          7.5.2(a) or 7.5.2(b) if the auditor is, in GrowReel&rsquo;s reasonable
          opinion, not suitably qualified or independent, a competitor of
          GrowReel, or otherwise manifestly unsuitable. Any such objection by
          GrowReel will require Customer to appoint another auditor or conduct
          the audit itself. 7.5.4 No Modification of MCCs. Nothing in this
          Section 7.5 (Reviews and Audits of Compliance) varies or modifies any
          rights or obligations of Customer or GrowReel under any Model Contract
          Clauses entered into as described in Section 10.2 (Transfers of Data
          Out of the EEA).
        </p>

        <p>
          8. Impact Assessments and Consultations Customer agrees that GrowReel
          will (taking into account the nature of the processing and the
          information available to GrowReel) assist Customer in ensuring
          compliance with any obligations of Customer in respect of data
          protection impact assessments and prior consultation, including if
          applicable Customer&rsquo;s obligations pursuant to Articles 35 and 36
          of the GDPR, by:
        </p>

        <p>
          providing the Additional Security Controls in accordance with Section
          7.1.3 (Additional Security Controls) and the Security Documentation in
          accordance with Section 7.5.1 (Reviews of Security Documentation); and
          providing the information contained in the Agreement including these
          Terms. 9. Data Subject Rights; Data Export 9.1 Access; Rectification;
          Restricted Processing; Portability. During the Term, GrowReel will, in
          a manner consistent with the functionality of the Services, enable
          Customer to access, rectify and restrict processing of Customer Data,
          including via the deletion functionality provided by GrowReel as
          described in Section 6.1 (Deletion by Customer), and to export
          Customer Data.
        </p>

        <p>9.2 Data Subject Requests</p>

        <p>
          9.2.1 Customer&rsquo;s Responsibility for Requests. During the Term,
          if GrowReel receives any request from a data subject in relation to
          Customer Personal Data, GrowReel will advise the data subject to
          submit their request to Customer and Customer will be responsible for
          responding to any such request including, where necessary, by using
          the functionality of the Services.
        </p>

        <p>
          9.2.2 GrowReel&rsquo;s Data Subject Request Assistance. Customer
          agrees that GrowReel will (taking into account the nature of the
          processing of Customer Personal Data) assist Customer in fulfilling
          any obligation to respond to requests by data subjects, including if
          applicable Customer&rsquo;s obligation to respond to requests for
          exercising the data subject&rsquo;s rights laid down in Chapter III of
          the GDPR, by:
        </p>

        <p>
          providing the Additional Security Controls in accordance with Section
          7.1.3 (Additional Security Controls); and complying with the
          commitments set out in Section 9.1 (Access; Rectification; Restricted
          Processing; Portability) and Section 9.2.1 (Customer&rsquo;s
          Responsibility for Requests). 10. Data Transfers 10.1 Data Storage and
          Processing Facilities Customer may select where certain Customer Data
          will be stored (the &quot;Data Location Selection&quot;), and GrowReel
          will store it there in accordance with the Service Specific Terms. If
          a Data Location Selection is not covered by the Service Specific Terms
          (or a Data Location Selection is not made by Customer in respect of
          any Customer Data), GrowReel may, subject to Section 10.2 (Transfers
          of Data Out of the EEA), store and process the relevant Customer Data
          anywhere GrowReel or its Subprocessors maintains facilities.
        </p>

        <p>10.2 Transfers of Data Out of the EEA.</p>

        <p>
          10.2.1 GrowReel&rsquo;s Transfer Obligations. If the storage and/or
          processing of Customer Personal Data involves transfers of Customer
          Personal Data out of the EEA, and the European Data Protection
          Legislation applies to the transfers of such data (&ldquo;Transferred
          Personal Data&rdquo;), GrowReel will:
        </p>

        <p>
          if requested to do so by Customer, ensure that GrowReel as the data
          importer of the Transferred Personal Data enters into Model Contract
          Clauses with Customer as the data exporter of such data, and that the
          transfers are made in accordance with such Model Contract Clauses;
          and/or offer an Alternative Transfer Solution, ensure that the
          transfers are made in accordance with such Alternative Transfer
          Solution, and make information available to Customer about such
          Alternative Transfer Solution. 10.2.2 Customer&rsquo;s Transfer
          Obligations. In respect of Transferred Personal Data, Customer agrees
          that:
        </p>

        <p>
          if under the European Data Protection Legislation GrowReel reasonably
          requires Customer to enter into Model Contract Clauses in respect of
          such transfers, Customer will do so; and if under the European Data
          Protection Legislation GrowReel reasonably requires Customer to use an
          Alternative Transfer Solution offered by GrowReel, and reasonably
          requests that Customer take any action (which may include execution of
          documents) strictly required to give full effect to such solution,
          Customer will do so. 10.3 Data Center Information.{" "}
        </p>

        <p>
          10.4 Disclosure of Confidential Information Containing Personal Data.
          If Customer has entered into Model Contract Clauses as described in
          Section 10.2 (Transfers of Data Out of the EEA), GrowReel will,
          notwithstanding any term to the contrary in the Agreement, ensure that
          any disclosure of Customer's Confidential Information containing
          personal data, and any notifications relating to any such disclosures,
          will be made in accordance with such Model Contract Clauses.
        </p>

        <p>
          11. Subprocessors 11.1 Consent to Subprocessor Engagement. Customer
          specifically authorizes the engagement as Subprocessors of: (a) those
          entities listed as of the Terms Effective Date at the URL specified in
          Section 11.2 (Information about Subprocessors); and (b) all other
          GrowReel Affiliates from time to time. In addition, Customer generally
          authorizes the engagement as Subprocessors of any other third parties
          (&ldquo;New Third Party Subprocessors&rdquo;). If Customer has entered
          into Model Contract Clauses as described in Section 10.2 (Transfers of
          Data Out of the EEA), the above authorizations will constitute
          Customer&rsquo;s prior written consent to the subcontracting by
          GrowReel of the processing of Customer Data if such consent is
          required under the Model Contract Clauses.
        </p>

        <p>
          11.2 Requirements for Subprocessor Engagement. When engaging any
          Subprocessor, GrowReel will:
        </p>

        <p>
          ensure via a written contract that: the Subprocessor only accesses and
          uses Customer Data to the extent required to perform the obligations
          subcontracted to it, and does so in accordance with the Agreement
          (including these Terms) and any Model Contract Clauses entered into or
          Alternative Transfer Solution adopted by GrowReel as described in
          Section 10.2 (Transfers of Data Out of the EEA); and if the GDPR
          applies to the processing of Customer Personal Data, the data
          protection obligations set out in Article 28(3) of the GDPR, as
          described in these Terms, are imposed on the Subprocessor; and remain
          fully liable for all obligations subcontracted to, and all acts and
          omissions of, the Subprocessor. 11.3 Opportunity to Object to
          Subprocessor Changes.
        </p>

        <p>
          When any New Third Party Subprocessor is engaged during the Term,
          GrowReel will, at least 30 days before the New Third Party
          Subprocessor processes any Customer Data, inform Customer of the
          engagement (including the name and location of the relevant
          subprocessor and the activities it will perform) by sending an email
          to the Notification Email Address. Customer may object to any New
          Third Party Subprocessor by terminating the Agreement immediately upon
          written notice to GrowReel, on condition that Customer provides such
          notice within 90 days of being informed of the engagement of the
          subprocessor as described in Section 11.4(a). This termination right
          is Customer&rsquo;s sole and exclusive remedy if Customer objects to
          any New Third Party Subprocessor. 12. Data Protection Team; Processing
          Records
        </p>

        <p>
          12.1 GrowReel&rsquo;s Processing Records. Customer acknowledges that
          GrowReel is required under the GDPR to: (a) collect and maintain
          records of certain information, including the name and contact details
          of each processor and/or controller on behalf of which GrowReel is
          acting and, where applicable, of such processor&rsquo;s or
          controller's local representative and data protection officer; and (b)
          make such information available to the supervisory authorities.
          Accordingly, if the GDPR applies to the processing of Customer
          Personal Data, Customer will, where requested, provide such
          information to GrowReel via the Admin Console or other means provided
          by GrowReel, and will use the Admin Console or such other means to
          ensure that all information provided is kept accurate and up-to-date.
        </p>

        <p>
          13. Liability 13.1 Liability Cap. If Model Contract Clauses have been
          entered into as described in Section 10.2 (Transfers of Data Out of
          the EEA), the total combined liability of either party and its
          Affiliates towards the other party and its Affiliates under or in
          connection with the Agreement and such Model Contract Clauses combined
          will be limited to the Agreed Liability Cap for the relevant party,
          subject to Section 13.2 (Liability Cap Exclusions).
        </p>

        <p>
          13.2 Liability Cap Exclusions. Nothing in Section 13.1 (Liability Cap)
          will affect the remaining terms of the Agreement relating to liability
          (including any specific exclusions from any limitation of liability).
        </p>

        <p>
          14. Third Party Beneficiary Notwithstanding anything to the contrary
          in the Agreement, where GrowReel is not a party to the Agreement,
          GrowReel will be a third party beneficiary of Section 7.5 (Reviews and
          Audits of Compliance), Section 11.1 (Consent to Subprocessor
          Engagement) and Section 13 (Liability) of these Terms.
        </p>

        <p>
          15. Effect of These Terms Notwithstanding anything to the contrary in
          the Agreement, to the extent of any conflict or inconsistency between
          these Terms and the remaining terms of the Agreement, these Terms will
          govern.
        </p>

        <p>
          Appendix 1: Subject Matter and Details of the Data Processing Subject
          Matter
        </p>

        <p>GrowReel&rsquo;s provision of the Services and TSS to Customer.</p>

        <p>Duration of the Processing</p>

        <p>
          The Term plus the period from the expiry of the Term until deletion of
          all Customer Data by GrowReel in accordance with the Terms.
        </p>

        <p>Nature and Purpose of the Processing</p>

        <p>
          GrowReel will process Customer Personal Data for the purposes of
          providing the Services and TSS to Customer in accordance with the
          Terms.
        </p>

        <p>Categories of Data</p>

        <p>
          Data relating to individuals provided to GrowReel via the Services, by
          (or at the direction of) Customer or by Customer End Users.
        </p>

        <p>Data Subjects</p>

        <p>
          Data subjects include the individuals about whom data is provided to
          GrowReel via the Services by (or at the direction of) Customer or by
          Customer End Users.
        </p>

        <p>
          Appendix 2: Security Measures As from the Terms Effective Date,
          GrowReel will implement and maintain the Security Measures set out in
          this Appendix 2. GrowReel may update or modify such Security Measures
          from time to time provided that such updates and modifications do not
          result in the degradation of the overall security of the Services.
        </p>

        <p>1. Data Center and Network Security</p>

        <p>(a) Data Centers.</p>

        <p>
          Infrastructure. GrowReel maintains geographically distributed data
          centers. GrowReel stores all production data in physically secure data
          centers.
        </p>

        <p>
          Redundancy. Infrastructure systems have been designed to eliminate
          single points of failure and minimize the impact of anticipated
          environmental risks. Dual circuits, switches, networks or other
          necessary devices help provide this redundancy. The Services are
          designed to allow GrowReel to perform certain types of preventative
          and corrective maintenance without interruption. All environmental
          equipment and facilities have documented preventative maintenance
          procedures that detail the process for and frequency of performance in
          accordance with the manufacturer&rsquo;s or internal specifications.
          Preventative and corrective maintenance of the data center equipment
          is scheduled through a standard change process according to documented
          procedures.
        </p>

        <p>
          Power. The data center electrical power systems are designed to be
          redundant and maintainable without impact to continuous operations, 24
          hours a day, 7 days a week. In most cases, a primary as well as an
          alternate power source, each with equal capacity, is provided for
          critical infrastructure components in the data center. Backup power is
          provided by various mechanisms such as uninterruptible power supplies
          (UPS) batteries, which supply consistently reliable power protection
          during utility brownouts, blackouts, over voltage, under voltage, and
          out-of-tolerance frequency conditions. If utility power is
          interrupted, backup power is designed to provide transitory power to
          the data center, at full capacity, for up to 10 minutes until the
          diesel generator systems take over. The diesel generators are capable
          of automatically starting up within seconds to provide enough
          emergency electrical power to run the data center at full capacity
          typically for a period of days.
        </p>

        <p>
          Server Operating Systems. GrowReel servers use a Linux based
          implementation customized for the application environment. Data is
          stored using proprietary algorithms to augment data security and
          redundancy. GrowReel employs a code review process to increase the
          security of the code used to provide the Services and enhance the
          security products in production environments.
        </p>

        <p>
          Businesses Continuity. GrowReel replicates data over multiple systems
          to help to protect against accidental destruction or loss. GrowReel
          has designed and regularly plans and tests its business continuity
          planning/disaster recovery programs.
        </p>

        <p>(b) Networks and Transmission.</p>

        <p>
          Data Transmission. Data centers are typically connected via high-speed
          private links to provide secure and fast data transfer between data
          centers. This is designed to prevent data from being read, copied,
          altered or removed without authorization during electronic transfer or
          transport or while being recorded onto data storage media. GrowReel
          transfers data via Internet standard protocols.
        </p>

        <p>
          External Attack Surface. GrowReel employs multiple layers of network
          devices and intrusion detection to protect its external attack
          surface. GrowReel considers potential attack vectors and incorporates
          appropriate purpose built technologies into external facing systems.
        </p>

        <p>
          Intrusion Detection. Intrusion detection is intended to provide
          insight into ongoing attack activities and provide adequate
          information to respond to incidents. GrowReel&rsquo;s intrusion
          detection involves:
        </p>

        <p>
          tightly controlling the size and make-up of GrowReel&rsquo;s attack
          surface through preventative measures; employing intelligent detection
          controls at data entry points; and employing technologies that
          automatically remedy certain dangerous situations. Incident Response.
          GrowReel monitors a variety of communication channels for security
          incidents, and GrowReel&rsquo;s security personnel will react promptly
          to known incidents.
        </p>

        <p>
          Encryption Technologies. GrowReel makes HTTPS encryption (also
          referred to as SSL or TLS connection) available. GrowReel servers
          support ephemeral elliptic curve Diffie-Hellman cryptographic key
          exchange signed with RSA and ECDSA. These perfect forward secrecy
          (PFS) methods help protect traffic and minimize the impact of a
          compromised key, or a cryptographic breakthrough.
        </p>

        <p>2. Access and Site Controls</p>

        <p>(a) Site Controls.</p>

        <p>
          On-site Data Center Security Operation. GrowReel&rsquo;s data centers
          maintain an on-site security operation responsible for all physical
          data center security functions 24 hours a day, 7 days a week. The
          on-site security operation personnel monitor closed circuit TV (CCTV)
          cameras and all alarm systems. On-site security operation personnel
          perform internal and external patrols of the data center regularly.
        </p>

        <p>
          Data Center Access Procedures. GrowReel maintains formal access
          procedures for allowing physical access to the data centers. The data
          centers are housed in facilities that require electronic card key
          access, with alarms that are linked to the on-site security operation.
          All entrants to the data center are required to identify themselves as
          well as show proof of identity to on-site security operations. Only
          authorized employees, contractors and visitors are allowed entry to
          the data centers. Only authorized employees and contractors are
          permitted to request electronic card key access to these facilities.
          Data center electronic card key access requests must be made through
          e-mail, and require the approval of the requestor&rsquo;s manager and
          the data center director. All other entrants requiring temporary data
          center access must: (i) obtain approval in advance from the data
          center managers for the specific data center and internal areas they
          wish to visit; (ii) sign in at on-site security operations; and (iii)
          reference an approved data center access record identifying the
          individual as approved.
        </p>

        <p>
          On-site Data Center Security Devices. GrowReel&rsquo;s data centers
          employ an electronic card key and biometric access control system that
          is linked to a system alarm. The access control system monitors and
          records each individual&rsquo;s electronic card key and when they
          access perimeter doors, shipping and receiving, and other critical
          areas. Unauthorized activity and failed access attempts are logged by
          the access control system and investigated, as appropriate. Authorized
          access throughout the business operations and data centers is
          restricted based on zones and the individual&rsquo;s job
          responsibilities. The fire doors at the data centers are alarmed. CCTV
          cameras are in operation both inside and outside the data centers. The
          positioning of the cameras has been designed to cover strategic areas
          including, among others, the perimeter, doors to the data center
          building, and shipping/receiving. On-site security operations
          personnel manage the CCTV monitoring, recording and control equipment.
          Secure cables throughout the data centers connect the CCTV equipment.
          Cameras record on site via digital video recorders 24 hours a day, 7
          days a week. The surveillance records are retained for up to 30 days
          based on activity.
        </p>

        <p>(b) Access Control.</p>

        <p>
          Infrastructure Security Personnel. GrowReel has, and maintains, a
          security policy for its personnel, and requires security training as
          part of the training package for its personnel. GrowReel&rsquo;s
          infrastructure security personnel are responsible for the ongoing
          monitoring of GrowReel&rsquo;s security infrastructure, the review of
          the Services, and responding to security incidents.
        </p>

        <p>
          Access Control and Privilege Management. Customer&rsquo;s
          administrators must authenticate themselves via a central
          authentication system or via a single sign on system in order to
          administer the Services.
        </p>

        <p>
          Internal Data Access Processes and Policies &ndash; Access Policy.
          GrowReel&rsquo;s internal data access processes and policies are
          designed to prevent unauthorized persons and/or systems from gaining
          access to systems used to process personal data. GrowReel designs its
          systems to (i) only allow authorized persons to access data they are
          authorized to access; and (ii) ensure that personal data cannot be
          read, copied, altered or removed without authorization during
          processing, use and after recording. The systems are designed to
          detect any inappropriate access. GrowReel employs a centralized access
          management system to control personnel access to production servers,
          and only provides access to a limited number of authorized personnel.
          LDAP, Kerberos and a proprietary system utilizing SSH certificates are
          designed to provide GrowReel with secure and flexible access
          mechanisms. These mechanisms are designed to grant only approved
          access rights to site hosts, logs, data and configuration information.
          GrowReel requires the use of unique user IDs, strong passwords, two
          factor authentication and carefully monitored access lists to minimize
          the potential for unauthorized account use. The granting or
          modification of access rights is based on: the authorized
          personnel&rsquo;s job responsibilities; job duty requirements
          necessary to perform authorized tasks; and a need to know basis. The
          granting or modification of access rights must also be in accordance
          with GrowReel&rsquo;s internal data access policies and training.
          Approvals are managed by workflow tools that maintain audit records of
          all changes. Access to systems is logged to create an audit trail for
          accountability. Where passwords are employed for authentication (e.g.,
          login to workstations), password policies that follow at least
          industry standard practices are implemented. These standards include
          restrictions on password reuse and sufficient password strength. For
          access to extremely sensitive information (e.g. credit card data),
          GrowReel uses hardware tokens.
        </p>

        <p>3. Data</p>

        <p>
          (a) Data Storage, Isolation and Logging. GrowReel stores data in a
          multi-tenant environment on GrowReel servers. The data and file system
          architecture are replicated between multiple geographically dispersed
          data centers. GrowReel also logically isolates the Customer&rsquo;s
          data. Customer will be given control over specific data sharing
          policies. Those policies, in accordance with the functionality of the
          Services, will enable Customer to determine the product sharing
          settings applicable to Customer End Users for specific purposes.
          Customer may choose to make use of certain logging capability that
          GrowReel may make available via the Services.
        </p>

        <p>
          (b) Decommissioned Disks and Disk Erase Policy. Disks containing data
          may experience performance issues, errors or hardware failure that
          lead them to be decommissioned (&ldquo;Decommissioned Disk&rdquo;).
          Every Decommissioned Disk is subject to a series of data destruction
          processes (the &ldquo;Disk Erase Policy&rdquo;) before leaving
          GrowReel&rsquo;s premises either for reuse or destruction.
          Decommissioned Disks are erased in a multi-step process and verified
          complete by at least two independent validators. The erase results are
          logged by the Decommissioned Disk&rsquo;s serial number for tracking.
          Finally, the erased Decommissioned Disk is released to inventory for
          reuse and redeployment. If, due to hardware failure, the
          Decommissioned Disk cannot be erased, it is securely stored until it
          can be destroyed. Each facility is audited regularly to monitor
          compliance with the Disk Erase Policy.
        </p>

        <p>4. Personnel Security</p>

        <p>
          GrowReel personnel are required to conduct themselves in a manner
          consistent with the company&rsquo;s guidelines regarding
          confidentiality, business ethics, appropriate usage, and professional
          standards. GrowReel conducts reasonably appropriate backgrounds checks
          to the extent legally permissible and in accordance with applicable
          local labor law and statutory regulations.
        </p>

        <p>
          Personnel are required to execute a confidentiality agreement and must
          acknowledge receipt of, and compliance with, GrowReel&rsquo;s
          confidentiality and privacy policies. Personnel are provided with
          security training. Personnel handling Customer Data are required to
          complete additional requirements appropriate to their role (eg.,
          certifications). GrowReel&rsquo;s personnel will not process Customer
          Data without authorization.
        </p>

        <p>5. Subprocessor Security</p>

        <p>
          Before onboarding Subprocessors, GrowReel conducts an audit of the
          security and privacy practices of Subprocessors to ensure
          Subprocessors provide a level of security and privacy appropriate to
          their access to data and the scope of the services they are engaged to
          provide. Once GrowReel has assessed the risks presented by the
          Subprocessor, then subject to the requirements set out in Section 11.3
          (Requirements for Subprocessor Engagement) of these Terms, the
          Subprocessor is required to enter into appropriate security,
          confidentiality and privacy contract terms.
        </p>
      </div>
    );
  }
}

export default connect(state => state)(withData(Index));
