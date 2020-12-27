let favurl;

export const Favico = (count) => {
  const favicon = document.querySelector("link[rel=icon]");

  if (favurl === undefined) favurl = favicon.href;

  const faviconSize = 32;
  const canvas = document.createElement("canvas");
  canvas.width = faviconSize;
  canvas.height = faviconSize;
  const context = canvas.getContext("2d");
  const img = document.createElement("img");

  if (favicon === null) return;
  img.src = favicon.href;

  img.onload = () => {
    // Draw Original Favicon as Background
    if (context === null) return;
    context.drawImage(img, 0, 0, faviconSize, faviconSize);
    if (count > 0) {
      // Draw background
      context.beginPath();
      context.arc(10, 20, 30, 10, Math.PI * 2, true);

      context.fillStyle = "#FF0000";
      context.fill();

      // Draw Notification Number
      context.font = "bold 24px helvetica";
      context.textAlign = "center";
      context.textBaseline = "middle";
      context.fillStyle = "#fff";

      context.fillText(String(count), 16, 25);

      // Replace favicon
      favicon.href = canvas.toDataURL("image/png");
    } else {
      favicon.href = favurl;
    }
  };
};

export const Push = (messages, t) => {
  let message = messages.slice(-1)[0];
  if (Notification.permission === "granted") {
    return new Notification(`${t.t8} ${message.fromName}`, {
      // body: "",
      icon: "/hashchat.png",
    });
  } else if (Notification.permission !== "denied") {
    Notification.requestPermission().then(function (permission) {
      if (permission === "granted") {
        return new Notification(`${t.t8} ${message.fromName}`, {
          // body: "",
          icon: "/hashchat.png",
        });
      }
    });
  }
};
