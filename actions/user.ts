import client from "@/lib/db";

type userData = {
  id: string;
  email: string;
};

export async function createUser(data: userData) {
  try {
    const user = await client.user.create({ data });
    return user;
  } catch (error) {
    return { error };
  }
}

export async function updateUser(id: string, data: Partial<userData>) {
  try {
    const user = await client.user.update({
      where: { id },
      data,
    });
    return user;
  } catch (error) {
    return { error };
  }
}
