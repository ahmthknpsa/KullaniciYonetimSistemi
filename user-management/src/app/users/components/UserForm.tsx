"use client";

import { useState, useEffect } from "react";
import { User } from "../types";
import { TextField, Button, Stack } from "@mui/material";

interface UserFormProps {
  users: User[];
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
  selectedUser: User | null;
  setSelectedUser: React.Dispatch<React.SetStateAction<User | null>>;
}

export default function UserForm({ users, setUsers, selectedUser, setSelectedUser }: UserFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("");
  

  useEffect(() => {
    if (selectedUser) {
      setName(selectedUser.name);
      setEmail(selectedUser.email);
      setPhone(selectedUser.phone);
      setRole(selectedUser.role);
    } else {
      setName("");
      setEmail("");
      setPhone("");
      setRole("");
    }
  }, [selectedUser]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Email adresi kontrolü
    if (!email.includes("@")) {
      alert("Geçerli bir e-posta adresi giriniz!");
      return;
    }
  
    // Telefon numarası kontrolü
    if (phone.length !== 11) {
      alert("Telefon numarası tam 11 haneli olmalıdır!");
      return;
    }
  
    if (selectedUser) {
      // Düzenleme modu
      setUsers(prev => prev.map(u =>
        u.id === selectedUser.id ? { ...u, name, email, role, phone } : u
      ));
      setSelectedUser(null);
    } 
    else {
      // Yeni kullanıcı ekleme modu
      const newUser: User = {
        id: users.length > 0 ? users[users.length - 1].id + 1 : 1,
        name,
        email,
        phone,
        role,
      };
      setUsers(prev => [...prev, newUser]);
    }
  
    // Formu temizle
    setName("");
    setEmail("");
    setPhone("");
    setRole("");
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={2} direction="column" sx={{ marginBottom: 3 }}>
        <TextField
          label="Adı"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <TextField
          label="E-posta"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

           <TextField
          label="Telefon Numarası"
          value={phone}
          onChange={(e) => {
            if (e.target.value.length <= 11) {
              setPhone(e.target.value);
            }
          }}
          required
          inputProps={{ maxLength: 11 }}
        />

        <TextField
          label="Rol"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          required
        />

        <Button type="submit" variant="contained" color="primary">
          {selectedUser ? "Düzenle" : "Ekle"}
        </Button>
      </Stack>
    </form>
  );
}
