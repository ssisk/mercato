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
```
3. Run the server: `npm run dev`
4. Visit http://mercato-dev.run

The app does not currently support HMR so you'll have to manually refresh pages after changing them. TODO: can we use browser sync for this??

The node server will pick up changes automatically since it's using nodemon. 

# Adding new apps
Right now, adding apps is a manual process. It would be pretty easy to switch this over to storing the apps in a blob store like S3. I preferred not to use file system of the sever as the storage method since that makes it harder to run in a container.

To add a new app:

1. copy the app code into apps/{appname}/{versionid}
2. update `files_server.ts`, `mercatoApps` constant to add the new app  

# TODOs
[] get front end code into better shape
  [] convert get_mercato_token_from_rs over to typescript
  [] switch remotestorage.js/widget.js so they are loaded from npm 
  [] get_mercato_token_from_rs should switch from using alerts to 
     tell the user information, and instead show status text on the 
     webpage
  [] create a site header for the mercato server
[] helmet for store_server?
[] logout flow: show the users a nice logout message on a real mercato page :)
[] create a wrapper for app file access that allows them to be stored
   in different types of storage - eg AWS S3/postgres/file system/whatever
[] Content-Security-Policy: consider allowing more inline things (eg fonts) 
   since XSS is less of a risk when there's no way to exfiltrate data 