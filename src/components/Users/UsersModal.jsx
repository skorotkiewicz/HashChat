import { Button, Modal, Icon, Label } from "semantic-ui-react";

import { useSelector, useDispatch } from "react-redux";
import { setUsersModalOpen } from "./../../_actions";

export const UsersModal = ({ UsersList }) => {
  // redux
  const dispatch = useDispatch();
  const open = useSelector((state) => state.usersModalOpen);
  const unread = useSelector((state) => state.unread);
  const t = useSelector((state) => state.translation.users);

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
        <div className="usersBtn">
          <span>
            {t.t6}
            <Icon className="usersIconTop" name="users" />
            {unread.length > 0 && (
              <Label size="tiny" color="red">
                {unread.length}
              </Label>
            )}
          </span>
        </div>
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
          {t.t5}
        </Button>
      </Modal.Actions>
    </Modal>
  );
};
