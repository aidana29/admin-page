import { myDataSource } from "../../server";

export enum UserRole {
  ADMIN = "admin",
  STAFF = "staff",
}

export interface Iusers {
  id: number;
  email: string;
  password: string;
  username: string;
  authentication: UserRole;
}

const findPasswordByEmailResult = async (
  email: string
): Promise<Iusers | null> => {
  const checkUser = await myDataSource.query(
    `SELECT id, email, password, username, authentication FROM test_users WHERE email = ?`,
    [email]
  );
  return checkUser.length ? checkUser[0] : null;
};

const findByIdResult = async (userId: number) => {
  const checkUserDetail = await myDataSource.query(
    `SELECT email, username, authentication FROM test_users WHERE id = ?`,
    [userId]
  );
  return checkUserDetail;
};

const findMainUserResult = async (): Promise<Iusers> => {
  return await myDataSource.query(
    `SELECT id, email, username, authentication, created_at FROM test_users`
  );
};

const createUserResult = async (
  email: string,
  hashedPassword: string,
  username: string,
  authentication: UserRole
): Promise<Iusers> => {
  const createNewUser = await myDataSource.query(
    `INSERT INTO test_users (email, password, username, authentication) VALUES (?,?,?,?)`,
    [email, hashedPassword, username, authentication]
  );
  return createNewUser;
};

const modifyUserWithoutPasswordResult = async (
  userId: number,
  username: string,
  authentication: UserRole
) => {
  const updatedUser = await myDataSource.query(
    `UPDATE test_users SET username=?, authentication=? WHERE id= ?;`,
    [username, authentication, userId]
  );
};

const modifyUserResult = async (
  userId: number,
  modifyPassword: string,
  username: string,
  authentication: UserRole
) => {
  const updatedUser = await myDataSource.query(
    `UPDATE test_users SET password=?, username=?, authentication=? WHERE id= ?;`,
    [modifyPassword, username, authentication, userId]
  );
};

const deleteUserResult = async (userId: number) => {
  const userDelete = await myDataSource.query(
    `DELETE FROM test_users WHERE id = ?;`,
    [userId]
  );
};

const userModel = {
  findPasswordByEmailResult,
  createUserResult,
  findByIdResult,
  modifyUserWithoutPasswordResult,
  modifyUserResult,
  findMainUserResult,
  deleteUserResult,
};

export default userModel;
