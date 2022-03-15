import { useState, useEffect, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { listReact, listJava, editData } from '../dataImprivate';
import { useRecoilState } from 'recoil';
import UserForm from './UserForm';

const UserPage = () => {
    const [listReactMembers, setListReactMembers] = useRecoilState(listReact);
    const [listJavaMembers, setListJavaMembers] = useRecoilState(listJava);
    const [data, setData] = useRecoilState(editData);
    let navigate = useNavigate();

    const [searchInput, setSearchInput] = useState('');
    const [listSearch, setListSearch] = useState([]);


    useEffect(() => {
        if (listReactMembers.length === 0) {
            alert("Warning: React class is empty now")
        } else if (listJavaMembers.length === 0) {
            alert("Warning: Java class is empty now")
        }
    }, [listReactMembers.length, listJavaMembers.length])

    const handleTransferReact = (index) => {
        const a = [...listReactMembers];
        const b = a.splice(index, 1);
        setListJavaMembers([
            ...listJavaMembers,
            ...b
        ]);
        setListReactMembers([...a]);
    };

    const handleTransferJava = (index) => {
        const a = [...listJavaMembers];
        const b = a.splice(index, 1);
        setListReactMembers([
            ...listReactMembers,
            ...b
        ]);
        setListJavaMembers([...a]);
    };

    const handleEditUserReact = (user, index) => {
        setData({
            name: user.name,
            age: user.age,
            type: 'react',
            index
        });
        navigate('/form-edit')
    }

    const handleEditUserJava = (user, index) => {
        setData({
            name: user.name,
            age: user.age,
            type: 'java',
            index
        });
        navigate('/form-edit')
    }


    // Delete member
    const handleDeleteReactMember = (i) => {
        const a = [...listReactMembers]
        a.splice(i, 1)
        setListReactMembers([
            ...a
        ])
    }
    const handleDeleteJavaMember = (i) => {
        const a = [...listJavaMembers]
        a.splice(i, 1)
        setListJavaMembers([
            ...a
        ])
    }

    // Search member
    const handleChangeSearch = (value) => {
        setListSearch([])
        setSearchInput(value);
    }

    const handleSearch = (e) => {
        e.preventDefault();
        const searchCase = searchInput.toUpperCase();
        listReactMembers.map(member => {
            const mem = member.name.toUpperCase();
            if (mem.includes(searchCase)) {
                listSearch.push(member);
                setListSearch(listSearch)
            }
        });
        listJavaMembers.map(member => {
            const mem = member.name.toUpperCase();
            if (mem.includes(searchCase)) {
                listSearch.push(member);
                setListSearch(listSearch)
            }
        });
        setSearchInput('')
    }

    // Sort member
    const handleSort = (e) => {
        const reactMembers = [...listReactMembers];
        const javaMembers = [...listJavaMembers];
        if (e === 'big') {
            reactMembers.sort((a, b) => b.age - a.age)
            setListReactMembers([...reactMembers])
            javaMembers.sort((a, b) => b.age - a.age)
            setListJavaMembers([...javaMembers])
        } else if (e === 'small') {
            reactMembers.sort((a, b) => a.age - b.age)
            setListReactMembers([...reactMembers])
            javaMembers.sort((a, b) => a.age - b.age)
            setListJavaMembers([...javaMembers])
        }
    }

    // Thực hành useMemo, chức năng tìm xem đội nào già hơn, hi hi :3
    const totalJava = useMemo(() => {

        const result = listJavaMembers.reduce((result, item) => {
            console.log('render lai');
            return result + item.age
        }, 0);

        return result;
    }, [listReactMembers, listJavaMembers])

    const totalReact = useMemo(() => {

        const result = listReactMembers.reduce((result, item) => {
            console.log('render lai');
            return result + item.age
        }, 0);

        return result;
    }, [listReactMembers, listJavaMembers])

    return (
        <div className="App">
            <div>Sort by age: <button onClick={() => handleSort('big')}>Từ lớn đến bé</button><button onClick={() => handleSort('small')}>Từ bé đến lớn</button></div>
            <UserForm
                data={listReactMembers}
                name="React"
                handleClick={handleTransferReact}
                handleEdit={handleEditUserReact}
                handleDelete={handleDeleteReactMember}
                total={totalReact}
            />
            <UserForm
                data={listJavaMembers}
                name="Java"
                handleClick={handleTransferJava}
                handleEdit={handleEditUserJava}
                handleDelete={handleDeleteJavaMember}
                total={totalJava}
            />
            <Link to="/form">Form Add</Link>

            <div className="form_container">
                <h2 style={{ color: 'blue' }}>Search member</h2>
                <form className="form_box" onSubmit={handleSearch}>
                    <label>
                        Search:
                        <input
                            onChange={(e) => handleChangeSearch(e.target.value)}
                            required="required"
                            value={searchInput}
                            type="text"
                            name="search"
                            placeholder="Tìm kiếm..."
                        />
                    </label>
                    <button type="submit">Search</button>
                </form>
            </div>
            <ul>
                {listSearch && listSearch.map((member, index) => {
                    return (
                        <li key={index}>name: {member.name} - age: {member.age}</li>
                    )
                })}
            </ul>
        </div>
    )
}

export default UserPage