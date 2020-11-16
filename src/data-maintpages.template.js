// All relevant info describing the structure of our error pages and maintenance pages.
// An aliases.json files gets generated, mapping our one maintenance folder page to all aliases defined here.
// Aliases down here should be the complete list for as found in the BM: Merchant Tools > SEO > Aliases.
// Maintenance pages can only be published through the production instance.
// Example, setting the development instance to maintenance will look for a file that is uploaded through production. Previewing is possible though
// Currently only Prod environment is needed, multiple envs can be defined here. See readme for details.
// Copy this file and remove '.template' from filename
module.exports = {
    page: {
      'index.html': {
        pageTitle: "yoursfccsite.com - Site tijdelijk offline",
        partial: 'maintenance.html',
      }
    },
    aliases: {
      prod: {
        secondary: [
          "yoursfccsite.com",
          "production-eu01-yoursfccsite.demandware.net",
          "winkel.yoursfccsite.com",
          "staging-eu01-yoursfccsite.demandware.net",
          "staging-winkel.yoursfccsite.com",
          "development-eu01-yoursfccsite.demandware.net",
          "beta.yoursfccsite.com",
          "development-winkel.yoursfccsite.com",
          "development.yoursfccsite.com",
          "staging.yoursfccsite.com"
        ],
        primary: "www.yoursfccsite.com"
      }
    }
  }

