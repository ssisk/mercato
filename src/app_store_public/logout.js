const startWidget = () => {
  const rs = new RemoteStorage();
  rs.access.claim("mercato", "rw");
  rs.caching.enable("/mercato/");
  const widget = new Widget(rs);
  widget.attach("rs-widget-home");
  rs.on("connected", async function() {
    console.log("RS connected");
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
};

startWidget();
