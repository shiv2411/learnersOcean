export const columns = [
  { key: 'id', label: 'ID', sortable: true,id:1 },
  { key: 'name', label: 'Name', sortable: true,id:2 },
  { key: 'role', label: 'Role', sortable: true,id:3 },
  {
    key: 'status',
    label: 'Status',
    sortable: true,
    render: (row) => (
      <span style={{color:row.status ==='Active' ? 'green' : 'red'}}>
        {row.status}
      </span>
    ),
    id:4
  },
  {
    key: 'actions',
    label: 'Actions',
    render: (row) => <button onClick={() => alert(row.name)}>View</button>,
  },
];

export const data = [
  { id: 1, name: 'Rahul', role: 'Admin', status: 'Active' },
  { id: 2, name: 'Priya', role: 'Editor', status: 'Inactive' },
  { id: 3, name: 'Aman', role: 'Viewer', status: 'Active' },
  { id: 4, name: 'Neha', role: 'Admin', status: 'Active' },
  { id: 5, name: 'Karan', role: 'Editor', status: 'Inactive' },
  { id: 6, name: 'Meera', role: 'Viewer', status: 'Active' },
];