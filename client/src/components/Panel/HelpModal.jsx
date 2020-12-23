import { Button, Header, Modal } from "semantic-ui-react";

export const HelpModal = ({ setOpenHelp, openHelp }) => {
  return (
    <div>
      <Modal
        onClose={() => setOpenHelp(false)}
        onOpen={() => setOpenHelp(true)}
        open={openHelp}
      >
        <Modal.Header>Help</Modal.Header>

        <Modal.Content>
          <Modal.Description>
            <Header>Some information about HashChat</Header>

            <p>
              The entire site is written in React and the server in NodeJS, the
              complete project is open source and available on Github at this
              address:{" "}
              <a href="https://github.com/skorotkiewicz/hashchat">
                github.com/skorotkiewicz/hashchat
              </a>
              <p>
                If you found an error or have suggestions, write on Github in
                the "Issues" section.
              </p>
            </p>
          </Modal.Description>
        </Modal.Content>

        <Modal.Actions>
          <Button
            color="blue"
            content="Okay"
            onClick={() => setOpenHelp(false)}
          />
        </Modal.Actions>
      </Modal>
    </div>
  );
};
