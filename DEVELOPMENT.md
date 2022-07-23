# Local Development

1. You'll need to set up your hosts file like so:
```
127.0.0.1 hellors.mercato-dev.run
127.0.0.1 mercato-dev.run
```
2. Create a .env file with these values:
```
JWT_SECRET="REPLACE_ME"
COOKIE_SECRET="REALLY_YOU_DONT_WANT_TO_USE_THESE_VALUES"
PROD_URL="example.com"
PORT=8080
```
note that the PORT value should match that in package.json for docker-run
3. Run the server: `npm run dev`
4. Visit http://mercato-dev.run:8080

The app does not currently support HMR so you'll have to manually refresh pages after changing them. TODO: can we use browser sync for this??

The node server will pick up changes automatically since it's using nodemon. 

# Docker 
You can run the app in docker by:
1. `npm run docker-build` 
2. `npm run docker-run`

The app will then be available at http://mercato-dev.run:8080 

TODO: currently when running in the container, it generates URLs with https:// scheme, which means that when you are sent over to the store 
  to login, the request will fail since it's not served on https

# Adding new apps
Right now, adding apps is a manual process. It would be pretty easy to switch this over to storing the apps in a blob store like S3. I preferred not to use file system of the sever as the storage method since that makes it harder to run in a container.

To add a new app:

1. copy the app code into apps/{appname}/{versionid}
2. update `files_server.ts`, `mercatoApps` constant to add the new app  

# TODOs
* [ ] get front end code into better shape
  * [ ] convert get_mercato_token_from_rs over to typescript
  * [ ] switch remotestorage.js/widget.js so they are loaded from npm 
  * [ ] get_mercato_token_from_rs should switch from using alerts to 
     tell the user information, and instead show status text on the 
     webpage
  * [ ] create a site header for the mercato server
* [ ] use helmet in store_server express app?
* [ ] logout flow: show the users a nice logout message on a real mercato page :)
* [ ] create a wrapper for app file access that allows them to be stored
   in different types of storage - eg AWS S3/postgres/file system/whatever
* [ ] Content-Security-Policy: consider allowing more inline things (eg fonts) 
   since XSS is less of a risk when there's no way to exfiltrate data it (prove this is true or not)
* [ ] CSP: do we need wrong-val-src? Could we just switch to setting default-src and not worrying as much?
* [ ] post-login actions: when a user visits https://diary.nooq.run and mercato needs to log them in, they should be sent back to the app after login
* [ ] make it easier for users of apps to switch/find other apps (create a mercato-specific remotestorage-widget that allows app switching?)
* [ ] give developers an easy way to test their Mercato apps - perhaps a simple nodejs server that emulates the current CSP settings?
* [ ] invalid tokens: there's currently no way to clear/reset an invalid token
  - want to do that in a way that won't encourage regular users to do it (maybe move that token file to another location like mercato-dev.run-token-{UUIDHERE})