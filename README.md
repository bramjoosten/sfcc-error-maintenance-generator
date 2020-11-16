# Generate SFCC Error Pages
This is ```sfcc-error-maintenance-generator```, a static error and maintenance pages generator that will help you save time building error pages specifically for Salesforce Commerce Cloud.
_!warning, this is a work in progress, builds are breaking still._
Last updated 14 nov 2020 (please keep this readme updated when changes happen to the config or files in general)

The purpose of this project is to save time manually creating editing static error and maintenance pages, but offering a nice boilerplate that you can integrate in your own project. Out of the box it should comply to the SFCC requirements like putting static assets behind the /waroot dir.

Todo:

- ✅ watch:errorpages (logo img reference breaks after subsequent rebuilds, re-run watch to fix it)
- ❌ dist:errorpages (not tested)
- ❌ watch:maintpages (not tested)
- ❌ dist:maintpages (not tested)

---

See package.json in root for commands to watch or build custom error and maintenance pages

## watch
watch generates a preview folder for viewing the files statically, which you can open through finder/explorer or cli with `open preview/[filename].html` to open in default browser. No server needed.

## dist
dist generates zip files that can be uploaded to BM. For maintenance pages, theres a file for every environment but you probably only need production
errorpages can only be really published on production.

## features
*html partials: each page has it's own partial that is inserted as the main html content in body and can be adapted to your needs.
*errorpages.scss: compiles a cherry picked version of the projects necessary .scss components (see src/main.scss)

## does not include
image files in css In rare occasions static assets need to be loaded from Css, please see how we do this resolving for fonts.
image files in html (untested, might work, a file-loader should be fine)

_todo: rewrite this below_
for maintenance pages, moving aliases.json fails sometimes due to async behavior of the webpack tapable hooks, but will be retried if it fails. Can be improved by someone with better knowledge of tapable/webpack hooks.

Initially the maintenance pages build config is built to support different environments, however it seems we only need prod. Wether a Maintenance page shows correctly on production is something we don't know, it should have showed somewhere 16 sept between 03:00 and 05:00 during a realm move. Setting development or staging to maintenance results in a static 500 error.

If you unpack the zipfile and view the errorpages locally, you will see missing styles and scripts. This is because they are prefixed with waroot, according to SFCC spec. If you want to preview the pages locally, check the preview folder. If you want to test them in sandbox or other sfcc environment, go to Business Manager > Administration > Custom Error Pages. For maintenance pages, this is a bit different, because publishing is not possible for any environment other than sandbox. Best is to preview them first and then publish them on production.

To set a site on maintenance mode, go to Administration > Sites > Manage Sites > your site - Site Status
However, to test a specific sandbox on maintenance mode, first upload this on the production instance!

html/template.html for the top-level code
html/majorerror.html body partial for injecting into template
html/header.html header partial included in every page
data.js for all content strings, every key generates a new file with that name.
scripts.js for all the vanilla js, no transpiling or bundling

errorpages zipfile and preview pages folder can be deleted at all times, and will be ignored in git and for linters

SFCC requirements:
uploaded files should have a flat folder structure, cannot contain folders.
references to static assets should be prefixed with /waroot/

# Warnings
After uploading, Bm will validate the zip file and generate some warnings.

"The following files are present, but no link was found that references them. They appear to be unused."
 If it's about about missing link for all \*.woff fonts, these can be ignored, the validator does not check multiple url strings in the @font face definition. woff2 fonts should not be in this error.

With vendor JS, there are risks the validator chokes on minimized JS code. We had an issue with 3rd party tool Dynatrace. Something like:
"The following item has relative links or invalid paths. Resources must be referenced by a fully qualified path."
error related to www.oursite.tld/index.html:1: +Ue+ meant dynatrace implementation was not working. This works for errorpages, but not for maintenance pages. Implementing this is currently very hard since we use a minimized code snippet in dynatrace.html."

"The following domain names were found, but couldn't be resolved to a site alias. This type of upload is only valid if you have domains registered outside of Business Manager."
This is actually desired behavior, by adding a few more domains in the alias file we should be able to test our custom maintenance page on development and staging. (there are currently some issues with this, development redirects to the static 500 error without stylesheets)


See these urls for more info,

sfcc docs 'custom error pages'
https://documentation.b2c.commercecloud.salesforce.com/DOC1/topic/com.demandware.dochelp/content/b2c_commerce/topics/site_development/b2c_custom_error_pages.html

sfcc docs 'maintenance pages'
https://documentation.b2c.commercecloud.salesforce.com/DOC1/topic/com.demandware.dochelp/content/b2c_commerce/topics/admin/b2c_maintenance_pages.html
