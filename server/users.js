const users = [];

const checkName = ({ name }) => {
  name = name.trim().toLowerCase();

  if (name.length > 25 || name.length < 3) return { error: true };

  const existingUser = users.find((user) => user.name === name);
  if (existingUser) return { error: true };

  return { error: false };
};

const editTags = ({ id, tags }) => {
  if (!tags) return { error: "Tags are required." };
  newTags = tags.trim().toLowerCase().split(" ");
  newTags = newTags.filter((n) => n);

  if (newTags.length === 0) return { error: "Tags min 3 char and max 25 char" };

  users.map((user) => {
    if (id === user.id) {
      let id = user.id;
      let name = user.name;
      let bitcoin = user.bitcoin;

      removeUser(id);

      userNewData = { id, name, tags: newTags, bitcoin };
      users.push(userNewData);
    }
  });
  return { users };
};

const addUser = ({ id, name, tags, bitcoin }) => {
  if (!name || !tags) return { error: "Username and tags are required." };
  tags = tags.trim().toLowerCase().split(" ");
  tags = tags.filter((n) => n);

  if (tags.length === 0) return { error: "Tags min 3 char and max 25 char" };

  name = name.trim().toLowerCase();

  if (name.length > 25 || name.length < 3)
    return { error: "Username min 3 char and max 25 char" };

  const existingUser = users.find((user) => user.name === name);
  if (existingUser) return { error: "Username is taken." };

  const user = { id, name, tags, bitcoin };
  users.push(user);

  return { users };
};

const allUsers = () => {
  return { users };
};

// const countUsers = () => {
//   return { counter: users.length };
// };

const removeUser = (id) => {
  const index = users.findIndex((user) => user.id === id);

  if (index !== -1) {
    user = users.splice(index, 1)[0];
    users.filter((user) => user.id === id);

    return users;
  }
};

const getUser = (id) => users.find((user) => user.id === id);

module.exports = {
  addUser,
  removeUser,
  getUser,
  checkName,
  // countUsers,
  allUsers,
  editTags,
};
