// All relevant info describing the structure of our error pages and maintenance pages.
// An aliases.json files gets generated, mapping our one maintenance folder page to all aliases defined here.
// Aliases down here should be the complete list for as found in the BM: Merchant Tools > SEO > Aliases.
// Maintenance pages can only be published through the production instance.
// Example, setting the development instance to maintenance will look for a file that is uploaded through production. Previewing is possible though
// Currently only Prod environment is needed, multiple envs can be defined here. See readme for details.
module.exports = {
  page: {
    'index.html': {
      pageTitle: "Gall.nl - Site tijdelijk offline",
      partial: 'maintenance.html',
    }
  },
  aliases: {
    prod: {
      secondary: [
        "gall.nl",
        "production-eu01-gallandgall.demandware.net",
        "winkel.gall.nl",
        "staging-eu01-gallandgall.demandware.net",
        "staging-winkel.gall.nl",
        "development-eu01-gallandgall.demandware.net",
        "beta.gall.nl",
        "development-winkel.gall.nl",
        "development.gallengall.nl",
        "staging.gall.nl"
      ],
      primary: "www.gall.nl"
    }
  }
}

