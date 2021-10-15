const users = [];
const rooms = [];

const addUser = ({ id, name, room }) => {
  name = name;
  room = room;

  const existingUser = users.find(
    (user) => user.room === room && user.name === name
  );

  const existingRoom = rooms.find((r) => r === room);

  if (!name || !room) return { error: "Username and room are required." };
  if (existingUser) return { error: "Username is taken." };

  const user = { id, name, room };

  users.push(user);
  if (!existingRoom) {
    rooms.push(room);
  }

  return { user };
};

const removeUser = (id) => {
  const index = users.findIndex((user) => user.id === id);

  if (index !== -1) return users.splice(index, 1)[0];
};

const getUser = (id) => users.find((user) => user.id === id);

const getRooms = () => rooms;

const getUsersInRoom = (room) => users.filter((user) => user.room === room);

const deleteRoom = (roo) => {
  const r = rooms.find((room) => room === roo);
  const index = rooms.indexOf(r);
  if (index > -1) {
    rooms.splice(index, 1);
  }
};

module.exports = {
  addUser,
  removeUser,
  getUser,
  getUsersInRoom,
  getRooms,
  deleteRoom,
};
