import React, { useState } from 'react';
import { connect } from 'react-redux';
import './App.css';
import { setCurrentPageAC, setUsersAC } from './reducer/reducer';
import Students from './components/students';
import getAllUsers from './api/api';

const App = (props) => {
  let pageNumber = [];
  let pages = Math.ceil(props.testStore.count / props.testStore.pageSize);
  for (let i = 0; i < pages; i++) {
    pageNumber.push(i + 1);
  }


  let onPageChange = (curr) => {
    props.setCurrentPage(curr)
  }

  const [count, setCount] = useState(0)
  if (count !== props.page) {
    props.setUsers(props.testStore.pageSize, props.page)
    setCount(props.page);
  }

  return (
    <div>
      <Students store={props.testStore} setUsers={props.setUsers} />
        {pageNumber.map(item => <div onClick={() => { onPageChange(item) }}>{item}</div>)}
    </div>
  )
}

let mapDispatchToProps = (dispatch) => {
  return {
    setCurrentPage: (currentPage) => {
      dispatch(setCurrentPageAC(currentPage))
    },
    setUsers: (pageSize, page) => {
      getAllUsers(pageSize, page).then(data => {
        dispatch(setUsersAC(data))
      })
    }
  }
}

export default connect(
  state => ({
    testStore: state,
    page: state.pageNumber
  }),
  mapDispatchToProps

)(App);


// import { useTable } from 'react-table';

// function Table({ columns, data }) {
//   // Use the state and functions returned from useTable to build your UI
//   const {
//     getTableProps,
//     getTableBodyProps,
//     headerGroups,
//     rows,
//     prepareRow,
//   } = useTable({
//     columns,
//     data,
//   })

//   // Render the UI for your table
//   return (
//     <table {...getTableProps()}>
//       <thead>
//         {headerGroups.map(headerGroup => (
//           <tr {...headerGroup.getHeaderGroupProps()}>
//             {headerGroup.headers.map(column => (
//               <th {...column.getHeaderProps()}>{column.render('Header')}</th>
//             ))}
//           </tr>
//         ))}
//       </thead>
//       <tbody {...getTableBodyProps()}>
//         {rows.map((row, i) => {
//           prepareRow(row)
//           return (
//             <tr {...row.getRowProps()}>
//               {row.cells.map(cell => {
//                 return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
//               })}
//               <button>OK</button>
//             </tr>
//           )
//         })}
//       </tbody>
//     </table>
//   )
// }

// function App(props) {
//   const [count, setCount] = useState(0)
//   if (count == 0) {
//     axios.get('http://localhost:3001/api/getAllUsers').then(response =>{
//       props.setUsers(response.data);
//     })
//     setCount (count + 1);
//   }
//   const columns = React.useMemo(
//     () => [
//       {
//         Header: 'Name',
//         columns: [
//           {
//             Header: 'First Name',
//             accessor: 'name',
//           },
//           {
//             Header: 'Last Name',
//             accessor: 'surname',
//           },
//         ],
//       },
//       {
//         Header: 'Info',
//         columns: [
//           {
//             Header: 'Age',
//             accessor: 'age',
//           },
//           {
//             Header: 'Visits',
//             accessor: 'average',
//           },
//           {
//             Header: 'Status',
//             accessor: 'university',
//           },
//           {
//             Header: 'Profile Progress',
//             accessor: 'date_of_birth',
//           },
//         ],
//       },
//     ],
//     []
//   )

//   const data = React.useMemo(() => props.testStore.users, [])

//   return (
//     <div>
//       <Table columns={columns} data={data} />
//     </div>
//   )
// }

// export default connect(
//     state =>({
//       testStore: state
//     }),
//     dispatch => ({})
//   )(App);

