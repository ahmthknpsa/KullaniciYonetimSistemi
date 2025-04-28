"use client";

import * as React from "react";
import { DataGrid, GridColDef, GridActionsCellItem } from "@mui/x-data-grid";
import { User } from "../types";
import { Delete, Edit } from "@mui/icons-material";
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, TextField } from "@mui/material";

interface UserTableProps {
  users: User[];
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
  setSelectedUser: React.Dispatch<React.SetStateAction<User | null>>;
}

export default function UserTable({ users, setUsers, setSelectedUser }: UserTableProps) {
  const [openDialog, setOpenDialog] = React.useState(false);
  const [userToDelete, setUserToDelete] = React.useState<User | null>(null);
  const [searchText, setSearchText] = React.useState("");

  const handleEdit = (user: User) => {
    setSelectedUser(user);
  };

  const handleDeleteClick = (user: User) => {
    setUserToDelete(user);
    setOpenDialog(true);
  };

  const confirmDelete = () => {
    if (userToDelete) {
      setUsers(prev => prev.filter(u => u.id !== userToDelete.id));
    }
    setOpenDialog(false);
    setUserToDelete(null);
  };

  const cancelDelete = () => {
    setOpenDialog(false);
    setUserToDelete(null);
  };

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'name', headerName: 'Adı', flex: 1 },
    { field: 'email', headerName: 'E-posta', flex: 1 },
    { field: 'phone', headerName: 'Telefon', flex: 1 },  // <<<<<< Telefon e-posta'nın hemen altında!
    { field: 'role', headerName: 'Rol', flex: 1 },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'İşlemler',
      width: 150,
      getActions: (params) => [
        <GridActionsCellItem
          icon={<Edit />}
          label="Düzenle"
          onClick={() => handleEdit(params.row as User)}
        />,
        <GridActionsCellItem
          icon={<Delete />}
          label="Sil"
          onClick={() => handleDeleteClick(params.row as User)}
          showInMenu
        />
      ],
    },
  ];
  

  // Arama işlemi için filtreli kullanıcılar
  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().startsWith(searchText.toLowerCase())
  );

  return (
    <div style={{ height: 500, width: '100%', marginTop: 20 }}>
      {/* Arama Kutusu */}
      <TextField
        label="İsme Göre Ara"
        variant="outlined"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        fullWidth
        style={{ marginBottom: 20 }}
      />

      <DataGrid
        rows={filteredUsers}
        columns={columns}
        pageSizeOptions={[5]}
        disableRowSelectionOnClick
      />

      {/* Silme Dialogu */}
      <Dialog open={openDialog} onClose={cancelDelete}>
        <DialogTitle>Kullanıcıyı Sil</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Bu kullanıcıyı silmek istediğinizden emin misiniz?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={cancelDelete}>İptal</Button>
          <Button onClick={confirmDelete} color="error">Sil</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
