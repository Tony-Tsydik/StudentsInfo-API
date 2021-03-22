import React, { useState } from 'react';
import styles from './student.module.css';
import { deleteUser, updateUser } from '../api/api';

const Student = (props) => {

    let [editMode, setEditMode] = useState(false)
    let [name, setName] = useState(props.name)
    let [surname, setSurname] = useState(props.surname)
    let [date_of_birth, setDate_of_birth] = useState(props.date_of_birth)
    let [average, setAverage] = useState(props.average)
    let [age, setAge] = useState(props.age)
    let [university, setUniversity] = useState(props.university)

    const onNameChange = (e) => {
        setName(e.currentTarget.value)
        console.log(e.currentTarget)
    }

    const onSurnameChange = (e) => {
        setSurname(e.target.value)
        console.log(e.target.parentNode)
    }

    const onDate_of_birthChange = (e) => {
        setDate_of_birth(e.target.value)
    }

    const onAverageChange = (e) => {
        setAverage(e.target.value)
    }

    const onAgeChange = (e) => {
        setAge(e.target.value)
    }

    const onUniversityChange = (e) => {
        setUniversity(e.target.value)
    }

    const cancelChanges = () => {
        setName(props.name);
        setSurname(props.surname)
        setDate_of_birth(props.date_of_birth)
        setAverage(props.average)
        setAge(props.age)
        setUniversity(props.university)
        setEditMode(editMode = false);
    }

    const deleteItem = () => {
        deleteUser(name, surname, age)
            .then(() => {
                props.setUsers(props.store.pageSize, props.store.pageNumber)
            });
    }

    const sendChanges = () => {
        updateUser(props.name, props.surname, props.age, name, surname, age, average, university, date_of_birth)
            .then(() => {
                props.setUsers(props.store.pageSize, props.store.pageNumber)
            })
            .catch(() => {
                setName(props.name);
                setSurname(props.surname)
                setDate_of_birth(props.date_of_birth)
                setAverage(props.average)
                setAge(props.age)
                setUniversity(props.university)
            });
        setEditMode(editMode = false);
    }

    if (editMode == false) {
        return (
            <div className={styles.student}>
                <div id='name' className={styles.studentInfo}>{props.name}</div>
                <div id='surname' className={styles.studentInfo}>{surname}</div>
                <div id='date_of_birth' className={styles.studentInfo}>{props.date_of_birth}</div>
                <div id='average' className={styles.studentInfo}>{props.average}</div>
                <div id='age' className={styles.studentInfo}>{props.age}</div>
                <div id='university' className={styles.studentInfo}>{props.university}</div>
                <button onClick={() => { setEditMode(editMode = true) }}>edit</button>
                <button onClick={deleteItem}>delete</button>
            </div>
        )
    } else {
        return (
            <div id='student' className={styles.student}>
                <input id='name' className={styles.studentInfo} value={name} onChange={onNameChange} />
                <input id='surname' className={styles.studentInfo} value={surname} onChange={onSurnameChange} />
                <input id='date_of_birth' className={styles.studentInfo} value={date_of_birth} onChange={onDate_of_birthChange} />
                <input id='average' className={styles.studentInfo} value={average} onChange={onAverageChange} />
                <input id='age' className={styles.studentInfo} value={age} onChange={onAgeChange} />
                <input id='university' className={styles.studentInfo} value={university} onChange={onUniversityChange} />
                <button onClick={sendChanges}>OK</button>
                <button onClick={cancelChanges}>Cancel</button>
            </div>
        )

    }
}

export default Student;