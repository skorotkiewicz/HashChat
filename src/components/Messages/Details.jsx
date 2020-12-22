export const BitcoinDetails = ({ bitcoin }) => {
  return (
    <>
      {bitcoin && (
        <details>
          <hr />
          <summary>Click to show your bitcoin address with keys</summary>
          <span>
            Public address: <br></br>
            <strong>{bitcoin.address}</strong>
          </span>
          <hr />
          <span>
            Public key: (used to encrypt/decrypt messages)<br></br>
            <strong>{bitcoin.pubkey}</strong>
          </span>
          <hr />
          <span>
            Private key (don't share with others!): <br></br>
            <strong>{bitcoin.privkey}</strong>
          </span>

          <span className="infoKeys">
            The keys are not saved anywhere, if for some reason you want to keep
            your current bitcoin address save the private key locally!
            <br />
            Once you visit the site again, a new bitcoin address will be
            generated.
          </span>
        </details>
      )}
    </>
  );
};

export const WelcomeDetails = ({ myId }) => {
  return (
    <div className="welcome">
      {!myId ? (
        <h4>You are not connected, reload this page.</h4>
      ) : (
        <h3>
          Hello! To start chat, click the user from{" "}
          <span className="welcomeInfoList-left">left</span>
          <span className="welcomeInfoList-top">top</span> userlist.{" "}
        </h3>
      )}
    </div>
  );
};
