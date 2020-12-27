const users = [];

const checkName = ({ name }) => {
  name = name.trim().toLowerCase();

  if (name.length > 25 || name.length < 3) return { error: true };

  const existingUser = users.find((user) => user.name === name);
  if (existingUser) return { error: true };

  return { error: false };
};

const addUser = ({ id, name, tags, bitcoin }) => {
  if (!name || !tags) return { error: "Username and tags are required." };

  name = name.trim().toLowerCase();

  if (tags.length > 50 || name.length < 3)
    return { error: "Tags min 3 char and max 25 char" };

  tags = tags.trim().toLowerCase().split(" ");

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
};
