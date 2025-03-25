"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";

export default function UsersPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Redirect if not super admin
  useEffect(() => {
    if (status === "authenticated" && !session?.user?.isSuperAdmin) {
      router.push("/admin");
    }
  }, [status, session, router]);

  // Fetch users from API
  useEffect(() => {
    if (status === "authenticated" && session?.user?.isSuperAdmin) {
      const fetchUsers = async () => {
        try {
          const res = await fetch("/api/auth/users", {
            headers: {
              "Content-Type": "application/json",
              // Remove Authorization header if not needed, or adjust based on your auth setup
            },
          });
          if (!res.ok) throw new Error("Failed to fetch users");
          const data = await res.json();
          setUsers(data);
          setLoading(false);
        } catch (error) {
          console.error("Failed to fetch users:", error);
          setLoading(false);
        }
      };
      fetchUsers();
    }
  }, [status, session]);

  // Toggle isAdmin status
  const handleToggleAdmin = async (userId, currentStatus) => {
    try {
      const res = await fetch(`/api/auth/users/${userId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ isAdmin: !currentStatus }),
      });

      if (res.ok) {
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user._id === userId ? { ...user, isAdmin: !currentStatus } : user
          )
        );
      } else {
        console.error("Failed to update isAdmin status");
      }
    } catch (error) {
      console.error("Error toggling admin status:", error);
    }
  };

  // Toggle isSuperAdmin status
  const handleToggleSuperAdmin = async (userId, currentStatus) => {
    try {
      const res = await fetch(`/api/auth/users/${userId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ isSuperAdmin: !currentStatus }),
      });

      if (res.ok) {
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user._id === userId ? { ...user, isSuperAdmin: !currentStatus } : user
          )
        );
      } else {
        console.error("Failed to update isSuperAdmin status");
      }
    } catch (error) {
      console.error("Error toggling super admin status:", error);
    }
  };

  // Delete user
  const handleDeleteUser = async (userId) => {
    if (!confirm("Are you sure you want to delete this user?")) return;

    try {
      const res = await fetch(`/api/auth/users/${userId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.ok) {
        setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));
      } else {
        console.error("Failed to delete user");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  if (status === "loading" || loading) {
    return <div className="p-4 sm:p-6">Loading...</div>;
  }

  if (!session?.user?.isSuperAdmin) {
    return null;
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      <h1 className="text-2xl sm:text-3xl font-bold">Manage Users</h1>
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="text-lg sm:text-xl font-semibold">Users List</CardTitle>
        </CardHeader>
        <CardContent className="p-4 sm:p-6">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-xs sm:text-sm">Name</TableHead>
                  <TableHead className="text-xs sm:text-sm hidden sm:table-cell">Email</TableHead>
                  <TableHead className="text-xs sm:text-sm">Admin</TableHead>
                  <TableHead className="text-xs sm:text-sm hidden md:table-cell">Super Admin</TableHead>
                  <TableHead className="text-xs sm:text-sm">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user._id}>
                    <TableCell className="text-xs sm:text-sm">{user.name}</TableCell>
                    <TableCell className="text-xs sm:text-sm hidden sm:table-cell">{user.email}</TableCell>
                    <TableCell className="text-xs sm:text-sm">
                      <Switch
                        checked={user.isAdmin}
                        onCheckedChange={() => handleToggleAdmin(user._id, user.isAdmin)}
                        disabled={user._id === session.user.id}
                      />
                    </TableCell>
                    <TableCell className="text-xs sm:text-sm  md:table-cell">
                      <Switch
                        checked={user.isSuperAdmin}
                        onCheckedChange={() => handleToggleSuperAdmin(user._id, user.isSuperAdmin)}
                        disabled={user._id === session.user.id}
                      />
                    </TableCell>
                    <TableCell className="text-xs sm:text-sm">
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDeleteUser(user._id)}
                        disabled={user.isSuperAdmin}
                        aria-label={`Delete ${user.name}`}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}