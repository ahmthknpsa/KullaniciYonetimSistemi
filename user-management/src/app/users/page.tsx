"use client";

import { useState, useEffect } from "react";
import { User } from "./types";
import UserTable from "./components/UserTable";
import UserForm from "./components/UserForm";

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([
    {
      id: 1,
      name: "Ahmet Hakan Pusa",
      email: "ahmethakanpusa01@gmail.com",
      role: "Admin",
      phone: "05334550123", // <<--- Telefon eklendi!
    },
    {
      id: 2,
      name: "Kadir Kuşbay",
      email: "kadirkusbay44@gmail.com",
      role: "User",
      phone: "05449874444", // <<--- Telefon eklendi!
    },
    {
      id: 3,
      name: "Abdullah Ülder",
      email: "abdullahulder21@gmail.com",
      role: "User",
      phone: "05523772121", // <<--- Telefon eklendi!
    },
    {
      id: 4,
      name: "Mahmut Bağlama",
      email: "baglamamahmut@gmail.com",
      role: "User",
      phone: "05333415858", // <<--- Telefon eklendi!
    },
  ]);

  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  return (
    <div style={{ padding: 20 }}>
      <h1>Kullanıcı Yönetimi</h1>
      <UserForm
        users={users}
        setUsers={setUsers}
        selectedUser={selectedUser}
        setSelectedUser={setSelectedUser}
      />
      <UserTable
        users={users}
        setUsers={setUsers}
        setSelectedUser={setSelectedUser}
      />
    </div>
  );
}
