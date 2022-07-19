/*! remotestorage.js 2.0.0-beta.3, https://remotestorage.io, MIT licensed */
!function(e, t) {
  "object" == typeof exports && "object" == typeof module
    ? module.exports = t()
    : "function" == typeof define && define.amd
    ? define("RemoteStorage", [], t)
    : "object" == typeof exports
    ? exports.RemoteStorage = t()
    : e.RemoteStorage = t();
}(this, function() {
  return function(e) {
    var t = {};
    function r(n) {
      if (t[n]) return t[n].exports;
      var o = t[n] = { i: n, l: !1, exports: {} };
      return e[n].call(o.exports, o, o.exports, r), o.l = !0, o.exports;
    }
    return r.m = e,
      r.c = t,
      r.d = function(e, t, n) {
        r.o(e, t) || Object.defineProperty(e, t, { enumerable: !0, get: n });
      },
      r.r = function(e) {
        "undefined" != typeof Symbol && Symbol.toStringTag
        && Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }),
          Object.defineProperty(e, "__esModule", { value: !0 });
      },
      r.t = function(e, t) {
        if (1 & t && (e = r(e)), 8 & t) return e;
        if (4 & t && "object" == typeof e && e && e.__esModule) return e;
        var n = Object.create(null);
        if (r.r(n), Object.defineProperty(n, "default", { enumerable: !0, value: e }), 2 & t && "string" != typeof e) {
          for (var o in e) {
            r.d(
              n,
              o,
              function(t) {
                return e[t];
              }.bind(null, o),
            );
          }
        }
        return n;
      },
      r.n = function(e) {
        var t = e && e.__esModule
          ? function() {
            return e.default;
          }
          : function() {
            return e;
          };
        return r.d(t, "a", t), t;
      },
      r.o = function(e, t) {
        return Object.prototype.hasOwnProperty.call(e, t);
      },
      r.p = "",
      r(r.s = 17);
  }([function(e, t, r) {
    "use strict";
    (function(e, r) {
      Object.defineProperty(t, "__esModule", { value: !0 }),
        t.applyMixins =
          t.toBase64 =
          t.getTextFromArrayBuffer =
          t.shouldBeTreatedAsBinary =
          t.getJSONFromLocalStorage =
          t.localStorageAvailable =
          t.pathsFromRoot =
          t.deepClone =
          t.equal =
          t.bindAll =
          t.cleanPath =
          t.baseName =
          t.isDocument =
          t.isFolder =
          t.containingFolder =
          t.extend =
          t.getGlobalContext =
          t.globalContext =
          t.logError =
            void 0,
        t.logError = e => {
          "string" == typeof e ? console.error(e) : console.error(e.message, e.stack);
        },
        t.globalContext = "undefined" != typeof window ? window : "object" == typeof self ? self : e,
        t.getGlobalContext = () => "undefined" != typeof window ? window : "object" == typeof self ? self : e,
        t.extend = (...e) => {
          const t = e[0];
          return Array.prototype.slice.call(e, 1).forEach(function(e) {
            for (const r in e) t[r] = e[r];
          }),
            t;
        },
        t.containingFolder = e => {
          if ("" === e) return "/";
          if (!e) throw "Path not given!";
          return e.replace(/\/+/g, "/").replace(/[^\/]+\/?$/, "");
        },
        t.isFolder = e => "/" === e.substr(-1),
        t.isDocument = e => !t.isFolder(e),
        t.baseName = e => {
          const r = e.split("/");
          return t.isFolder(e) ? r[r.length - 2] + "/" : r[r.length - 1];
        },
        t.cleanPath = e => e.replace(/\/+/g, "/").split("/").map(encodeURIComponent).join("/").replace(/'/g, "%27"),
        t.bindAll = e => {
          for (const t in this) "function" == typeof e[t] && (e[t] = e[t].bind(e));
        },
        t.equal = (e, r, n = []) => {
          let o;
          if (typeof e != typeof r) return !1;
          if ("number" == typeof e || "boolean" == typeof e || "string" == typeof e) return e === r;
          if ("function" == typeof e) return e.toString() === r.toString();
          if (
            e instanceof ArrayBuffer && r instanceof ArrayBuffer && (e = new Uint8Array(e), r = new Uint8Array(r)),
              e instanceof Array
          ) {
            if (e.length !== r.length) return !1;
            for (let o = 0, i = e.length; o < i; o++) if (!t.equal(e[o], r[o], n)) return !1;
          } else {
            for (o in e) if (e.hasOwnProperty(o) && !(o in r)) return !1;
            for (o in r) {
              if (!r.hasOwnProperty(o)) continue;
              if (!(o in e)) return !1;
              let i;
              if ("object" == typeof r[o]) {
                if (n.indexOf(r[o]) >= 0) continue;
                i = n.slice(), i.push(r[o]);
              }
              if (!t.equal(e[o], r[o], i)) return !1;
            }
          }
          return !0;
        },
        t.deepClone = e => {
          if (void 0 !== e) {
            const t = JSON.parse(JSON.stringify(e));
            return function e(t, r) {
              if ("object" == typeof t && !Array.isArray(t) && null !== t) {
                for (const n in t) {
                  if ("object" == typeof t[n] && null !== t[n]) {
                    if ("[object ArrayBuffer]" === t[n].toString()) {
                      r[n] = new ArrayBuffer(t[n].byteLength);
                      const e = new Int8Array(t[n]);
                      new Int8Array(r[n]).set(e);
                    } else {
                      e(t[n], r[n]);
                    }
                  }
                }
              }
            }(e, t),
              t;
          }
        },
        t.pathsFromRoot = e => {
          const t = [e], r = e.replace(/\/$/, "").split("/");
          for (; r.length > 1;) r.pop(), t.push(r.join("/") + "/");
          return t;
        },
        t.localStorageAvailable = () => {
          const e = t.getGlobalContext();
          if (!("localStorage" in e)) return !1;
          try {
            return e.localStorage.setItem("rs-check", "1"), e.localStorage.removeItem("rs-check"), !0;
          } catch (e) {
            return !1;
          }
        },
        t.getJSONFromLocalStorage = e => {
          const r = t.getGlobalContext();
          try {
            return JSON.parse(r.localStorage.getItem(e));
          } catch (e) {}
        },
        t.shouldBeTreatedAsBinary = (e, t) =>
          !!(t && t.match(/charset=binary/) || /[\x00-\x08\x0E-\x1F\uFFFD]/.test(e)),
        t.getTextFromArrayBuffer = (e, n) =>
          new Promise(o => {
            if ("undefined" == typeof Blob) {
              const t = new r(new Uint8Array(e));
              o(t.toString(n));
            } else {
              let r;
              const i = t.globalContext;
              if (i.BlobBuilder = i.BlobBuilder || i.WebKitBlobBuilder, void 0 !== i.BlobBuilder) {
                const t = new i.BlobBuilder();
                t.append(e), r = t.getBlob();
              } else r = new Blob([e]);
              const s = new FileReader();
              "function" == typeof s.addEventListener
                ? s.addEventListener("loadend", function(e) {
                  o(e.target.result);
                })
                : s.onloadend = function(e) {
                  o(e.target.result);
                }, s.readAsText(r, n);
            }
          }),
        t.toBase64 = e => {
          const n = t.getGlobalContext();
          return "btoa" in n ? n.btoa(e) : r.from(e).toString("base64");
        },
        t.applyMixins = function(e, t) {
          t.forEach(t => {
            Object.getOwnPropertyNames(t.prototype).forEach(r => {
              Object.defineProperty(e.prototype, r, Object.getOwnPropertyDescriptor(t.prototype, r));
            });
          });
        };
    }).call(this, r(5), r(19).Buffer);
  }, function(e, t, r) {
    "use strict";
    const n = (this && this.__importDefault || function(e) {
      return e && e.__esModule ? e : { default: e };
    })(r(3));
    e.exports = function(...e) {
      n.default.logging && console.log(...e);
    };
  }, function(e, t, r) {
    "use strict";
    const n = (this && this.__importDefault || function(e) {
      return e && e.__esModule ? e : { default: e };
    })(r(1));
    e.exports = class {
      addEvents(e) {
        e.forEach(e => this._addEvent(e));
      }
      addEventListener(e, t) {
        if ("string" != typeof e) throw new Error("Argument eventName should be a string");
        if ("function" != typeof t) throw new Error("Argument handler should be a function");
        n.default("[EventHandling] Adding event listener", e), this._validateEvent(e), this._handlers[e].push(t);
      }
      on(e, t) {
        return this.addEventListener(e, t);
      }
      removeEventListener(e, t) {
        this._validateEvent(e);
        const r = this._handlers[e].length;
        for (let n = 0; n < r; n++) if (this._handlers[e][n] === t) return void this._handlers[e].splice(n, 1);
      }
      _emit(e, ...t) {
        this._validateEvent(e),
          this._handlers[e].slice().forEach(e => {
            e.apply(this, t);
          });
      }
      _validateEvent(e) {
        if (!(e in this._handlers)) throw new Error("Unknown event: " + e);
      }
      _delegateEvent(e, t) {
        t.on(e, t => {
          this._emit(e, t);
        });
      }
      _addEvent(e) {
        void 0 === this._handlers && (this._handlers = {}), this._handlers[e] = [];
      }
    };
  }, function(e, t, r) {
    "use strict";
    const n = {
      cache: !0,
      changeEvents: { local: !0, window: !1, remote: !0, conflict: !0 },
      cordovaRedirectUri: void 0,
      logging: !1,
      modules: [],
      backgroundSyncInterval: 6e4,
      disableFeatures: [],
      discoveryTimeout: 1e4,
      isBackground: !1,
      requestTimeout: 3e4,
      syncInterval: 1e4,
    };
    e.exports = n;
  }, function(e, t, r) {
    "use strict";
    class n extends Error {
      constructor(e, t = {}) {
        super(),
          this.name = "Unauthorized",
          this.message = void 0 === e ? "App authorization expired or revoked." : e,
          void 0 !== t.code && (this.code = t.code),
          this.stack = (new Error()).stack;
      }
    }
    e.exports = n;
  }, function(e, t) {
    var r;
    r = function() {
      return this;
    }();
    try {
      r = r || new Function("return this")();
    } catch (e) {
      "object" == typeof window && (r = window);
    }
    e.exports = r;
  }, function(e, t, r) {
    "use strict";
    var n = this && this.__importDefault || function(e) {
      return e && e.__esModule ? e : { default: e };
    };
    const o = n(r(1)), i = r(0), s = n(r(4));
    let a;
    function u(e) {
      const t = e || c.getLocation().href, r = t.indexOf("#");
      if (-1 === r) return;
      const n = t.substring(r + 1);
      return n.includes("=")
        ? n.split("&").reduce(function(e, t) {
          const r = t.split("=");
          if ("state" === r[0] && r[1].match(/rsDiscovery/)) {
            let t = decodeURIComponent(r[1]);
            const n = t.substr(t.indexOf("rsDiscovery=")).split("&")[0].split("=")[1];
            e.rsDiscovery = JSON.parse(atob(n)),
              t = t.replace(new RegExp("&?rsDiscovery=" + n), ""),
              t.length > 0 && (e.state = t);
          } else e[decodeURIComponent(r[0])] = decodeURIComponent(r[1]);
          return e;
        }, {})
        : void 0;
    }
    class c {
      static authorize(e, { authURL: t, scope: r, redirectUri: n, clientId: s }) {
        if (
          o.default("[Authorize] authURL = ", t, "scope = ", r, "redirectUri = ", n, "clientId = ", s),
            !i.localStorageAvailable() && "remotestorage" === e.backend
        ) {
          n += n.indexOf("#") > 0 ? "&" : "#";
          const t = {
            userAddress: e.remote.userAddress,
            href: e.remote.href,
            storageApi: e.remote.storageApi,
            properties: e.remote.properties,
          };
          n += "rsDiscovery=" + i.toBase64(JSON.stringify(t));
        }
        const a = function(e, t, r, n) {
          const o = t.indexOf("#");
          let i = e;
          return i += e.indexOf("?") > 0 ? "&" : "?",
            i += "redirect_uri=" + encodeURIComponent(t.replace(/#.*$/, "")),
            i += "&scope=" + encodeURIComponent(r),
            i += "&client_id=" + encodeURIComponent(n),
            -1 !== o && o + 1 !== t.length && (i += "&state=" + encodeURIComponent(t.substring(o + 1))),
            i += "&response_type=token",
            i;
        }(t, n, r, s);
        i.globalContext.cordova
          ? c.openWindow(a, n, "location=yes,clearsessioncache=yes,clearcache=yes").then(t => {
            e.remote.configure({ token: t.access_token });
          })
          : c.setLocation(a);
      }
      static setLocation(e) {
        if ("string" == typeof e) document.location.href = e;
        else {
          if ("object" != typeof e) throw "Invalid location " + e;
          document.location = e;
        }
      }
      static _rs_supported() {
        return "undefined" != typeof document;
      }
      static _rs_cleanup(e) {
        e.removeEventListener("features-loaded", a);
      }
    }
    c.IMPLIED_FAKE_TOKEN = !1,
      c.getLocation = function() {
        return document.location;
      },
      c.openWindow = function(e, t, r) {
        return new Promise((n, o) => {
          const i = open(e, "_blank", r);
          if (!i || i.closed) return o("Authorization popup was blocked");
          function s() {
            return o("Authorization was canceled");
          }
          i.addEventListener("loadstart", function(e) {
            if (0 !== e.url.indexOf(t)) return;
            i.removeEventListener("exit", s), i.close();
            const r = u(e.url);
            return r ? n(r) : o("Authorization error");
          }), i.addEventListener("exit", s);
        });
      },
      c._rs_init = function(e) {
        const t = u();
        let r;
        t && (r = c.getLocation(), r.hash = ""),
          a = function() {
            let n = !1;
            if (t) {
              if (t.error) {
                throw "access_denied" === t.error
                  ? new s.default("Authorization failed: access denied", { code: "access_denied" })
                  : new s.default("Authorization failed: " + t.error);
              }
              t.rsDiscovery && e.remote.configure(t.rsDiscovery),
                t.access_token && (e.remote.configure({ token: t.access_token }), n = !0),
                t.remotestorage && (e.connect(t.remotestorage), n = !0),
                t.state && (r = c.getLocation(), c.setLocation(r.href.split("#")[0] + "#" + t.state)),
                n || e.remote.stopWaitingForToken();
            } else e.remote.stopWaitingForToken();
          },
          e.on("features-loaded", a);
      },
      e.exports = c;
  }, function(e, t, r) {
    "use strict";
    var n = this && this.__importDefault || function(e) {
      return e && e.__esModule ? e : { default: e };
    };
    const o = n(r(23)), i = n(r(24)), s = n(r(25)), a = n(r(2)), u = n(r(3)), c = r(0);
    class h {
      constructor(e, t) {
        if (
          this.schemas = {
            configurable: !0,
            get: function() {
              return h.Types.inScope(this.moduleName);
            },
          }, "/" !== t[t.length - 1]
        ) {
          throw "Not a folder: " + t;
        }
        "/" === t && (this.makePath = e => ("/" === e[0] ? "" : "/") + e), this.storage = e, this.base = t;
        const r = this.base.split("/");
        r.length > 2 ? this.moduleName = r[1] : this.moduleName = "root",
          this.addEvents(["change"]),
          this.on = this.on.bind(this),
          e.onChange(this.base, this._fireChange.bind(this));
      }
      scope(e) {
        return new h(this.storage, this.makePath(e));
      }
      getListing(e, t) {
        if ("string" != typeof e) e = "";
        else if (e.length > 0 && "/" !== e[e.length - 1]) return Promise.reject("Not a folder: " + e);
        return this.storage.get(this.makePath(e), t).then(function(e) {
          return 404 === e.statusCode ? {} : e.body;
        });
      }
      getAll(e, t) {
        if ("string" != typeof e) e = "";
        else if (e.length > 0 && "/" !== e[e.length - 1]) return Promise.reject("Not a folder: " + e);
        return this.storage.get(this.makePath(e), t).then(r => {
          if (404 === r.statusCode) return {};
          if ("object" == typeof r.body) {
            const n = Object.keys(r.body);
            if (0 === n.length) return {};
            const o = n.map(n =>
              this.storage.get(this.makePath(e + n), t).then(function(e) {
                if ("string" == typeof e.body) {
                  try {
                    e.body = JSON.parse(e.body);
                  } catch (e) {}
                }
                "object" == typeof e.body && (r.body[n] = e.body);
              })
            );
            return Promise.all(o).then(function() {
              return r.body;
            });
          }
        });
      }
      getFile(e, t) {
        return "string" != typeof e
          ? Promise.reject("Argument 'path' of baseClient.getFile must be a string")
          : this.storage.get(this.makePath(e), t).then(function(e) {
            return { data: e.body, contentType: e.contentType, revision: e.revision };
          });
      }
      storeFile(e, t, r) {
        return "string" != typeof e
          ? Promise.reject("Argument 'mimeType' of baseClient.storeFile must be a string")
          : "string" != typeof t
          ? Promise.reject("Argument 'path' of baseClient.storeFile must be a string")
          : "string" != typeof r && "object" != typeof r
          ? Promise.reject("Argument 'body' of baseClient.storeFile must be a string, ArrayBuffer, or ArrayBufferView")
          : (this.storage.access.checkPathPermission(this.makePath(t), "rw")
            || console.warn("WARNING: Editing a document to which only read access ('r') was claimed"),
            this.storage.put(this.makePath(t), r, e).then(e =>
              200 === e.statusCode || 201 === e.statusCode
                ? e.revision
                : Promise.reject("Request (PUT " + this.makePath(t) + ") failed with status: " + e.statusCode)
            ));
      }
      getObject(e, t) {
        return "string" != typeof e
          ? Promise.reject("Argument 'path' of baseClient.getObject must be a string")
          : this.storage.get(this.makePath(e), t).then(t => {
            if ("object" == typeof t.body) return t.body;
            if ("string" == typeof t.body) {
              try {
                return JSON.parse(t.body);
              } catch (t) {
                throw new Error("Not valid JSON: " + this.makePath(e));
              }
            } else if (void 0 !== t.body && 200 === t.statusCode) {
              return Promise.reject("Not an object: " + this.makePath(e));
            }
          });
      }
      storeObject(e, t, r) {
        if ("string" != typeof e) {
          return Promise.reject("Argument 'typeAlias' of baseClient.storeObject must be a string");
        }
        if ("string" != typeof t) return Promise.reject("Argument 'path' of baseClient.storeObject must be a string");
        if ("object" != typeof r) {
          return Promise.reject("Argument 'object' of baseClient.storeObject must be an object");
        }
        this._attachType(r, e);
        try {
          const e = this.validate(r);
          if (!e.valid) return Promise.reject(e);
        } catch (e) {
          return Promise.reject(e);
        }
        return this.storage.put(this.makePath(t), JSON.stringify(r), "application/json; charset=UTF-8").then(e =>
          200 === e.statusCode || 201 === e.statusCode
            ? e.revision
            : Promise.reject("Request (PUT " + this.makePath(t) + ") failed with status: " + e.statusCode)
        );
      }
      remove(e) {
        return "string" != typeof e
          ? Promise.reject("Argument 'path' of baseClient.remove must be a string")
          : (this.storage.access.checkPathPermission(this.makePath(e), "rw")
            || console.warn("WARNING: Removing a document to which only read access ('r') was claimed"),
            this.storage.delete(this.makePath(e)));
      }
      getItemURL(e) {
        if ("string" != typeof e) throw "Argument 'path' of baseClient.getItemURL must be a string";
        return this.storage.connected ? (e = c.cleanPath(this.makePath(e)), this.storage.remote.href + e) : void 0;
      }
      cache(e, t = "ALL") {
        if ("string" != typeof e) throw "Argument 'path' of baseClient.cache must be a string";
        if ("string" != typeof t) throw "Argument 'strategy' of baseClient.cache must be a string or undefined";
        if ("FLUSH" !== t && "SEEN" !== t && "ALL" !== t) {
          throw "Argument 'strategy' of baseclient.cache must be one of [\"FLUSH\", \"SEEN\", \"ALL\"]";
        }
        return this.storage.caching.set(this.makePath(e), t), this;
      }
      flush(e) {
        return this.storage.local.flush(e);
      }
      declareType(e, t, r) {
        let n;
        r ? n = t : (r = t, n = this._defaultTypeURI(e)), h.Types.declare(this.moduleName, e, n, r);
      }
      validate(e) {
        const t = h.Types.getSchema(e["@context"]);
        if (t) return o.default.validateResult(e, t);
        throw new s.default(e["@context"]);
      }
      _defaultTypeURI(e) {
        return "http://remotestorage.io/spec/modules/" + encodeURIComponent(this.moduleName) + "/"
          + encodeURIComponent(e);
      }
      _attachType(e, t) {
        e["@context"] = h.Types.resolveAlias(this.moduleName + "/" + t) || this._defaultTypeURI(t);
      }
      makePath(e) {
        return this.base + (e || "");
      }
      _fireChange(e) {
        u.default.changeEvents[e.origin] && (["new", "old", "lastCommon"].forEach(function(t) {
          if (
            (!e[t + "ContentType"] || /^application\/(.*)json(.*)/.exec(e[t + "ContentType"]))
            && "string" == typeof e[t + "Value"]
          ) {
            try {
              e[t + "Value"] = JSON.parse(e[t + "Value"]);
            } catch (e) {}
          }
        }),
          this._emit("change", e));
      }
      static _rs_init() {}
    }
    h.Types = i.default, c.applyMixins(h, [a.default]), e.exports = h;
  }, function(e, t, r) {
    "use strict";
    (function(t) {
      var n = this && this.__awaiter || function(e, t, r, n) {
          return new (r || (r = Promise))(function(o, i) {
            function s(e) {
              try {
                u(n.next(e));
              } catch (e) {
                i(e);
              }
            }
            function a(e) {
              try {
                u(n.throw(e));
              } catch (e) {
                i(e);
              }
            }
            function u(e) {
              var t;
              e.done ? o(e.value) : (t = e.value,
                t instanceof r ? t : new r(function(e) {
                  e(t);
                })).then(s, a);
            }
            u((n = n.apply(e, t || [])).next());
          });
        },
        o = this && this.__importDefault || function(e) {
          return e && e.__esModule ? e : { default: e };
        };
      const i = o(r(6)), s = o(r(2)), a = o(r(4)), u = o(r(3)), c = o(r(1)), h = r(0);
      let l;
      const d = "remotestorage:wireclient",
        f = {
          "draft-dejong-remotestorage-00": 2,
          "draft-dejong-remotestorage-01": 3,
          "draft-dejong-remotestorage-02": 4,
          "https://www.w3.org/community/rww/wiki/read-write-web-00#simple": 1,
        };
      let p;
      if ("function" == typeof (t || window).ArrayBufferView) {
        p = function(e) {
          return e && e instanceof (t || window).ArrayBufferView;
        };
      } else {
        const e = [Int8Array, Uint8Array, Int16Array, Uint16Array, Int32Array, Uint32Array, Float32Array, Float64Array];
        p = function(t) {
          for (let r = 0; r < 8; r++) if (t instanceof e[r]) return !0;
          return !1;
        };
      }
      function m(e) {
        return "string" != typeof e ? e : "*" === e ? "*" : "\"" + e + "\"";
      }
      function g(e) {
        return "string" != typeof e ? e : e.replace(/^["']|["']$/g, "");
      }
      class y {
        constructor(e) {
          if (
            this._revisionCache = {},
              l = h.localStorageAvailable(),
              this.rs = e,
              this.connected = !1,
              this.addEvents(["connected", "not-connected"]),
              l
          ) {
            const e = function() {
              const e = h.getJSONFromLocalStorage(d) || {},
                { userAddress: t, href: r, storageApi: n, token: o, properties: i } = e;
              return { userAddress: t, href: r, storageApi: n, token: o, properties: i };
            }();
            e && setTimeout(() => {
              this.configure(e);
            }, 0);
          }
          this.connected && setTimeout(this._emit.bind(this), 0, "connected");
        }
        get storageType() {
          if (this.storageApi) {
            const e = this.storageApi.match(/draft-dejong-(remotestorage-\d\d)/);
            return e ? e[1] : "2012.04";
          }
        }
        _request(e, t, r, o, s, u, l) {
          return n(this, void 0, void 0, function*() {
            if (
              function(e, t) {
                return ("PUT" === e || "DELETE" === e) && h.isFolder(t);
              }(e, t)
            ) {
              return Promise.reject(`Don't use ${e} on directories!`);
            }
            let n;
            return r !== i.default.IMPLIED_FAKE_TOKEN && (o.Authorization = "Bearer " + r),
              this.rs._emit("wire-busy", { method: e, isFolder: h.isFolder(t) }),
              y.request(e, t, { body: s, headers: o, responseType: "arraybuffer" }).then(
                r => {
                  if (
                    this.online || (this.online = !0, this.rs._emit("network-online")),
                      this.rs._emit("wire-done", { method: e, isFolder: h.isFolder(t), success: !0 }),
                      o = r.status,
                      [401, 403, 404, 412].indexOf(o) >= 0
                  ) {
                    return c.default("[WireClient] Error response status", r.status),
                      n = u ? g(r.getResponseHeader("ETag")) : void 0,
                      401 === r.status && this.rs._emit("error", new a.default()),
                      Promise.resolve({ statusCode: r.status, revision: n });
                  }
                  if (
                    function(e) {
                      return [201, 204, 304].indexOf(e) >= 0;
                    }(r.status) || 200 === r.status && "GET" !== e
                  ) {
                    return n = g(r.getResponseHeader("ETag")),
                      c.default("[WireClient] Successful request", n),
                      Promise.resolve({ statusCode: r.status, revision: n });
                  }
                  {
                    const e = r.getResponseHeader("Content-Type");
                    n = u ? g(r.getResponseHeader("ETag")) : 200 === r.status ? l : void 0;
                    const t = function(e) {
                      let t, r = "UTF-8";
                      return e && (t = e.match(/charset=(.+)$/), t && (r = t[1])), r;
                    }(e);
                    return h.shouldBeTreatedAsBinary(r.response, e)
                      ? (c.default("[WireClient] Successful request with unknown or binary mime-type", n),
                        Promise.resolve({ statusCode: r.status, body: r.response, contentType: e, revision: n }))
                      : h.getTextFromArrayBuffer(r.response, t).then(
                        t => (c.default("[WireClient] Successful request", n),
                          Promise.resolve({ statusCode: r.status, body: t, contentType: e, revision: n }))
                      );
                  }
                  var o;
                },
                r => (this.online && (this.online = !1, this.rs._emit("network-offline")),
                  this.rs._emit("wire-done", { method: e, isFolder: h.isFolder(t), success: !1 }),
                  Promise.reject(r)),
              );
          });
        }
        configure(e) {
          if ("object" != typeof e) throw new Error("WireClient configure settings parameter should be an object");
          if (
            void 0 !== e.userAddress && (this.userAddress = e.userAddress),
              void 0 !== e.href && (this.href = e.href),
              void 0 !== e.storageApi && (this.storageApi = e.storageApi),
              void 0 !== e.token && (this.token = e.token),
              void 0 !== e.properties && (this.properties = e.properties),
              "string" == typeof this.storageApi
          ) {
            const e = f[this.storageApi] || 5;
            this.supportsRevs = e >= 2;
          }
          this.href && this.token
            ? (this.connected = !0, this.online = !0, this._emit("connected"))
            : this.connected = !1,
            l
            && (localStorage[d] = JSON.stringify({
              userAddress: this.userAddress,
              href: this.href,
              storageApi: this.storageApi,
              token: this.token,
              properties: this.properties,
            }));
        }
        stopWaitingForToken() {
          this.connected || this._emit("not-connected");
        }
        get(e, t = {}) {
          if (!this.connected) return Promise.reject("not connected (path: " + e + ")");
          const r = {};
          return this.supportsRevs && t.ifNoneMatch && (r["If-None-Match"] = m(t.ifNoneMatch)),
            this._request(
              "GET",
              this.href + h.cleanPath(e),
              this.token,
              r,
              void 0,
              this.supportsRevs,
              this._revisionCache[e],
            ).then(t => {
              if (!h.isFolder(e)) return Promise.resolve(t);
              let r = {};
              if (void 0 !== t.body) {
                try {
                  t.body = JSON.parse(t.body);
                } catch (t) {
                  return Promise.reject("Folder description at " + this.href + h.cleanPath(e) + " is not JSON");
                }
              }
              if (200 === t.statusCode && "object" == typeof t.body) {
                if (0 === Object.keys(t.body).length) t.statusCode = 404;
                else if (
                  "http://remotestorage.io/spec/folder-description" === (n = t.body)["@context"]
                  && "object" == typeof n.items
                ) {
                  for (const r in t.body.items) this._revisionCache[e + r] = t.body.items[r].ETag;
                  r = t.body.items;
                } else {
                  Object.keys(t.body).forEach(n => {
                    this._revisionCache[e + n] = t.body[n], r[n] = { ETag: t.body[n] };
                  });
                }
                return t.body = r, Promise.resolve(t);
              }
              return Promise.resolve(t);
              var n;
            });
        }
        put(e, t, r, n = {}) {
          if (!this.connected) return Promise.reject("not connected (path: " + e + ")");
          !r.match(/charset=/) && (t instanceof ArrayBuffer || p(t)) && (r += "; charset=binary");
          const o = { "Content-Type": r };
          return this.supportsRevs
            && (n.ifMatch && (o["If-Match"] = m(n.ifMatch)), n.ifNoneMatch && (o["If-None-Match"] = m(n.ifNoneMatch))),
            this._request("PUT", this.href + h.cleanPath(e), this.token, o, t, this.supportsRevs);
        }
        delete(e, t = {}) {
          if (!this.connected) throw new Error("not connected (path: " + e + ")");
          t || (t = {});
          const r = {};
          return this.supportsRevs && t.ifMatch && (r["If-Match"] = m(t.ifMatch)),
            this._request("DELETE", this.href + h.cleanPath(e), this.token, r, void 0, this.supportsRevs);
        }
        static request(e, t, r) {
          return n(this, void 0, void 0, function*() {
            return "function" == typeof fetch
              ? y._fetchRequest(e, t, r)
              : "function" == typeof XMLHttpRequest
              ? y._xhrRequest(e, t, r)
              : (c.default("[WireClient] You need to add a polyfill for fetch or XMLHttpRequest"),
                Promise.reject("[WireClient] You need to add a polyfill for fetch or XMLHttpRequest"));
          });
        }
        static _fetchRequest(e, t, r) {
          let n;
          const o = {};
          let i;
          "function" == typeof AbortController && (i = new AbortController());
          const s = fetch(t, { method: e, headers: r.headers, body: r.body, signal: i ? i.signal : void 0 }).then(e => {
              switch (
                c.default("[WireClient fetch]", e),
                  e.headers.forEach((e, t) => {
                    o[t.toUpperCase()] = e;
                  }),
                  n = {
                    readyState: 4,
                    status: e.status,
                    statusText: e.statusText,
                    response: void 0,
                    getResponseHeader: e => o[e.toUpperCase()] || null,
                    responseType: r.responseType,
                    responseURL: t,
                  },
                  r.responseType
              ) {
                case "arraybuffer":
                  return e.arrayBuffer();
                case "blob":
                  return e.blob();
                case "json":
                  return e.json();
                case void 0:
                case "":
                case "text":
                  return e.text();
                default:
                  throw new Error("responseType 'document' is not currently supported using fetch");
              }
            }).then(e => (n.response = e, r.responseType && "text" !== r.responseType || (n.responseText = e), n)),
            a = new Promise((e, t) => {
              setTimeout(() => {
                t("timeout"), i && i.abort();
              }, u.default.requestTimeout);
            });
          return Promise.race([s, a]);
        }
        static _xhrRequest(e, t, r) {
          return new Promise((n, o) => {
            c.default("[WireClient]", e, t);
            let i = !1;
            const s = setTimeout(() => {
                i = !0, o("timeout");
              }, u.default.requestTimeout),
              a = new XMLHttpRequest();
            if (a.open(e, t, !0), r.responseType && (a.responseType = r.responseType), r.headers) {
              for (const e in r.headers) {
                a.setRequestHeader(e, r.headers[e]);
              }
            }
            a.onload = () => {
              i || (clearTimeout(s), n(a));
            },
              a.onerror = e => {
                i || (clearTimeout(s), o(e));
              };
            let h = r.body;
            "object" == typeof h && !p(h) && h instanceof ArrayBuffer && (h = new Uint8Array(h)), a.send(h);
          });
        }
        static _rs_init(e) {
          e.remote = new y(e), e.remote.online = !0;
        }
        static _rs_supported() {
          return "function" == typeof fetch || "function" == typeof XMLHttpRequest;
        }
        static _rs_cleanup() {
          l && delete localStorage[d];
        }
      }
      y.isArrayBufferView = p, h.applyMixins(y, [s.default]), e.exports = y;
    }).call(this, r(5));
  }, function(e, t, r) {
    "use strict";
    class n extends Error {
      constructor(e) {
        super(),
          this.name = "SyncError",
          this.message = "Sync failed: ",
          "string" == typeof e
            ? this.message += e
            : (this.message += e.message, this.stack = e.stack, this.originalError = e);
      }
    }
    e.exports = n;
  }, function(e, t, r) {
    "use strict";
    var n = this && this.__importDefault || function(e) {
      return e && e.__esModule ? e : { default: e };
    };
    const o = n(r(2)), i = n(r(3)), s = n(r(1)), a = r(0);
    class u {
      constructor() {
        this._updateNodesRunning = !1, this._updateNodesQueued = [];
      }
      get(e, t, r) {
        return "number" == typeof t
          ? this.getNodes(a.pathsFromRoot(e)).then(n => {
            const o = c(n[e]);
            return h(n, t)
              ? r(e)
              : o
              ? { statusCode: 200, body: o.body || o.itemsMap, contentType: o.contentType }
              : { statusCode: 404 };
          })
          : this.getNodes([e]).then(t => {
            const r = c(t[e]);
            if (r) {
              if (a.isFolder(e)) {
                for (const e in r.itemsMap) {
                  r.itemsMap.hasOwnProperty(e) && !1 === r.itemsMap[e] && delete r.itemsMap[e];
                }
              }
              return { statusCode: 200, body: r.body || r.itemsMap, contentType: r.contentType };
            }
            return { statusCode: 404 };
          });
      }
      put(e, t, r) {
        const n = a.pathsFromRoot(e);
        return this._updateNodes(n, function(e, n) {
          try {
            for (let o = 0, i = e.length; o < i; o++) {
              const i = e[o];
              let s, a = n[i];
              if (a || (n[i] = a = l(i)), 0 === o) {
                s = c(a),
                  a.local = {
                    body: t,
                    contentType: r,
                    previousBody: s ? s.body : void 0,
                    previousContentType: s ? s.contentType : void 0,
                  };
              } else a = d(a, e[o - 1].substring(i.length));
            }
            return n;
          } catch (e) {
            throw s.default("[Cachinglayer] Error during PUT", n, e), e;
          }
        });
      }
      delete(e) {
        const t = a.pathsFromRoot(e);
        return this._updateNodes(t, function(e, t) {
          for (let r = 0, n = e.length; r < n; r++) {
            const n = e[r], o = t[n];
            let i;
            if (o) {
              if (0 === r) {
                i = c(o),
                  o.local = {
                    body: !1,
                    previousBody: i ? i.body : void 0,
                    previousContentType: i ? i.contentType : void 0,
                  };
              } else {
                o.local || (o.local = a.deepClone(o.common));
                const t = e[r - 1].substring(n.length);
                if (delete o.local.itemsMap[t], Object.getOwnPropertyNames(o.local.itemsMap).length > 0) break;
              }
            } else console.error("Cannot delete non-existing node " + n);
          }
          return t;
        });
      }
      flush(e) {
        return this._getAllDescendentPaths(e).then(e => this.getNodes(e)).then(e => {
          for (const t in e) {
            const r = e[t];
            r && r.common && r.local
            && this._emitChange({
              path: r.path,
              origin: "local",
              oldValue: !1 === r.local.body ? void 0 : r.local.body,
              newValue: !1 === r.common.body ? void 0 : r.common.body,
            }), e[t] = void 0;
          }
          return this.setNodes(e);
        });
      }
      _emitChange(e) {
        i.default.changeEvents[e.origin] && this._emit("change", e);
      }
      fireInitial() {
        i.default.changeEvents.local && this.forAllNodes(e => {
          if (a.isDocument(e.path)) {
            const t = c(e);
            t
              && this._emitChange({
                path: e.path,
                origin: "local",
                oldValue: void 0,
                oldContentType: void 0,
                newValue: t.body,
                newContentType: t.contentType,
              });
          }
        }).then(() => {
          this._emit("local-events-done");
        });
      }
      onDiff(e) {
        this.diffHandler = e;
      }
      migrate(e) {
        return "object" != typeof e || e.common
          || (e.common = {},
            "string" == typeof e.path
              ? "/" === e.path.substr(-1) && "object" == typeof e.body && (e.common.itemsMap = e.body)
              : (e.local || (e.local = {}), e.local.body = e.body, e.local.contentType = e.contentType)),
          e;
      }
      _updateNodes(e, t) {
        return new Promise((r, n) => {
          this._doUpdateNodes(e, t, { resolve: r, reject: n });
        });
      }
      _doUpdateNodes(e, t, r) {
        this._updateNodesRunning
          ? this._updateNodesQueued.push({ paths: e, cb: t, promise: r })
          : (this._updateNodesRunning = !0,
            this.getNodes(e).then(n => {
              const o = a.deepClone(n), i = [];
              n = t(e, n);
              for (const e in n) {
                const t = n[e];
                a.equal(t, o[e])
                  ? delete n[e]
                  : a.isDocument(e)
                    && (a.equal(t.local.body, t.local.previousBody)
                        && t.local.contentType === t.local.previousContentType
                      || i.push({
                        path: e,
                        origin: "window",
                        oldValue: t.local.previousBody,
                        newValue: !1 === t.local.body ? void 0 : t.local.body,
                        oldContentType: t.local.previousContentType,
                        newContentType: t.local.contentType,
                      }),
                      delete t.local.previousBody,
                      delete t.local.previousContentType);
              }
              this.setNodes(n).then(() => {
                this._emitChangeEvents(i), r.resolve({ statusCode: 200 });
              });
            }).then(() => Promise.resolve(), e => {
              r.reject(e);
            }).then(() => {
              this._updateNodesRunning = !1;
              const e = this._updateNodesQueued.shift();
              e && this._doUpdateNodes(e.paths, e.cb, e.promise);
            }));
      }
      _emitChangeEvents(e) {
        for (let t = 0, r = e.length; t < r; t++) {
          this._emitChange(e[t]), this.diffHandler && this.diffHandler(e[t].path);
        }
      }
      _getAllDescendentPaths(e) {
        return a.isFolder(e)
          ? this.getNodes([e]).then(t => {
            const r = [e],
              n = c(t[e]),
              o = Object.keys(n.itemsMap).map(t =>
                this._getAllDescendentPaths(e + t).then(e => {
                  for (let t = 0, n = e.length; t < n; t++) r.push(e[t]);
                })
              );
            return Promise.all(o).then(() => r);
          })
          : Promise.resolve([e]);
      }
      _getInternals() {
        return { getLatest: c, makeNode: l, isOutdated: h };
      }
    }
    function c(e) {
      if ("object" == typeof e && "string" == typeof e.path) {
        if (a.isFolder(e.path)) {
          if (e.local && e.local.itemsMap) return e.local;
          if (e.common && e.common.itemsMap) return e.common;
        } else {
          if (e.local) {
            if (e.local.body && e.local.contentType) return e.local;
            if (!1 === e.local.body) return;
          }
          if (e.common && e.common.body && e.common.contentType) return e.common;
          if (e.body && e.contentType) return { body: e.body, contentType: e.contentType };
        }
      }
    }
    function h(e, t) {
      for (const r in e) {
        if (e[r] && e[r].remote) return !0;
        const n = c(e[r]);
        if (n && n.timestamp && (new Date()).getTime() - n.timestamp <= t) return !1;
        if (!n) return !0;
      }
      return !0;
    }
    function l(e) {
      const t = { path: e, common: {} };
      return a.isFolder(e) && (t.common.itemsMap = {}), t;
    }
    function d(e, t) {
      return e.common || (e.common = { itemsMap: {} }),
        e.common.itemsMap || (e.common.itemsMap = {}),
        e.local || (e.local = a.deepClone(e.common)),
        e.local.itemsMap || (e.local.itemsMap = e.common.itemsMap),
        e.local.itemsMap[t] = !0,
        e;
    }
    a.applyMixins(u, [o.default]), e.exports = u;
  }, function(e, t, r) {
    "use strict";
    e.exports = class {
      constructor() {
        this.reset();
      }
      static _rs_init() {}
      get scopes() {
        return Object.keys(this.scopeModeMap).map(e => ({ name: e, mode: this.scopeModeMap[e] }));
      }
      get scopeParameter() {
        return this.scopes.map(e => `${this._scopeNameForParameter(e)}:${e.mode}`).join(" ");
      }
      claim(e, t) {
        if ("string" != typeof e || -1 !== e.indexOf("/") || 0 === e.length) {
          throw new Error("Scope should be a non-empty string without forward slashes");
        }
        if (!t.match(/^rw?$/)) throw new Error("Mode should be either 'r' or 'rw'");
        this._adjustRootPaths(e), this.scopeModeMap[e] = t;
      }
      get(e) {
        return this.scopeModeMap[e];
      }
      remove(e) {
        const t = {};
        for (const e in this.scopeModeMap) t[e] = this.scopeModeMap[e];
        this.reset(), delete t[e];
        for (const e in t) this.claim(e, t[e]);
      }
      checkPermission(e, t) {
        const r = this.get(e);
        return r && ("r" === t || "rw" === r);
      }
      checkPathPermission(e, t) {
        if (this.checkPermission("*", t)) return !0;
        const r = this._getModuleName(e);
        return !!this.checkPermission(r, t);
      }
      reset() {
        this.rootPaths = [], this.scopeModeMap = {};
      }
      _getModuleName(e) {
        if ("/" !== e[0]) throw new Error("Path should start with a slash");
        const t = e.replace(/^\/public/, "").match(/^\/([^/]*)\//);
        return t ? t[1] : "*";
      }
      _adjustRootPaths(e) {
        "*" in this.scopeModeMap || "*" === e
          ? this.rootPaths = ["/"]
          : e in this.scopeModeMap || (this.rootPaths.push("/" + e + "/"), this.rootPaths.push("/public/" + e + "/"));
      }
      _scopeNameForParameter(e) {
        if ("*" === e.name && this.storageType) {
          if ("2012.04" === this.storageType) return "";
          if (this.storageType.match(/remotestorage-0[01]/)) return "root";
        }
        return e.name;
      }
      setStorageType(e) {
        this.storageType = e;
      }
    };
  }, function(e, t, r) {
    "use strict";
    var n = this && this.__importDefault || function(e) {
      return e && e.__esModule ? e : { default: e };
    };
    const o = r(0), i = n(r(1));
    e.exports = class {
      constructor() {
        this.pendingActivations = [], this.reset();
      }
      set(e, t) {
        if ("string" != typeof e) throw new Error("path should be a string");
        if (!o.isFolder(e)) throw new Error("path should be a folder");
        if (!t.match(/^(FLUSH|SEEN|ALL)$/)) throw new Error("strategy should be 'FLUSH', 'SEEN', or 'ALL'");
        this._rootPaths[e] = t,
          "ALL" === t && (this.activateHandler ? this.activateHandler(e) : this.pendingActivations.push(e));
      }
      enable(e) {
        this.set(e, "ALL");
      }
      disable(e) {
        this.set(e, "FLUSH");
      }
      onActivate(e) {
        i.default("[Caching] Setting activate handler", e, this.pendingActivations), this.activateHandler = e;
        for (let t = 0; t < this.pendingActivations.length; t++) e(this.pendingActivations[t]);
        this.pendingActivations = [];
      }
      checkPath(e) {
        return void 0 !== this._rootPaths[e]
          ? this._rootPaths[e]
          : "/" === e
          ? "SEEN"
          : this.checkPath(o.containingFolder(e));
      }
      reset() {
        this._rootPaths = {};
      }
      static _rs_init() {}
    };
  }, function(e, t, r) {
    "use strict";
    var n = this && this.__importDefault || function(e) {
      return e && e.__esModule ? e : { default: e };
    };
    const o = n(r(7)),
      i = n(r(8)),
      s = n(r(2)),
      a = r(0),
      u = "https://www.googleapis.com",
      c = "remotestorage:googledrive";
    let h;
    function l(e) {
      return "/" === e.substr(-1) && (e = e.substr(0, e.length - 1)), decodeURIComponent(e);
    }
    function d(e) {
      return e.replace(/[^\/]+\/?$/, "");
    }
    function f(e) {
      const t = e.split("/");
      return "/" === e.substr(-1) ? t[t.length - 2] + "/" : t[t.length - 1];
    }
    function p(e) {
      return a.cleanPath("/remotestorage/" + e);
    }
    function m(e) {
      return e.replace(/^["'](.*)["']$/, "$1");
    }
    class g {
      constructor(e) {
        this._items = {}, this.maxAge = e, this._items = {};
      }
      get(e) {
        const t = this._items[e], r = (new Date()).getTime();
        return t && t.t >= r - this.maxAge ? t.v : void 0;
      }
      set(e, t) {
        this._items[e] = { v: t, t: (new Date()).getTime() };
      }
    }
    class y {
      constructor(e, t) {
        if (
          this.connected = !1,
            this.online = !0,
            this.addEvents(["connected", "not-connected"]),
            this.rs = e,
            this.clientId = t,
            this._fileIdCache = new g(300),
            h = a.localStorageAvailable(),
            h
        ) {
          const e = a.getJSONFromLocalStorage(c);
          e && this.configure(e);
        }
      }
      configure(e) {
        void 0 !== e.userAddress && (this.userAddress = e.userAddress), void 0 !== e.token && (this.token = e.token);
        const t = function() {
            h && localStorage.setItem(c, JSON.stringify({ userAddress: this.userAddress, token: this.token }));
          },
          r = function() {
            this.connected = !1, delete this.token, h && localStorage.removeItem(c);
          };
        this.token
          ? (this.connected = !0,
            this.userAddress ? (this._emit("connected"), t.apply(this)) : this.info().then(e => {
              this.userAddress = e.user.emailAddress, this._emit("connected"), t.apply(this);
            }).catch(() => {
              r.apply(this), this.rs._emit("error", new Error("Could not fetch user info."));
            }))
          : r.apply(this);
      }
      connect() {
        this.rs.setBackend("googledrive"),
          this.rs.authorize({
            authURL: "https://accounts.google.com/o/oauth2/auth",
            scope: "https://www.googleapis.com/auth/drive",
            clientId: this.clientId,
          });
      }
      stopWaitingForToken() {
        this.connected || this._emit("not-connected");
      }
      get(e, t) {
        return a.isFolder(e) ? this._getFolder(p(e)) : this._getFile(p(e), t);
      }
      put(e, t, r, n) {
        const o = p(e);
        function i(e) {
          if (e.status >= 200 && e.status < 300) {
            const t = JSON.parse(e.responseText), r = m(t.etag);
            return Promise.resolve({ statusCode: 200, contentType: t.mimeType, revision: r });
          }
          return 412 === e.status
            ? Promise.resolve({ statusCode: 412, revision: "conflict" })
            : Promise.reject("PUT failed with status " + e.status + " (" + e.responseText + ")");
        }
        return this._getFileId(o).then(e =>
          e
            ? n && "*" === n.ifNoneMatch ? i({ status: 412 }) : this._updateFile(e, o, t, r, n).then(i)
            : this._createFile(o, t, r).then(i)
        );
      }
      delete(e, t) {
        const r = p(e);
        return this._getFileId(r).then(e =>
          e
            ? this._getMeta(e).then(r => {
              let n;
              return "object" == typeof r && "string" == typeof r.etag && (n = m(r.etag)),
                t && t.ifMatch && t.ifMatch !== n
                  ? { statusCode: 412, revision: n }
                  : this._request("DELETE", u + "/drive/v2/files/" + e, {}).then(e =>
                    200 === e.status || 204 === e.status
                      ? { statusCode: 200 }
                      : Promise.reject("Delete failed: " + e.status + " (" + e.responseText + ")")
                  );
            })
            : Promise.resolve({ statusCode: 200 })
        );
      }
      info() {
        return this._request("GET", "https://www.googleapis.com/drive/v2/about?fields=user", {}).then(function(e) {
          try {
            const t = JSON.parse(e.responseText);
            return Promise.resolve(t);
          } catch (e) {
            return Promise.reject(e);
          }
        });
      }
      _updateFile(e, t, r, n, o) {
        const i = { mimeType: n }, s = { "Content-Type": "application/json; charset=UTF-8" };
        return o && o.ifMatch && (s["If-Match"] = "\"" + o.ifMatch + "\""),
          this._request("PUT", u + "/upload/drive/v2/files/" + e + "?uploadType=resumable", {
            body: JSON.stringify(i),
            headers: s,
          }).then(e =>
            412 === e.status
              ? e
              : this._request("PUT", e.getResponseHeader("Location"), {
                body: n.match(/^application\/json/) ? JSON.stringify(r) : r,
              })
          );
      }
      _createFile(e, t, r) {
        return this._getParentId(e).then(n => {
          const o = { title: l(f(e)), mimeType: r, parents: [{ kind: "drive#fileLink", id: n }] };
          return this._request("POST", u + "/upload/drive/v2/files?uploadType=resumable", {
            body: JSON.stringify(o),
            headers: { "Content-Type": "application/json; charset=UTF-8" },
          }).then(e =>
            this._request("POST", e.getResponseHeader("Location"), {
              body: r.match(/^application\/json/) ? JSON.stringify(t) : t,
            })
          );
        });
      }
      _getFile(e, t) {
        return this._getFileId(e).then(e =>
          this._getMeta(e).then(e => {
            let r;
            if (
              "object" == typeof e && "string" == typeof e.etag && (r = m(e.etag)),
                t && t.ifNoneMatch && r === t.ifNoneMatch
            ) {
              return Promise.resolve({ statusCode: 304 });
            }
            if (!e.downloadUrl) {
              if (!e.exportLinks || !e.exportLinks["text/html"]) {
                return Promise.resolve({ statusCode: 200, body: "", contentType: e.mimeType, revision: r });
              }
              e.mimeType += ";export=text/html", e.downloadUrl = e.exportLinks["text/html"];
            }
            return this._request("GET", e.downloadUrl, { responseType: "arraybuffer" }).then(t =>
              a.getTextFromArrayBuffer(t.response, "UTF-8").then(function(n) {
                let o = n;
                if (e.mimeType.match(/^application\/json/)) {
                  try {
                    o = JSON.parse(o);
                  } catch (e) {
                  }
                } else {
                  a.shouldBeTreatedAsBinary(n, e.mimeType) && (o = t.response);
                }
                return { statusCode: 200, body: o, contentType: e.mimeType, revision: r };
              })
            );
          })
        );
      }
      _getFolder(e) {
        return this._getFileId(e).then(t => {
          let r, n, o;
          if (!t) return Promise.resolve({ statusCode: 404 });
          const i = "'" + t + "' in parents";
          return this._request(
            "GET",
            u + "/drive/v2/files?q=" + encodeURIComponent(i) + "&fields="
              + encodeURIComponent("items(downloadUrl,etag,fileSize,id,mimeType,title,labels)")
              + "&maxResults=1000&trashed=false",
            {},
          ).then(t => {
            var i;
            if (200 !== t.status) return Promise.reject("request failed or something: " + t.status);
            try {
              r = JSON.parse(t.responseText);
            } catch (e) {
              return Promise.reject("non-JSON response from GoogleDrive");
            }
            o = {};
            for (const t of r.items) {
              (null === (i = t.labels) || void 0 === i ? void 0 : i.trashed)
                || (n = m(t.etag),
                  "application/vnd.google-apps.folder" === t.mimeType
                    ? (this._fileIdCache.set(e + a.cleanPath(t.title) + "/", t.id), o[t.title + "/"] = { ETag: n })
                    : (this._fileIdCache.set(e + a.cleanPath(t.title), t.id),
                      o[t.title] = { ETag: n, "Content-Type": t.mimeType, "Content-Length": t.fileSize }));
            }
            return Promise.resolve({
              statusCode: 200,
              body: o,
              contentType: "application/json; charset=UTF-8",
              revision: void 0,
            });
          });
        });
      }
      _getParentId(e) {
        const t = d(e);
        return this._getFileId(t).then(e => e ? Promise.resolve(e) : this._createFolder(t));
      }
      _createFolder(e) {
        return this._getParentId(e).then(t =>
          this._request("POST", u + "/drive/v2/files", {
            body: JSON.stringify({
              title: l(f(e)),
              mimeType: "application/vnd.google-apps.folder",
              parents: [{ id: t }],
            }),
            headers: { "Content-Type": "application/json; charset=UTF-8" },
          }).then(e => {
            const t = JSON.parse(e.responseText);
            return Promise.resolve(t.id);
          })
        );
      }
      _getFileId(e) {
        let t;
        return "/" === e
          ? Promise.resolve("root")
          : (t = this._fileIdCache.get(e))
          ? Promise.resolve(t)
          : this._getFolder(d(e)).then(() => (t = this._fileIdCache.get(e),
            t
              ? Promise.resolve(t)
              : "/" === e.substr(-1)
              ? this._createFolder(e).then(() => this._getFileId(e))
              : Promise.resolve())
          );
      }
      _getMeta(e) {
        return this._request("GET", u + "/drive/v2/files/" + e, {}).then(function(t) {
          return 200 === t.status
            ? Promise.resolve(JSON.parse(t.responseText))
            : Promise.reject("request (getting metadata for " + e + ") failed with status: " + t.status);
        });
      }
      _request(e, t, r) {
        return r.headers || (r.headers = {}),
          r.headers.Authorization = "Bearer " + this.token,
          this.rs._emit("wire-busy", { method: e, isFolder: a.isFolder(t) }),
          i.default.request.call(this, e, t, r).then(
            r =>
              r && 401 === r.status
                ? void this.connect()
                : (this.online || (this.online = !0, this.rs._emit("network-online")),
                  this.rs._emit("wire-done", { method: e, isFolder: a.isFolder(t), success: !0 }),
                  Promise.resolve(r)),
            r => (this.online && (this.online = !1, this.rs._emit("network-offline")),
              this.rs._emit("wire-done", { method: e, isFolder: a.isFolder(t), success: !1 }),
              Promise.reject(r)),
          );
      }
      static _rs_init(e) {
        const t = e.apiKeys.googledrive;
        var r;
        t
          && (e.googledrive = new y(e, t.clientId),
            "googledrive" === e.backend
            && (e._origRemote = e.remote,
              e.remote = e.googledrive,
              (r = e)._origBaseClientGetItemURL
              || (r._origBaseClientGetItemURL = o.default.prototype.getItemURL,
                o.default.prototype.getItemURL = function() {
                  throw new Error("getItemURL is not implemented for Google Drive yet");
                })));
      }
      static _rs_supported() {
        return !0;
      }
      static _rs_cleanup(e) {
        var t;
        e.setBackend(void 0),
          e._origRemote && (e.remote = e._origRemote, delete e._origRemote),
          (t = e)._origBaseClientGetItemURL
          && (o.default.prototype.getItemURL = t._origBaseClientGetItemURL, delete t._origBaseClientGetItemURL);
      }
    }
    a.applyMixins(y, [s.default]), e.exports = y;
  }, function(e, t, r) {
    "use strict";
    var n = this && this.__awaiter || function(e, t, r, n) {
        return new (r || (r = Promise))(function(o, i) {
          function s(e) {
            try {
              u(n.next(e));
            } catch (e) {
              i(e);
            }
          }
          function a(e) {
            try {
              u(n.throw(e));
            } catch (e) {
              i(e);
            }
          }
          function u(e) {
            var t;
            e.done ? o(e.value) : (t = e.value,
              t instanceof r ? t : new r(function(e) {
                e(t);
              })).then(s, a);
          }
          u((n = n.apply(e, t || [])).next());
        });
      },
      o = this && this.__importDefault || function(e) {
        return e && e.__esModule ? e : { default: e };
      };
    const i = o(r(2)), s = o(r(8)), a = o(r(7)), u = o(r(26)), c = o(r(9)), h = o(r(4)), l = r(0);
    let d;
    const f = "remotestorage:dropbox";
    function p(e) {
      return l.cleanPath("/remotestorage/" + e).replace(/\/$/, "");
    }
    function m(e, t) {
      return new RegExp("^" + t.join("\\/") + "(\\/|$)").test(e.error_summary);
    }
    function g(e) {
      return e instanceof ArrayBuffer || s.default.isArrayBufferView(e);
    }
    class y {
      constructor(e) {
        if (
          this.rs = e,
            this.connected = !1,
            this.online = !0,
            this._initialFetchDone = !1,
            this.addEvents(["connected", "not-connected"]),
            this.clientId = e.apiKeys.dropbox.appKey,
            this._revCache = new u.default("rev"),
            this._fetchDeltaCursor = null,
            this._fetchDeltaPromise = null,
            this._itemRefs = {},
            d = l.localStorageAvailable(),
            d
        ) {
          const e = l.getJSONFromLocalStorage(f);
          e && this.configure(e), this._itemRefs = l.getJSONFromLocalStorage(f + ":shares") || {};
        }
        this.connected && setTimeout(this._emit.bind(this), 0, "connected");
      }
      connect() {
        this.rs.setBackend("dropbox"),
          this.token
            ? b(this.rs)
            : this.rs.authorize({
              authURL: "https://www.dropbox.com/oauth2/authorize",
              scope: "",
              clientId: this.clientId,
            });
      }
      configure(e) {
        void 0 !== e.userAddress && (this.userAddress = e.userAddress), void 0 !== e.token && (this.token = e.token);
        const t = function() {
            d && localStorage.setItem(f, JSON.stringify({ userAddress: this.userAddress, token: this.token }));
          },
          r = function() {
            this.connected = !1, d && localStorage.removeItem(f);
          };
        this.token
          ? (this.connected = !0,
            this.userAddress ? (this._emit("connected"), t.apply(this)) : this.info().then(function(e) {
              this.userAddress = e.email, this._emit("connected"), t.apply(this);
            }.bind(this)).catch(function() {
              r.apply(this), this.rs._emit("error", new Error("Could not fetch user info."));
            }.bind(this)))
          : r.apply(this);
      }
      stopWaitingForToken() {
        this.connected || this._emit("not-connected");
      }
      _getFolder(e) {
        const t = this._revCache,
          r = r => {
            let o;
            if (200 !== r.status && 409 !== r.status) return Promise.reject("Unexpected response status: " + r.status);
            try {
              o = JSON.parse(r.responseText);
            } catch (e) {
              return Promise.reject(e);
            }
            if (409 === r.status) {
              return m(o, ["path", "not_found"])
                ? Promise.resolve({})
                : Promise.reject(new Error("API returned an error: " + o.error_summary));
            }
            const i = o.entries.reduce((r, n) => {
              const o = "folder" === n[".tag"], i = n.path_lower.split("/").slice(-1)[0] + (o ? "/" : "");
              return o ? r[i] = { ETag: t.get(e + i) } : (r[i] = { ETag: n.rev }, this._revCache.set(e + i, n.rev)), r;
            }, {});
            return o.has_more
              ? n(o.cursor).then(function(e) {
                return Object.assign(i, e);
              })
              : Promise.resolve(i);
          },
          n = e => {
            const t = { body: { cursor: e } };
            return this._request("POST", "https://api.dropboxapi.com/2/files/list_folder/continue", t).then(r);
          };
        return this._request("POST", "https://api.dropboxapi.com/2/files/list_folder", { body: { path: p(e) } }).then(r)
          .then(function(r) {
            return Promise.resolve({
              statusCode: 200,
              body: r,
              contentType: "application/json; charset=UTF-8",
              revision: t.get(e),
            });
          });
      }
      get(e, t) {
        if (!this.connected) return Promise.reject("not connected (path: " + e + ")");
        const r = this._revCache.get(e);
        if (null === r) return Promise.resolve({ statusCode: 404 });
        if (t && t.ifNoneMatch) {
          if (!this._initialFetchDone) return this.fetchDelta().then(() => this.get(e, t));
          if (r && r === t.ifNoneMatch) return Promise.resolve({ statusCode: 304 });
        }
        if ("/" === e.substr(-1)) return this._getFolder(e);
        const n = { headers: { "Dropbox-API-Arg": JSON.stringify({ path: p(e) }) }, responseType: "arraybuffer" };
        return t && t.ifNoneMatch && (n.headers["If-None-Match"] = t.ifNoneMatch),
          this._request("GET", "https://content.dropboxapi.com/2/files/download", n).then(t => {
            const r = t.status;
            let n, o, i, s;
            return 200 !== r && 409 !== r
              ? Promise.resolve({ statusCode: r })
              : (n = t.getResponseHeader("Dropbox-API-Result"),
                l.getTextFromArrayBuffer(t.response, "UTF-8").then(a => {
                  o = a, 409 === r && (n = o);
                  try {
                    n = JSON.parse(n);
                  } catch (e) {
                    return Promise.reject(e);
                  }
                  if (409 === r) {
                    return m(n, ["path", "not_found"])
                      ? { statusCode: 404 }
                      : Promise.reject(
                        new Error("API error while downloading file (\"" + e + "\"): " + n.error_summary),
                      );
                  }
                  if (
                    i = t.getResponseHeader("Content-Type"),
                      s = n.rev,
                      this._revCache.set(e, s),
                      this._shareIfNeeded(e),
                      l.shouldBeTreatedAsBinary(a, i)
                  ) {
                    o = t.response;
                  } else {
                    try {
                      o = JSON.parse(o), i = "application/json; charset=UTF-8";
                    } catch (e) {}
                  }
                  return { statusCode: r, body: o, contentType: i, revision: s };
                }));
          });
      }
      put(e, t, r, n) {
        if (!this.connected) throw new Error("not connected (path: " + e + ")");
        const o = this._revCache.get(e);
        if (n && n.ifMatch && o && o !== n.ifMatch) return Promise.resolve({ statusCode: 412, revision: o });
        if (n && "*" === n.ifNoneMatch && o && "rev" !== o) return Promise.resolve({ statusCode: 412, revision: o });
        if (!r.match(/charset=/) && g(t) && (r += "; charset=binary"), t.length > 157286400) {
          return Promise.reject(new Error("Cannot upload file larger than 150MB"));
        }
        let i;
        const s = n && (n.ifMatch || "*" === n.ifNoneMatch), a = { body: t, contentType: r, path: e };
        return i = s
          ? this._getMetadata(e).then(e =>
            n && "*" === n.ifNoneMatch && e || n && n.ifMatch && e && e.rev !== n.ifMatch
              ? Promise.resolve({ statusCode: 412, revision: e.rev })
              : this._uploadSimple(a)
          )
          : this._uploadSimple(a),
          i.then(t => (this._shareIfNeeded(e), t));
      }
      delete(e, t) {
        if (!this.connected) throw new Error("not connected (path: " + e + ")");
        const r = this._revCache.get(e);
        return t && t.ifMatch && r && t.ifMatch !== r
          ? Promise.resolve({ statusCode: 412, revision: r })
          : t && t.ifMatch
          ? this._getMetadata(e).then(r =>
            t && t.ifMatch && r && r.rev !== t.ifMatch
              ? Promise.resolve({ statusCode: 412, revision: r.rev })
              : this._deleteSimple(e)
          )
          : this._deleteSimple(e);
      }
      _shareIfNeeded(e) {
        e.match(/^\/public\/.*[^/]$/) && void 0 === this._itemRefs[e] && this.share(e);
      }
      share(e) {
        const t = { body: { path: p(e) } };
        return this._request("POST", "https://api.dropboxapi.com/2/sharing/create_shared_link_with_settings", t).then(
          t => {
            if (200 !== t.status && 409 !== t.status) {
              return Promise.reject(new Error("Invalid response status:" + t.status));
            }
            let r;
            try {
              r = JSON.parse(t.responseText);
            } catch (e) {
              return Promise.reject(new Error("Invalid response body: " + t.responseText));
            }
            return 409 === t.status
              ? m(r, ["shared_link_already_exists"])
                ? this._getSharedLink(e)
                : Promise.reject(new Error("API error: " + r.error_summary))
              : Promise.resolve(r.url);
          },
        ).then(
          t => (this._itemRefs[e] = t,
            d && localStorage.setItem(f + ":shares", JSON.stringify(this._itemRefs)),
            Promise.resolve(t)),
          t => (t.message = "Sharing Dropbox file or folder (\"" + e + "\") failed: " + t.message, Promise.reject(t)),
        );
      }
      info() {
        return this._request("POST", "https://api.dropboxapi.com/2/users/get_current_account", {}).then(function(e) {
          let t = e.responseText;
          try {
            t = JSON.parse(t);
          } catch (e) {
            return Promise.reject(new Error("Could not query current account info: Invalid API response: " + t));
          }
          return Promise.resolve({ email: t.email });
        });
      }
      _request(e, t, r) {
        return r.headers || (r.headers = {}),
          r.headers.Authorization = "Bearer " + this.token,
          "object" != typeof r.body || g(r.body)
          || (r.body = JSON.stringify(r.body), r.headers["Content-Type"] = "application/json; charset=UTF-8"),
          this.rs._emit("wire-busy", { method: e, isFolder: l.isFolder(t) }),
          s.default.request.call(this, e, t, r).then(
            n =>
              n && 503 === n.status
                ? (this.online && (this.online = !1, this.rs._emit("network-offline")),
                  setTimeout(this._request(e, t, r), 3210))
                : (this.online || (this.online = !0, this.rs._emit("network-online")),
                  this.rs._emit("wire-done", { method: e, isFolder: l.isFolder(t), success: !0 }),
                  Promise.resolve(n)),
            r => (this.online && (this.online = !1, this.rs._emit("network-offline")),
              this.rs._emit("wire-done", { method: e, isFolder: l.isFolder(t), success: !1 }),
              Promise.reject(r)),
          );
      }
      fetchDelta(...e) {
        if (this._fetchDeltaPromise) return this._fetchDeltaPromise;
        const t = r => {
          let n, o = "https://api.dropboxapi.com/2/files/list_folder";
          return "string" == typeof r
            ? (o += "/continue", n = { cursor: r })
            : n = { path: "/remotestorage", recursive: !0, include_deleted: !0 },
            this._request("POST", o, { body: n }).then(n => {
              if (401 === n.status) return this.rs._emit("error", new h.default()), Promise.resolve(e);
              if (200 !== n.status && 409 !== n.status) {
                return Promise.reject(new Error("Invalid response status: " + n.status));
              }
              let o;
              try {
                o = JSON.parse(n.responseText);
              } catch (e) {
                return Promise.reject(new Error("Invalid response body: " + n.responseText));
              }
              if (409 === n.status) {
                if (!m(o, ["path", "not_found"])) {
                  return Promise.reject(new Error("API returned an error: " + o.error_summary));
                }
                o = { cursor: null, entries: [], has_more: !1 };
              }
              if (
                r || this._revCache.deactivatePropagation(),
                  o.entries.forEach(e => {
                    const t = e.path_lower.substr("/remotestorage".length);
                    "deleted" === e[".tag"]
                      ? (this._revCache.delete(t), this._revCache.delete(t + "/"))
                      : "file" === e[".tag"] && this._revCache.set(t, e.rev);
                  }),
                  this._fetchDeltaCursor = o.cursor,
                  o.has_more
              ) {
                return t(o.cursor);
              }
              this._revCache.activatePropagation(), this._initialFetchDone = !0;
            }).catch(e => "timeout" === e || e instanceof ProgressEvent ? Promise.resolve() : Promise.reject(e));
        };
        return this._fetchDeltaPromise = t(this._fetchDeltaCursor).catch(e => ("object" == typeof e && "message" in e
          ? e.message = "Dropbox: fetchDelta: " + e.message
          : e = "Dropbox: fetchDelta: " + e,
          this._fetchDeltaPromise = null,
          Promise.reject(e))
        ).then(() => (this._fetchDeltaPromise = null, Promise.resolve(e))),
          this._fetchDeltaPromise;
      }
      _getMetadata(e) {
        const t = { path: p(e) };
        return this._request("POST", "https://api.dropboxapi.com/2/files/get_metadata", { body: t }).then(e => {
          if (200 !== e.status && 409 !== e.status) {
            return Promise.reject(new Error("Invalid response status:" + e.status));
          }
          let t;
          try {
            t = JSON.parse(e.responseText);
          } catch (t) {
            return Promise.reject(new Error("Invalid response body: " + e.responseText));
          }
          return 409 === e.status
            ? m(t, ["path", "not_found"])
              ? Promise.resolve()
              : Promise.reject(new Error("API error: " + t.error_summary))
            : Promise.resolve(t);
        }).then(
          void 0,
          t => (t.message = "Could not load metadata for file or folder (\"" + e + "\"): " + t.message,
            Promise.reject(t)),
        );
      }
      _uploadSimple(e) {
        const t = { path: p(e.path), mode: { ".tag": "overwrite", update: void 0 }, mute: !0 };
        return e.ifMatch && (t.mode = { ".tag": "update", update: e.ifMatch }),
          this._request("POST", "https://content.dropboxapi.com/2/files/upload", {
            body: e.body,
            headers: { "Content-Type": "application/octet-stream", "Dropbox-API-Arg": JSON.stringify(t) },
          }).then(t => {
            if (200 !== t.status && 409 !== t.status) return Promise.resolve({ statusCode: t.status });
            let r = t.responseText;
            try {
              r = JSON.parse(r);
            } catch (e) {
              return Promise.reject(new Error("Invalid API result: " + r));
            }
            return 409 === t.status
              ? m(r, ["path", "conflict"])
                ? this._getMetadata(e.path).then(function(e) {
                  return Promise.resolve({ statusCode: 412, revision: e.rev });
                })
                : Promise.reject(new Error("API error: " + r.error_summary))
              : (this._revCache.set(e.path, r.rev), Promise.resolve({ statusCode: t.status, revision: r.rev }));
          });
      }
      _deleteSimple(e) {
        const t = { path: p(e) };
        return this._request("POST", "https://api.dropboxapi.com/2/files/delete", { body: t }).then(e => {
          if (200 !== e.status && 409 !== e.status) return Promise.resolve({ statusCode: e.status });
          let t = e.responseText;
          try {
            t = JSON.parse(t);
          } catch (e) {
            return Promise.reject(new Error("Invalid response body: " + t));
          }
          return 409 === e.status
            ? m(t, ["path_lookup", "not_found"])
              ? Promise.resolve({ statusCode: 404 })
              : Promise.reject(new Error("API error: " + t.error_summary))
            : Promise.resolve({ statusCode: 200 });
        }).then(
          t => (200 !== t.statusCode && 404 !== t.statusCode || (this._revCache.delete(e), delete this._itemRefs[e]),
            Promise.resolve(t)),
          t => (t.message = "Could not delete Dropbox file or folder (\"" + e + "\"): " + t.message, Promise.reject(t)),
        );
      }
      _getSharedLink(e) {
        return n(this, void 0, void 0, function*() {
          const t = { body: { path: p(e), direct_only: !0 } };
          return this._request("POST", "https://api.dropbox.com/2/sharing/list_shared_links", t).then(
            e => {
              if (200 !== e.status && 409 !== e.status) {
                return Promise.reject(new Error("Invalid response status: " + e.status));
              }
              let t;
              try {
                t = JSON.parse(e.responseText);
              } catch (t) {
                return Promise.reject(new Error("Invalid response body: " + e.responseText));
              }
              return 409 === e.status
                ? Promise.reject(new Error("API error: " + e.error_summary))
                : t.links.length
                ? Promise.resolve(t.links[0].url)
                : Promise.reject(new Error("No links returned"));
            },
            t => (t.message = "Could not get link to a shared file or folder (\"" + e + "\"): " + t.message,
              Promise.reject(t)),
          );
        });
      }
      static _rs_init(e) {
        d = l.localStorageAvailable(), e.apiKeys.dropbox && (e.dropbox = new y(e)), "dropbox" === e.backend && b(e);
      }
      static _rs_supported() {
        return !0;
      }
      static _rs_cleanup(e) {
        !function(e) {
          (function(e) {
            e._origRemote && (e.remote = e._origRemote, delete e._origRemote);
          })(e),
            function(e) {
              if (!e._dropboxOrigSync) return;
              e.sync.sync = e._dropboxOrigSync, delete e._dropboxOrigSync;
            }(e),
            function(e) {
              if (!e._origBaseClientGetItemURL) return;
              a.default.prototype.getItemURL = e._origBaseClientGetItemURL, delete e._origBaseClientGetItemURL;
            }(e),
            _(e);
        }(e),
          d && localStorage.removeItem(f),
          e.setBackend(void 0);
      }
    }
    function v(e, ...t) {
      e._dropboxOrigSync || (e._dropboxOrigSync = e.sync.sync.bind(e.sync),
        e.sync.sync = function() {
          return this.dropbox.fetchDelta(e, ...t).then(e._dropboxOrigSync, function(t) {
            e._emit("error", new c.default(t)), e._emit("sync-done");
          });
        }.bind(e));
    }
    function _(e) {
      e._dropboxOrigSyncCycle && (e.syncCycle = e._dropboxOrigSyncCycle, delete e._dropboxOrigSyncCycle);
    }
    function b(e) {
      !function(e) {
        e._origRemote || (e._origRemote = e.remote, e.remote = e.dropbox);
      }(e),
        e.sync ? v(e) : function(e, ...t) {
          e._dropboxOrigSyncCycle || (e._dropboxOrigSyncCycle = e.syncCycle,
            e.syncCycle = () => {
              if (!e.sync) throw new Error("expected sync to be initialized by now");
              v(e), e._dropboxOrigSyncCycle(e, ...t), _(e);
            });
        }(e),
        function(e) {
          e._origBaseClientGetItemURL
            || (e._origBaseClientGetItemURL = a.default.prototype.getItemURL,
              a.default.prototype.getItemURL = function() {
                throw new Error("getItemURL is not implemented for Dropbox yet");
              });
        }(e);
    }
    l.applyMixins(y, [i.default]), e.exports = y;
  }, function(e, t, r) {
    "use strict";
    var n = this && this.__importDefault || function(e) {
      return e && e.__esModule ? e : { default: e };
    };
    const o = n(r(27)), i = n(r(1)), s = r(0);
    let a, u;
    let c = {};
    const h = function(e) {
      return new Promise((t, r) => {
        if (e in c) return t(c[e]);
        return new o.default({ tls_only: !1, uri_fallback: !0, request_timeout: 5e3 }).lookup(e, function(n, o) {
          if (n) return r(n);
          if (
            "object" != typeof o.idx.links.remotestorage || "number" != typeof o.idx.links.remotestorage.length
            || o.idx.links.remotestorage.length <= 0
          ) {
            return i.default(
              "[Discover] WebFinger record for " + e + " does not have remotestorage defined in the links section ",
              JSON.stringify(o.json),
            ),
              r("WebFinger record for " + e + " does not have remotestorage defined in the links section.");
          }
          const s = o.idx.links.remotestorage[0],
            a = s.properties["http://tools.ietf.org/html/rfc6749#section-4.2"] || s.properties["auth-endpoint"],
            h = s.properties["http://remotestorage.io/spec/version"] || s.type;
          return c[e] = { href: s.href, storageApi: h, authURL: a, properties: s.properties },
            u && (localStorage["remotestorage:discover"] = JSON.stringify({ cache: c })),
            t(c[e]);
        });
      });
    };
    (h.DiscoveryError = function(e) {
      this.name = "DiscoveryError", this.message = e, this.stack = (new Error()).stack;
    }).prototype = Object.create(Error.prototype),
      h.DiscoveryError.prototype.constructor = h.DiscoveryError,
      h._rs_init = function() {
        if (u = s.localStorageAvailable(), u) {
          try {
            const e = JSON.parse(localStorage["remotestorage:discover"]);
            c = e.cache;
          } catch (e) {}
        }
      },
      h._rs_supported = function() {
        return a = Object.prototype.hasOwnProperty.call(s.globalContext, "XMLHttpRequest"), a;
      },
      h._rs_cleanup = function() {
        u && delete localStorage["remotestorage:discover"];
      },
      e.exports = h;
  }, function(e, t, r) {
    "use strict";
    const n = (this && this.__importDefault || function(e) {
        return e && e.__esModule ? e : { default: e };
      })(r(2)),
      o = r(0);
    class i {
      constructor() {
        this.addEvents(["background", "foreground"]),
          this.mode = "undefined" != typeof window ? "browser" : "node",
          "browser" === this.mode
          && (this.setBrowserPrefixedNames(),
            document.addEventListener(this.visibilityChangeEvent, this.setVisibility.bind(this), !1),
            this.setVisibility());
      }
      setBrowserPrefixedNames() {
        "browser" === this.mode
          && (void 0 !== document.hidden
            ? (this.hiddenProperty = "hidden", this.visibilityChangeEvent = "visibilitychange")
            : void 0 !== document.mozHidden
            ? (this.hiddenProperty = "mozHidden", this.visibilityChangeEvent = "mozvisibilitychange")
            : void 0 !== document.msHidden
            ? (this.hiddenProperty = "msHidden", this.visibilityChangeEvent = "msvisibilitychange")
            : void 0 !== document.webkitHidden
              && (this.hiddenProperty = "webkitHidden", this.visibilityChangeEvent = "webkitvisibilitychange"));
      }
      setVisibility() {
        document[this.hiddenProperty] ? this.goBackground() : this.goForeground();
      }
      isBrowser() {
        return "browser" === this.mode;
      }
      isNode() {
        return "node" === this.mode;
      }
      goBackground() {
        this._emit("background");
      }
      goForeground() {
        this._emit("foreground");
      }
      static _rs_init() {}
      static _rs_cleanup() {}
    }
    o.applyMixins(i, [n.default]), e.exports = i;
  }, function(e, t, r) {
    e.exports = r(18);
  }, function(e, t, r) {
    "use strict";
    var n = this && this.__createBinding || (Object.create
        ? function(e, t, r, n) {
          void 0 === n && (n = r),
            Object.defineProperty(e, n, {
              enumerable: !0,
              get: function() {
                return t[r];
              },
            });
        }
        : function(e, t, r, n) {
          void 0 === n && (n = r), e[n] = t[r];
        }),
      o = this && this.__setModuleDefault || (Object.create
        ? function(e, t) {
          Object.defineProperty(e, "default", { enumerable: !0, value: t });
        }
        : function(e, t) {
          e.default = t;
        }),
      i = this && this.__importStar || function(e) {
        if (e && e.__esModule) return e;
        var t = {};
        if (null != e) for (var r in e) "default" !== r && Object.hasOwnProperty.call(e, r) && n(t, e, r);
        return o(t, e), t;
      },
      s = this && this.__importDefault || function(e) {
        return e && e.__esModule ? e : { default: e };
      };
    const a = s(r(3)),
      u = s(r(1)),
      c = r(0),
      h = s(r(11)),
      l = s(r(6)),
      d = s(r(7)),
      f = s(r(12)),
      p = s(r(2)),
      m = s(r(13)),
      g = s(r(14)),
      y = s(r(15)),
      v = s(r(9)),
      _ = s(r(4)),
      b = s(r(29)),
      w = i(r(0)),
      P = c.getGlobalContext();
    let E;
    function T(e) {
      return 403 !== e.statusCode && 401 !== e.statusCode || this._emit("error", new _.default()), Promise.resolve(e);
    }
    function A(e) {
      return "number" == typeof e && e >= 2e3 && e <= 36e5;
    }
    class R {
      constructor(e) {
        this._pending = [],
          this._cleanups = [],
          this._pathHandlers = { change: {} },
          this.apiKeys = {},
          this._init = b.default.loadFeatures,
          this.features = b.default.features,
          this.loadFeature = b.default.loadFeature,
          this.featureSupported = b.default.featureSupported,
          this.featureDone = b.default.featureDone,
          this.featuresDone = b.default.featuresDone,
          this.featuresLoaded = b.default.featuresLoaded,
          this.featureInitialized = b.default.featureInitialized,
          this.featureFailed = b.default.featureFailed,
          this.hasFeature = b.default.hasFeature,
          this._setCachingModule = b.default._setCachingModule,
          this._collectCleanupFunctions = b.default._collectCleanupFunctions,
          this._fireReady = b.default._fireReady,
          this.initFeature = b.default.initFeature,
          "object" == typeof e && c.extend(a.default, e),
          this.addEvents([
            "ready",
            "authing",
            "connecting",
            "connected",
            "disconnected",
            "not-connected",
            "conflict",
            "error",
            "features-loaded",
            "sync-interval-change",
            "sync-req-done",
            "sync-done",
            "wire-busy",
            "wire-done",
            "network-offline",
            "network-online",
          ]),
          this._setGPD({
            get: this._pendingGPD("get"),
            put: this._pendingGPD("put"),
            delete: this._pendingGPD("delete"),
          }),
          E = c.localStorageAvailable(),
          E
          && (this.apiKeys = c.getJSONFromLocalStorage("remotestorage:api-keys") || {},
            this.setBackend(localStorage.getItem("remotestorage:backend") || "remotestorage"));
        const t = this.on;
        this.on = function(e, r) {
          if (this._allLoaded) {
            switch (e) {
              case "features-loaded":
                setTimeout(r, 0);
                break;
              case "ready":
                this.remote && setTimeout(r, 0);
                break;
              case "connected":
                this.remote && this.remote.connected && setTimeout(r, 0);
                break;
              case "not-connected":
                this.remote && !this.remote.connected && setTimeout(r, 0);
            }
          }
          return t.call(this, e, r);
        },
          this._init(),
          this.fireInitial = function() {
            this.local && setTimeout(this.local.fireInitial.bind(this.local), 0);
          }.bind(this),
          this.on("ready", this.fireInitial.bind(this)),
          this.loadModules();
      }
      get connected() {
        return this.remote.connected;
      }
      loadModules() {
        a.default.modules.forEach(this.addModule.bind(this));
      }
      authorize(e) {
        if (
          this.access.setStorageType(this.remote.storageApi),
            void 0 === e.scope && (e.scope = this.access.scopeParameter),
            P.cordova
        ) {
          e.redirectUri = a.default.cordovaRedirectUri;
        } else {
          const t = l.default.getLocation();
          let r = t.origin;
          "/" !== t.pathname && (r += t.pathname), e.redirectUri = r;
        }
        void 0 === e.clientId && (e.clientId = e.redirectUri.match(/^(https?:\/\/[^/]+)/)[0]),
          l.default.authorize(this, e);
      }
      impliedauth(e, t) {
        e = e || this.remote.storageApi,
          t = t || String(document.location),
          u.default("ImpliedAuth proceeding due to absent authURL; storageApi = " + e + " redirectUri = " + t),
          this.remote.configure({ token: l.default.IMPLIED_FAKE_TOKEN }),
          document.location.href = t;
      }
      connect(e, t) {
        if (this.setBackend("remotestorage"), e.indexOf("@") < 0 && !e.match(/^(https?:\/\/)?[^\s\/$\.?#]+\.[^\s]*$/)) {
          return void this._emit("error", new R.DiscoveryError("Not a valid user address or URL."));
        }
        if (e.indexOf("@") < 0 && !e.match(/^https?:\/\//) && (e = "https://" + e), P.cordova) {
          if ("string" != typeof a.default.cordovaRedirectUri) {
            return void this._emit(
              "error",
              new R.DiscoveryError("Please supply a custom HTTPS redirect URI for your Cordova app"),
            );
          }
          if (!P.cordova.InAppBrowser) {
            return void this._emit(
              "error",
              new R.DiscoveryError("Please include the InAppBrowser Cordova plugin to enable OAuth"),
            );
          }
        }
        this.remote.configure({ userAddress: e }), this._emit("connecting");
        const r = setTimeout(() => {
          this._emit("error", new R.DiscoveryError("No storage information found for this user address."));
        }, a.default.discoveryTimeout);
        y.default(e).then(n => {
          if (
            clearTimeout(r), this._emit("authing"), n.userAddress = e, this.remote.configure(n), !this.remote.connected
          ) {
            if (n.authURL) {
              if (void 0 === t) this.authorize({ authURL: n.authURL });
              else {
                if ("string" != typeof t) throw new Error("Supplied bearer token must be a string");
                u.default("Skipping authorization sequence and connecting with known token"),
                  this.remote.configure({ token: t });
              }
            } else this.impliedauth();
          }
        }, () => {
          clearTimeout(r),
            this._emit("error", new R.DiscoveryError("No storage information found for this user address."));
        });
      }
      reconnect() {
        this.remote.configure({ token: null }),
          "remotestorage" === this.backend ? this.connect(this.remote.userAddress) : this.remote.connect();
      }
      disconnect() {
        this.remote
        && this.remote.configure({ userAddress: null, href: null, storageApi: null, token: null, properties: null }),
          this._setGPD({
            get: this._pendingGPD("get"),
            put: this._pendingGPD("put"),
            delete: this._pendingGPD("delete"),
          });
        const e = this._cleanups.length;
        let t = 0;
        const r = () => {
          t++, t >= e && (this._init(), this._emit("disconnected"));
        };
        e > 0
          ? this._cleanups.forEach(e => {
            const t = e(this);
            "object" == typeof t && "function" == typeof t.then ? t.then(r) : r();
          })
          : r();
      }
      setBackend(e) {
        this.backend = e,
          E
          && (e ? localStorage.setItem("remotestorage:backend", e) : localStorage.removeItem("remotestorage:backend"));
      }
      onChange(e, t) {
        this._pathHandlers.change[e] || (this._pathHandlers.change[e] = []), this._pathHandlers.change[e].push(t);
      }
      enableLog() {
        a.default.logging = !0;
      }
      disableLog() {
        a.default.logging = !1;
      }
      log(...e) {
        u.default.apply(R, e);
      }
      setApiKeys(e) {
        const t = [S.GOOGLE, S.DROPBOX];
        if ("object" != typeof e || !Object.keys(e).every(e => t.includes(e))) {
          return console.error("setApiKeys() was called with invalid arguments"), !1;
        }
        Object.keys(e).forEach(t => {
          const r = e[t];
          if (r) {
            switch (t) {
              case S.DROPBOX:
                this.apiKeys[S.DROPBOX] = { appKey: r },
                  void 0 !== this.dropbox && this.dropbox.clientId === r || g.default._rs_init(this);
                break;
              case S.GOOGLE:
                this.apiKeys[S.GOOGLE] = { clientId: r },
                  void 0 !== this.googledrive && this.googledrive.clientId === r || m.default._rs_init(this);
            }
            return !0;
          }
          delete this.apiKeys[t];
        }), E && localStorage.setItem("remotestorage:api-keys", JSON.stringify(this.apiKeys));
      }
      setCordovaRedirectUri(e) {
        if ("string" != typeof e || !e.match(/http(s)?:\/\//)) {
          throw new Error("Cordova redirect URI must be a URI string");
        }
        a.default.cordovaRedirectUri = e;
      }
      _setGPD(e, t) {
        function r(e) {
          return function(...r) {
            return e.apply(t, r).then(T.bind(this));
          };
        }
        this.get = r(e.get), this.put = r(e.put), this.delete = r(e.delete);
      }
      _pendingGPD(e) {
        return (...t) => {
          const r = Array.prototype.slice.call(t);
          return new Promise((t, n) => {
            this._pending.push({ method: e, args: r, promise: { resolve: t, reject: n } });
          });
        };
      }
      _processPending() {
        this._pending.forEach(e => {
          try {
            this[e.method](...e.args).then(e.promise.resolve, e.promise.reject);
          } catch (t) {
            e.promise.reject(t);
          }
        }), this._pending = [];
      }
      _bindChange(e) {
        e.on("change", this._dispatchEvent.bind(this, "change"));
      }
      _dispatchEvent(e, t) {
        Object.keys(this._pathHandlers[e]).forEach(r => {
          const n = r.length;
          t.path.substr(0, n) === r && this._pathHandlers[e][r].forEach(e => {
            const n = {};
            for (const e in t) n[e] = t[e];
            n.relativePath = t.path.replace(new RegExp("^" + r), "");
            try {
              e(n);
            } catch (e) {
              console.error("'change' handler failed: ", e, e.stack), this._emit("error", e);
            }
          });
        });
      }
      scope(e) {
        if ("string" != typeof e) throw "Argument 'path' of baseClient.scope must be a string";
        return this.access.checkPathPermission(e, "r")
          || console.warn(
            "WARNING: Please use remoteStorage.access.claim() to ask for access permissions first: https://remotestoragejs.readthedocs.io/en/latest/js-api/access.html#claim",
          ),
          new d.default(this, e);
      }
      getSyncInterval() {
        return a.default.syncInterval;
      }
      setSyncInterval(e) {
        if (!A(e)) throw e + " is not a valid sync interval";
        const t = a.default.syncInterval;
        a.default.syncInterval = e, this._emit("sync-interval-change", { oldValue: t, newValue: e });
      }
      getBackgroundSyncInterval() {
        return a.default.backgroundSyncInterval;
      }
      setBackgroundSyncInterval(e) {
        if (!A(e)) throw e + " is not a valid sync interval";
        const t = a.default.backgroundSyncInterval;
        a.default.backgroundSyncInterval = e, this._emit("sync-interval-change", { oldValue: t, newValue: e });
      }
      getCurrentSyncInterval() {
        return a.default.isBackground ? a.default.backgroundSyncInterval : a.default.syncInterval;
      }
      getRequestTimeout() {
        return a.default.requestTimeout;
      }
      setRequestTimeout(e) {
        if ("number" != typeof e) throw e + " is not a valid request timeout";
        a.default.requestTimeout = e;
      }
      syncCycle() {
        this.sync && !this.sync.stopped && (this.on("sync-done", () => {
          this.sync && !this.sync.stopped
            && (this._syncTimer && (clearTimeout(this._syncTimer), this._syncTimer = void 0),
              this._syncTimer = setTimeout(this.sync.sync.bind(this.sync), this.getCurrentSyncInterval()));
        }),
          this.sync.sync());
      }
      startSync() {
        return a.default.cache
          ? (this.sync.stopped = !1, this.syncStopped = !1, this.sync.sync())
          : (console.warn("Nothing to sync, because caching is disabled."), Promise.resolve());
      }
      stopSync() {
        clearTimeout(this._syncTimer),
          this._syncTimer = void 0,
          this.sync ? this.sync.stopped = !0 : this.syncStopped = !0;
      }
      addModule(e) {
        const t = e.name, r = e.builder;
        if (
          Object.defineProperty(this, t, {
            configurable: !0,
            get: function() {
              const e = this._loadModule(t, r);
              return Object.defineProperty(this, t, { value: e }), e;
            },
          }), -1 !== t.indexOf("-")
        ) {
          const e = t.replace(/\-[a-z]/g, function(e) {
            return e[1].toUpperCase();
          });
          Object.defineProperty(this, e, {
            get: function() {
              return this[t];
            },
          });
        }
      }
      _loadModule(e, t) {
        if (t) return t(new d.default(this, "/" + e + "/"), new d.default(this, "/public/" + e + "/")).exports;
        throw "Unknown module: " + e;
      }
    }
    var S;
    R.Authorize = l.default,
      R.SyncError = v.default,
      R.Unauthorized = _.default,
      R.DiscoveryError = y.default.DiscoveryError,
      R.util = w,
      Object.defineProperty(R.prototype, "access", {
        get: function() {
          const e = new h.default();
          return Object.defineProperty(this, "access", { value: e }), e;
        },
        configurable: !0,
      }),
      Object.defineProperty(R.prototype, "caching", {
        configurable: !0,
        get: function() {
          const e = new f.default();
          return Object.defineProperty(this, "caching", { value: e }), e;
        },
      }),
      c.applyMixins(R, [p.default]),
      function(e) {
        e.GOOGLE = "googledrive", e.DROPBOX = "dropbox";
      }(S || (S = {})),
      e.exports = R;
  }, function(e, t, r) {
    "use strict";
    (function(e) {
      /*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <http://feross.org>
 * @license  MIT
 */
      var n = r(20), o = r(21), i = r(22);
      function s() {
        return u.TYPED_ARRAY_SUPPORT ? 2147483647 : 1073741823;
      }
      function a(e, t) {
        if (s() < t) throw new RangeError("Invalid typed array length");
        return u.TYPED_ARRAY_SUPPORT
          ? (e = new Uint8Array(t)).__proto__ = u.prototype
          : (null === e && (e = new u(t)), e.length = t),
          e;
      }
      function u(e, t, r) {
        if (!(u.TYPED_ARRAY_SUPPORT || this instanceof u)) return new u(e, t, r);
        if ("number" == typeof e) {
          if ("string" == typeof t) {
            throw new Error("If encoding is specified then the first argument must be a string");
          }
          return l(this, e);
        }
        return c(this, e, t, r);
      }
      function c(e, t, r, n) {
        if ("number" == typeof t) throw new TypeError("\"value\" argument must not be a number");
        return "undefined" != typeof ArrayBuffer && t instanceof ArrayBuffer
          ? function(e, t, r, n) {
            if (t.byteLength, r < 0 || t.byteLength < r) throw new RangeError("'offset' is out of bounds");
            if (t.byteLength < r + (n || 0)) throw new RangeError("'length' is out of bounds");
            t = void 0 === r && void 0 === n
              ? new Uint8Array(t)
              : void 0 === n
              ? new Uint8Array(t, r)
              : new Uint8Array(t, r, n);
            u.TYPED_ARRAY_SUPPORT ? (e = t).__proto__ = u.prototype : e = d(e, t);
            return e;
          }(e, t, r, n)
          : "string" == typeof t
          ? function(e, t, r) {
            "string" == typeof r && "" !== r || (r = "utf8");
            if (!u.isEncoding(r)) throw new TypeError("\"encoding\" must be a valid string encoding");
            var n = 0 | p(t, r), o = (e = a(e, n)).write(t, r);
            o !== n && (e = e.slice(0, o));
            return e;
          }(e, t, r)
          : function(e, t) {
            if (u.isBuffer(t)) {
              var r = 0 | f(t.length);
              return 0 === (e = a(e, r)).length || t.copy(e, 0, 0, r), e;
            }
            if (t) {
              if ("undefined" != typeof ArrayBuffer && t.buffer instanceof ArrayBuffer || "length" in t) {
                return "number" != typeof t.length || (n = t.length) != n ? a(e, 0) : d(e, t);
              }
              if ("Buffer" === t.type && i(t.data)) return d(e, t.data);
            }
            var n;
            throw new TypeError("First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.");
          }(e, t);
      }
      function h(e) {
        if ("number" != typeof e) throw new TypeError("\"size\" argument must be a number");
        if (e < 0) throw new RangeError("\"size\" argument must not be negative");
      }
      function l(e, t) {
        if (h(t), e = a(e, t < 0 ? 0 : 0 | f(t)), !u.TYPED_ARRAY_SUPPORT) for (var r = 0; r < t; ++r) e[r] = 0;
        return e;
      }
      function d(e, t) {
        var r = t.length < 0 ? 0 : 0 | f(t.length);
        e = a(e, r);
        for (var n = 0; n < r; n += 1) e[n] = 255 & t[n];
        return e;
      }
      function f(e) {
        if (e >= s()) {
          throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + s().toString(16) + " bytes");
        }
        return 0 | e;
      }
      function p(e, t) {
        if (u.isBuffer(e)) return e.length;
        if (
          "undefined" != typeof ArrayBuffer && "function" == typeof ArrayBuffer.isView
          && (ArrayBuffer.isView(e) || e instanceof ArrayBuffer)
        ) {
          return e.byteLength;
        }
        "string" != typeof e && (e = "" + e);
        var r = e.length;
        if (0 === r) return 0;
        for (var n = !1;;) {
          switch (t) {
            case "ascii":
            case "latin1":
            case "binary":
              return r;
            case "utf8":
            case "utf-8":
            case void 0:
              return B(e).length;
            case "ucs2":
            case "ucs-2":
            case "utf16le":
            case "utf-16le":
              return 2 * r;
            case "hex":
              return r >>> 1;
            case "base64":
              return q(e).length;
            default:
              if (n) return B(e).length;
              t = ("" + t).toLowerCase(), n = !0;
          }
        }
      }
      function m(e, t, r) {
        var n = !1;
        if ((void 0 === t || t < 0) && (t = 0), t > this.length) return "";
        if ((void 0 === r || r > this.length) && (r = this.length), r <= 0) return "";
        if ((r >>>= 0) <= (t >>>= 0)) return "";
        for (e || (e = "utf8");;) {
          switch (e) {
            case "hex":
              return M(this, t, r);
            case "utf8":
            case "utf-8":
              return R(this, t, r);
            case "ascii":
              return S(this, t, r);
            case "latin1":
            case "binary":
              return O(this, t, r);
            case "base64":
              return A(this, t, r);
            case "ucs2":
            case "ucs-2":
            case "utf16le":
            case "utf-16le":
              return k(this, t, r);
            default:
              if (n) throw new TypeError("Unknown encoding: " + e);
              e = (e + "").toLowerCase(), n = !0;
          }
        }
      }
      function g(e, t, r) {
        var n = e[t];
        e[t] = e[r], e[r] = n;
      }
      function y(e, t, r, n, o) {
        if (0 === e.length) return -1;
        if (
          "string" == typeof r
            ? (n = r, r = 0)
            : r > 2147483647
            ? r = 2147483647
            : r < -2147483648 && (r = -2147483648),
            r = +r,
            isNaN(r) && (r = o ? 0 : e.length - 1),
            r < 0 && (r = e.length + r),
            r >= e.length
        ) {
          if (o) return -1;
          r = e.length - 1;
        } else if (r < 0) {
          if (!o) return -1;
          r = 0;
        }
        if ("string" == typeof t && (t = u.from(t, n)), u.isBuffer(t)) return 0 === t.length ? -1 : v(e, t, r, n, o);
        if ("number" == typeof t) {
          return t &= 255,
            u.TYPED_ARRAY_SUPPORT && "function" == typeof Uint8Array.prototype.indexOf
              ? o ? Uint8Array.prototype.indexOf.call(e, t, r) : Uint8Array.prototype.lastIndexOf.call(e, t, r)
              : v(e, [t], r, n, o);
        }
        throw new TypeError("val must be string, number or Buffer");
      }
      function v(e, t, r, n, o) {
        var i, s = 1, a = e.length, u = t.length;
        if (
          void 0 !== n
          && ("ucs2" === (n = String(n).toLowerCase()) || "ucs-2" === n || "utf16le" === n || "utf-16le" === n)
        ) {
          if (e.length < 2 || t.length < 2) return -1;
          s = 2, a /= 2, u /= 2, r /= 2;
        }
        function c(e, t) {
          return 1 === s ? e[t] : e.readUInt16BE(t * s);
        }
        if (o) {
          var h = -1;
          for (i = r; i < a; i++) {
            if (c(e, i) === c(t, -1 === h ? 0 : i - h)) if (-1 === h && (h = i), i - h + 1 === u) return h * s;
            else -1 !== h && (i -= i - h), h = -1;
          }
        } else {
          for (r + u > a && (r = a - u), i = r; i >= 0; i--) {
            for (var l = !0, d = 0; d < u; d++) {
              if (c(e, i + d) !== c(t, d)) {
                l = !1;
                break;
              }
            }
            if (l) return i;
          }
        }
        return -1;
      }
      function _(e, t, r, n) {
        r = Number(r) || 0;
        var o = e.length - r;
        n ? (n = Number(n)) > o && (n = o) : n = o;
        var i = t.length;
        if (i % 2 != 0) throw new TypeError("Invalid hex string");
        n > i / 2 && (n = i / 2);
        for (var s = 0; s < n; ++s) {
          var a = parseInt(t.substr(2 * s, 2), 16);
          if (isNaN(a)) return s;
          e[r + s] = a;
        }
        return s;
      }
      function b(e, t, r, n) {
        return J(B(t, e.length - r), e, r, n);
      }
      function w(e, t, r, n) {
        return J(
          function(e) {
            for (var t = [], r = 0; r < e.length; ++r) t.push(255 & e.charCodeAt(r));
            return t;
          }(t),
          e,
          r,
          n,
        );
      }
      function P(e, t, r, n) {
        return w(e, t, r, n);
      }
      function E(e, t, r, n) {
        return J(q(t), e, r, n);
      }
      function T(e, t, r, n) {
        return J(
          function(e, t) {
            for (var r, n, o, i = [], s = 0; s < e.length && !((t -= 2) < 0); ++s) {
              r = e.charCodeAt(s), n = r >> 8, o = r % 256, i.push(o), i.push(n);
            }
            return i;
          }(t, e.length - r),
          e,
          r,
          n,
        );
      }
      function A(e, t, r) {
        return 0 === t && r === e.length ? n.fromByteArray(e) : n.fromByteArray(e.slice(t, r));
      }
      function R(e, t, r) {
        r = Math.min(e.length, r);
        for (var n = [], o = t; o < r;) {
          var i, s, a, u, c = e[o], h = null, l = c > 239 ? 4 : c > 223 ? 3 : c > 191 ? 2 : 1;
          if (o + l <= r) {
            switch (l) {
              case 1:
                c < 128 && (h = c);
                break;
              case 2:
                128 == (192 & (i = e[o + 1])) && (u = (31 & c) << 6 | 63 & i) > 127 && (h = u);
                break;
              case 3:
                i = e[o + 1],
                  s = e[o + 2],
                  128 == (192 & i) && 128 == (192 & s) && (u = (15 & c) << 12 | (63 & i) << 6 | 63 & s) > 2047
                  && (u < 55296 || u > 57343) && (h = u);
                break;
              case 4:
                i = e[o + 1],
                  s = e[o + 2],
                  a = e[o + 3],
                  128 == (192 & i) && 128 == (192 & s) && 128 == (192 & a)
                  && (u = (15 & c) << 18 | (63 & i) << 12 | (63 & s) << 6 | 63 & a) > 65535 && u < 1114112 && (h = u);
            }
          }
          null === h
            ? (h = 65533, l = 1)
            : h > 65535 && (h -= 65536, n.push(h >>> 10 & 1023 | 55296), h = 56320 | 1023 & h),
            n.push(h),
            o += l;
        }
        return function(e) {
          var t = e.length;
          if (t <= 4096) {
            return String.fromCharCode.apply(String, e);
          }
          var r = "", n = 0;
          for (; n < t;) r += String.fromCharCode.apply(String, e.slice(n, n += 4096));
          return r;
        }(n);
      }
      t.Buffer = u,
        t.SlowBuffer = function(e) {
          +e != e && (e = 0);
          return u.alloc(+e);
        },
        t.INSPECT_MAX_BYTES = 50,
        u.TYPED_ARRAY_SUPPORT = void 0 !== e.TYPED_ARRAY_SUPPORT ? e.TYPED_ARRAY_SUPPORT : function() {
          try {
            var e = new Uint8Array(1);
            return e.__proto__ = {
              __proto__: Uint8Array.prototype,
              foo: function() {
                return 42;
              },
            },
              42 === e.foo() && "function" == typeof e.subarray && 0 === e.subarray(1, 1).byteLength;
          } catch (e) {
            return !1;
          }
        }(),
        t.kMaxLength = s(),
        u.poolSize = 8192,
        u._augment = function(e) {
          return e.__proto__ = u.prototype, e;
        },
        u.from = function(e, t, r) {
          return c(null, e, t, r);
        },
        u.TYPED_ARRAY_SUPPORT
        && (u.prototype.__proto__ = Uint8Array.prototype,
          u.__proto__ = Uint8Array,
          "undefined" != typeof Symbol && Symbol.species && u[Symbol.species] === u
          && Object.defineProperty(u, Symbol.species, { value: null, configurable: !0 })),
        u.alloc = function(e, t, r) {
          return function(e, t, r, n) {
            return h(t),
              t <= 0 ? a(e, t) : void 0 !== r ? "string" == typeof n ? a(e, t).fill(r, n) : a(e, t).fill(r) : a(e, t);
          }(null, e, t, r);
        },
        u.allocUnsafe = function(e) {
          return l(null, e);
        },
        u.allocUnsafeSlow = function(e) {
          return l(null, e);
        },
        u.isBuffer = function(e) {
          return !(null == e || !e._isBuffer);
        },
        u.compare = function(e, t) {
          if (!u.isBuffer(e) || !u.isBuffer(t)) throw new TypeError("Arguments must be Buffers");
          if (e === t) return 0;
          for (var r = e.length, n = t.length, o = 0, i = Math.min(r, n); o < i; ++o) {
            if (e[o] !== t[o]) {
              r = e[o], n = t[o];
              break;
            }
          }
          return r < n ? -1 : n < r ? 1 : 0;
        },
        u.isEncoding = function(e) {
          switch (String(e).toLowerCase()) {
            case "hex":
            case "utf8":
            case "utf-8":
            case "ascii":
            case "latin1":
            case "binary":
            case "base64":
            case "ucs2":
            case "ucs-2":
            case "utf16le":
            case "utf-16le":
              return !0;
            default:
              return !1;
          }
        },
        u.concat = function(e, t) {
          if (!i(e)) throw new TypeError("\"list\" argument must be an Array of Buffers");
          if (0 === e.length) return u.alloc(0);
          var r;
          if (void 0 === t) for (t = 0, r = 0; r < e.length; ++r) t += e[r].length;
          var n = u.allocUnsafe(t), o = 0;
          for (r = 0; r < e.length; ++r) {
            var s = e[r];
            if (!u.isBuffer(s)) throw new TypeError("\"list\" argument must be an Array of Buffers");
            s.copy(n, o), o += s.length;
          }
          return n;
        },
        u.byteLength = p,
        u.prototype._isBuffer = !0,
        u.prototype.swap16 = function() {
          var e = this.length;
          if (e % 2 != 0) throw new RangeError("Buffer size must be a multiple of 16-bits");
          for (var t = 0; t < e; t += 2) g(this, t, t + 1);
          return this;
        },
        u.prototype.swap32 = function() {
          var e = this.length;
          if (e % 4 != 0) throw new RangeError("Buffer size must be a multiple of 32-bits");
          for (var t = 0; t < e; t += 4) g(this, t, t + 3), g(this, t + 1, t + 2);
          return this;
        },
        u.prototype.swap64 = function() {
          var e = this.length;
          if (e % 8 != 0) throw new RangeError("Buffer size must be a multiple of 64-bits");
          for (var t = 0; t < e; t += 8) {
            g(this, t, t + 7), g(this, t + 1, t + 6), g(this, t + 2, t + 5), g(this, t + 3, t + 4);
          }
          return this;
        },
        u.prototype.toString = function() {
          var e = 0 | this.length;
          return 0 === e ? "" : 0 === arguments.length ? R(this, 0, e) : m.apply(this, arguments);
        },
        u.prototype.equals = function(e) {
          if (!u.isBuffer(e)) throw new TypeError("Argument must be a Buffer");
          return this === e || 0 === u.compare(this, e);
        },
        u.prototype.inspect = function() {
          var e = "", r = t.INSPECT_MAX_BYTES;
          return this.length > 0
            && (e = this.toString("hex", 0, r).match(/.{2}/g).join(" "), this.length > r && (e += " ... ")),
            "<Buffer " + e + ">";
        },
        u.prototype.compare = function(e, t, r, n, o) {
          if (!u.isBuffer(e)) throw new TypeError("Argument must be a Buffer");
          if (
            void 0 === t && (t = 0),
              void 0 === r && (r = e ? e.length : 0),
              void 0 === n && (n = 0),
              void 0 === o && (o = this.length),
              t < 0 || r > e.length || n < 0 || o > this.length
          ) {
            throw new RangeError("out of range index");
          }
          if (n >= o && t >= r) return 0;
          if (n >= o) return -1;
          if (t >= r) return 1;
          if (this === e) return 0;
          for (
            var i = (o >>>= 0) - (n >>>= 0),
              s = (r >>>= 0) - (t >>>= 0),
              a = Math.min(i, s),
              c = this.slice(n, o),
              h = e.slice(t, r),
              l = 0;
            l < a;
            ++l
          ) {
            if (c[l] !== h[l]) {
              i = c[l], s = h[l];
              break;
            }
          }
          return i < s ? -1 : s < i ? 1 : 0;
        },
        u.prototype.includes = function(e, t, r) {
          return -1 !== this.indexOf(e, t, r);
        },
        u.prototype.indexOf = function(e, t, r) {
          return y(this, e, t, r, !0);
        },
        u.prototype.lastIndexOf = function(e, t, r) {
          return y(this, e, t, r, !1);
        },
        u.prototype.write = function(e, t, r, n) {
          if (void 0 === t) n = "utf8", r = this.length, t = 0;
          else if (void 0 === r && "string" == typeof t) n = t, r = this.length, t = 0;
          else {
            if (!isFinite(t)) {
              throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");
            }
            t |= 0, isFinite(r) ? (r |= 0, void 0 === n && (n = "utf8")) : (n = r, r = void 0);
          }
          var o = this.length - t;
          if (
            (void 0 === r || r > o) && (r = o), e.length > 0 && (r < 0 || t < 0) || t > this.length
          ) {
            throw new RangeError("Attempt to write outside buffer bounds");
          }
          n || (n = "utf8");
          for (var i = !1;;) {
            switch (n) {
              case "hex":
                return _(this, e, t, r);
              case "utf8":
              case "utf-8":
                return b(this, e, t, r);
              case "ascii":
                return w(this, e, t, r);
              case "latin1":
              case "binary":
                return P(this, e, t, r);
              case "base64":
                return E(this, e, t, r);
              case "ucs2":
              case "ucs-2":
              case "utf16le":
              case "utf-16le":
                return T(this, e, t, r);
              default:
                if (i) throw new TypeError("Unknown encoding: " + n);
                n = ("" + n).toLowerCase(), i = !0;
            }
          }
        },
        u.prototype.toJSON = function() {
          return { type: "Buffer", data: Array.prototype.slice.call(this._arr || this, 0) };
        };
      function S(e, t, r) {
        var n = "";
        r = Math.min(e.length, r);
        for (var o = t; o < r; ++o) n += String.fromCharCode(127 & e[o]);
        return n;
      }
      function O(e, t, r) {
        var n = "";
        r = Math.min(e.length, r);
        for (var o = t; o < r; ++o) n += String.fromCharCode(e[o]);
        return n;
      }
      function M(e, t, r) {
        var n = e.length;
        (!t || t < 0) && (t = 0), (!r || r < 0 || r > n) && (r = n);
        for (var o = "", i = t; i < r; ++i) o += L(e[i]);
        return o;
      }
      function k(e, t, r) {
        for (var n = e.slice(t, r), o = "", i = 0; i < n.length; i += 2) {
          o += String.fromCharCode(n[i] + 256 * n[i + 1]);
        }
        return o;
      }
      function C(e, t, r) {
        if (e % 1 != 0 || e < 0) throw new RangeError("offset is not uint");
        if (e + t > r) throw new RangeError("Trying to access beyond buffer length");
      }
      function I(e, t, r, n, o, i) {
        if (!u.isBuffer(e)) throw new TypeError("\"buffer\" argument must be a Buffer instance");
        if (t > o || t < i) throw new RangeError("\"value\" argument is out of bounds");
        if (r + n > e.length) throw new RangeError("Index out of range");
      }
      function x(e, t, r, n) {
        t < 0 && (t = 65535 + t + 1);
        for (var o = 0, i = Math.min(e.length - r, 2); o < i; ++o) {
          e[r + o] = (t & 255 << 8 * (n ? o : 1 - o)) >>> 8 * (n ? o : 1 - o);
        }
      }
      function N(e, t, r, n) {
        t < 0 && (t = 4294967295 + t + 1);
        for (var o = 0, i = Math.min(e.length - r, 4); o < i; ++o) e[r + o] = t >>> 8 * (n ? o : 3 - o) & 255;
      }
      function U(e, t, r, n, o, i) {
        if (r + n > e.length) throw new RangeError("Index out of range");
        if (r < 0) throw new RangeError("Index out of range");
      }
      function j(e, t, r, n, i) {
        return i || U(e, 0, r, 4), o.write(e, t, r, n, 23, 4), r + 4;
      }
      function F(e, t, r, n, i) {
        return i || U(e, 0, r, 8), o.write(e, t, r, n, 52, 8), r + 8;
      }
      u.prototype.slice = function(e, t) {
        var r, n = this.length;
        if (
          (e = ~~e) < 0 ? (e += n) < 0 && (e = 0) : e > n && (e = n),
            (t = void 0 === t ? n : ~~t) < 0 ? (t += n) < 0 && (t = 0) : t > n && (t = n),
            t < e && (t = e),
            u.TYPED_ARRAY_SUPPORT
        ) {
          (r = this.subarray(e, t)).__proto__ = u.prototype;
        } else {
          var o = t - e;
          r = new u(o, void 0);
          for (var i = 0; i < o; ++i) r[i] = this[i + e];
        }
        return r;
      },
        u.prototype.readUIntLE = function(e, t, r) {
          e |= 0, t |= 0, r || C(e, t, this.length);
          for (var n = this[e], o = 1, i = 0; ++i < t && (o *= 256);) n += this[e + i] * o;
          return n;
        },
        u.prototype.readUIntBE = function(e, t, r) {
          e |= 0, t |= 0, r || C(e, t, this.length);
          for (var n = this[e + --t], o = 1; t > 0 && (o *= 256);) n += this[e + --t] * o;
          return n;
        },
        u.prototype.readUInt8 = function(e, t) {
          return t || C(e, 1, this.length), this[e];
        },
        u.prototype.readUInt16LE = function(e, t) {
          return t || C(e, 2, this.length), this[e] | this[e + 1] << 8;
        },
        u.prototype.readUInt16BE = function(e, t) {
          return t || C(e, 2, this.length), this[e] << 8 | this[e + 1];
        },
        u.prototype.readUInt32LE = function(e, t) {
          return t || C(e, 4, this.length), (this[e] | this[e + 1] << 8 | this[e + 2] << 16) + 16777216 * this[e + 3];
        },
        u.prototype.readUInt32BE = function(e, t) {
          return t || C(e, 4, this.length), 16777216 * this[e] + (this[e + 1] << 16 | this[e + 2] << 8 | this[e + 3]);
        },
        u.prototype.readIntLE = function(e, t, r) {
          e |= 0, t |= 0, r || C(e, t, this.length);
          for (var n = this[e], o = 1, i = 0; ++i < t && (o *= 256);) n += this[e + i] * o;
          return n >= (o *= 128) && (n -= Math.pow(2, 8 * t)), n;
        },
        u.prototype.readIntBE = function(e, t, r) {
          e |= 0, t |= 0, r || C(e, t, this.length);
          for (var n = t, o = 1, i = this[e + --n]; n > 0 && (o *= 256);) i += this[e + --n] * o;
          return i >= (o *= 128) && (i -= Math.pow(2, 8 * t)), i;
        },
        u.prototype.readInt8 = function(e, t) {
          return t || C(e, 1, this.length), 128 & this[e] ? -1 * (255 - this[e] + 1) : this[e];
        },
        u.prototype.readInt16LE = function(e, t) {
          t || C(e, 2, this.length);
          var r = this[e] | this[e + 1] << 8;
          return 32768 & r ? 4294901760 | r : r;
        },
        u.prototype.readInt16BE = function(e, t) {
          t || C(e, 2, this.length);
          var r = this[e + 1] | this[e] << 8;
          return 32768 & r ? 4294901760 | r : r;
        },
        u.prototype.readInt32LE = function(e, t) {
          return t || C(e, 4, this.length), this[e] | this[e + 1] << 8 | this[e + 2] << 16 | this[e + 3] << 24;
        },
        u.prototype.readInt32BE = function(e, t) {
          return t || C(e, 4, this.length), this[e] << 24 | this[e + 1] << 16 | this[e + 2] << 8 | this[e + 3];
        },
        u.prototype.readFloatLE = function(e, t) {
          return t || C(e, 4, this.length), o.read(this, e, !0, 23, 4);
        },
        u.prototype.readFloatBE = function(e, t) {
          return t || C(e, 4, this.length), o.read(this, e, !1, 23, 4);
        },
        u.prototype.readDoubleLE = function(e, t) {
          return t || C(e, 8, this.length), o.read(this, e, !0, 52, 8);
        },
        u.prototype.readDoubleBE = function(e, t) {
          return t || C(e, 8, this.length), o.read(this, e, !1, 52, 8);
        },
        u.prototype.writeUIntLE = function(e, t, r, n) {
          (e = +e, t |= 0, r |= 0, n) || I(this, e, t, r, Math.pow(2, 8 * r) - 1, 0);
          var o = 1, i = 0;
          for (this[t] = 255 & e; ++i < r && (o *= 256);) this[t + i] = e / o & 255;
          return t + r;
        },
        u.prototype.writeUIntBE = function(e, t, r, n) {
          (e = +e, t |= 0, r |= 0, n) || I(this, e, t, r, Math.pow(2, 8 * r) - 1, 0);
          var o = r - 1, i = 1;
          for (this[t + o] = 255 & e; --o >= 0 && (i *= 256);) this[t + o] = e / i & 255;
          return t + r;
        },
        u.prototype.writeUInt8 = function(e, t, r) {
          return e = +e,
            t |= 0,
            r || I(this, e, t, 1, 255, 0),
            u.TYPED_ARRAY_SUPPORT || (e = Math.floor(e)),
            this[t] = 255 & e,
            t + 1;
        },
        u.prototype.writeUInt16LE = function(e, t, r) {
          return e = +e,
            t |= 0,
            r || I(this, e, t, 2, 65535, 0),
            u.TYPED_ARRAY_SUPPORT ? (this[t] = 255 & e, this[t + 1] = e >>> 8) : x(this, e, t, !0),
            t + 2;
        },
        u.prototype.writeUInt16BE = function(e, t, r) {
          return e = +e,
            t |= 0,
            r || I(this, e, t, 2, 65535, 0),
            u.TYPED_ARRAY_SUPPORT ? (this[t] = e >>> 8, this[t + 1] = 255 & e) : x(this, e, t, !1),
            t + 2;
        },
        u.prototype.writeUInt32LE = function(e, t, r) {
          return e = +e,
            t |= 0,
            r || I(this, e, t, 4, 4294967295, 0),
            u.TYPED_ARRAY_SUPPORT
              ? (this[t + 3] = e >>> 24, this[t + 2] = e >>> 16, this[t + 1] = e >>> 8, this[t] = 255 & e)
              : N(this, e, t, !0),
            t + 4;
        },
        u.prototype.writeUInt32BE = function(e, t, r) {
          return e = +e,
            t |= 0,
            r || I(this, e, t, 4, 4294967295, 0),
            u.TYPED_ARRAY_SUPPORT
              ? (this[t] = e >>> 24, this[t + 1] = e >>> 16, this[t + 2] = e >>> 8, this[t + 3] = 255 & e)
              : N(this, e, t, !1),
            t + 4;
        },
        u.prototype.writeIntLE = function(e, t, r, n) {
          if (e = +e, t |= 0, !n) {
            var o = Math.pow(2, 8 * r - 1);
            I(this, e, t, r, o - 1, -o);
          }
          var i = 0, s = 1, a = 0;
          for (this[t] = 255 & e; ++i < r && (s *= 256);) {
            e < 0 && 0 === a && 0 !== this[t + i - 1] && (a = 1), this[t + i] = (e / s >> 0) - a & 255;
          }
          return t + r;
        },
        u.prototype.writeIntBE = function(e, t, r, n) {
          if (e = +e, t |= 0, !n) {
            var o = Math.pow(2, 8 * r - 1);
            I(this, e, t, r, o - 1, -o);
          }
          var i = r - 1, s = 1, a = 0;
          for (this[t + i] = 255 & e; --i >= 0 && (s *= 256);) {e < 0 && 0 === a && 0 !== this[t + i + 1] && (a = 1),
              this[t + i] = (e / s >> 0) - a & 255;}
          return t + r;
        },
        u.prototype.writeInt8 = function(e, t, r) {
          return e = +e,
            t |= 0,
            r || I(this, e, t, 1, 127, -128),
            u.TYPED_ARRAY_SUPPORT || (e = Math.floor(e)),
            e < 0 && (e = 255 + e + 1),
            this[t] = 255 & e,
            t + 1;
        },
        u.prototype.writeInt16LE = function(e, t, r) {
          return e = +e,
            t |= 0,
            r || I(this, e, t, 2, 32767, -32768),
            u.TYPED_ARRAY_SUPPORT ? (this[t] = 255 & e, this[t + 1] = e >>> 8) : x(this, e, t, !0),
            t + 2;
        },
        u.prototype.writeInt16BE = function(e, t, r) {
          return e = +e,
            t |= 0,
            r || I(this, e, t, 2, 32767, -32768),
            u.TYPED_ARRAY_SUPPORT ? (this[t] = e >>> 8, this[t + 1] = 255 & e) : x(this, e, t, !1),
            t + 2;
        },
        u.prototype.writeInt32LE = function(e, t, r) {
          return e = +e,
            t |= 0,
            r || I(this, e, t, 4, 2147483647, -2147483648),
            u.TYPED_ARRAY_SUPPORT
              ? (this[t] = 255 & e, this[t + 1] = e >>> 8, this[t + 2] = e >>> 16, this[t + 3] = e >>> 24)
              : N(this, e, t, !0),
            t + 4;
        },
        u.prototype.writeInt32BE = function(e, t, r) {
          return e = +e,
            t |= 0,
            r || I(this, e, t, 4, 2147483647, -2147483648),
            e < 0 && (e = 4294967295 + e + 1),
            u.TYPED_ARRAY_SUPPORT
              ? (this[t] = e >>> 24, this[t + 1] = e >>> 16, this[t + 2] = e >>> 8, this[t + 3] = 255 & e)
              : N(this, e, t, !1),
            t + 4;
        },
        u.prototype.writeFloatLE = function(e, t, r) {
          return j(this, e, t, !0, r);
        },
        u.prototype.writeFloatBE = function(e, t, r) {
          return j(this, e, t, !1, r);
        },
        u.prototype.writeDoubleLE = function(e, t, r) {
          return F(this, e, t, !0, r);
        },
        u.prototype.writeDoubleBE = function(e, t, r) {
          return F(this, e, t, !1, r);
        },
        u.prototype.copy = function(e, t, r, n) {
          if (
            r || (r = 0),
              n || 0 === n || (n = this.length),
              t >= e.length && (t = e.length),
              t || (t = 0),
              n > 0 && n < r && (n = r),
              n === r
          ) {
            return 0;
          }
          if (0 === e.length || 0 === this.length) return 0;
          if (t < 0) throw new RangeError("targetStart out of bounds");
          if (r < 0 || r >= this.length) throw new RangeError("sourceStart out of bounds");
          if (n < 0) throw new RangeError("sourceEnd out of bounds");
          n > this.length && (n = this.length), e.length - t < n - r && (n = e.length - t + r);
          var o, i = n - r;
          if (this === e && r < t && t < n) for (o = i - 1; o >= 0; --o) e[o + t] = this[o + r];
          else if (i < 1e3 || !u.TYPED_ARRAY_SUPPORT) for (o = 0; o < i; ++o) e[o + t] = this[o + r];
          else Uint8Array.prototype.set.call(e, this.subarray(r, r + i), t);
          return i;
        },
        u.prototype.fill = function(e, t, r, n) {
          if ("string" == typeof e) {
            if (
              "string" == typeof t ? (n = t, t = 0, r = this.length) : "string" == typeof r && (n = r, r = this.length),
                1 === e.length
            ) {
              var o = e.charCodeAt(0);
              o < 256 && (e = o);
            }
            if (void 0 !== n && "string" != typeof n) throw new TypeError("encoding must be a string");
            if ("string" == typeof n && !u.isEncoding(n)) throw new TypeError("Unknown encoding: " + n);
          } else "number" == typeof e && (e &= 255);
          if (t < 0 || this.length < t || this.length < r) throw new RangeError("Out of range index");
          if (r <= t) return this;
          var i;
          if (t >>>= 0, r = void 0 === r ? this.length : r >>> 0, e || (e = 0), "number" == typeof e) {
            for (i = t; i < r; ++i) this[i] = e;
          } else {
            var s = u.isBuffer(e) ? e : B(new u(e, n).toString()), a = s.length;
            for (i = 0; i < r - t; ++i) {
              this[i + t] = s[i % a];
            }
          }
          return this;
        };
      var D = /[^+\/0-9A-Za-z-_]/g;
      function L(e) {
        return e < 16 ? "0" + e.toString(16) : e.toString(16);
      }
      function B(e, t) {
        var r;
        t = t || 1 / 0;
        for (var n = e.length, o = null, i = [], s = 0; s < n; ++s) {
          if ((r = e.charCodeAt(s)) > 55295 && r < 57344) {
            if (!o) {
              if (r > 56319) {
                (t -= 3) > -1 && i.push(239, 191, 189);
                continue;
              }
              if (s + 1 === n) {
                (t -= 3) > -1 && i.push(239, 191, 189);
                continue;
              }
              o = r;
              continue;
            }
            if (r < 56320) {
              (t -= 3) > -1 && i.push(239, 191, 189), o = r;
              continue;
            }
            r = 65536 + (o - 55296 << 10 | r - 56320);
          } else {
            o && (t -= 3) > -1 && i.push(239, 191, 189);
          }
          if (o = null, r < 128) {
            if ((t -= 1) < 0) break;
            i.push(r);
          } else if (r < 2048) {
            if ((t -= 2) < 0) break;
            i.push(r >> 6 | 192, 63 & r | 128);
          } else if (r < 65536) {
            if ((t -= 3) < 0) break;
            i.push(r >> 12 | 224, r >> 6 & 63 | 128, 63 & r | 128);
          } else {
            if (!(r < 1114112)) throw new Error("Invalid code point");
            if ((t -= 4) < 0) break;
            i.push(r >> 18 | 240, r >> 12 & 63 | 128, r >> 6 & 63 | 128, 63 & r | 128);
          }
        }
        return i;
      }
      function q(e) {
        return n.toByteArray(function(e) {
          if (
            (e = function(e) {
              return e.trim ? e.trim() : e.replace(/^\s+|\s+$/g, "");
            }(e).replace(D, "")).length < 2
          ) {
            return "";
          }
          for (; e.length % 4 != 0;) e += "=";
          return e;
        }(e));
      }
      function J(e, t, r, n) {
        for (var o = 0; o < n && !(o + r >= t.length || o >= e.length); ++o) t[o + r] = e[o];
        return o;
      }
    }).call(this, r(5));
  }, function(e, t, r) {
    "use strict";
    t.byteLength = function(e) {
      var t = c(e), r = t[0], n = t[1];
      return 3 * (r + n) / 4 - n;
    },
      t.toByteArray = function(e) {
        var t,
          r,
          n = c(e),
          s = n[0],
          a = n[1],
          u = new i(function(e, t, r) {
            return 3 * (t + r) / 4 - r;
          }(0, s, a)),
          h = 0,
          l = a > 0 ? s - 4 : s;
        for (r = 0; r < l; r += 4) {
          t = o[e.charCodeAt(r)] << 18 | o[e.charCodeAt(r + 1)] << 12 | o[e.charCodeAt(r + 2)] << 6
            | o[e.charCodeAt(r + 3)],
            u[h++] = t >> 16 & 255,
            u[h++] = t >> 8 & 255,
            u[h++] = 255 & t;
        }
        2 === a && (t = o[e.charCodeAt(r)] << 2 | o[e.charCodeAt(r + 1)] >> 4, u[h++] = 255 & t);
        1 === a
          && (t = o[e.charCodeAt(r)] << 10 | o[e.charCodeAt(r + 1)] << 4 | o[e.charCodeAt(r + 2)] >> 2,
            u[h++] = t >> 8 & 255,
            u[h++] = 255 & t);
        return u;
      },
      t.fromByteArray = function(e) {
        for (var t, r = e.length, o = r % 3, i = [], s = 0, a = r - o; s < a; s += 16383) {i.push(
            h(e, s, s + 16383 > a ? a : s + 16383),
          );}
        1 === o
          ? (t = e[r - 1], i.push(n[t >> 2] + n[t << 4 & 63] + "=="))
          : 2 === o && (t = (e[r - 2] << 8) + e[r - 1], i.push(n[t >> 10] + n[t >> 4 & 63] + n[t << 2 & 63] + "="));
        return i.join("");
      };
    for (
      var n = [],
        o = [],
        i = "undefined" != typeof Uint8Array ? Uint8Array : Array,
        s = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
        a = 0,
        u = s.length;
      a < u;
      ++a
    ) {
      n[a] = s[a], o[s.charCodeAt(a)] = a;
    }
    function c(e) {
      var t = e.length;
      if (t % 4 > 0) throw new Error("Invalid string. Length must be a multiple of 4");
      var r = e.indexOf("=");
      return -1 === r && (r = t), [r, r === t ? 0 : 4 - r % 4];
    }
    function h(e, t, r) {
      for (
        var o, i, s = [], a = t; a < r; a += 3
      ) {
        o = (e[a] << 16 & 16711680) + (e[a + 1] << 8 & 65280) + (255 & e[a + 2]),
          s.push(n[(i = o) >> 18 & 63] + n[i >> 12 & 63] + n[i >> 6 & 63] + n[63 & i]);
      }
      return s.join("");
    }
    o["-".charCodeAt(0)] = 62, o["_".charCodeAt(0)] = 63;
  }, function(e, t) {
    /*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> */
    t.read = function(e, t, r, n, o) {
      var i,
        s,
        a = 8 * o - n - 1,
        u = (1 << a) - 1,
        c = u >> 1,
        h = -7,
        l = r ? o - 1 : 0,
        d = r ? -1 : 1,
        f = e[t + l];
      for (l += d, i = f & (1 << -h) - 1, f >>= -h, h += a; h > 0; i = 256 * i + e[t + l], l += d, h -= 8);
      for (s = i & (1 << -h) - 1, i >>= -h, h += n; h > 0; s = 256 * s + e[t + l], l += d, h -= 8);
      if (0 === i) i = 1 - c;
      else {
        if (i === u) return s ? NaN : 1 / 0 * (f ? -1 : 1);
        s += Math.pow(2, n), i -= c;
      }
      return (f ? -1 : 1) * s * Math.pow(2, i - n);
    },
      t.write = function(e, t, r, n, o, i) {
        var s,
          a,
          u,
          c = 8 * i - o - 1,
          h = (1 << c) - 1,
          l = h >> 1,
          d = 23 === o ? Math.pow(2, -24) - Math.pow(2, -77) : 0,
          f = n ? 0 : i - 1,
          p = n ? 1 : -1,
          m = t < 0 || 0 === t && 1 / t < 0 ? 1 : 0;
        for (
          t = Math.abs(t),
            isNaN(t) || t === 1 / 0
              ? (a = isNaN(t) ? 1 : 0, s = h)
              : (s = Math.floor(Math.log(t) / Math.LN2),
                t * (u = Math.pow(2, -s)) < 1 && (s--, u *= 2),
                (t += s + l >= 1 ? d / u : d * Math.pow(2, 1 - l)) * u >= 2 && (s++, u /= 2),
                s + l >= h
                  ? (a = 0, s = h)
                  : s + l >= 1
                  ? (a = (t * u - 1) * Math.pow(2, o), s += l)
                  : (a = t * Math.pow(2, l - 1) * Math.pow(2, o), s = 0));
          o >= 8;
          e[r + f] = 255 & a, f += p, a /= 256, o -= 8
        );
        for (s = s << o | a, c += o; c > 0; e[r + f] = 255 & s, f += p, s /= 256, c -= 8);
        e[r + f - p] |= 128 * m;
      };
  }, function(e, t) {
    var r = {}.toString;
    e.exports = Array.isArray || function(e) {
      return "[object Array]" == r.call(e);
    };
  }, function(e, t, r) {
    var n, o, i;
    o = [],
      void 0 === (i = "function" == typeof (n = function() {
            var e, t, r, n;
            Object.keys
            || (Object.keys =
              (e = Object.prototype.hasOwnProperty,
                t = !{ toString: null }.propertyIsEnumerable("toString"),
                n =
                  (r = [
                    "toString",
                    "toLocaleString",
                    "valueOf",
                    "hasOwnProperty",
                    "isPrototypeOf",
                    "propertyIsEnumerable",
                    "constructor",
                  ]).length,
                function(o) {
                  if ("object" != typeof o && "function" != typeof o || null === o) {throw new TypeError(
                      "Object.keys called on non-object",
                    );}
                  var i = [];
                  for (var s in o) e.call(o, s) && i.push(s);
                  if (t) for (var a = 0; a < n; a++) e.call(o, r[a]) && i.push(r[a]);
                  return i;
                })),
              Object.create || (Object.create = function() {
                function e() {}
                return function(t) {
                  if (1 !== arguments.length) {
                    throw new Error("Object.create implementation only accepts one parameter.");
                  }
                  return e.prototype = t, new e();
                };
              }()),
              Array.isArray || (Array.isArray = function(e) {
                return "[object Array]" === Object.prototype.toString.call(e);
              }),
              Array.prototype.indexOf || (Array.prototype.indexOf = function(e) {
                if (null === this) throw new TypeError();
                var t = Object(this), r = t.length >>> 0;
                if (0 === r) return -1;
                var n = 0;
                if (
                  arguments.length > 1 && ((n = Number(arguments[1])) != n
                    ? n = 0
                    : 0 !== n && n !== 1 / 0 && n !== -1 / 0 && (n = (n > 0 || -1) * Math.floor(Math.abs(n)))), n >= r
                ) {
                  return -1;
                }
                for (var o = n >= 0 ? n : Math.max(r - Math.abs(n), 0); o < r; o++) {
                  if (o in t && t[o] === e) return o;
                }
                return -1;
              }),
              Object.isFrozen || (Object.isFrozen = function(e) {
                for (var t = "tv4_test_frozen_key"; e.hasOwnProperty(t);) t += Math.random();
                try {
                  return e[t] = !0, delete e[t], !1;
                } catch (e) {
                  return !0;
                }
              });
            var o = { "+": !0, "#": !0, ".": !0, "/": !0, ";": !0, "?": !0, "&": !0 }, i = { "*": !0 };
            function s(e) {
              return encodeURI(e).replace(/%25[0-9][0-9]/g, function(e) {
                return "%" + e.substring(3);
              });
            }
            function a(e) {
              var t = "";
              o[e.charAt(0)] && (t = e.charAt(0), e = e.substring(1));
              var r = "", n = "", a = !0, u = !1, c = !1;
              "+" === t
                ? a = !1
                : "." === t
                ? (n = ".", r = ".")
                : "/" === t
                ? (n = "/", r = "/")
                : "#" === t
                ? (n = "#", a = !1)
                : ";" === t
                ? (n = ";", r = ";", u = !0, c = !0)
                : "?" === t
                ? (n = "?", r = "&", u = !0)
                : "&" === t && (n = "&", r = "&", u = !0);
              for (var h = [], l = e.split(","), d = [], f = {}, p = 0; p < l.length; p++) {
                var m = l[p], g = null;
                if (-1 !== m.indexOf(":")) {
                  var y = m.split(":");
                  m = y[0], g = parseInt(y[1], 10);
                }
                for (var v = {}; i[m.charAt(m.length - 1)];) {
                  v[m.charAt(m.length - 1)] = !0, m = m.substring(0, m.length - 1);
                }
                var _ = { truncate: g, name: m, suffices: v };
                d.push(_), f[m] = _, h.push(m);
              }
              var b = function(e) {
                for (var t = "", o = 0, i = 0; i < d.length; i++) {
                  var h = d[i], l = e(h.name);
                  if (
                    null == l || Array.isArray(l) && 0 === l.length
                    || "object" == typeof l && 0 === Object.keys(l).length
                  ) {
                    o++;
                  } else if (t += i === o ? n : r || ",", Array.isArray(l)) {
                    u && (t += h.name + "=");
                    for (
                      var f = 0; f < l.length; f++
                    ) {
                      f > 0 && (t += h.suffices["*"] && r || ",", h.suffices["*"] && u && (t += h.name + "=")),
                        t += a ? encodeURIComponent(l[f]).replace(/!/g, "%21") : s(l[f]);
                    }
                  } else if ("object" == typeof l) {
                    u && !h.suffices["*"] && (t += h.name + "=");
                    var p = !0;
                    for (var m in l) {
                      p || (t += h.suffices["*"] && r || ","),
                        p = !1,
                        t += a ? encodeURIComponent(m).replace(/!/g, "%21") : s(m),
                        t += h.suffices["*"] ? "=" : ",",
                        t += a ? encodeURIComponent(l[m]).replace(/!/g, "%21") : s(l[m]);
                    }
                  } else {
                    u && (t += h.name, c && "" === l || (t += "=")),
                      null != h.truncate && (l = l.substring(0, h.truncate)),
                      t += a ? encodeURIComponent(l).replace(/!/g, "%21") : s(l);
                  }
                }
                return t;
              };
              return b.varNames = h, { prefix: n, substitution: b };
            }
            function u(e) {
              if (!(this instanceof u)) return new u(e);
              for (var t = e.split("{"), r = [t.shift()], n = [], o = [], i = []; t.length > 0;) {
                var s = t.shift(), c = s.split("}")[0], h = s.substring(c.length + 1), l = a(c);
                o.push(l.substitution), n.push(l.prefix), r.push(h), i = i.concat(l.substitution.varNames);
              }
              this.fill = function(e) {
                for (var t = r[0], n = 0; n < o.length; n++) t += (0, o[n])(e), t += r[n + 1];
                return t;
              },
                this.varNames = i,
                this.template = e;
            }
            u.prototype = {
              toString: function() {
                return this.template;
              },
              fillFromObject: function(e) {
                return this.fill(function(t) {
                  return e[t];
                });
              },
            };
            var c = function(e, t, r, n, o) {
              if (
                this.missing = [],
                  this.missingMap = {},
                  this.formatValidators = e ? Object.create(e.formatValidators) : {},
                  this.schemas = e ? Object.create(e.schemas) : {},
                  this.collectMultiple = t,
                  this.errors = [],
                  this.handleError = t ? this.collectError : this.returnError,
                  n
                  && (this.checkRecursive = !0,
                    this.scanned = [],
                    this.scannedFrozen = [],
                    this.scannedFrozenSchemas = [],
                    this.scannedFrozenValidationErrors = [],
                    this.validatedSchemasKey = "tv4_validation_id",
                    this.validationErrorsKey = "tv4_validation_errors_id"),
                  o && (this.trackUnknownProperties = !0, this.knownPropertyPaths = {}, this.unknownPropertyPaths = {}),
                  this.errorReporter = r || y("en"),
                  "string" == typeof this.errorReporter
              ) {
                throw new Error("debug");
              }
              if (this.definedKeywords = {}, e) {
                for (var i in e.definedKeywords) this.definedKeywords[i] = e.definedKeywords[i].slice(0);
              }
            };
            function h(e, t) {
              if (e === t) return !0;
              if (e && t && "object" == typeof e && "object" == typeof t) {
                if (Array.isArray(e) !== Array.isArray(t)) return !1;
                if (Array.isArray(e)) {
                  if (e.length !== t.length) return !1;
                  for (var r = 0; r < e.length; r++) if (!h(e[r], t[r])) return !1;
                } else {
                  var n;
                  for (n in e) if (void 0 === t[n] && void 0 !== e[n]) return !1;
                  for (n in t) if (void 0 === e[n] && void 0 !== t[n]) return !1;
                  for (n in e) if (!h(e[n], t[n])) return !1;
                }
                return !0;
              }
              return !1;
            }
            c.prototype.defineKeyword = function(e, t) {
              this.definedKeywords[e] = this.definedKeywords[e] || [], this.definedKeywords[e].push(t);
            },
              c.prototype.createError = function(e, t, r, n, o, i, s) {
                var a = new P(e, t, r, n, o);
                return a.message = this.errorReporter(a, i, s), a;
              },
              c.prototype.returnError = function(e) {
                return e;
              },
              c.prototype.collectError = function(e) {
                return e && this.errors.push(e), null;
              },
              c.prototype.prefixErrors = function(e, t, r) {
                for (var n = e; n < this.errors.length; n++) this.errors[n] = this.errors[n].prefixWith(t, r);
                return this;
              },
              c.prototype.banUnknownProperties = function(e, t) {
                for (var r in this.unknownPropertyPaths) {
                  var n = this.createError(v.UNKNOWN_PROPERTY, { path: r }, r, "", null, e, t), o = this.handleError(n);
                  if (o) return o;
                }
                return null;
              },
              c.prototype.addFormat = function(e, t) {
                if ("object" == typeof e) {
                  for (var r in e) this.addFormat(r, e[r]);
                  return this;
                }
                this.formatValidators[e] = t;
              },
              c.prototype.resolveRefs = function(e, t) {
                if (void 0 !== e.$ref) {
                  if ((t = t || {})[e.$ref]) {
                    return this.createError(
                      v.CIRCULAR_REFERENCE,
                      { urls: Object.keys(t).join(", ") },
                      "",
                      "",
                      null,
                      void 0,
                      e,
                    );
                  }
                  t[e.$ref] = !0, e = this.getSchema(e.$ref, t);
                }
                return e;
              },
              c.prototype.getSchema = function(e, t) {
                var r;
                if (void 0 !== this.schemas[e]) return r = this.schemas[e], this.resolveRefs(r, t);
                var n = e, o = "";
                if (
                  -1 !== e.indexOf("#") && (o = e.substring(e.indexOf("#") + 1), n = e.substring(0, e.indexOf("#"))),
                    "object" == typeof this.schemas[n]
                ) {
                  r = this.schemas[n];
                  var i = decodeURIComponent(o);
                  if ("" === i) return this.resolveRefs(r, t);
                  if ("/" !== i.charAt(0)) return;
                  for (var s = i.split("/").slice(1), a = 0; a < s.length; a++) {
                    var u = s[a].replace(/~1/g, "/").replace(/~0/g, "~");
                    if (void 0 === r[u]) {
                      r = void 0;
                      break;
                    }
                    r = r[u];
                  }
                  if (void 0 !== r) return this.resolveRefs(r, t);
                }
                void 0 === this.missing[n] && (this.missing.push(n), this.missing[n] = n, this.missingMap[n] = n);
              },
              c.prototype.searchSchemas = function(e, t) {
                if (Array.isArray(e)) for (var r = 0; r < e.length; r++) this.searchSchemas(e[r], t);
                else if (e && "object" == typeof e) {
                  for (
                    var n in "string" == typeof e.id && function(e, t) {
                      if (t.substring(0, e.length) === e) {
                        var r = t.substring(e.length);
                        if (
                          t.length > 0 && "/" === t.charAt(e.length - 1) || "#" === r.charAt(0) || "?" === r.charAt(0)
                        ) {
                          return !0;
                        }
                      }
                      return !1;
                    }(t, e.id) && void 0 === this.schemas[e.id] && (this.schemas[e.id] = e),
                      e
                  ) {
                    if ("enum" !== n) {
                      if ("object" == typeof e[n]) this.searchSchemas(e[n], t);
                      else if ("$ref" === n) {
                        var o = m(e[n]);
                        o && void 0 === this.schemas[o] && void 0 === this.missingMap[o] && (this.missingMap[o] = o);
                      }
                    }
                  }
                }
              },
              c.prototype.addSchema = function(e, t) {
                if ("string" != typeof e || void 0 === t) {
                  if ("object" != typeof e || "string" != typeof e.id) return;
                  e = (t = e).id;
                }
                e === m(e) + "#" && (e = m(e)),
                  this.schemas[e] = t,
                  delete this.missingMap[e],
                  g(t, e),
                  this.searchSchemas(t, e);
              },
              c.prototype.getSchemaMap = function() {
                var e = {};
                for (var t in this.schemas) e[t] = this.schemas[t];
                return e;
              },
              c.prototype.getSchemaUris = function(e) {
                var t = [];
                for (var r in this.schemas) e && !e.test(r) || t.push(r);
                return t;
              },
              c.prototype.getMissingUris = function(e) {
                var t = [];
                for (var r in this.missingMap) e && !e.test(r) || t.push(r);
                return t;
              },
              c.prototype.dropSchemas = function() {
                this.schemas = {}, this.reset();
              },
              c.prototype.reset = function() {
                this.missing = [], this.missingMap = {}, this.errors = [];
              },
              c.prototype.validateAll = function(e, t, r, n, o) {
                var i;
                if (!(t = this.resolveRefs(t))) return null;
                if (t instanceof P) return this.errors.push(t), t;
                var s, a = this.errors.length, u = null, c = null;
                if (this.checkRecursive && e && "object" == typeof e) {
                  if (i = !this.scanned.length, e[this.validatedSchemasKey]) {
                    var h = e[this.validatedSchemasKey].indexOf(t);
                    if (-1 !== h) return this.errors = this.errors.concat(e[this.validationErrorsKey][h]), null;
                  }
                  if (Object.isFrozen(e) && -1 !== (s = this.scannedFrozen.indexOf(e))) {
                    var l = this.scannedFrozenSchemas[s].indexOf(t);
                    if (-1 !== l) {
                      return this.errors = this.errors.concat(this.scannedFrozenValidationErrors[s][l]), null;
                    }
                  }
                  if (this.scanned.push(e), Object.isFrozen(e)) {
                    -1 === s
                    && (s = this.scannedFrozen.length, this.scannedFrozen.push(e), this.scannedFrozenSchemas.push([])),
                      u = this.scannedFrozenSchemas[s].length,
                      this.scannedFrozenSchemas[s][u] = t,
                      this.scannedFrozenValidationErrors[s][u] = [];
                  } else {
                    if (!e[this.validatedSchemasKey]) {
                      try {
                        Object.defineProperty(e, this.validatedSchemasKey, { value: [], configurable: !0 }),
                          Object.defineProperty(e, this.validationErrorsKey, { value: [], configurable: !0 });
                      } catch (t) {
                        e[this.validatedSchemasKey] = [], e[this.validationErrorsKey] = [];
                      }
                    }
                    c = e[this.validatedSchemasKey].length,
                      e[this.validatedSchemasKey][c] = t,
                      e[this.validationErrorsKey][c] = [];
                  }
                }
                var d = this.errors.length,
                  f = this.validateBasic(e, t, o) || this.validateNumeric(e, t, o) || this.validateString(e, t, o)
                    || this.validateArray(e, t, o) || this.validateObject(e, t, o) || this.validateCombinations(e, t, o)
                    || this.validateHypermedia(e, t, o) || this.validateFormat(e, t, o)
                    || this.validateDefinedKeywords(e, t, o) || null;
                if (i) {
                  for (; this.scanned.length;) delete this.scanned.pop()[this.validatedSchemasKey];
                  this.scannedFrozen = [], this.scannedFrozenSchemas = [];
                }
                if (f || d !== this.errors.length) {
                  for (; r && r.length || n && n.length;) {
                    var p = r && r.length ? "" + r.pop() : null, m = n && n.length ? "" + n.pop() : null;
                    f && (f = f.prefixWith(p, m)), this.prefixErrors(d, p, m);
                  }
                }
                return null !== u
                  ? this.scannedFrozenValidationErrors[s][u] = this.errors.slice(a)
                  : null !== c && (e[this.validationErrorsKey][c] = this.errors.slice(a)),
                  this.handleError(f);
              },
              c.prototype.validateFormat = function(e, t) {
                if ("string" != typeof t.format || !this.formatValidators[t.format]) return null;
                var r = this.formatValidators[t.format].call(null, e, t);
                return "string" == typeof r || "number" == typeof r
                  ? this.createError(v.FORMAT_CUSTOM, { message: r }, "", "/format", null, e, t)
                  : r && "object" == typeof r
                  ? this.createError(
                    v.FORMAT_CUSTOM,
                    { message: r.message || "?" },
                    r.dataPath || "",
                    r.schemaPath || "/format",
                    null,
                    e,
                    t,
                  )
                  : null;
              },
              c.prototype.validateDefinedKeywords = function(e, t, r) {
                for (var n in this.definedKeywords) {
                  if (void 0 !== t[n]) {
                    for (var o = this.definedKeywords[n], i = 0; i < o.length; i++) {
                      var s = (0, o[i])(e, t[n], t, r);
                      if ("string" == typeof s || "number" == typeof s) {
                        return this.createError(v.KEYWORD_CUSTOM, { key: n, message: s }, "", "", null, e, t)
                          .prefixWith(null, n);
                      }
                      if (s && "object" == typeof s) {
                        var a = s.code;
                        if ("string" == typeof a) {
                          if (!v[a]) {
                            throw new Error("Undefined error code (use defineError): " + a);
                          }
                          a = v[a];
                        } else "number" != typeof a && (a = v.KEYWORD_CUSTOM);
                        var u = "object" == typeof s.message ? s.message : { key: n, message: s.message || "?" },
                          c = s.schemaPath || "/" + n.replace(/~/g, "~0").replace(/\//g, "~1");
                        return this.createError(a, u, s.dataPath || null, c, null, e, t);
                      }
                    }
                  }
                }
                return null;
              },
              c.prototype.validateBasic = function(e, t, r) {
                var n;
                return (n = this.validateType(e, t, r)) || (n = this.validateEnum(e, t, r))
                  ? n.prefixWith(null, "type")
                  : null;
              },
              c.prototype.validateType = function(e, t) {
                if (void 0 === t.type) return null;
                var r = typeof e;
                null === e ? r = "null" : Array.isArray(e) && (r = "array");
                var n = t.type;
                Array.isArray(n) || (n = [n]);
                for (var o = 0; o < n.length; o++) {
                  var i = n[o];
                  if (i === r || "integer" === i && "number" === r && e % 1 == 0) return null;
                }
                return this.createError(v.INVALID_TYPE, { type: r, expected: n.join("/") }, "", "", null, e, t);
              },
              c.prototype.validateEnum = function(e, t) {
                if (void 0 === t.enum) return null;
                for (var r = 0; r < t.enum.length; r++) if (h(e, t.enum[r])) return null;
                return this.createError(
                  v.ENUM_MISMATCH,
                  { value: "undefined" != typeof JSON ? JSON.stringify(e) : e },
                  "",
                  "",
                  null,
                  e,
                  t,
                );
              },
              c.prototype.validateNumeric = function(e, t, r) {
                return this.validateMultipleOf(e, t, r) || this.validateMinMax(e, t, r) || this.validateNaN(e, t, r)
                  || null;
              };
            var l = Math.pow(2, -51), d = 1 - l;
            function f(e) {
              var t = String(e).replace(/^\s+|\s+$/g, "").match(
                /^([^:\/?#]+:)?(\/\/(?:[^:@]*(?::[^:@]*)?@)?(([^:\/?#]*)(?::(\d*))?))?([^?#]*)(\?[^#]*)?(#[\s\S]*)?/,
              );
              return t
                ? {
                  href: t[0] || "",
                  protocol: t[1] || "",
                  authority: t[2] || "",
                  host: t[3] || "",
                  hostname: t[4] || "",
                  port: t[5] || "",
                  pathname: t[6] || "",
                  search: t[7] || "",
                  hash: t[8] || "",
                }
                : null;
            }
            function p(e, t) {
              return t = f(t || ""),
                e = f(e || ""),
                t && e
                  ? (t.protocol || e.protocol) + (t.protocol || t.authority ? t.authority : e.authority)
                    + (r = t.protocol || t.authority || "/" === t.pathname.charAt(0)
                      ? t.pathname
                      : t.pathname
                      ? (e.authority && !e.pathname ? "/" : "") + e.pathname.slice(0, e.pathname.lastIndexOf("/") + 1)
                        + t.pathname
                      : e.pathname,
                      n = [],
                      r.replace(/^(\.\.?(\/|$))+/, "").replace(/\/(\.(\/|$))+/g, "/").replace(/\/\.\.$/, "/../")
                        .replace(/\/?[^\/]*/g, function(e) {
                          "/.." === e ? n.pop() : n.push(e);
                        }),
                      n.join("").replace(/^\//, "/" === r.charAt(0) ? "/" : ""))
                    + (t.protocol || t.authority || t.pathname ? t.search : t.search || e.search) + t.hash
                  : null;
              var r, n;
            }
            function m(e) {
              return e.split("#")[0];
            }
            function g(e, t) {
              if (e && "object" == typeof e) {
                if (
                  void 0 === t ? t = e.id : "string" == typeof e.id && (t = p(t, e.id), e.id = t), Array.isArray(e)
                ) {
                  for (var r = 0; r < e.length; r++) g(e[r], t);
                } else {
                  for (var n in "string" == typeof e.$ref && (e.$ref = p(t, e.$ref)), e) "enum" !== n && g(e[n], t);
                }
              }
            }
            function y(e) {
              var t = E[e = e || "en"];
              return function(e) {
                var r = t[e.code] || w[e.code];
                if ("string" != typeof r) {
                  return "Unknown error code " + e.code + ": " + JSON.stringify(e.messageParams);
                }
                var n = e.params;
                return r.replace(/\{([^{}]*)\}/g, function(e, t) {
                  var r = n[t];
                  return "string" == typeof r || "number" == typeof r ? r : e;
                });
              };
            }
            c.prototype.validateMultipleOf = function(e, t) {
              var r = t.multipleOf || t.divisibleBy;
              if (void 0 === r) return null;
              if ("number" == typeof e) {
                var n = e / r % 1;
                if (n >= l && n < d) {
                  return this.createError(v.NUMBER_MULTIPLE_OF, { value: e, multipleOf: r }, "", "", null, e, t);
                }
              }
              return null;
            },
              c.prototype.validateMinMax = function(e, t) {
                if ("number" != typeof e) {
                  return null;
                }
                if (void 0 !== t.minimum) {
                  if (e < t.minimum) {
                    return this.createError(
                      v.NUMBER_MINIMUM,
                      { value: e, minimum: t.minimum },
                      "",
                      "/minimum",
                      null,
                      e,
                      t,
                    );
                  }
                  if (t.exclusiveMinimum && e === t.minimum) {
                    return this.createError(
                      v.NUMBER_MINIMUM_EXCLUSIVE,
                      { value: e, minimum: t.minimum },
                      "",
                      "/exclusiveMinimum",
                      null,
                      e,
                      t,
                    );
                  }
                }
                if (void 0 !== t.maximum) {
                  if (e > t.maximum) {
                    return this.createError(
                      v.NUMBER_MAXIMUM,
                      { value: e, maximum: t.maximum },
                      "",
                      "/maximum",
                      null,
                      e,
                      t,
                    );
                  }
                  if (t.exclusiveMaximum && e === t.maximum) {
                    return this.createError(
                      v.NUMBER_MAXIMUM_EXCLUSIVE,
                      { value: e, maximum: t.maximum },
                      "",
                      "/exclusiveMaximum",
                      null,
                      e,
                      t,
                    );
                  }
                }
                return null;
              },
              c.prototype.validateNaN = function(e, t) {
                return "number" != typeof e
                  ? null
                  : !0 === isNaN(e) || e === 1 / 0 || e === -1 / 0
                  ? this.createError(v.NUMBER_NOT_A_NUMBER, { value: e }, "", "/type", null, e, t)
                  : null;
              },
              c.prototype.validateString = function(e, t, r) {
                return this.validateStringLength(e, t, r) || this.validateStringPattern(e, t, r) || null;
              },
              c.prototype.validateStringLength = function(e, t) {
                return "string" != typeof e
                  ? null
                  : void 0 !== t.minLength && e.length < t.minLength
                  ? this.createError(
                    v.STRING_LENGTH_SHORT,
                    { length: e.length, minimum: t.minLength },
                    "",
                    "/minLength",
                    null,
                    e,
                    t,
                  )
                  : void 0 !== t.maxLength && e.length > t.maxLength
                  ? this.createError(
                    v.STRING_LENGTH_LONG,
                    { length: e.length, maximum: t.maxLength },
                    "",
                    "/maxLength",
                    null,
                    e,
                    t,
                  )
                  : null;
              },
              c.prototype.validateStringPattern = function(e, t) {
                if ("string" != typeof e || "string" != typeof t.pattern && !(t.pattern instanceof RegExp)) return null;
                var r;
                if (t.pattern instanceof RegExp) r = t.pattern;
                else {
                  var n, o = "", i = t.pattern.match(/^\/(.+)\/([img]*)$/);
                  i ? (n = i[1], o = i[2]) : n = t.pattern, r = new RegExp(n, o);
                }
                return r.test(e)
                  ? null
                  : this.createError(v.STRING_PATTERN, { pattern: t.pattern }, "", "/pattern", null, e, t);
              },
              c.prototype.validateArray = function(e, t, r) {
                return Array.isArray(e)
                    && (this.validateArrayLength(e, t, r) || this.validateArrayUniqueItems(e, t, r)
                      || this.validateArrayItems(e, t, r)) || null;
              },
              c.prototype.validateArrayLength = function(e, t) {
                var r;
                return void 0 !== t.minItems && e.length < t.minItems
                      && (r = this.createError(
                        v.ARRAY_LENGTH_SHORT,
                        { length: e.length, minimum: t.minItems },
                        "",
                        "/minItems",
                        null,
                        e,
                        t,
                      ),
                        this.handleError(r))
                    || void 0 !== t.maxItems && e.length > t.maxItems
                      && (r = this.createError(
                        v.ARRAY_LENGTH_LONG,
                        { length: e.length, maximum: t.maxItems },
                        "",
                        "/maxItems",
                        null,
                        e,
                        t,
                      ),
                        this.handleError(r))
                  ? r
                  : null;
              },
              c.prototype.validateArrayUniqueItems = function(e, t) {
                if (t.uniqueItems) {
                  for (var r = 0; r < e.length; r++) {
                    for (var n = r + 1; n < e.length; n++) {
                      if (h(e[r], e[n])) {
                        var o = this.createError(
                          v.ARRAY_UNIQUE,
                          { match1: r, match2: n },
                          "",
                          "/uniqueItems",
                          null,
                          e,
                          t,
                        );
                        if (this.handleError(o)) return o;
                      }
                    }
                  }
                }
                return null;
              },
              c.prototype.validateArrayItems = function(e, t, r) {
                if (void 0 === t.items) return null;
                var n, o;
                if (Array.isArray(t.items)) {
                  for (o = 0; o < e.length; o++) {
                    if (o < t.items.length) {
                      if (n = this.validateAll(e[o], t.items[o], [o], ["items", o], r + "/" + o)) {
                        return n;
                      }
                    } else if (void 0 !== t.additionalItems) {
                      if ("boolean" == typeof t.additionalItems) {
                        if (
                          !t.additionalItems
                          && (n = this.createError(
                            v.ARRAY_ADDITIONAL_ITEMS,
                            {},
                            "/" + o,
                            "/additionalItems",
                            null,
                            e,
                            t,
                          ),
                            this.handleError(n))
                        ) {
                          return n;
                        }
                      } else if (
                        n = this.validateAll(e[o], t.additionalItems, [o], ["additionalItems"], r + "/" + o)
                      ) {
                        return n;
                      }
                    }
                  }
                } else {
                  for (o = 0; o < e.length; o++) {
                    if (n = this.validateAll(e[o], t.items, [o], ["items"], r + "/" + o)) {
                      return n;
                    }
                  }
                }
                return null;
              },
              c.prototype.validateObject = function(e, t, r) {
                return "object" != typeof e || null === e || Array.isArray(e)
                  ? null
                  : this.validateObjectMinMaxProperties(e, t, r) || this.validateObjectRequiredProperties(e, t, r)
                    || this.validateObjectProperties(e, t, r) || this.validateObjectDependencies(e, t, r) || null;
              },
              c.prototype.validateObjectMinMaxProperties = function(e, t) {
                var r, n = Object.keys(e);
                return void 0 !== t.minProperties && n.length < t.minProperties
                      && (r = this.createError(
                        v.OBJECT_PROPERTIES_MINIMUM,
                        { propertyCount: n.length, minimum: t.minProperties },
                        "",
                        "/minProperties",
                        null,
                        e,
                        t,
                      ),
                        this.handleError(r))
                    || void 0 !== t.maxProperties && n.length > t.maxProperties
                      && (r = this.createError(
                        v.OBJECT_PROPERTIES_MAXIMUM,
                        { propertyCount: n.length, maximum: t.maxProperties },
                        "",
                        "/maxProperties",
                        null,
                        e,
                        t,
                      ),
                        this.handleError(r))
                  ? r
                  : null;
              },
              c.prototype.validateObjectRequiredProperties = function(e, t) {
                if (void 0 !== t.required) {
                  for (var r = 0; r < t.required.length; r++) {
                    var n = t.required[r];
                    if (void 0 === e[n]) {
                      var o = this.createError(v.OBJECT_REQUIRED, { key: n }, "", "/required/" + r, null, e, t);
                      if (this.handleError(o)) return o;
                    }
                  }
                }
                return null;
              },
              c.prototype.validateObjectProperties = function(e, t, r) {
                var n;
                for (var o in e) {
                  var i = r + "/" + o.replace(/~/g, "~0").replace(/\//g, "~1"), s = !1;
                  if (
                    void 0 !== t.properties && void 0 !== t.properties[o]
                    && (s = !0, n = this.validateAll(e[o], t.properties[o], [o], ["properties", o], i))
                  ) {
                    return n;
                  }
                  if (void 0 !== t.patternProperties) {
                    for (var a in t.patternProperties) {
                      if (
                        new RegExp(a).test(o)
                        && (s = !0,
                          n = this.validateAll(e[o], t.patternProperties[a], [o], ["patternProperties", a], i))
                      ) {
                        return n;
                      }
                    }
                  }
                  if (s) {this.trackUnknownProperties
                      && (this.knownPropertyPaths[i] = !0, delete this.unknownPropertyPaths[i]);} else if (
                    void 0 !== t.additionalProperties
                  ) {
                    if (
                      this.trackUnknownProperties
                      && (this.knownPropertyPaths[i] = !0, delete this.unknownPropertyPaths[i]),
                        "boolean" == typeof t.additionalProperties
                    ) {
                      if (
                        !t.additionalProperties
                        && (n = this.createError(
                          v.OBJECT_ADDITIONAL_PROPERTIES,
                          { key: o },
                          "",
                          "/additionalProperties",
                          null,
                          e,
                          t,
                        ).prefixWith(o, null),
                          this.handleError(n))
                      ) {
                        return n;
                      }
                    } else if (
                      n = this.validateAll(e[o], t.additionalProperties, [o], ["additionalProperties"], i)
                    ) {
                      return n;
                    }
                  } else {this.trackUnknownProperties && !this.knownPropertyPaths[i]
                      && (this.unknownPropertyPaths[i] = !0);}
                }
                return null;
              },
              c.prototype.validateObjectDependencies = function(e, t, r) {
                var n;
                if (void 0 !== t.dependencies) {
                  for (var o in t.dependencies) {
                    if (void 0 !== e[o]) {
                      var i = t.dependencies[o];
                      if ("string" == typeof i) {
                        if (
                          void 0 === e[i]
                          && (n = this.createError(v.OBJECT_DEPENDENCY_KEY, { key: o, missing: i }, "", "", null, e, t)
                            .prefixWith(null, o).prefixWith(null, "dependencies"),
                            this.handleError(n))
                        ) {
                          return n;
                        }
                      } else if (Array.isArray(i)) {
                        for (var s = 0; s < i.length; s++) {
                          var a = i[s];
                          if (
                            void 0 === e[a]
                            && (n = this.createError(
                              v.OBJECT_DEPENDENCY_KEY,
                              { key: o, missing: a },
                              "",
                              "/" + s,
                              null,
                              e,
                              t,
                            ).prefixWith(null, o).prefixWith(null, "dependencies"),
                              this.handleError(n))
                          ) {
                            return n;
                          }
                        }
                      } else if (n = this.validateAll(e, i, [], ["dependencies", o], r)) return n;
                    }
                  }
                }
                return null;
              },
              c.prototype.validateCombinations = function(e, t, r) {
                return this.validateAllOf(e, t, r) || this.validateAnyOf(e, t, r) || this.validateOneOf(e, t, r)
                  || this.validateNot(e, t, r) || null;
              },
              c.prototype.validateAllOf = function(e, t, r) {
                if (void 0 === t.allOf) return null;
                for (var n, o = 0; o < t.allOf.length; o++) {
                  var i = t.allOf[o];
                  if (n = this.validateAll(e, i, [], ["allOf", o], r)) return n;
                }
                return null;
              },
              c.prototype.validateAnyOf = function(e, t, r) {
                if (void 0 === t.anyOf) return null;
                var n, o, i = [], s = this.errors.length;
                this.trackUnknownProperties && (n = this.unknownPropertyPaths, o = this.knownPropertyPaths);
                for (var a = !0, u = 0; u < t.anyOf.length; u++) {
                  this.trackUnknownProperties && (this.unknownPropertyPaths = {}, this.knownPropertyPaths = {});
                  var c = t.anyOf[u], h = this.errors.length, l = this.validateAll(e, c, [], ["anyOf", u], r);
                  if (null === l && h === this.errors.length) {
                    if (this.errors = this.errors.slice(0, s), this.trackUnknownProperties) {
                      for (var d in this.knownPropertyPaths) o[d] = !0, delete n[d];
                      for (var f in this.unknownPropertyPaths) o[f] || (n[f] = !0);
                      a = !1;
                      continue;
                    }
                    return null;
                  }
                  l && i.push(l.prefixWith(null, "" + u).prefixWith(null, "anyOf"));
                }
                return this.trackUnknownProperties && (this.unknownPropertyPaths = n, this.knownPropertyPaths = o),
                  a
                    ? (i = i.concat(this.errors.slice(s)),
                      this.errors = this.errors.slice(0, s),
                      this.createError(v.ANY_OF_MISSING, {}, "", "/anyOf", i, e, t))
                    : void 0;
              },
              c.prototype.validateOneOf = function(e, t, r) {
                if (void 0 === t.oneOf) return null;
                var n, o, i = null, s = [], a = this.errors.length;
                this.trackUnknownProperties && (n = this.unknownPropertyPaths, o = this.knownPropertyPaths);
                for (var u = 0; u < t.oneOf.length; u++) {
                  this.trackUnknownProperties && (this.unknownPropertyPaths = {}, this.knownPropertyPaths = {});
                  var c = t.oneOf[u], h = this.errors.length, l = this.validateAll(e, c, [], ["oneOf", u], r);
                  if (null === l && h === this.errors.length) {
                    if (null !== i) {return this.errors = this.errors.slice(0, a),
                        this.createError(v.ONE_OF_MULTIPLE, { index1: i, index2: u }, "", "/oneOf", null, e, t);}
                    if (i = u, this.trackUnknownProperties) {
                      for (var d in this.knownPropertyPaths) o[d] = !0, delete n[d];
                      for (var f in this.unknownPropertyPaths) o[f] || (n[f] = !0);
                    }
                  } else l && s.push(l);
                }
                return this.trackUnknownProperties && (this.unknownPropertyPaths = n, this.knownPropertyPaths = o),
                  null === i
                    ? (s = s.concat(this.errors.slice(a)),
                      this.errors = this.errors.slice(0, a),
                      this.createError(v.ONE_OF_MISSING, {}, "", "/oneOf", s, e, t))
                    : (this.errors = this.errors.slice(0, a), null);
              },
              c.prototype.validateNot = function(e, t, r) {
                if (void 0 === t.not) return null;
                var n, o, i = this.errors.length;
                this.trackUnknownProperties
                  && (n = this.unknownPropertyPaths,
                    o = this.knownPropertyPaths,
                    this.unknownPropertyPaths = {},
                    this.knownPropertyPaths = {});
                var s = this.validateAll(e, t.not, null, null, r), a = this.errors.slice(i);
                return this.errors = this.errors.slice(0, i),
                  this.trackUnknownProperties && (this.unknownPropertyPaths = n, this.knownPropertyPaths = o),
                  null === s && 0 === a.length ? this.createError(v.NOT_PASSED, {}, "", "/not", null, e, t) : null;
              },
              c.prototype.validateHypermedia = function(e, t, r) {
                if (!t.links) return null;
                for (var n, o = 0; o < t.links.length; o++) {
                  var i = t.links[o];
                  if ("describedby" === i.rel) {
                    for (var s = new u(i.href), a = !0, c = 0; c < s.varNames.length; c++) {
                      if (!(s.varNames[c] in e)) {
                        a = !1;
                        break;
                      }
                    }
                    if (a) {
                      var h = { $ref: s.fillFromObject(e) };
                      if (n = this.validateAll(e, h, [], ["links", o], r)) {
                        return n;
                      }
                    }
                  }
                }
              };
            var v = {
                INVALID_TYPE: 0,
                ENUM_MISMATCH: 1,
                ANY_OF_MISSING: 10,
                ONE_OF_MISSING: 11,
                ONE_OF_MULTIPLE: 12,
                NOT_PASSED: 13,
                NUMBER_MULTIPLE_OF: 100,
                NUMBER_MINIMUM: 101,
                NUMBER_MINIMUM_EXCLUSIVE: 102,
                NUMBER_MAXIMUM: 103,
                NUMBER_MAXIMUM_EXCLUSIVE: 104,
                NUMBER_NOT_A_NUMBER: 105,
                STRING_LENGTH_SHORT: 200,
                STRING_LENGTH_LONG: 201,
                STRING_PATTERN: 202,
                OBJECT_PROPERTIES_MINIMUM: 300,
                OBJECT_PROPERTIES_MAXIMUM: 301,
                OBJECT_REQUIRED: 302,
                OBJECT_ADDITIONAL_PROPERTIES: 303,
                OBJECT_DEPENDENCY_KEY: 304,
                ARRAY_LENGTH_SHORT: 400,
                ARRAY_LENGTH_LONG: 401,
                ARRAY_UNIQUE: 402,
                ARRAY_ADDITIONAL_ITEMS: 403,
                FORMAT_CUSTOM: 500,
                KEYWORD_CUSTOM: 501,
                CIRCULAR_REFERENCE: 600,
                UNKNOWN_PROPERTY: 1e3,
              },
              _ = {};
            for (var b in v) {
              _[v[b]] = b;
            }
            var w = {
              INVALID_TYPE: "Invalid type: {type} (expected {expected})",
              ENUM_MISMATCH: "No enum match for: {value}",
              ANY_OF_MISSING: "Data does not match any schemas from \"anyOf\"",
              ONE_OF_MISSING: "Data does not match any schemas from \"oneOf\"",
              ONE_OF_MULTIPLE:
                "Data is valid against more than one schema from \"oneOf\": indices {index1} and {index2}",
              NOT_PASSED: "Data matches schema from \"not\"",
              NUMBER_MULTIPLE_OF: "Value {value} is not a multiple of {multipleOf}",
              NUMBER_MINIMUM: "Value {value} is less than minimum {minimum}",
              NUMBER_MINIMUM_EXCLUSIVE: "Value {value} is equal to exclusive minimum {minimum}",
              NUMBER_MAXIMUM: "Value {value} is greater than maximum {maximum}",
              NUMBER_MAXIMUM_EXCLUSIVE: "Value {value} is equal to exclusive maximum {maximum}",
              NUMBER_NOT_A_NUMBER: "Value {value} is not a valid number",
              STRING_LENGTH_SHORT: "String is too short ({length} chars), minimum {minimum}",
              STRING_LENGTH_LONG: "String is too long ({length} chars), maximum {maximum}",
              STRING_PATTERN: "String does not match pattern: {pattern}",
              OBJECT_PROPERTIES_MINIMUM: "Too few properties defined ({propertyCount}), minimum {minimum}",
              OBJECT_PROPERTIES_MAXIMUM: "Too many properties defined ({propertyCount}), maximum {maximum}",
              OBJECT_REQUIRED: "Missing required property: {key}",
              OBJECT_ADDITIONAL_PROPERTIES: "Additional properties not allowed",
              OBJECT_DEPENDENCY_KEY: "Dependency failed - key must exist: {missing} (due to key: {key})",
              ARRAY_LENGTH_SHORT: "Array is too short ({length}), minimum {minimum}",
              ARRAY_LENGTH_LONG: "Array is too long ({length}), maximum {maximum}",
              ARRAY_UNIQUE: "Array items are not unique (indices {match1} and {match2})",
              ARRAY_ADDITIONAL_ITEMS: "Additional items not allowed",
              FORMAT_CUSTOM: "Format validation failed ({message})",
              KEYWORD_CUSTOM: "Keyword failed: {key} ({message})",
              CIRCULAR_REFERENCE: "Circular $refs: {urls}",
              UNKNOWN_PROPERTY: "Unknown property (not in schema)",
            };
            function P(e, t, r, n, o) {
              if (Error.call(this), void 0 === e) throw new Error("No error code supplied: " + n);
              this.message = "",
                this.params = t,
                this.code = e,
                this.dataPath = r || "",
                this.schemaPath = n || "",
                this.subErrors = o || null;
              var i = new Error(this.message);
              if (this.stack = i.stack || i.stacktrace, !this.stack) {
                try {
                  throw i;
                } catch (i) {
                  this.stack = i.stack || i.stacktrace;
                }
              }
            }
            P.prototype = Object.create(Error.prototype),
              P.prototype.constructor = P,
              P.prototype.name = "ValidationError",
              P.prototype.prefixWith = function(e, t) {
                if (
                  null !== e
                  && (e = e.replace(/~/g, "~0").replace(/\//g, "~1"), this.dataPath = "/" + e + this.dataPath),
                    null !== t
                    && (t = t.replace(/~/g, "~0").replace(/\//g, "~1"), this.schemaPath = "/" + t + this.schemaPath),
                    null !== this.subErrors
                ) {
                  for (var r = 0; r < this.subErrors.length; r++) this.subErrors[r].prefixWith(e, t);
                }
                return this;
              };
            var E = {},
              T = function e(t) {
                var r,
                  n,
                  o = new c(),
                  i = {
                    setErrorReporter: function(e) {
                      return "string" == typeof e ? this.language(e) : (n = e, !0);
                    },
                    addFormat: function() {
                      o.addFormat.apply(o, arguments);
                    },
                    language: function(e) {
                      return e ? (E[e] || (e = e.split("-")[0]), !!E[e] && (r = e, e)) : r;
                    },
                    addLanguage: function(e, t) {
                      var r;
                      for (r in v) t[r] && !t[v[r]] && (t[v[r]] = t[r]);
                      var n = e.split("-")[0];
                      if (E[n]) {
                        for (r in E[e] = Object.create(E[n]), t) {
                          void 0 === E[n][r] && (E[n][r] = t[r]), E[e][r] = t[r];
                        }
                      } else E[e] = t, E[n] = t;
                      return this;
                    },
                    freshApi: function(t) {
                      var r = e();
                      return t && r.language(t), r;
                    },
                    validate: function(e, t, i, s) {
                      var a = y(r),
                        u = new c(
                          o,
                          !1,
                          n
                            ? function(e, t, r) {
                              return n(e, t, r) || a(e, t, r);
                            }
                            : a,
                          i,
                          s,
                        );
                      "string" == typeof t && (t = { $ref: t }), u.addSchema("", t);
                      var h = u.validateAll(e, t, null, null, "");
                      return !h && s && (h = u.banUnknownProperties(e, t)),
                        this.error = h,
                        this.missing = u.missing,
                        this.valid = null === h,
                        this.valid;
                    },
                    validateResult: function() {
                      var e = {
                        toString: function() {
                          return this.valid ? "valid" : this.error.message;
                        },
                      };
                      return this.validate.apply(e, arguments), e;
                    },
                    validateMultiple: function(e, t, i, s) {
                      var a = y(r),
                        u = new c(
                          o,
                          !0,
                          n
                            ? function(e, t, r) {
                              return n(e, t, r) || a(e, t, r);
                            }
                            : a,
                          i,
                          s,
                        );
                      "string" == typeof t && (t = { $ref: t }),
                        u.addSchema("", t),
                        u.validateAll(e, t, null, null, ""),
                        s && u.banUnknownProperties(e, t);
                      var h = {
                        toString: function() {
                          return this.valid ? "valid" : this.error.message;
                        },
                      };
                      return h.errors = u.errors, h.missing = u.missing, h.valid = 0 === h.errors.length, h;
                    },
                    addSchema: function() {
                      return o.addSchema.apply(o, arguments);
                    },
                    getSchema: function() {
                      return o.getSchema.apply(o, arguments);
                    },
                    getSchemaMap: function() {
                      return o.getSchemaMap.apply(o, arguments);
                    },
                    getSchemaUris: function() {
                      return o.getSchemaUris.apply(o, arguments);
                    },
                    getMissingUris: function() {
                      return o.getMissingUris.apply(o, arguments);
                    },
                    dropSchemas: function() {
                      o.dropSchemas.apply(o, arguments);
                    },
                    defineKeyword: function() {
                      o.defineKeyword.apply(o, arguments);
                    },
                    defineError: function(e, t, r) {
                      if ("string" != typeof e || !/^[A-Z]+(_[A-Z]+)*$/.test(e)) {
                        throw new Error("Code name must be a string in UPPER_CASE_WITH_UNDERSCORES");
                      }
                      if ("number" != typeof t || t % 1 != 0 || t < 1e4) {
                        throw new Error("Code number must be an integer > 10000");
                      }
                      if (void 0 !== v[e]) throw new Error("Error already defined: " + e + " as " + v[e]);
                      if (void 0 !== _[t]) throw new Error("Error code already used: " + _[t] + " as " + t);
                      for (var n in v[e] = t, _[t] = e, w[e] = w[t] = r, E) {
                        var o = E[n];
                        o[e] && (o[t] = o[t] || o[e]);
                      }
                    },
                    reset: function() {
                      o.reset(), this.error = null, this.missing = [], this.valid = !0;
                    },
                    missing: [],
                    error: null,
                    valid: !0,
                    normSchema: g,
                    resolveUrl: p,
                    getDocumentUri: m,
                    errorCodes: v,
                  };
                return i.language(t || "en"), i;
              }();
            return T.addLanguage("en-gb", w), T.tv4 = T, T;
          })
          ? n.apply(t, o)
          : n) || (e.exports = i);
  }, function(e, t, r) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 }), t.BaseClientTypes = void 0;
    class n {
      constructor() {
        this.uris = {}, this.schemas = {}, this.aliases = {};
      }
      declare(e, t, r, n) {
        const o = e + "/" + t;
        if (n.extends) {
          const t = n.extends.split("/"), r = 1 === t.length ? e + "/" + t.shift() : t.join("/"), i = this.uris[r];
          if (!i) throw "Type '" + o + "' tries to extend unknown schema '" + r + "'";
          n.extends = this.schemas[i];
        }
        this.uris[o] = r, this.aliases[r] = o, this.schemas[r] = n;
      }
      resolveAlias(e) {
        return this.uris[e];
      }
      getSchema(e) {
        return this.schemas[e];
      }
      inScope(e) {
        const t = e.length, r = {};
        for (const n in this.uris) {if (n.substr(0, t + 1) === e + "/") {
            const e = this.uris[n];
            r[e] = this.schemas[e];
          }}
        return r;
      }
    }
    t.BaseClientTypes = n;
    const o = new n();
    t.default = o;
  }, function(e, t, r) {
    "use strict";
    class n extends Error {
      constructor(e) {
        super();
        const t = new Error("Schema not found: " + e);
        return t.name = "SchemaNotFound", t;
      }
    }
    e.exports = n;
  }, function(e, t, r) {
    "use strict";
    e.exports = class {
      constructor(e) {
        this._itemsRev = {},
          this._storage = {},
          this._canPropagate = !1,
          this.defaultValue = e,
          this.activatePropagation();
      }
      get(e) {
        e = e.toLowerCase();
        let t = this._storage[e];
        return void 0 === t && (t = this.defaultValue, this._storage[e] = t), t;
      }
      set(e, t) {
        return e = e.toLowerCase(),
          this._storage[e] === t
          || (this._storage[e] = t,
            t || delete this._itemsRev[e],
            this._updateParentFolderItemRev(e, t),
            this._canPropagate && this._propagate(e)),
          t;
      }
      delete(e) {
        return this.set(e, null);
      }
      deactivatePropagation() {
        return this._canPropagate = !1, !0;
      }
      activatePropagation() {
        return this._canPropagate || (this._generateFolderRev("/"), this._canPropagate = !0), !0;
      }
      _hashCode(e) {
        let t = 0;
        if (0 === e.length) return t;
        for (let r = 0; r < e.length; r++) t = (t << 5) - t + e.charCodeAt(r), t |= 0;
        return t;
      }
      _generateHash(e) {
        const t = e.sort().join("|");
        return "" + this._hashCode(t);
      }
      _updateParentFolderItemRev(e, t) {
        if ("/" !== e) {
          const r = this._getParentFolder(e);
          this._itemsRev[r] || (this._itemsRev[r] = {});
          const n = this._itemsRev[r];
          t ? n[e] = t : delete n[e], this._updateParentFolderItemRev(r, this.defaultValue);
        }
      }
      _getParentFolder(e) {
        return e.substr(0, e.lastIndexOf("/", e.length - 2) + 1);
      }
      _propagate(e) {
        if ("/" !== e) {
          const t = this._getParentFolder(e), r = this._itemsRev[t], n = [];
          for (const e in r) n.push(r[e]);
          const o = this._generateHash(n);
          this.set(t, o);
        }
      }
      _generateFolderRev(e) {
        const t = this._itemsRev[e];
        let r = this.defaultValue;
        if (t) {
          const e = [];
          for (const r in t) {
            let n;
            n = "/" === r.substr(-1) ? this._generateFolderRev(r) : t[r], e.push(n);
          }
          e.length > 0 && (r = this._generateHash(e));
        }
        return this.set(e, r), r;
      }
    };
  }, function(e, t, r) {
    var n;
    /*!
 * webfinger.js
 *   version 2.7.0
 *   http://github.com/silverbucket/webfinger.js
 *
 * Developed and Maintained by:
 *   Nick Jennings <nick@silverbucket.net> 2012
 *
 * webfinger.js is released under the AGPL (see LICENSE).
 *
 * You don't have to do anything special to choose one license or the other and you don't
 * have to notify anyone which license you are using.
 * Please see the corresponding license file for details of these licenses.
 * You are free to use, modify and distribute this software, but all copyright
 * information must remain.
 *
 */ "function" != typeof fetch && "function" != typeof XMLHttpRequest && (XMLHttpRequest = r(28)),
      function(r) {
        var o = {
            "http://webfist.org/spec/rel": "webfist",
            "http://webfinger.net/rel/avatar": "avatar",
            remotestorage: "remotestorage",
            "http://tools.ietf.org/id/draft-dejong-remotestorage": "remotestorage",
            remoteStorage: "remotestorage",
            "http://www.packetizer.com/rel/share": "share",
            "http://webfinger.net/rel/profile-page": "profile",
            me: "profile",
            vcard: "vcard",
            blog: "blog",
            "http://packetizer.com/rel/blog": "blog",
            "http://schemas.google.com/g/2010#updates-from": "updates",
            "https://camlistore.org/rel/server": "camilstore",
          },
          i = {
            avatar: [],
            remotestorage: [],
            blog: [],
            vcard: [],
            updates: [],
            share: [],
            profile: [],
            webfist: [],
            camlistore: [],
          },
          s = ["webfinger", "host-meta", "host-meta.json"];
        function a(e) {
          return e.toString = function() {
            return this.message;
          },
            e;
        }
        function u(e) {
          "object" != typeof e && (e = {}),
            this.config = {
              tls_only: void 0 === e.tls_only || e.tls_only,
              webfist_fallback: void 0 !== e.webfist_fallback && e.webfist_fallback,
              uri_fallback: void 0 !== e.uri_fallback && e.uri_fallback,
              request_timeout: void 0 !== e.request_timeout ? e.request_timeout : 1e4,
            };
        }
        u.prototype.__fetchJRD = function(e, t, r) {
          if ("function" == typeof fetch) return this.__fetchJRD_fetch(e, t, r);
          if ("function" == typeof XMLHttpRequest) return this.__fetchJRD_XHR(e, t, r);
          throw new Error("add a polyfill for fetch or XMLHttpRequest");
        },
          u.prototype.__fetchJRD_fetch = function(e, t, r) {
            var n, o = this;
            "function" == typeof AbortController && (n = new AbortController());
            var i = fetch(e, {
                headers: { Accept: "application/jrd+json, application/json" },
                signal: n ? n.signal : void 0,
              }).then(function(t) {
                if (t.ok) return t.text();
                throw 404 === t.status
                  ? a({ message: "resource not found", url: e, status: t.status })
                  : a({ message: "error during request", url: e, status: t.status });
              }, function(t) {
                throw a({ message: "error during request", url: e, status: void 0, err: t });
              }).then(function(t) {
                if (o.__isValidJSON(t)) return t;
                throw a({ message: "invalid json", url: e, status: void 0 });
              }),
              s = new Promise(function(t, r) {
                setTimeout(function() {
                  r(a({ message: "request timed out", url: e, status: void 0 })), n && n.abort();
                }, o.config.request_timeout);
              });
            Promise.race([i, s]).then(function(e) {
              r(e);
            }).catch(function(e) {
              t(e);
            });
          },
          u.prototype.__fetchJRD_XHR = function(e, t, r) {
            var n = this, o = !1, i = new XMLHttpRequest();
            function s() {
              if (!o) {
                if (o = !0, 200 === i.status) {
                  return n.__isValidJSON(i.responseText)
                    ? r(i.responseText)
                    : t(a({ message: "invalid json", url: e, status: i.status }));
                }
                if (404 === i.status) return t(a({ message: "resource not found", url: e, status: i.status }));
                if (i.status >= 301 && i.status <= 302) {
                  var s = i.getResponseHeader("Location");
                  return (function(e) {
                      return "string" == typeof e && "https" === e.split("://")[0];
                    })(s)
                    ? u()
                    : t(a({ message: "no redirect URL found", url: e, status: i.status }));
                }
                return t(a({ message: "error during request", url: e, status: i.status }));
              }
            }
            function u() {
              i.onreadystatechange = function() {
                4 === i.readyState && s();
              },
                i.onload = function() {
                  s();
                },
                i.ontimeout = function() {
                  return t(a({ message: "request timed out", url: e, status: i.status }));
                },
                i.open("GET", e, !0),
                i.timeout = n.config.request_timeout,
                i.setRequestHeader("Accept", "application/jrd+json, application/json"),
                i.send();
            }
            return u();
          },
          u.prototype.__isValidJSON = function(e) {
            try {
              JSON.parse(e);
            } catch (e) {
              return !1;
            }
            return !0;
          },
          u.prototype.__isLocalhost = function(e) {
            return /^localhost(\.localdomain)?(\:[0-9]+)?$/.test(e);
          },
          u.prototype.__processJRD = function(e, t, r, n) {
            var s = JSON.parse(t);
            if ("object" != typeof s || "object" != typeof s.links) {return void 0 !== s.error
                ? r(a({ message: s.error, request: e }))
                : r(a({ message: "unknown response from server", request: e }));}
            var u = s.links;
            Array.isArray(u) || (u = []);
            var c = { object: s, json: t, idx: {} };
            c.idx.properties = { name: void 0 },
              c.idx.links = JSON.parse(JSON.stringify(i)),
              u.map(function(e, t) {
                if (o.hasOwnProperty(e.rel) && c.idx.links[o[e.rel]]) {
                  var r = {};
                  Object.keys(e).map(function(t, n) {
                    r[t] = e[t];
                  }), c.idx.links[o[e.rel]].push(r);
                }
              });
            var h = JSON.parse(t).properties;
            for (var l in h) {h.hasOwnProperty(l) && "http://packetizer.com/ns/name" === l
                && (c.idx.properties.name = h[l]);}
            return n(c);
          },
          u.prototype.lookup = function(e, t) {
            if ("string" != typeof e) throw new Error("first parameter must be a user address");
            if ("function" != typeof t) throw new Error("second parameter must be a callback");
            var r = this, n = "";
            n = e.indexOf("://") > -1 ? e.replace(/ /g, "").split("/")[2] : e.replace(/ /g, "").split("@")[1];
            var o = 0, i = "https";
            function a() {
              var t = "";
              return e.split("://")[1] || (t = "acct:"), i + "://" + n + "/.well-known/" + s[o] + "?resource=" + t + e;
            }
            function u(e) {
              if (r.config.uri_fallback && "webfist.org" !== n && o !== s.length - 1) return o += 1, c();
              if (!r.config.tls_only && "https" === i) return o = 0, i = "http", c();
              if (!r.config.webfist_fallback || "webfist.org" === n) return t(e);
              o = 0, i = "http", n = "webfist.org";
              var u = a();
              r.__fetchJRD(u, t, function(e) {
                r.__processJRD(u, e, t, function(e) {
                  "object" == typeof e.idx.links.webfist && "string" == typeof e.idx.links.webfist[0].href
                    && r.__fetchJRD(e.idx.links.webfist[0].href, t, function(e) {
                      r.__processJRD(u, e, t, function(e) {
                        return t(null, t);
                      });
                    });
                });
              });
            }
            function c() {
              var e = a();
              r.__fetchJRD(e, u, function(n) {
                r.__processJRD(e, n, t, function(e) {
                  t(null, e);
                });
              });
            }
            return r.__isLocalhost(n) && (i = "http"), setTimeout(c, 0);
          },
          u.prototype.lookupLink = function(e, t, r) {
            if (!i.hasOwnProperty(t)) return r("unsupported rel " + t);
            this.lookup(e, function(e, n) {
              var o = n.idx.links[t];
              return e ? r(e) : 0 === o.length ? r("no links found with rel=\"" + t + "\"") : r(null, o[0]);
            });
          },
          void 0 === (n = function() {
              return u;
            }.apply(t, [])) || (e.exports = n);
      }();
  }, function(e, t) {
    e.exports = XMLHttpRequest;
  }, function(e, t, r) {
    "use strict";
    var n = this && this.__importDefault || function(e) {
      return e && e.__esModule ? e : { default: e };
    };
    const o = n(r(3)),
      i = n(r(16)),
      s = n(r(1)),
      a = r(0),
      u = n(r(30)),
      c = n(r(11)),
      h = n(r(6)),
      l = n(r(15)),
      d = n(r(7)),
      f = n(r(13)),
      p = n(r(14)),
      m = n(r(8)),
      g = n(r(31)),
      y = n(r(12)),
      v = n(r(32)),
      _ = n(r(33)),
      b = n(r(34)),
      w = {
        features: [],
        featuresDone: 0,
        readyFired: !1,
        loadFeatures() {
          this.features = [],
            this.featuresDone = 0,
            this.readyFired = !1,
            this.featureModules = {
              WireClient: m.default,
              Dropbox: p.default,
              GoogleDrive: f.default,
              Access: c.default,
              Discover: l.default,
              Authorize: h.default,
              BaseClient: d.default,
              Env: i.default,
            },
            o.default.cache
            && a.extend(this.featureModules, {
              Caching: y.default,
              IndexedDB: v.default,
              LocalStorage: _.default,
              InMemoryStorage: b.default,
              Sync: g.default,
            }),
            o.default.disableFeatures.forEach(e => {
              this.featureModules[e] && delete this.featureModules[e];
            }),
            this._allLoaded = !1;
          for (const e in this.featureModules) this.loadFeature(e);
        },
        hasFeature(e) {
          for (let t = this.features.length - 1; t >= 0; t--) {if (this.features[t].name === e) {return this.features[t]
                .supported;}}
          return !1;
        },
        loadFeature(e) {
          const t = this.featureModules[e], r = !t._rs_supported || t._rs_supported();
          s.default(`[RemoteStorage] [FEATURE ${e}] initializing ...`),
            "object" == typeof r
              ? r.then(() => {
                this.featureSupported(e, !0), this.initFeature(e);
              }, () => {
                this.featureSupported(e, !1);
              })
              : "boolean" == typeof r
              ? (this.featureSupported(e, r), r && this.initFeature(e))
              : this.featureSupported(e, !1);
        },
        initFeature(e) {
          const t = this.featureModules[e];
          let r;
          try {
            r = t._rs_init(this);
          } catch (t) {
            return void this.featureFailed(e, t);
          }
          "object" == typeof r && "function" == typeof r.then
            ? r.then(() => {
              this.featureInitialized(e);
            }, t => {
              this.featureFailed(e, t);
            })
            : this.featureInitialized(e);
        },
        featureFailed(e, t) {
          s.default(`[RemoteStorage] [FEATURE ${e}] initialization failed (${t})`), this.featureDone();
        },
        featureSupported(e, t) {
          s.default(`[RemoteStorage] [FEATURE ${e}]${t ? "" : "not "} supported`), t || this.featureDone();
        },
        featureInitialized(e) {
          s.default(`[RemoteStorage] [FEATURE ${e}] initialized`),
            this.features.push({
              name: e,
              init: this.featureModules[e]._rs_init,
              supported: !0,
              cleanup: this.featureModules[e]._rs_cleanup,
            }),
            this.featureDone();
        },
        featureDone() {
          this.featuresDone++,
            this.featuresDone === Object.keys(this.featureModules).length
            && setTimeout(this.featuresLoaded.bind(this), 0);
        },
        _setCachingModule() {
          ["IndexedDB", "LocalStorage", "InMemoryStorage"].some(e => {
            if (this.features.some(t => t.name === e)) return this.features.local = this.featureModules[e], !0;
          });
        },
        _fireReady() {
          try {
            this.readyFired || (this._emit("ready"), this.readyFired = !0);
          } catch (e) {
            console.error("'ready' failed: ", e, e.stack), this._emit("error", e);
          }
        },
        featuresLoaded() {
          s.default("[RemoteStorage] All features loaded"),
            this._setCachingModule(),
            this.local = o.default.cache && this.features.local && new this.features.local(),
            this.local && this.remote
              ? (this._setGPD(u.default, this), this._bindChange(this.local))
              : this.remote && this._setGPD(this.remote, this.remote),
            this.remote && (this.remote.on("connected", () => {
              this._fireReady(), this._emit("connected");
            }),
              this.remote.on("not-connected", () => {
                this._fireReady(), this._emit("not-connected");
              }),
              this.remote.connected && (this._fireReady(), this._emit("connected")),
              this.hasFeature("Authorize") || this.remote.stopWaitingForToken()),
            this._collectCleanupFunctions();
          try {
            this._allLoaded = !0, this._emit("features-loaded");
          } catch (e) {
            a.logError(e), this._emit("error", e);
          }
          this._processPending();
        },
        _collectCleanupFunctions() {
          this._cleanups = [];
          for (let e = 0; e < this.features.length; e++) {
            const t = this.features[e].cleanup;
            "function" == typeof t && this._cleanups.push(t);
          }
        },
      };
    e.exports = w;
  }, function(e, t, r) {
    "use strict";
    var n = this && this.__awaiter || function(e, t, r, n) {
      return new (r || (r = Promise))(function(o, i) {
        function s(e) {
          try {
            u(n.next(e));
          } catch (e) {
            i(e);
          }
        }
        function a(e) {
          try {
            u(n.throw(e));
          } catch (e) {
            i(e);
          }
        }
        function u(e) {
          var t;
          e.done ? o(e.value) : (t = e.value,
            t instanceof r ? t : new r(function(e) {
              e(t);
            })).then(s, a);
        }
        u((n = n.apply(e, t || [])).next());
      });
    };
    const o = (this && this.__importDefault || function(e) {
      return e && e.__esModule ? e : { default: e };
    })(r(1));
    function i(e) {
      return "dropbox" === this.backend && !!e.match(/^\/public\/.*[^\/]$/);
    }
    const s = {
      get: function(e, t) {
        if (this.local) {
          if (void 0 === t) {
            t = "object" == typeof (r = this).remote && r.remote.connected && r.remote.online
              ? 2 * r.getSyncInterval()
              : (o.default("Not setting default maxAge, because remote is offline or not connected"), !1);
          } else if ("number" != typeof t && !1 !== t) {return Promise.reject(
              "Argument 'maxAge' must be 'false' or a number",
            );}
          return this.local.get(e, t, this.sync.queueGetRequest.bind(this.sync));
        }
        return this.remote.get(e);
        var r;
      },
      put: function(e, t, r) {
        return i.bind(this)(e)
          ? s._wrapBusyDone.call(this, this.remote.put(e, t, r))
          : this.local
          ? this.local.put(e, t, r)
          : s._wrapBusyDone.call(this, this.remote.put(e, t, r));
      },
      delete: function(e) {
        return this.local ? this.local.delete(e) : s._wrapBusyDone.call(this, this.remote.delete(e));
      },
      _wrapBusyDone: function(e) {
        return n(this, void 0, void 0, function*() {
          return this._emit("wire-busy"),
            e.then(
              e => (this._emit("wire-done", { success: !0 }), Promise.resolve(e)),
              e => (this._emit("wire-done", { success: !1 }), Promise.reject(e)),
            );
        });
      },
    };
    e.exports = s;
  }, function(e, t, r) {
    "use strict";
    var n = this && this.__awaiter || function(e, t, r, n) {
        return new (r || (r = Promise))(function(o, i) {
          function s(e) {
            try {
              u(n.next(e));
            } catch (e) {
              i(e);
            }
          }
          function a(e) {
            try {
              u(n.throw(e));
            } catch (e) {
              i(e);
            }
          }
          function u(e) {
            var t;
            e.done ? o(e.value) : (t = e.value,
              t instanceof r ? t : new r(function(e) {
                e(t);
              })).then(s, a);
          }
          u((n = n.apply(e, t || [])).next());
        });
      },
      o = this && this.__importDefault || function(e) {
        return e && e.__esModule ? e : { default: e };
      };
    const i = o(r(3)), s = o(r(16)), a = o(r(2)), u = o(r(1)), c = o(r(6)), h = o(r(9)), l = o(r(4)), d = r(0);
    let f, p;
    function m(e, t, r) {
      return { action: e, path: t, promise: r };
    }
    function g(e, t) {
      return e.common.revision !== t && (!e.remote || e.remote.revision !== t);
    }
    function y(e) {
      return e.common && e.common.revision;
    }
    class v {
      constructor(e) {
        this.rs = e,
          this._tasks = {},
          this._running = {},
          this._timeStarted = {},
          this.numThreads = 10,
          this.rs.local.onDiff(e => {
            this.addTask(e), this.doTasks();
          }),
          this.rs.caching.onActivate(e => {
            this.addTask(e), this.doTasks();
          }),
          this.addEvents(["done", "req-done"]);
      }
      now() {
        return (new Date()).getTime();
      }
      queueGetRequest(e) {
        return new Promise((t, r) => {
          this.rs.remote.connected
            ? this.rs.remote.online
              ? (this.addTask(
                e,
                function() {
                  this.rs.local.get(e).then(e => t(e));
                }.bind(this),
              ),
                this.doTasks())
              : r("cannot fulfill maxAge requirement - remote is not online")
            : r("cannot fulfill maxAge requirement - remote is not connected");
        });
      }
      corruptServerItemsMap(e, t) {
        if ("object" != typeof e || Array.isArray(e)) return !0;
        for (const r in e) {
          const n = e[r];
          if ("object" != typeof n) return !0;
          if ("string" != typeof n.ETag) return !0;
          if (d.isFolder(r)) if (-1 !== r.substring(0, r.length - 1).indexOf("/")) return !0;
          else {
            if (-1 !== r.indexOf("/")) return !0;
            if (t) {
              if ("string" != typeof n["Content-Type"]) return !0;
              if ("number" != typeof n["Content-Length"]) return !0;
            }
          }
        }
        return !1;
      }
      corruptItemsMap(e) {
        if ("object" != typeof e || Array.isArray(e)) return !0;
        for (const t in e) if ("boolean" != typeof e[t]) return !0;
        return !1;
      }
      corruptRevision(e) {
        return "object" != typeof e || Array.isArray(e) || e.revision && "string" != typeof e.revision
          || e.body && "string" != typeof e.body && "object" != typeof e.body
          || e.contentType && "string" != typeof e.contentType || e.contentLength && "number" != typeof e.contentLength
          || e.timestamp && "number" != typeof e.timestamp || e.itemsMap && this.corruptItemsMap(e.itemsMap);
      }
      isCorrupt(e) {
        return "object" != typeof e || Array.isArray(e) || "string" != typeof e.path || this.corruptRevision(e.common)
          || e.local && this.corruptRevision(e.local) || e.remote && this.corruptRevision(e.remote)
          || e.push && this.corruptRevision(e.push);
      }
      hasTasks() {
        return Object.getOwnPropertyNames(this._tasks).length > 0;
      }
      collectDiffTasks() {
        return n(this, void 0, void 0, function*() {
          let e = 0;
          return this.rs.local.forAllNodes(t => {
            e > 100 || (this.isCorrupt(t)
              ? (u.default("[Sync] WARNING: corrupt node in local cache", t),
                "object" == typeof t && t.path && (this.addTask(t.path), e++))
              : (this.needsFetch(t) && this.rs.access.checkPathPermission(t.path, "r")
                || d.isDocument(t.path) && this.needsPush(t) && this.rs.access.checkPathPermission(t.path, "rw"))
                && (this.addTask(t.path), e++));
          }).then(() => e).catch(e => {
            throw e;
          });
        });
      }
      inConflict(e) {
        return e.local && e.remote && (void 0 !== e.remote.body || e.remote.itemsMap);
      }
      needsRefresh(e) {
        return !!e.common && (!e.common.timestamp || this.now() - e.common.timestamp > i.default.syncInterval);
      }
      needsFetch(e) {
        return !!this.inConflict(e)
          || (!(!e.common || void 0 !== e.common.itemsMap || void 0 !== e.common.body)
            || !(!e.remote || void 0 !== e.remote.itemsMap || void 0 !== e.remote.body));
      }
      needsPush(e) {
        return !this.inConflict(e) && (!(!e.local || e.push) || void 0);
      }
      needsRemotePut(e) {
        return e.local && e.local.body;
      }
      needsRemoteDelete(e) {
        return e.local && !1 === e.local.body;
      }
      getParentPath(e) {
        const t = e.match(/^(.*\/)([^\/]+\/?)$/);
        if (t) return t[1];
        throw new Error("Not a valid path: \"" + e + "\"");
      }
      deleteChildPathsFromTasks() {
        for (const e in this._tasks) {
          const t = d.pathsFromRoot(e);
          for (let r = 1; r < t.length; r++) {this._tasks[t[r]]
              && (Array.isArray(this._tasks[e]) && this._tasks[e].length
                && Array.prototype.push.apply(this._tasks[t[r]], this._tasks[e]),
                delete this._tasks[e]);}
        }
      }
      collectRefreshTasks() {
        return n(this, void 0, void 0, function*() {
          return this.rs.local.forAllNodes(e => {
            let t;
            if (this.needsRefresh(e)) {
              try {
                t = this.getParentPath(e.path);
              } catch (e) {}
              t && this.rs.access.checkPathPermission(t, "r")
                ? this.addTask(t)
                : this.rs.access.checkPathPermission(e.path, "r") && this.addTask(e.path);
            }
          }).then(() => this.deleteChildPathsFromTasks()).catch(e => {
            throw e;
          });
        });
      }
      flush(e) {
        for (const t in e) {"FLUSH" === this.rs.caching.checkPath(t) && e[t] && !e[t].local
            && (u.default("[Sync] Flushing", t), e[t] = void 0);}
        return e;
      }
      doTask(e) {
        return this.rs.local.getNodes([e]).then(t => {
          const r = t[e];
          return void 0 === r || function(e) {
              return e.remote && e.remote.revision && !e.remote.itemsMap && !e.remote.body;
            }(r)
            ? m("get", e, this.rs.remote.get(e))
            : this.needsRemotePut(r)
            ? (r.push = d.deepClone(r.local),
              r.push.timestamp = this.now(),
              this.rs.local.setNodes(this.flush(t)).then(() => {
                let t;
                return t = y(r) ? { ifMatch: r.common.revision } : { ifNoneMatch: "*" },
                  m("put", e, this.rs.remote.put(e, r.push.body, r.push.contentType, t));
              }))
            : this.needsRemoteDelete(r)
            ? (r.push = { body: !1, timestamp: this.now() },
              this.rs.local.setNodes(this.flush(t)).then(() =>
                y(r)
                  ? m("delete", e, this.rs.remote.delete(e, { ifMatch: r.common.revision }))
                  : m("get", e, this.rs.remote.get(e))
              ))
            : y(r)
            ? m("get", e, this.rs.remote.get(e, { ifNoneMatch: r.common.revision }))
            : m("get", e, this.rs.remote.get(e));
        });
      }
      autoMergeFolder(e) {
        if (e.remote.itemsMap && (e.common = e.remote, delete e.remote, e.common.itemsMap)) {
          for (const t in e.common.itemsMap) e.local.itemsMap[t] || (e.local.itemsMap[t] = !1);
          d.equal(e.local.itemsMap, e.common.itemsMap) && delete e.local;
        }
        return e;
      }
      autoMergeDocument(e) {
        return !function(e) {
            return (!e.remote || !e.remote.revision || e.remote.revision === e.common.revision)
              && (void 0 === e.common.body && !1 === e.remote.body
                || e.remote.body === e.common.body && e.remote.contentType === e.common.contentType);
          }(e)
          ? void 0 !== e.remote.body
            && (u.default("[Sync] Emitting keep/revert"),
              this.rs.local._emitChange({
                origin: "conflict",
                path: e.path,
                oldValue: e.local.body,
                newValue: e.remote.body,
                lastCommonValue: e.common.body,
                oldContentType: e.local.contentType,
                newContentType: e.remote.contentType,
                lastCommonContentType: e.common.contentType,
              }),
              e.remote.body ? e.common = e.remote : e.common = {},
              delete e.remote,
              delete e.local)
          : delete (e = function(e) {
            return e.remote && !1 === e.remote.body && e.local && !1 === e.local.body && delete e.local, e;
          }(e)).remote,
          e;
      }
      autoMerge(e) {
        if (e.remote) {
          if (e.local) return d.isFolder(e.path) ? this.autoMergeFolder(e) : this.autoMergeDocument(e);
          if (d.isFolder(e.path)) void 0 !== e.remote.itemsMap && (e.common = e.remote, delete e.remote);
          else if (void 0 !== e.remote.body) {
            const t = {
              origin: "remote",
              path: e.path,
              oldValue: !1 === e.common.body ? void 0 : e.common.body,
              newValue: !1 === e.remote.body ? void 0 : e.remote.body,
              oldContentType: e.common.contentType,
              newContentType: e.remote.contentType,
            };
            if ((t.oldValue || t.newValue) && this.rs.local._emitChange(t), !e.remote.body) return;
            e.common = e.remote, delete e.remote;
          }
          return e;
        }
        e.common.body
          && this.rs.local._emitChange({
            origin: "remote",
            path: e.path,
            oldValue: e.common.body,
            newValue: void 0,
            oldContentType: e.common.contentType,
            newContentType: void 0,
          });
      }
      updateCommonTimestamp(e, t) {
        return n(this, void 0, void 0, function*() {
          return this.rs.local.getNodes([e]).then(
            r => (r[e] && r[e].common && r[e].common.revision === t && (r[e].common.timestamp = this.now()),
              this.rs.local.setNodes(this.flush(r)))
          );
        });
      }
      markChildren(e, t, r, o) {
        return n(this, void 0, void 0, function*() {
          const n = [], i = {}, s = {};
          for (const r in t) n.push(e + r), i[e + r] = t[r];
          for (const t in o) n.push(e + t);
          return this.rs.local.getNodes(n).then(t => {
            let n, a;
            for (const u in t) {
              if (a = t[u], i[u]) {
                a && a.common
                  ? g(a, i[u].ETag)
                    && (r[u] = d.deepClone(a),
                      r[u].remote = { revision: i[u].ETag, timestamp: this.now() },
                      r[u] = this.autoMerge(r[u]))
                  : (n = this.rs.caching.checkPath(u),
                    "ALL" === n
                    && (r[u] = {
                      path: u,
                      common: { timestamp: this.now() },
                      remote: { revision: i[u].ETag, timestamp: this.now() },
                    })),
                  r[u] && i[u]["Content-Type"] && (r[u].remote.contentType = i[u]["Content-Type"]),
                  r[u] && i[u]["Content-Length"] && (r[u].remote.contentLength = i[u]["Content-Length"]);
              } else if (o[u.substring(e.length)] && a && a.common) {
                if (a.common.itemsMap) for (const e in a.common.itemsMap) s[u + e] = !0;
                if (a.local && a.local.itemsMap) for (const e in a.local.itemsMap) s[u + e] = !0;
                if (a.remote || d.isFolder(u)) r[u] = void 0;
                else if (r[u] = this.autoMerge(a), void 0 === r[u]) {
                  const t = this.getParentPath(u), n = r[t], o = u.substring(e.length);
                  n && n.local
                    && (delete n.local.itemsMap[o], d.equal(n.local.itemsMap, n.common.itemsMap) && delete n.local);
                }
              }
            }
            return this.deleteRemoteTrees(Object.keys(s), r).then(e => this.rs.local.setNodes(this.flush(e)));
          });
        });
      }
      deleteRemoteTrees(e, t) {
        return n(this, void 0, void 0, function*() {
          return 0 === e.length
            ? Promise.resolve(t)
            : this.rs.local.getNodes(e).then(e =>
              n(this, void 0, void 0, function*() {
                const r = {};
                function n(e, t) {
                  if (e && e.itemsMap) for (const n in e.itemsMap) r[t + n] = !0;
                }
                for (const r in e) {
                  const o = e[r];
                  o && (d.isFolder(r)
                    ? (n(o.common, r), n(o.local, r))
                    : o.common && void 0 !== typeof o.common.body
                      && (t[r] = d.deepClone(o),
                        t[r].remote = { body: !1, timestamp: this.now() },
                        t[r] = this.autoMerge(t[r])));
                }
                return this.deleteRemoteTrees(Object.keys(r), t).then(e => this.rs.local.setNodes(this.flush(e)));
              })
            );
        });
      }
      completeFetch(e, t, r, o) {
        return n(this, void 0, void 0, function*() {
          let n, i;
          const s = d.pathsFromRoot(e);
          return d.isFolder(e) ? n = [e] : (i = s[1], n = [e, i]),
            this.rs.local.getNodes(n).then(n => {
              let s, a, u = n[e];
              const c = {};
              function h(e) {
                if (e && e.itemsMap) for (s in e.itemsMap) t[s] || (c[s] = !0);
              }
              if (
                "object" == typeof u && u.path === e && "object" == typeof u.common
                || (u = { path: e, common: {} }, n[e] = u),
                  u.remote = { revision: o, timestamp: this.now() },
                  d.isFolder(e)
              ) {
                for (s in h(u.common), h(u.remote), u.remote.itemsMap = {}, t) u.remote.itemsMap[s] = !0;
              } else {
                u.remote.body = t,
                  u.remote.contentType = r,
                  a = n[i],
                  a && a.local && a.local.itemsMap
                  && (s = e.substring(i.length),
                    a.local.itemsMap[s] = !0,
                    d.equal(a.local.itemsMap, a.common.itemsMap) && delete a.local);
              }
              return n[e] = this.autoMerge(u), { toBeSaved: n, missingChildren: c };
            });
        });
      }
      completePush(e, t, r, o) {
        return n(this, void 0, void 0, function*() {
          return this.rs.local.getNodes([e]).then(n => {
            const i = n[e];
            if (!i.push) throw this.stopped = !0, new Error("completePush called but no push version!");
            return r
              ? (u.default("[Sync] We have a conflict"),
                i.remote && i.remote.revision === o
                || (i.remote = { revision: o || "conflict", timestamp: this.now() }, delete i.push),
                n[e] = this.autoMerge(i))
              : (i.common = { revision: o, timestamp: this.now() },
                "put" === t
                  ? (i.common.body = i.push.body,
                    i.common.contentType = i.push.contentType,
                    d.equal(i.local.body, i.push.body) && i.local.contentType === i.push.contentType && delete i.local,
                    delete i.push)
                  : "delete" === t && (!1 === i.local.body ? n[e] = void 0 : delete i.push)),
              this.rs.local.setNodes(this.flush(n));
          });
        });
      }
      dealWithFailure(e) {
        return n(this, void 0, void 0, function*() {
          return this.rs.local.getNodes([e]).then(t => {
            if (t[e]) return delete t[e].push, this.rs.local.setNodes(this.flush(t));
          });
        });
      }
      interpretStatus(e) {
        const t = {
          statusCode: e,
          successful: void 0,
          conflict: void 0,
          unAuth: void 0,
          notFound: void 0,
          changed: void 0,
          networkProblems: void 0,
        };
        if ("string" == typeof e && ("offline" === e || "timeout" === e)) {return t.successful = !1,
            t.networkProblems = !0,
            t;}
        if ("number" == typeof e) {
          const r = Math.floor(e / 100);
          return t.successful = 2 === r || 304 === e || 412 === e || 404 === e,
            t.conflict = 412 === e,
            t.unAuth = 401 === e && this.rs.remote.token !== c.default.IMPLIED_FAKE_TOKEN || 402 === e || 403 === e,
            t.notFound = 404 === e,
            t.changed = 304 !== e,
            t;
        }
      }
      handleGetResponse(e, t, r, o, i) {
        return n(this, void 0, void 0, function*() {
          return t.notFound && (r = !!d.isFolder(e) && {}),
            t.changed
              ? this.completeFetch(e, r, o, i).then(t =>
                d.isFolder(e)
                  ? this.corruptServerItemsMap(r)
                    ? (u.default("[Sync] WARNING: Discarding corrupt folder description from server for " + e), !1)
                    : this.markChildren(e, r, t.toBeSaved, t.missingChildren).then(() => !0)
                  : this.rs.local.setNodes(this.flush(t.toBeSaved)).then(() => !0)
              )
              : this.updateCommonTimestamp(e, i).then(() => !0);
        });
      }
      handleResponse(e, t, r) {
        const n = this.interpretStatus(r.statusCode);
        if (n.successful) {
          if ("get" === t) return this.handleGetResponse(e, n, r.body, r.contentType, r.revision);
          if ("put" === t || "delete" === t) {
            return this.completePush(e, t, n.conflict, r.revision).then(function() {
              return !0;
            });
          }
          throw new Error("cannot handle response for unknown action " + t);
        }
        {
          let t;
          return t = n.unAuth
            ? new l.default()
            : n.networkProblems
            ? new h.default("Network request failed.")
            : new Error("HTTP response code " + n.statusCode + " received."),
            this.dealWithFailure(e).then(() => {
              throw this.rs._emit("error", t), t;
            });
        }
      }
      finishTask(e) {
        if (void 0 !== e.action) {
          return e.promise.then(
            t => this.handleResponse(e.path, e.action, t),
            t => (u.default("[Sync] wireclient rejects its promise!", e.path, e.action, t),
              this.handleResponse(e.path, e.action, { statusCode: "offline" })),
          ).then(t => {
            if (delete this._timeStarted[e.path], delete this._running[e.path], t && this._tasks[e.path]) {
              for (let t = 0; t < this._tasks[e.path].length; t++) this._tasks[e.path][t]();
              delete this._tasks[e.path];
            }
            this.rs._emit("sync-req-done"),
              this.collectTasks(!1).then(() => {
                !this.hasTasks() || this.stopped
                  ? (u.default(
                    "[Sync] Sync is done! Reschedule?",
                    Object.getOwnPropertyNames(this._tasks).length,
                    this.stopped,
                  ),
                    this.done || (this.done = !0, this.rs._emit("sync-done")))
                  : setTimeout(() => {
                    this.doTasks();
                  }, 10);
              });
          }, t => {
            u.default("[Sync] Error", t),
              delete this._timeStarted[e.path],
              delete this._running[e.path],
              this.rs._emit("sync-req-done"),
              this.done || (this.done = !0, this.rs._emit("sync-done"));
          });
        }
        delete this._running[e.path];
      }
      doTasks() {
        let e, t, r = 0;
        e = this.rs.remote.connected ? this.rs.remote.online ? this.numThreads : 1 : 0;
        const n = e - Object.getOwnPropertyNames(this._running).length;
        if (n <= 0) return !0;
        for (t in this._tasks) {
          if (
            !this._running[t]
            && (this._timeStarted[t] = this.now(),
              this._running[t] = this.doTask(t),
              this._running[t].then(this.finishTask.bind(this)),
              r++,
              r >= n)
          ) {
            return !0;
          }
        }
        return r >= n;
      }
      collectTasks(e) {
        return n(this, void 0, void 0, function*() {
          return this.hasTasks() || this.stopped
            ? Promise.resolve()
            : this.collectDiffTasks().then(
              t => t || !1 === e ? Promise.resolve() : this.collectRefreshTasks(),
              function(e) {
                throw e;
              },
            );
        });
      }
      addTask(e, t) {
        this._tasks[e] || (this._tasks[e] = []), "function" == typeof t && this._tasks[e].push(t);
      }
      sync() {
        return this.done = !1,
          this.doTasks() ? Promise.resolve() : this.collectTasks().then(() => {
            try {
              this.doTasks();
            } catch (e) {
              u.default("[Sync] doTasks error", e);
            }
          }, function(e) {
            throw u.default("[Sync] Sync error", e), new Error("Local cache unavailable");
          });
      }
      static _rs_init(e) {
        f = function() {
          u.default("[Sync] syncCycleCb calling syncCycle");
          const t = new s.default();
          t.isBrowser() && function(e, t) {
            function r(e) {
              const r = t.getCurrentSyncInterval();
              i.default.isBackground = !e;
              const n = t.getCurrentSyncInterval();
              t._emit("sync-interval-change", { oldValue: r, newValue: n });
            }
            e.on("background", () => r(!1)), e.on("foreground", () => r(!0));
          }(t, e),
            e.sync
            || (e.sync = new v(e),
              e.syncStopped
              && (u.default("[Sync] Instantiating sync stopped"), e.sync.stopped = !0, delete e.syncStopped)),
            u.default("[Sync] syncCycleCb calling syncCycle"),
            e.syncCycle();
        },
          p = function() {
            e.removeEventListener("connected", p), e.startSync();
          },
          e.on("ready", f),
          e.on("connected", p);
      }
      static _rs_cleanup(e) {
        e.stopSync(),
          e.removeEventListener("ready", f),
          e.removeEventListener("connected", p),
          e.sync = void 0,
          delete e.sync;
      }
    }
    d.applyMixins(v, [a.default]), e.exports = v;
  }, function(e, t, r) {
    "use strict";
    (function(t) {
      var n = this && this.__awaiter || function(e, t, r, n) {
          return new (r || (r = Promise))(function(o, i) {
            function s(e) {
              try {
                u(n.next(e));
              } catch (e) {
                i(e);
              }
            }
            function a(e) {
              try {
                u(n.throw(e));
              } catch (e) {
                i(e);
              }
            }
            function u(e) {
              var t;
              e.done ? o(e.value) : (t = e.value,
                t instanceof r ? t : new r(function(e) {
                  e(t);
                })).then(s, a);
            }
            u((n = n.apply(e, t || [])).next());
          });
        },
        o = this && this.__importDefault || function(e) {
          return e && e.__esModule ? e : { default: e };
        };
      const i = o(r(2)), s = o(r(10)), a = o(r(1)), u = r(0);
      let c;
      class h extends s.default {
        constructor(e) {
          super(),
            this.addEvents(["change", "local-events-done"]),
            this.db = e || c,
            this.db
              ? (this.getsRunning = 0,
                this.putsRunning = 0,
                this.changesQueued = {},
                this.changesRunning = {},
                this.commitSlownessWarning = null)
              : a.default("[IndexedDB] Failed to open DB");
        }
        getNodes(e) {
          return n(this, void 0, void 0, function*() {
            const t = [], r = {};
            for (let n = 0, o = e.length; n < o; n++) {
              void 0 !== this.changesQueued[e[n]]
                ? r[e[n]] = u.deepClone(this.changesQueued[e[n]] || void 0)
                : void 0 !== this.changesRunning[e[n]]
                ? r[e[n]] = u.deepClone(this.changesRunning[e[n]] || void 0)
                : t.push(e[n]);
            }
            return t.length > 0
              ? this.getNodesFromDb(t).then(function(e) {
                for (const t in r) e[t] = r[t];
                return e;
              })
              : Promise.resolve(r);
          });
        }
        setNodes(e) {
          return n(this, void 0, void 0, function*() {
            for (const t in e) this.changesQueued[t] = e[t] || !1;
            return this.maybeFlush(), Promise.resolve();
          });
        }
        maybeFlush() {
          0 === this.putsRunning
            ? this.flushChangesQueued()
            : this.commitSlownessWarning || (this.commitSlownessWarning = t.setInterval(function() {
              console.warn("WARNING: waited more than 10 seconds for previous commit to finish");
            }, 1e4));
        }
        flushChangesQueued() {
          this.commitSlownessWarning && (clearInterval(this.commitSlownessWarning), this.commitSlownessWarning = null),
            Object.keys(this.changesQueued).length > 0
            && (this.changesRunning = this.changesQueued,
              this.changesQueued = {},
              this.setNodesInDb(this.changesRunning).then(this.flushChangesQueued.bind(this)));
        }
        getNodesFromDb(e) {
          return new Promise((t, r) => {
            const n = this.db.transaction(["nodes"], "readonly"), o = n.objectStore("nodes"), i = {};
            this.getsRunning++,
              e.map(e => {
                o.get(e).onsuccess = t => {
                  i[e] = t.target.result;
                };
              }),
              n.oncomplete = () => {
                t(i), this.getsRunning--;
              },
              n.onerror = n.onabort = () => {
                r("get transaction error/abort"), this.getsRunning--;
              };
          });
        }
        setNodesInDb(e) {
          return n(this, void 0, void 0, function*() {
            return new Promise((t, r) => {
              const n = this.db.transaction(["nodes"], "readwrite"),
                o = n.objectStore("nodes"),
                i = (new Date()).getTime();
              this.putsRunning++, a.default("[IndexedDB] Starting put", e, this.putsRunning);
              for (const t in e) {
                const r = e[t];
                if ("object" == typeof r) {
                  try {
                    o.put(r);
                  } catch (e) {
                    throw a.default("[IndexedDB] Error while putting", r, e), e;
                  }
                } else {
                  try {
                    o.delete(t);
                  } catch (e) {
                    throw a.default("[IndexedDB] Error while removing", o, r, e), e;
                  }
                }
              }
              n.oncomplete = () => {
                this.putsRunning--,
                  a.default("[IndexedDB] Finished put", e, this.putsRunning, (new Date()).getTime() - i + "ms"),
                  t();
              },
                n.onerror = () => {
                  this.putsRunning--, r("transaction error");
                },
                n.onabort = () => {
                  r("transaction abort"), this.putsRunning--;
                };
            });
          });
        }
        reset(e) {
          const t = this.db.name;
          this.db.close(),
            h.clean(this.db.name, () => {
              h.open(t, (t, r) => {
                t ? a.default("[IndexedDB] Error while resetting local storage", t) : this.db = r,
                  "function" == typeof e && e(self);
              });
            });
        }
        forAllNodes(e) {
          return n(this, void 0, void 0, function*() {
            return new Promise(t => {
              this.db.transaction(["nodes"], "readonly").objectStore("nodes").openCursor().onsuccess = r => {
                const n = r.target.result;
                n ? (e(this.migrate(n.value)), n.continue()) : t();
              };
            });
          });
        }
        closeDB() {
          0 === this.putsRunning ? this.db.close() : setTimeout(this.closeDB.bind(this), 100);
        }
        static open(e, t) {
          const r = setTimeout(function() {
            t("timeout trying to open db");
          }, 1e4);
          try {
            const n = indexedDB.open(e, 2);
            n.onerror = function() {
              a.default("[IndexedDB] Opening DB failed", n), clearTimeout(r), t(n.error);
            },
              n.onupgradeneeded = function(e) {
                const t = n.result;
                a.default("[IndexedDB] Upgrade: from ", e.oldVersion, " to ", e.newVersion),
                  1 !== e.oldVersion
                  && (a.default("[IndexedDB] Creating object store: nodes"),
                    t.createObjectStore("nodes", { keyPath: "path" })),
                  a.default("[IndexedDB] Creating object store: changes"),
                  t.createObjectStore("changes", { keyPath: "path" });
              },
              n.onsuccess = function() {
                clearTimeout(r);
                const o = n.result;
                if (!o.objectStoreNames.contains("nodes") || !o.objectStoreNames.contains("changes")) {
                  return a.default("[IndexedDB] Missing object store. Resetting the database."),
                    void h.clean(e, function() {
                      h.open(e, t);
                    });
                }
                t(null, n.result);
              };
          } catch (n) {
            a.default("[IndexedDB] Failed to open database: " + n),
              a.default("[IndexedDB] Resetting database and trying again."),
              clearTimeout(r),
              h.clean(e, function() {
                h.open(e, t);
              });
          }
        }
        static clean(e, t) {
          const r = indexedDB.deleteDatabase(e);
          r.onsuccess = function() {
            a.default("[IndexedDB] Done removing DB"), t();
          },
            r.onerror = r.onabort = function(t) {
              console.error("Failed to remove database \"" + e + "\"", t);
            };
        }
        static _rs_init(e) {
          return new Promise((t, r) => {
            h.open("remotestorage", function(n, o) {
              n ? r(n) : (c = o,
                o.onerror = () => {
                  e._emit("error", n);
                },
                t());
            });
          });
        }
        static _rs_supported() {
          return new Promise((e, t) => {
            const r = u.getGlobalContext();
            let n = !1;
            if (
              "undefined" != typeof navigator && navigator.userAgent.match(/Android (2|3|4\.[0-3])/)
              && (navigator.userAgent.match(/Chrome|Firefox/) || (n = !0)), "indexedDB" in r && !n
            ) {
              try {
                const r = indexedDB.open("rs-check");
                r.onerror = function() {
                  t();
                },
                  r.onsuccess = function() {
                    r.result.close(), indexedDB.deleteDatabase("rs-check"), e();
                  };
              } catch (e) {
                t();
              }
            } else t();
          });
        }
        static _rs_cleanup(e) {
          return new Promise(t => {
            e.local && e.local.closeDB(), h.clean("remotestorage", t);
          });
        }
        diffHandler() {}
      }
      u.applyMixins(h, [i.default]), e.exports = h;
    }).call(this, r(5));
  }, function(e, t, r) {
    "use strict";
    var n = this && this.__importDefault || function(e) {
      return e && e.__esModule ? e : { default: e };
    };
    const o = n(r(10)), i = n(r(2)), s = n(r(1)), a = r(0), u = "remotestorage:cache:nodes:";
    function c(e) {
      return e.substr(0, u.length) === u
        || "remotestorage:cache:changes:" === e.substr(0, "remotestorage:cache:changes:".length);
    }
    class h extends o.default {
      constructor() {
        super(), this.addEvents(["change", "local-events-done"]);
      }
      diffHandler(...e) {}
      getNodes(e) {
        const t = {};
        for (let r = 0, n = e.length; r < n; r++) {
          try {
            t[e[r]] = JSON.parse(localStorage[u + e[r]]);
          } catch (n) {
            t[e[r]] = void 0;
          }
        }
        return Promise.resolve(t);
      }
      setNodes(e) {
        for (const t in e) localStorage[u + t] = JSON.stringify(e[t]);
        return Promise.resolve();
      }
      forAllNodes(e) {
        let t;
        for (let r = 0, n = localStorage.length; r < n; r++) {
          if (localStorage.key(r).substr(0, u.length) === u) {
            try {
              t = this.migrate(JSON.parse(localStorage[localStorage.key(r)]));
            } catch (e) {
              t = void 0;
            }
            t && e(t);
          }
        }
        return Promise.resolve();
      }
      static _rs_init() {}
      static _rs_supported() {
        return a.localStorageAvailable();
      }
      static _rs_cleanup() {
        const e = [];
        for (let t = 0, r = localStorage.length; t < r; t++) {
          const r = localStorage.key(t);
          c(r) && e.push(r);
        }
        e.forEach(e => {
          s.default("[LocalStorage] Removing", e), delete localStorage[e];
        });
      }
    }
    a.applyMixins(h, [i.default]), e.exports = h;
  }, function(e, t, r) {
    "use strict";
    var n = this && this.__importDefault || function(e) {
      return e && e.__esModule ? e : { default: e };
    };
    const o = n(r(2)), i = n(r(10)), s = r(0);
    class a extends i.default {
      constructor() {
        super(), this._storage = {}, this.addEvents(["change", "local-events-done"]);
      }
      getNodes(e) {
        const t = {};
        for (let r = 0, n = e.length; r < n; r++) t[e[r]] = this._storage[e[r]];
        return Promise.resolve(t);
      }
      setNodes(e) {
        for (const t in e) void 0 === e[t] ? delete this._storage[t] : this._storage[t] = e[t];
        return Promise.resolve();
      }
      forAllNodes(e) {
        for (const t in this._storage) e(this.migrate(this._storage[t]));
        return Promise.resolve();
      }
      diffHandler() {}
      static _rs_init() {}
      static _rs_supported() {
        return !0;
      }
      static _rs_cleanup() {}
    }
    s.applyMixins(a, [o.default]), e.exports = a;
  }]);
});
// # sourceMappingURL=remotestorage.js.map
