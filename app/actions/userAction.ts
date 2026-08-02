"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createUser(prevState: any, formData: FormData) {

    const name = formData.get("name") as string;
    const email = formData.get("email") as string;

try {
    await prisma.user.create({
        data: { name, email }
    });
      revalidatePath("/");
      return { success: true, message: "User created successfully" };
} catch (error) {
    return { success: false, message: "User creation failed" };
}
}

export async function deleteUser(FormData: FormData) {
    const id = FormData.get("id");
    await prisma.user.delete({
        where: { id: Number(id) }
    });
    revalidatePath("/");
}

export async function updateUser(prevState: any, FormData: FormData) {
    const id = FormData.get("id");
    const name = FormData.get("name");
    const email = FormData.get("email");
    if (!name || !email) {
        return {
            success: false,
            message: "Name and email are required",
        };
    }
    try {
    await prisma.user.update({
            where: { id: Number(id) },
            data: { name: name as string, email: email as string }
        });
        revalidatePath("/");
        return { success: true, message: "User updated successfully" };
    } catch (error) {
        return { success: false, message: "User update failed" };
    }
}