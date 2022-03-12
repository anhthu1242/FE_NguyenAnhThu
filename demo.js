const divTag = document.getElementById("react-id");



const Member = (props) => {
    const {name, age, handleTranfer, handleUpdate,  handlDelete} = props;
    return <div>
        <span>name: {name}</span> -<span>age: {age}</span>
        <button onClick={() => handleTranfer()}>tranfer</button>
        <button onClick={()=> handleUpdate()}>Edit</button>
        <button onClick={()=> handlDelete()}>Delete</button>
    </div>
}
const INIT_DATA = {
    name: "",
    age: "",
    classType: "react"
}
const TranferMember = () => {
    const [searchName, setSearchName] = React.useState('');
    const [serachlist , setSerachlist] = React.useState([]);

    const [reactMembers, setReactMember] = React.useState(() => {
        return [
            { name: "Đinh Tuấn Anh", age: 20 },
            { name: "Ngụy Minh Thắng", age: 21 },
            { name: "Nguyễn Anh Thư", age: 22 }
        ]
    });
    // useState có thể nhận vào 1 function, giá trị mà function này return về sẽ dùng để khởi tạo state
   
    const [javaMembers, setJavaMember] = React.useState(() => {
        return [
            { name: "Bế Trọng Hiếu", age: 20 },
            { name: "Ngô Huỳnh Đức", age: 19 },
            { name: "Nguyễn Mạnh Dũng", age: 18 }
        ]
    });
    const saveData = () => {
        localStorage.setItem("members", JSON.stringify({
            javaMembers,
            reactMembers,
        }))
    }
    React.useEffect(() => {
        if (javaMembers.length ===0) {
            alert("WARNING: java class is empty now")
        } else if (reactMembers.length === 0) {
            alert("WARNING: react class is empty now")
        }
        saveData();
    } , [reactMembers.length, javaMembers.length])

    
    const tranferReactToJavaMember = (index) => {
        const el = reactMembers[index];
        reactMembers.splice(index, 1);
        javaMembers.push(el);
        setReactMember([...reactMembers]);
        setJavaMember([...javaMembers]);
    }
    const tranferJavaToReactMember = (index) => {
        const el = javaMembers[index];
        javaMembers.splice(index, 1);
        reactMembers.push(el);
        setReactMember([...reactMembers]);
        setJavaMember([...javaMembers]);
    }

    const [formData, setFormData] = React.useState(INIT_DATA)

    const handleInput = (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setFormData({
            ...formData,
            [e.target.name]: value,
            })
    }
   const handleSubmit = () => {
        if (formData.classType === 'react') {
            reactMembers.push(formData);
            setReactMember([...reactMembers])
        } else {
            javaMembers.push(formData)
            setJavaMember([...javaMembers])
        }
        setFormData(INIT_DATA)
   }
   const inputRef = React.useRef()
   const FillReact=(user, index) => {
    setFormData({
      ...user,
      index: index,
      classType: 'react'
    })
    inputRef.current.focus();
  }
  const FillJava=(user, index) => {
    setFormData({
      ...user,
      index: index,
      classType: 'java'
    })
    inputRef.current.focus();
  }
  const handleChangeSearch = (value) => {
    setSerachlist([])
    setSearchName(value);
}

const handleSearch = (e) => {
    e.preventDefault();
    const nameSearch = searchName.toUpperCase();
    reactMembers.map(user => {
        const list = user.name.toUpperCase();
        if (list.includes(nameSearch.toUpperCase())) {
            serachlist.push(user);
            setSerachlist(serachlist)
        }
    });
    javaMembers.map(user => {
        const list = user.name.toUpperCase();
        if (list.includes(nameSearch.toUpperCase())) {
            serachlist.push(user);
            setSerachlist(serachlist)
        }
    });
    setSearchName('')
}

  const handleDeleteReactMember = (index) => {
      if( reactMembers.splice(index, 1)){
          setReactMember([
        ...reactMembers
    ])
    alert("đã xóa "+ (index+1) + "phần tử")
      }
   
    
}
const handleDeleteJavaMember = (index) => {
    if( javaMembers.splice(index, 1)){
        setJavaMember([
      ...javaMembers
  ])
  alert("đã xóa "+ (index+1) + "phần tử")
    }
 
}

    return (
        <div>
            <div>
            <h2>Search member</h2>
                <form onSubmit={handleSearch}>
                    <label>
                        Search:
                        <input
                        id="schName"
                            onChange={(e) => handleChangeSearch(e.target.value)}
                            value={searchName}
                            type="text"
                            name="schName"
                            
                        ></input>
                    </label>
                    <button type="submit">Search</button>
                    
                </form>
                {serachlist && serachlist.map((user, index) => {
                    return (
                        <p key={index}>name: {user.name}</p>
                    )
                })}
            </div>
        <h1>list member of React class</h1>
        {reactMembers.length > 0 ? reactMembers.map((user, index) => {
            return <Member name={user.name} age={user.age}
            key={index}
            handleTranfer={() => tranferReactToJavaMember(index)}
            handleUpdate = {()=> FillReact(user,index)}
            handlDelete = {()=> handleDeleteReactMember(index)}
            //   renderExtend={() => <span>hello by react</span> 
            />
        }) : "empty class"}
        <h1>list member of Java class</h1>
        {javaMembers.length > 0 ?javaMembers.map((user,index) => {
            return <Member name={user.name} age={user.age}
            key={index}
             handleTranfer={() => tranferJavaToReactMember(index)}
             handleUpdate = {()=> FillJava(user,index)}
             handlDelete = {()=> handleDeleteJavaMember(index)}
            //   renderExtend={() => <span>hello by java</span>}/>

             />
        }) : "empty class" }
        <h1> Member</h1>
        <form
            onSubmit={(e) => {
                e.preventDefault();
                // e.preventDefault() dùng để bỏ qua sự kiện mặc định của event của 1 thẻ html nào đó như thẻ form, a
                handleSubmit();
            }}
        >
            <label>name</label>
            <input 
            name="name"
            value={formData.name}
            onChange={(e) => handleInput(e)}
            ref={inputRef}></input>
            {" --- "}
            <label>age</label>
            <input
            value={formData.age}
            name="age"
            onChange={(e) => handleInput(e)}
            ref={inputRef}
            ></input>
            <select
            name="classType"
            onChange={(e) => handleInput(e)}
            value={formData.classType}>
                <option value="react">React</option>
                <option value="java">Java</option>
            </select>
            <button >submit</button> 
            <button >Update</button>
            {/* checkme<input type="checkbox" name="testCheckbox" /> */}
        </form>

        
           
        
        </div>
    )

}

ReactDOM.render(<div>
    <TranferMember />
    </div>, divTag);