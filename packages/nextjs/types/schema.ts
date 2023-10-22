export const domain = {
  name: "Nounce",
  version: "1",
  chainId: 31337,
  verifyingContract: "0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC",
} as const;

// The named list of all type definitions
export const types = {
  Person: [
    { name: "type", type: "string" },
    { name: "name", type: "string" },
    { name: "url", type: "string" },
  ],

  NewsArticle: [
    { name: "context", type: "string" },
    { name: "type", type: "string" },
    { name: "headline", type: "string" },
    { name: "url", type: "string" },
    { name: "author", type: "Person[]" },
    { name: "image", type: "string[]" },
    { name: "datePublished", type: "string" },
  ],
  Event: [
    { name: "context", type: "string" },
    { name: "type", type: "string" },
    { name: "name", type: "string" },
    { name: "startDate", type: "string" },
    { name: "endDate", type: "string" },
    { name: "eventAttendanceMode", type: "string" },
    { name: "eventStatus", type: "string" },
    // {
    //     name: 'location',
    //     type: [
    //         { name: '@type', type: 'string' },
    //         { name: 'name', type: 'string' },
    //         {
    //             name: 'address',
    //             type: [
    //                 { name: '@type', type: 'string' },
    //                 { name: 'streetAddress', type: 'string' },
    //                 { name: 'addressLocality', type: 'string' },
    //                 { name: 'postalCode', type: 'string' },
    //                 { name: 'addressRegion', type: 'string' },
    //                 { name: 'addressCountry', type: 'string' },
    //             ],
    //         },
    //     ],
    // },
    { name: "image", type: "string[]" },
    { name: "description", type: "string" },
    // {
    //     name: 'offers',
    //     type: [
    //         { name: '@type', type: 'string' },
    //         { name: 'url', type: 'string' },
    //         { name: 'price', type: 'string' },
    //         { name: 'priceCurrency', type: 'string' },
    //         { name: 'availability', type: 'string' },
    //         { name: 'validFrom', type: 'string' },
    //     ],
    // },

    // { name: 'performer', type: 'Performer' },
    // {
    //     name: 'organizer',
    //     type: [
    //         { name: '@type', type: 'string' },
    //         { name: 'name', type: 'string' },
    //         { name: 'url', type: 'string' },
    //     ],
    // },
  ],
  ImageObject: [
    { name: "@context", type: "string" },
    { name: "@type", type: "string" },
    { name: "description", type: "string" },
    { name: "contentUrl", type: "string" },
    { name: "license", type: "string" },
    { name: "acquireLicensePage", type: "string" },
    { name: "creditText", type: "string" },
    // {
    //     name: 'creator',
    //     type: [
    //         { name: '@type', type: 'string' },
    //         { name: 'name', type: 'string' },
    //     ],
    // },
    { name: "copyrightNotice", type: "string" },
  ],
  VideoObject: [
    { name: "@context", type: "string" },
    { name: "@type", type: "string" },
    { name: "contentURL", type: "string" },
    { name: "description", type: "string" },
    { name: "duration", type: "string" },
    { name: "embedUrl", type: "string" },
    { name: "expires", type: "string" },
    { name: "regionsAllowed", type: "string" },
    // {
    //     name: 'interactionStatistic',
    //     type: [
    //         { name: '@type', type: 'string' },
    //         {
    //             name: 'interactionType',
    //             type: [{ name: '@type', type: 'string' }],
    //         },
    //         { name: 'userInteractionCount', type: 'number' },
    //     ],
    // },
    { name: "name", type: "string" },
    { name: "thumbnailUrl", type: "string" },
    { name: "uploadDate", type: "string" },
    // {
    //     name: 'publication',
    //     type: [
    //         { name: '@type', type: 'string' },
    //         { name: 'isLiveBroadcast', type: 'boolean' },
    //         { name: 'startDate', type: 'string' },
    //         { name: 'endDate', type: 'string' },
    //     ],
    // },
  ],
} as const;
