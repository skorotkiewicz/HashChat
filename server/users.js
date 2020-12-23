const users = [];

const checkName = ({ name }) => {
  name = name.trim().toLowerCase();
  const existingUser = users.find((user) => user.name === name);

  if (existingUser) return { error: true };

  return { error: false };
};

const addUser = ({ id, name, tags, bitcoin }) => {
  if (!name || !tags) return { error: "Username and tags are required." };

  name = name.trim().toLowerCase();
  tags = tags.trim().toLowerCase().split(" ");

  const existingUser = users.find((user) => user.name === name);
  if (existingUser) return { error: "Username is taken." };

  const user = { id, name, tags, bitcoin };
  users.push(user);

  return { users, user };
};

const allUsers = () => {
  return { users };
};

// const findUsers = (tags, name) => {
//   let myUsers = [];

//   users.find((user) => {
//     if (user.tags.some((tag) => tags.includes(tag))) {
//       if (name !== user.name) {
//         myUsers.push(user);
//       }
//     }
//   });

//   return { myUsers };
// };

// const countUsers = () => {
//   return { counter: users.length };
// };

const removeUser = (id) => {
  const index = users.findIndex((user) => user.id === id);

  // if (index !== -1) return users.splice(index, 1)[0];
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
