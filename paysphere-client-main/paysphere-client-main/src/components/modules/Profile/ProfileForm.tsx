/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  useUpdateUserMutation,
  useUserInfoQuery,
} from "@/redux/features/auth/auth";

const profileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  phone: z.string().min(10, "Enter a valid phone number"),
  address: z.string().optional(),
});

export default function ProfileForm() {
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const { data: userInfo } = useUserInfoQuery();
  const [updateUser] = useUpdateUserMutation();

  const form = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: userInfo?.name || "",
      phone: userInfo?.phone || "",
      address: userInfo?.address || "",
    },
  });

  useEffect(() => {
    if (userInfo) {
      form.reset({
        name: userInfo.name || "",
        phone: userInfo.phone || "",
        address: userInfo.address || "",
      });
    }
  }, [userInfo, form]);

  const onSubmit = async (data: z.infer<typeof profileSchema>) => {
    if (!userInfo?._id) return;

    setIsSaving(true);
    const toastId = toast.loading("Updating user info...");
    try {
      await updateUser({
        userId: userInfo._id,
        payload: data,
      }).unwrap();

      toast.success("Profile updated successfully!", { id: toastId });
      setIsEditing(false);
      form.reset(data);
    } catch (error: any) {
      console.error(error);
      toast.error(error?.data?.message || "Failed to update profile", {
        id: toastId,
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    form.reset({
      name: userInfo?.name || "",
      phone: userInfo?.phone || "",
      address: userInfo?.address || "",
    });
    setIsEditing(false);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Full Name */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your full name"
                    disabled={!isEditing || isSaving}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Email (read-only) */}
          <FormItem>
            <FormLabel>Email</FormLabel>
            <Input
              value={userInfo?.email || ""}
              disabled
              className="bg-card text-foreground border-border"
            />
          </FormItem>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Phone */}
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your phone number"
                    disabled={!isEditing || isSaving}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Optional Fields */}
          {userInfo?.feeRate && (
            <FormItem>
              <FormLabel>Fee Rate</FormLabel>
              <Input
                value={userInfo.feeRate}
                disabled
                className="bg-card text-foreground border-border"
              />
            </FormItem>
          )}

          {userInfo?.commissionRate && (
            <FormItem>
              <FormLabel>Commission Rate</FormLabel>
              <Input
                value={userInfo.commissionRate}
                disabled
                className="bg-card text-foreground border-border"
              />
            </FormItem>
          )}
        </div>

        {/* Address */}
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter your address"
                  disabled={!isEditing || isSaving}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Action Buttons */}
        <div className="flex justify-end space-x-2">
          {isEditing ? (
            <>
              <Button
                type="button"
                variant="outline"
                className="border-border text-foreground"
                onClick={handleCancel}
                disabled={isSaving}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-primary text-primary-foreground hover:bg-primary/90"
                disabled={!form.formState.isDirty || isSaving}
              >
                {isSaving ? "Saving..." : "Save"}
              </Button>
            </>
          ) : (
            <Button
              type="button"
              className="bg-primary text-primary-foreground hover:bg-primary/90"
              onClick={() => setIsEditing(true)}
            >
              Edit
            </Button>
          )}
        </div>
      </form>
    </Form>
  );
}
