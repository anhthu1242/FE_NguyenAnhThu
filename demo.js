const divTag = document.getElementById("react-id");



const Member = (props) => {
    const {name, age, handleTranfer, handleUpdate} = props;
    return <div>
        <span>name: {name}</span> -<span>age: {age}</span>
        <button onClick={() => handleTranfer()}>tranfer</button>
        <button onClick={()=> handleUpdate()}>Edit</button>
    </div>
}
const INIT_DATA = {
    name: "",
    age: "",
    classType: "react"
}
const TranferMember = () => {

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
   const FillReact=(user, index) => {
    setFormData({
      ...user,
      index: index,
      classType: 'react'
    })
  }
  const FillJava=(user, index) => {
    setFormData({
      ...user,
      index: index,
      classType: 'java'
    })
  }

    return (
        <div>
        <h1>list member of React class</h1>
        {reactMembers.length > 0 ? reactMembers.map((user, index) => {
            return <Member name={user.name} age={user.age}
            key={index}
            handleTranfer={() => tranferReactToJavaMember(index)}
            handleUpdate = {()=> FillReact(user,index)}
            //   renderExtend={() => <span>hello by react</span> 
            />
        }) : "empty class"}
        <h1>list member of Java class</h1>
        {javaMembers.length > 0 ?javaMembers.map((user,index) => {
            return <Member name={user.name} age={user.age}
            key={index}
             handleTranfer={() => tranferJavaToReactMember(index)}
             handleUpdate = {()=> FillJava(user,index)}
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
            onChange={(e) => handleInput(e)}></input>
            {" --- "}
            <label>age</label>
            <input
            value={formData.age}
            name="age"
            onChange={(e) => handleInput(e)}
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
