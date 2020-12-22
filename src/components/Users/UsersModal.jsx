import { Button, Modal, Icon, Label, Menu } from "semantic-ui-react";

import { useSelector, useDispatch } from "react-redux";
import { setUsersModalOpen } from "./../../_actions";

export const UsersModal = ({ UsersList }) => {
  // redux
  const dispatch = useDispatch();
  const open = useSelector((state) => state.usersModalOpen);
  const unread = useSelector((state) => state.unread);

  return (
    <Modal
      open={open}
      onClose={() => {
        dispatch(setUsersModalOpen(false));
      }}
      onOpen={() => {
        dispatch(setUsersModalOpen(true));
      }}
      trigger={
        <Menu compact style={{ marginRight: 15, marginTop: 10 }}>
          <Menu.Item>
            <Icon name="users" /> Users list
            {unread.length > 0 && (
              <Label color="red" floating>
                {unread.length}
              </Label>
            )}
          </Menu.Item>
        </Menu>
      }
    >
      {/* <Modal.Header>Match users</Modal.Header> */}
      <Modal.Content image scrolling>
        <Modal.Description>{UsersList}</Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button
          onClick={() => {
            dispatch(setUsersModalOpen(false));
          }}
          primary
        >
          Okay
        </Button>
      </Modal.Actions>
    </Modal>
  );
};
