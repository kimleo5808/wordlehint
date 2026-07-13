"use client";

import Script from "next/script";

// EEA member states + UK + CH + EEA-adjacent territories where the EU user
// consent policy applies. Google Consent Mode v2 region codes (ISO 3166-2).
const CONSENT_REQUIRED_REGIONS = [
  "AT", "BE", "BG", "HR", "CY", "CZ", "DK", "EE", "FI", "FR", "DE", "GR",
  "HU", "IS", "IE", "IT", "LV", "LI", "LT", "LU", "MT", "NL", "NO", "PL",
  "PT", "RO", "SK", "SI", "ES", "SE", "GB", "CH",
];

/**
 * Google Consent Mode v2 defaults. Must run before gtag.js / adsbygoogle.js
 * process the dataLayer, hence beforeInteractive. Storage is denied by
 * default in EEA/UK/CH until the Google-certified CMP (AdSense Privacy &
 * messaging) records a choice; granted elsewhere.
 */
const ConsentDefaults = () => {
  return (
    <Script
      id="consent-defaults"
      strategy="beforeInteractive"
      dangerouslySetInnerHTML={{
        __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('consent', 'default', {
            ad_storage: 'denied',
            ad_user_data: 'denied',
            ad_personalization: 'denied',
            analytics_storage: 'denied',
            wait_for_update: 500,
            region: ${JSON.stringify(CONSENT_REQUIRED_REGIONS)}
          });
          gtag('consent', 'default', {
            ad_storage: 'granted',
            ad_user_data: 'granted',
            ad_personalization: 'granted',
            analytics_storage: 'granted'
          });
          gtag('set', 'ads_data_redaction', true);
          gtag('set', 'url_passthrough', true);
        `,
      }}
    />
  );
};

export default ConsentDefaults;
