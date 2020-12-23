import { List } from "semantic-ui-react";

export const BitcoinDetails = ({ bitcoin, t }) => {
  return (
    <>
      {bitcoin && (
        <>
          <details>
            <summary>{t.t1}</summary>
            <List celled>
              <List.Item>
                <List.Content>
                  <List.Header>{t.t2}</List.Header>
                  {bitcoin.address}
                </List.Content>
              </List.Item>

              <List.Item>
                <List.Content>
                  <List.Header>{t.t3} </List.Header>
                  {bitcoin.pubkey}
                </List.Content>
              </List.Item>

              <List.Item>
                <List.Content>
                  <List.Header>{t.t4}</List.Header>
                  {bitcoin.privkey}
                </List.Content>
              </List.Item>

              <List.Item>
                <List.Content>
                  {t.t5}
                  <br />
                  {t.t6}
                </List.Content>
              </List.Item>
            </List>
          </details>
        </>
      )}
    </>
  );
};

export const WelcomeDetails = ({ myId, t }) => {
  return (
    <div className="welcome">
      {!myId ? (
        <h4>{t.t7}.</h4>
      ) : (
        <h3>
          {t.t8} <span className="welcomeInfoList-left">{t.t9}</span>
          <span className="welcomeInfoList-top">{t.t10}</span> {t.t11}
        </h3>
      )}
    </div>
  );
};
