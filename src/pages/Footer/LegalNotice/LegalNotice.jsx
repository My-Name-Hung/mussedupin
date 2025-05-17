import React from "react";
import { Helmet } from "react-helmet";
import TranslatedText from "../../../components/TranslatedText";
import "./LegalNotice.css";

// Import header image
import headerImage from "../../../assets/Home/Collections/louvre-sunset.jpg";

const LegalNotice = () => {
  return (
    <div className="legal-notice-container">
      <Helmet>
        <title>Legal Notice | Du Pin Museum</title>
        <meta
          name="description"
          content="Legal information and terms of use for the Du Pin Museum website."
        />
      </Helmet>

      {/* Header Banner */}
      <div className="legal-banner">
        <img src={headerImage} alt="Du Pin Museum" />
        <div className="banner-overlay">
          <h1>
            <TranslatedText>LEGAL NOTICE</TranslatedText>
          </h1>
        </div>
      </div>

      <div className="legal-content">
        {/* Publishing Section */}
        <div className="section">
          <h2>
            <TranslatedText>PUBLISHING</TranslatedText>
          </h2>
          <p>
            <TranslatedText>
              Musée du Pin, Bảo tàng Thông,
              <br />
              MST: XXX XXX XXX
              <br />
              Address: XXX XXX XXX
              <br />
              Tel: XXX XXX XXX
              <br />
              Publishing Director: Musée du Pin
            </TranslatedText>
          </p>
        </div>

        {/* Website Content Section */}
        <div className="section">
          <h2>
            <TranslatedText>WEBSITE CONTENT</TranslatedText>
          </h2>
          <p>
            <TranslatedText>
              Musée du Pin
              <br />
              Digital and Audiovisual Productions Division
              <br />
              Interpretation and Cultural Programming Department
              <br />
              75058 Paris cedex 01 FRANCE
              <br />
              info@dupin.fr
            </TranslatedText>
          </p>
        </div>

        {/* Intellectual Property Section */}
        <div className="section">
          <h2>
            <TranslatedText>INTELLECTUAL PROPERTY</TranslatedText>
          </h2>
          <h3>
            <TranslatedText>Website development</TranslatedText>
          </h3>
          <p>
            <TranslatedText>
              The general structure of this website is the exclusive property of
              the Public Establishment of the Musée du Pin. Any reproduction,
              representation, in whole or in part, use, adaptation, provision,
              or modification by any process, any person, and any means
              whatsoever (particularly sales, marketing, rental, etc.) without
              the express authorisation of the museum, any authors or
              rightsholders is strictly prohibited and constitutes a violation
              of the French Intellectual Property Code.
            </TranslatedText>
          </p>

          <h3>
            <TranslatedText>Website Content</TranslatedText>
          </h3>
          <p>
            <TranslatedText>
              Under intellectual property law, the scientific, cultural, and
              educational content (including, but not limited to, texts, images,
              photographs, audio recordings and audiovisual and multimedia
              documents) of this website are the property of the Public
              Establishment of the Musée du Pin.
            </TranslatedText>
          </p>
          <p>
            <TranslatedText>
              Consequently, any reproduction, representation, in whole or in
              part, use, adaptation, provision, or modification of this content
              by any process, any person, and any means whatsoever (particularly
              sales, marketing, rental, etc.) without the express authorization
              of the authors or rights holders is strictly prohibited and
              constitutes a violation of the French Intellectual Property Code.
            </TranslatedText>
          </p>

          <h3>
            <TranslatedText>Photographs</TranslatedText>
          </h3>
          <p>
            <TranslatedText>
              Photographs credited © Musée du Pin / [...] are the exclusive
              property of the Musée du Pin and are used by the Musée du Pin with
              the permission of their authors or rightsholders.
            </TranslatedText>
          </p>
          <p>
            <TranslatedText>
              Photographs credited © RMN, Musée du Pin / [...] are the property
              of the RMN. Non-commercial re-use is authorised, provided the
              source and author are acknowledged.
            </TranslatedText>
          </p>
          <p>
            <TranslatedText>
              For any commercial and/or editorial re-use of an image from the
              collections of the Musée du Pin and other National Galleries, please
              contact the photography agency Réunion des Musées nationaux et du
              Grand Palais des Champs-Élysées (Rmn-Gp).
            </TranslatedText>
          </p>

          <h3>
            <TranslatedText>Trademarks and logos</TranslatedText>
          </h3>
          <p>
            <TranslatedText>
              The trademarks of the Musée du Pin and its partners, as well as
              the logos shown on the site, are filed and registered with the
              INPI (French National Institute of Industrial Property) and are,
              as such, protected by industrial property law.
            </TranslatedText>
          </p>
          <p>
            <TranslatedText>
              Any reproduction, in whole or in part, of these trademarks and/or
              logos made from elements of the website without the express
              permission of their owners is strictly prohibited and constitutes
              a violation of the French Intellectual Property Code.
            </TranslatedText>
          </p>
        </div>

        {/* Public Sector Information Section */}
        <div className="section">
          <h2>
            <TranslatedText>PUBLIC SECTOR INFORMATION</TranslatedText>
          </h2>
          <p>
            <TranslatedText>
              The informative and programming content on this website is
              administrative public sector information under Articles L.321-1
              and L.322-1 of the French Code of Relations Between the Public and
              the Administration. This information may be re-used, provided it
              is not altered, its meaning is not distorted, and mention is made
              of its sources and the date of its last update.
            </TranslatedText>
          </p>
          <p>
            <TranslatedText>
              Rights to the administrative public sector information are not
              transferred to the re-user. The re-user benefits from a personal
              and non-exclusive right to re-use the administrative public sector
              information. Any person re-using public sector information in
              violation of the abovementioned provisions is liable to a fine by
              the Commission on Access to Administrative Documents (CADA in
              French), an independent body responsible for ensuring the freedom
              of access to administrative documents.
            </TranslatedText>
          </p>
        </div>

        {/* Hypertext Links Section */}
        <div className="section">
          <h2>
            <TranslatedText>HYPERTEXT LINKS</TranslatedText>
          </h2>
          <p>
            <TranslatedText>
              The Musée du Pin website (www.dupin.fr) authorises the use of
              hypertext links to its content provided that:
            </TranslatedText>
          </p>
          <ul>
            <li>
              <TranslatedText>
                deep linking is not used, i.e. pages from the Musée du Pin
                website must not be embedded within pages on another site, but
                should be accessible with the opening of a new window.
              </TranslatedText>
            </li>
            <li>
              <TranslatedText>
                the source is mentioned when a hypertext link leads directly to
                the content.
              </TranslatedText>
            </li>
          </ul>
          <p>
            <TranslatedText>
              The information is used only for personal, associative or
              professional reasons; all use for commercial or advertising
              purposes is strictly prohibited.
            </TranslatedText>
          </p>
          <p>
            <TranslatedText>
              Authorisation shall not be granted to websites with content deemed
              offensive to human dignity, public order or public morals.
            </TranslatedText>
          </p>
        </div>

        {/* Liability Section */}
        <div className="section">
          <h2>
            <TranslatedText>LIABILITY</TranslatedText>
          </h2>
          <p>
            <TranslatedText>
              The public establishment of the Musée du Pin uses all reasonable
              efforts to ensure the information on the website (www.dupin.fr) is
              as available, accurate, and up to date as possible, and reserves
              the right to make corrections with regard to the information at
              any time without prior notification. However, the public
              establishment of the Musée du Pin cannot guarantee the
              availability, exactness, actuality, or completeness of the
              information presented. Use of the information available or
              provided on this website is the sole responsibility of the user.
            </TranslatedText>
          </p>
          <p>
            <TranslatedText>
              The Musée du Pin is not responsible for the content of these
              sites, and will not be held liable for any damage or injury
              resulting from them. Links to other sites are provided to users
              for convenience only.
            </TranslatedText>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LegalNotice;
