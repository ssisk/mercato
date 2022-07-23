Mercato
=======

Mercato is an app platform (similar to an app store) that:
* Guarantees your privacy by running your apps inside of a privacy sandbox - developers cannot see your data
* Your data for all apps is available on all your devices by syncing your data through [RemoteStorage](https://www.remotestorage.io)
* Your apps work on any device with a web browser
* You own your data - you can view/export/delete any of your data that's stored inside RemoteStorage at any time. 
* Did we mention this is all free?


Seem too good to be true?
-------------------------

Mercato is based on a simple principle: *an app that cannot send data anywhere cannot violate your privacy*. So Mercato runs your apps inside of a privacy sandbox, where the apps cannot communicate to anywhere on the internet. The privacy sandbox works using modern web standards so it is available on any modern browser.

The tradeoff is that Mercato can't run some types of apps that require data to be sent over the internet. So you couldn't build a search engine or social network on Mercato. However, 
it's perfect for creative tools like document editors, spreadsheets, art apps, journals, todo apps, etc. 

What is RemoteStorage and how is my data synced?
------------------------------------------------

We let the apps talk only to RemoteStorage, a system that acts is a private database only for your data, so your privacy is preserved.

Getting started (all services are free)
=======================================

A quick caveat: Mercato and much of the RemoteStorage ecosystem are considered to be in beta. We recommend using a tool like [rs-backup](https://github.com/raucao/rs-backup) to keep a copy of your data. (This is currently a developer command line tool, but we'd like to make it a more user friendly desktop or web app. Feel free to volunteer!)

1.  Sign up for a RemoteStorage account - [5apps.com](https://5apps.com/storage) is a free provider that has been around for a while, but if you'd like more options there's a great guide on [RemoteStorage.io](https://remotestorage.io/get/).
2. Sign up for for a Mercato account  - [nooq.run](https://store.nooq.run/login) is the 
provider run by the creator of Mercato (that's me!) - we don't collect any personal data about you, you just need to log into your RS account.
3.  Start using apps - browse the list of apps available [here](https://store.nooq.run)

Why doesn't this cost more?
---------------------------

Storage of normal text data (eg things like documents) is fairly small compared to the size of video/songs/etc and is fairly cheap for developers. Your device runs the apps (rather than the Mercato server) so there's no need to pay for compute.


More Details!
=============

Interested in learning more? Read on!

Mercato is an app platform (similar to an app store) that makes it easy for you to find and use privacy respecting apps. Mercato apps run inside a sandbox so they cannot send your data to the developers of the app or to any other website. This is a massive improvement over the privacy guarantees of regular web apps.

You can think of Mercato apps as combining the best parts of traditional desktop software and modern web apps.

With traditional desktop apps you install on your computer, you control the data stored by the app (after all, it's on your hard drive), and you can always open that data with other apps that support the file format. Since the app is installed on your computer the app continues to work even if the developer no longer supports it. However, desktop apps are only available on one computer and the data is only available on one computer.

Web apps are great since they (and your data) are available on any device connected to the web. However you don't control your data and if the app's servers go down, you can no longer use the web app.

Mercato combines the best of the two. Your data and apps are always stored in the cloud, so you can use them on any computer. But you control your data and the app.

Mercato apps store data using RemoteStorage, where you have control over your own data. The data never touches the app developer's platform. Even the Mercato servers don't have access to your data - only the app code running in your web browser actually has acces.

**What is RemoteStorage?** Traditional web apps store the data for all the users of the app in a database that the web app developer is responsible. [RemoteStorage](https://remotestorage.io) flips that on its head, and user's data is stored in a database that they (the user) controls. This means you always have access to and control over your data (ie you can always delete your data, view all the data stored about your, or even make it available to another app entirely) When you use a app that uses RemoteStorage, you give the app your RemoteStorage address and the app will communicate with that RS server to store your data.


Technical details on how Mercato works
======================================

Mercato's implementation is fairly simple. It behaves like a normal static app host, but with one key difference: all app files are delivered with very strict [Content Security Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP) headers. The CSP tells the user's web browser that the javascript for the app will only be allowed to communicate with exactly two servers: the Mercato server, and the user's RemoteStorage server.

How does Mercato know what the user's RemoteStorage server is? Before you can use any apps on a given Mercato server, you have to go through a signup process and connect the Mercato client code to your RS server. During teh signup process, the Mercato client then tells the Mercato server what your RS server's URL is, and the server issues the user's browser a cookie. When you use your browser to use a mercato app, the cookie is sent to the mercato server and the server then issues a CSP header that allows access to the RS server.

Just like RemoteStorage, this is all based on open web standards.


Why should I trust Mercato with my apps and data?
=================================================

1. Mercato relies on web standards like CSP that protect your internet browsing every day. 
2. The Mercato server never has your RS authentication tokens. The Mercato client app used to register you never sends your auth token to the store. You can verify this by watching the network traffic when you register with ercato.
3. You're reducing your risk to one actor for all apps vs one actor per app 

A caveat: Mercato has not been pen tested - we invite security analysis but don't have resources for a bug bounty 

Why should I develop apps for the Mercato App Platform?
=======================================================

Mercato development gives you a lot of the benefits of web development:
1. Mercato apps are just normal javascript SPAs that use RemoteStorage 

With the benefits of native app development:
1. No hosting fees - the Mercato server hosts your app for you.
2. No need to monitor production - you aren't running webservers/databases/etc
3. Don't worry about authentication - RemoteStorage handles all that for you.

And the benefits of having your apps available in an app store:
1. Mercato provides a place for users to find your apps. 

Right now, the Mercato app store does not have the ability to charge for apps, but Mercato is built with the intent that the apps could be gated behind a purchase, we just need someone to start a Mercato instance that does that. :)


How do I develop for Mercato?
=============================

Mercato is meant to work with normal RS apps, so you can follow your normal development cycle for a web app. The example app is a good place to start. (TODO: provide a link)

Apps in theory will work as-is on Mercato, but I ran into some issues with the current CSP restrictions causing issues with the RS widget, and I'm assuming I'll probably find some more of that. I'm not sure how permissive/restrictive to be on CSP, so that's an area that I'd love feedback about. CSP is oriented toward blocking XSS attacks and I *think* a mercato app wouldn't need to worry about that, but I'm defaulting to overly restrictive for now.  

Conventions for Mercato Appliations
-----------------------------------

#### Write it as a SPA

Mercato apps run only on the client, so apps requiring any server side code are not currently supported.

#### Use cache-busting hashes on your files

Mercato treats app files as static assets and caches them foever.

#### Set RS caching set to "ALL"

This will allow users to work offline (once Mercato supports it :) If you have a use case where ALL caching does not work, please let me know

#### Apps should work well on desktop and on mobile

It's 2022! You should definitely be developing responsive apps.

Submitting an application for publishing
----------------------------------------
When you app is ready, email me at mercato@stephensisk.net with the name you'd like for your app and a link to a copy of the minified files for your app. I'll create a listing for your app on Mercato.


What's the status of development of Mercato?
============================================

Mercato is currently in beta. Right now, it's developed only by one developer as a side project. Having said that, the core of mercato is fairly simple (it's basically just a static file share that appends certain headers), and is run on AWS lambda (which means it's pretty cheap but reliable.)

Future work
===========

### App store

Currently, Mercato apps are free. It would make a lot of sense to start charging for apps - that would likely incentivize developers to build apps for the Mercato platform. It'd be interesting to potentially run the store as a co-op, where developers/users own the app store. It'd be hard but interesting to try to define rules for the apps as a community.

### Offline apps by default

RS can easily support offline scenarios, however the apps using RS do not always (often?) support offline work since the apps aren't using service workers to ensure their code is cached on the user's client. we'll first need to create a PWA service worker that caches the app's code. It'll do that by caching all the files retrieved under the app's domain, potentially using a manifest file to ensure we get all the files. This should work well for offline scenarios and also add a bit of resiliency for users if the mercato server experiences temporary server outages.

### Data sharing model

Currently, RS data is either accessible by a single user (in the private paths) or it is available to everyone (in the public paths). It'd be awesome to have a way of sharing a document with a specific RS user.

### Offline data by default

To ensure apps work offline has a second part, which is that the user's data needs to be accessible offline.This is a bit trickier since it will require that developers will need to change a setting (enable "ALL" caching on RS for all paths), but we there's not an obvious way to ensure developers to do that. I'd like to make it a requirement of uploading the app but that means it needs to be verified somehow. One approach is to add a mercato wrapper to remotestorage-widget, and require that apps use it (which would potentially be easier to verify). The widget could then alert the user if the app is not using RS ALL caching and/or override the app and enable caching (which has potential unforeseen consequences in app behavior.) From another angle, we could feed all RS interactions through service worker caching. In order to ensure that all data is retrieved for offline availability, we'd likely need to use the app's token to traverse the scopes used by the app and cache all the data. **The simplest solution here may be to simply require devs to check a checkbox on upload saying that they've enabled and tested caching for their app.** Without testing an app thoroughly, it's a bit hard to say if it'll work after you turn on caching.

### Own Your Apps

Once you start using an app on the mercato platform, that app's code will be downloaded to your RemoteStorage repository. I'd like to make sure that you can use the app even if the mercato server goes down/is no longer up. I think you could get PWA working to support this, but for longer term it'd be good to have another server available that the user can connect to. To support that we'll likely need a way for users to easily self host (or more likely start using another mercato instance stood up by a user.)

### Privacy-first App Analytics

It's important for application developers to know how users are using their apps. For example, knowing that no one is using a particular feature in their app allows them to properly prioritize their app. Some amount of data about how users are utilizing an app you built is super important to ensure app developers are building great apps. (and you do want great apps, right?). But the current status quo of "app developers see all my data" isn't very good for respecting users' privacy.

I think there's a middle ground - developers should be able to see anonymized data like "how many users used this feature?" or "what was the distribution of length of text users entered into this text box?" This is probably going to be a bit involved - data anonymization is very easy to get wrong in very subtle ways, but I think one good principle to start with is that the users of the app should get to see what \*type\* of data the app developers is getting to see. To protect the app developer's IP, I don't currently think user's should get to see the actual results of the data collected.

This is definitely the most aspirational of the "Future Work" listed here, but I think it's also the most interesting. If you're interested in discussing this more, please reach out to me.

### Client sandbox app

Mercato right now is web-first, which makes it easy for new users to try it out with no barrier to entry. However, having client apps would likely provide some benefits, like 1) having zero reliance on a server/your web

### Background processing

Currently there's no way for a Mercato app to do processing (eg for update a search index over a user's set of text notes) when the app isn't actively opened by a user. Once we have a client sandbox, we could potentially run background tasks for processing user data on the client if it's installed on a desktop or a plugged in laptop.

### Other data platforms besides RemoteStorage

There's about the mercato server itself that is tied to RemoteStorage - all you need is a service that can store and retrieve a token for the user and that . I haven't looked deeply but I believe Kinto is another service that it'd be easy for Mercato to support. You'd need to create a new Mercato client to retrieve the token, but that should be trivial.

### Versioning of apps
To me, part of "owning your apps" is not having them upgraded by a developer. So I'd love to have control over which version of the app I'm using.

As a developer I have mixed feelings about this - users on old versions of apps can be vulnerable to security issues, and supporting data migrations between arbitrary versions of an app is a nightmare, but I think a simple first stab at this would be to simply allow users to pin an app at their current version rather than always being auto-upgraded to new versions. If/When you unpin, you'll be updated to the latest version. This supports the "I hate the new version and just want stick with what I have" scenario well, with the caveat that I'm not sure how users would be able to try out new versions of the app.   