import React from 'react'

const UserForm = ({ data, name, handleClick, handleEdit, handleDelete, total }) => {
    return (
        <div className="member_container">
            <h2>list member of {name} class</h2>
            <p>Tổng số tuổi thành viên: {total} (Sử dụng useMemo)</p>
            <ul>
                {(data.length > 0 && data.map((member, index) => {
                    return (
                        <li key={index}>
                            name: {member.name} - age: {member.age}
                            <button onClick={() => handleClick(index)}>Transfer</button>
                            <button onClick={() => handleEdit(member, index)}>Edit</button>
                            <button onClick={() => handleDelete(index)}>Delete</button>
                        </li>
                    )
                })) || (<p>empty class</p>)}
            </ul>
        </div>
    )
}

export default UserForm