import * as axios from 'axios';

const getAllUsers = (pageSize, page) => {
    return(
    axios.get(`http://localhost:3001/api/getAllUsers?size=${pageSize}&page=${page}`).then(response =>{
      return response.data
    }))
}

export const addUser = (name, surname, age, average, university, date_of_birth) => {
    return (
        axios.post('http://localhost:3001/api/addUser', {

                "name": `${name}`,
                "surname": `${surname}`,
                "age": `${age}`,
                "average": `${average}`,
                "university": `${university}`,
                "date_of_birth": `${date_of_birth}`
            
        })
    )
}

export const deleteUser = (name, surname, age) => {
    return (
        axios.delete(`http://localhost:3001/api/deleteUser?name=${name}&surname=${surname}&age=${age}`)
    )
}

export const updateUser = (selectionName, selectionSurname, selectionAge, name, surname, age, average, university, date_of_birth) => {
    return (
        axios.put('http://localhost:3001/api/updateUser', {
            "where": {
                "name": `${selectionName}`,
                "surname": `${selectionSurname}`,
                "age": `${selectionAge}`
            },
            "data": {
                "name": `${name}`,
                "surname": `${surname}`,
                "age": `${age}`,
                "average": `${average}`,
                "university": `${university}`,
                "date_of_birth": `${date_of_birth}`
            }
        })
    )
}

export default getAllUsers