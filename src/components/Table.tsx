import {ColumnDef, createColumnHelper, flexRender, getCoreRowModel, useReactTable} from "@tanstack/react-table";

type User = {
    firstName: string;
    lastName: string;
}

const columnHelper = createColumnHelper<User>();

const columns = [
    columnHelper.accessor((row) => `${row.firstName}`, {
        header: "First Name",
        cell: props => (
            <span>{props.getValue().toString().toUpperCase()}</span>
        )
    }),
    columnHelper.accessor((row) => `${row.lastName}`, {
        header: "Last Name",
    }),
]

const data: User[] = [
    {
        firstName: "Bill",
        lastName: "Dow"
    },
    {
        firstName: "John",
        lastName: "Willson"
    }
]

const Table: React.FC = () => {

    const table = useReactTable({
        columns,
        data,
        getCoreRowModel: getCoreRowModel()
    })

    return (
        <table>
           <thead>
           {table.getHeaderGroups().map((headerGroup) => (
               <tr key={headerGroup.id}>
                   {headerGroup.headers.map((header) => (
                       <th key={header.id}>
                           {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                       </th>
                   ))}
               </tr>
           ))}
           </thead>
            <tbody>
            {table.getRowModel().rows.map((row) => (
                <tr key={row.id}>
                    {row.getVisibleCells().map((cell) => (
                        <td key={cell.id}>
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </td>
                    ))}
                </tr>
            ))}
            </tbody>
        </table>
    )
}

export default Table;