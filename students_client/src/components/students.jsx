import React, { useState } from 'react';
import Student from './student';
import styles from './students.module.css';
import { addUser } from '../api/api';

const Students = (props) => {
    let [addMode, setAddMode] = useState(false);
    let [name, addName] = useState("")
    let [surname, addSurname] = useState("")
    let [date_of_birth, addDate_of_birth] = useState("")
    let [average, addAverage] = useState("")
    let [age, addAge] = useState("")
    let [university, addUniversity] = useState("")

    const onNameChange = (e) => {
        addName(e.currentTarget.value)
        console.log(e.currentTarget)
    }

    const onSurnameChange = (e) => {
        addSurname(e.target.value)
        console.log(e.target.parentNode)
    }

    const onDate_of_birthChange = (e) => {
        addDate_of_birth(e.target.value)
    }

    const onAverageChange = (e) => {
        addAverage(e.target.value)
    }

    const onAgeChange = (e) => {
        addAge(e.target.value)
    }

    const onUniversityChange = (e) => {
        addUniversity(e.target.value)
    }

    const cancelChanges = () => {
        setAddMode(addMode = false);
        addName('');
        addSurname('')
        addDate_of_birth('')
        addAverage('')
        addAge('')
        addUniversity('')
    }
    
    const addNewStudent = () => {
        addUser(name, surname, age, average, university, date_of_birth)
        .then(() => {props.setUsers(props.store.pageSize, props.store.pageNumber)})
        .catch(() => {
        });
        cancelChanges();
    }

    return (
        <div>
            <div className={styles.header}>
                <p className={styles.studentInfo}>Name</p>
                <p className={styles.studentInfo}>Surname</p>
                <p className={styles.studentInfo}>Date of birth</p>
                <p className={styles.studentInfo}>Average</p>
                <p className={styles.studentInfo}>Age</p>
                <p className={styles.studentInfo}>University</p>
            </div>
            <ul>
                {props.store.users.map(item => <li className={styles.studentItem}><Student store={props.store} setUsers={props.setUsers} name={item.name} surname={item.surname} date_of_birth={item.date_of_birth} average={item.average} age={item.age} university={item.university} /></li>)}
            </ul>
            {addMode==false &&
            <div>
                <button className={styles.addButton} onClick={() => { setAddMode(addMode = true) }}>Add new student</button>
            </div>}
            {addMode &&
                <div id='student' className={styles.addingRow}>
                    <input id='name' className={styles.addingCell} value={name} onChange={onNameChange} />
                    <input id='surname' className={styles.addingCell} value={surname} onChange={onSurnameChange} />
                    <input id='date_of_birth' className={styles.addingCell} value={date_of_birth} onChange={onDate_of_birthChange} />
                    <input id='average' className={styles.addingCell} value={average} onChange={onAverageChange} />
                    <input id='age' className={styles.addingCell} value={age} onChange={onAgeChange} />
                    <input id='university' className={styles.addingCell} value={university} onChange={onUniversityChange} />
                    <button onClick={addNewStudent} >OK</button>
                    <button onClick={cancelChanges} >Cancel</button>
                </div>}
        </div>
    )
}

export default Students;