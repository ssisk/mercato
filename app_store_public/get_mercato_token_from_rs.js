// connect to RS
let __rs;

const checkedGetRs = () => {
  if (!__rs) {
    throw new Error("You need to init first!");
  }
  return __rs;
};

// TODO: this file uses a lot of alert() prompts -
// super annoying interface, but easier to write. :)
// Replace them with just a normal webpage that updates
// with status.

// we vary the token name by the mercato server since a user
// could potentially use multiple servers (eg a developer
// running a local mercato server)
const mercatoTokenFilename = () => window.location.hostname + "-token";
const redirectAfterSuccess = () => {
  window.location.href = "/listing";
};

const rsInit = () => {
  if (!__rs) {
    console.log("Initing RS");
    __rs = new RemoteStorage();
    const rs = checkedGetRs();
    rs.access.claim("mercato", "rw");
    rs.caching.enable("/mercato/");
    const widget = new Widget(rs);
    widget.attach("rs-widget-home");
    rs.on("connected", async function() {
      const serverUrl = new URL(rs.remote.href).host;
      // Storage account has been connected, let’s roll!
      console.log("RS connected");
      const client = rs.scope("/mercato/");
      const file = await client.getFile(mercatoTokenFilename());
      if (file.data) {
        // todo: can we validate the user's server matches that in the token??
        const rawRes = await fetch("/user/validate", {
          method: "post",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ mercatoToken: file.data, serverUrl }),
        });
        if (rawRes.status != 200) {
          alert(
            "You have a mercato token in your RemoteStorage, but this server did not recognize it! "
              + "Please contact the admins of your Mercato server (the domain you're on right now).",
          );
          return;
        }
        const res = JSON.parse(await rawRes.text());
        if (res.success) {
          console.log("success!");
          alert("You are now logged in to this Mercato sever on this device! You can now use the apps on this server.");
          redirectAfterSuccess();
        } else {
          alert("Sorry, login did not work! Please try again");
        }
      } else {
        const rawRes = await fetch("/user/create", {
          method: "post",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ serverUrl }),
        });
        if (rawRes.status != 200) {
          alert(
            "There was an error trying to create an account for you on this server, please try again. If further errors occur, please contact the admin of this server.",
          );
          console.error("Error from server was: ", rawRes);
          return;
        }
        const res = JSON.parse(await rawRes.text());
        if (res.success) {
          await client.storeFile("text/plain", mercatoTokenFilename(), res.token);
          alert("You now have an account on this Mercato sever! You can now use the apps on this server.");
          redirectAfterSuccess();
        }
      }
    });
    rs.on("not-connected", () => {
      console.log("RS not-connected: no RS user");
    });
    rs.on("ready", () => {
      console.log("RS ready");
    });
    rs.on("network-online", () => {
      console.log("RS: network connection back online");
    });
    rs.on("error", (err) => console.error("RS error received:", err));
  }
};

rsInit();
