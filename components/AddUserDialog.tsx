"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import React, { useState } from "react";
import { Label } from "./ui/label";
import { useActionState, useEffect } from "react";
import { createUser, updateUser } from "@/app/actions/userAction";
import { User } from "@/lib/generated/prisma/client";

function AddUserDialog({isEdit, user}: {isEdit: boolean, user: User | null}) {
  const action = isEdit ? updateUser : createUser;

const [state, formAction] = useActionState(action, null);
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    if (state?.success) {
      setOpen(false);
    }
  }, [state]);

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger className="cursor-pointer hover:text-blue-500 border rounded-md px-2 py-1 my-2">
          {isEdit ? "Edit User" : "Add User"}
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{isEdit ? "Edit User" : "Add User"}</DialogTitle>
            <DialogDescription className="py-3">
              <form action={formAction} className="flex flex-col gap-2">
              <input
    type="hidden"
    name="id"
    value={user?.id}
/>
                <Label htmlFor="name">Name</Label>
                <input
                  className="border rounded-md px-2 py-1 my-2"
                  type="text"
                  name="name"
                  placeholder="Name"
                  defaultValue={user?.name}
                />
                <Label htmlFor="email">Email</Label>
                <input
                  className="border rounded-md px-2 py-1 my-2"
                  type="email"
                  name="email"
                  placeholder="Email"
                  defaultValue={user?.email}
                />
                <div className="flex gap-2 justify-end">
                  <button
                    className="cursor-pointer hover:text-blue-500 border rounded-md px-2 py-1 my-2"
                    onClick={handleClose}
                    type="button"
                  >
                    Close
                  </button>
                  <button
                    type="submit"
                    className="cursor-pointer hover:text-blue-500 border rounded-md px-2 py-1 my-2"
                  >
                    {isEdit ? "Update" : "Add"}
                  </button>
                </div>
              </form>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default AddUserDialog;
