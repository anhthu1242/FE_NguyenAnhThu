const divTag = document.getElementById("container");

const User = (props) => {
    return (
        <div key={props.name}>Name: {props.name} - Age: {props.age}</div>
    )
}

function Component(props) {
    const [userReacts, setUserReacts] = React.useState([
        { name: "Đinh Tuấn Anh", age: 20 },
        { name: "Ngụy Minh Thắng", age: 21 },
        { name: "Nguyễn Anh Thư", age: 22 }
    ]);

    const [userJavas, setUserJavas] = React.useState([
        { name: "Bế Trọng Hiếu", age: 20 },
        { name: "Ngô Huỳnh Đức", age: 19 },
        { name: "Nguyễn Mạnh Dũng", age: 18 }
    ]);

    function addUser(add) {
        add.preventDefault();
        let nameAdd = document.getElementById("nameAdd");
        let ageAdd = document.getElementById("ageAdd");
        if (nameAdd.value == "" || ageAdd.value == "") {
            alert("Error!")
        }
        else {
            userReacts.push({ name: nameAdd.value, age: ageAdd.value })
            setUserReacts([...userReacts]);
            nameAdd.value = "";
            ageAdd.value = "";
        }
    }

    React.useEffect(() => {
        return () => {
            if (userReacts.length == 0) {
                alert("React class is empty now");
            }
            else if (userJavas.length == 0) {
                alert("Java class is empty now");
            }
        }
    })

    return (
        <div>
            <h1 className="title">List member of React class</h1>
            <span>{userReacts.map((userReact,index) => {
                var name = userReact.name;
                var age = userReact.age;
                return (
                    <div className="class-list">
                        <User key={userReact.name} name={userReact.name} age={userReact.age} />

                        <button
                            onClick={() => {
                                userJavas.push({name: name, age: age })
                                userReacts.splice(index, 1)
                                setUserReacts([...userReacts])
                            }}>Tranfer</button>
                    </div>
                )
            })}</span>

            <h1 className="title">List member of Java class</h1>
            <span >{userJavas.map((userJava,index) => {
                var name = userJava.name;
                var age = userJava.age;
                return (
                    <div className="class-list">
                        <User key={userJava.name} name={userJava.name} age={userJava.age} />

                        <button
                            onClick={() => {
                                userReacts.push({ name: name, age: age })
                                userJavas.splice(index, 1)
                                setUserJavas([...userJavas])
                            }}>Tranfer</button>
                    </div>
                )
            })}</span>

            <h1 className="title">Form add user</h1>
            <form onSubmit={addUser}>
                <div className="info-input">
                    <label>
                        Name: <input type="text" id="nameAdd" />
                    </label>
                    <label>
                        Age: <input type="text" id="ageAdd" />
                    </label>
                </div>
                <input type="submit" value="Add user" />
            </form>
        </div>
    )
}

ReactDOM.render(<div>
    <Component />
</div>, divTag);