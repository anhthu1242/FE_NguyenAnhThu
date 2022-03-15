import { Link, useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { listJava, listReact, editData } from '../dataImprivate';
import { useRecoilState } from 'recoil';

const FormEdit = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [listReactMember, setListReactMember] = useRecoilState(listReact);
    const [listJavaMember, setListJavaMember] = useRecoilState(listJava);
    const [data, setData] = useRecoilState(editData);
    const navigate = useNavigate()


    const onSumit = (e) => {
        if (data.type === 'react') {
            const a = [...listReactMember]
            a[data.index] = {
                name: e.name,
                age: +e.age
            };
            setListReactMember([...a])
        } else if (data.type === 'java') {
            const a = [...listJavaMember]
            a[data.index] = {
                name: e.name,
                age: +e.age
            };
            setListJavaMember([...a])
        }
        reset();
        setData({});
        navigate('/');
    }

    return (
        <>
            <form onSubmit={handleSubmit(onSumit)} style={{ display: 'flex', flexDirection: 'column', width: '300px' }}>
                <label>
                    Name:
                    <input defaultValue={data.name} {...register("name", { required: true })} style={{ width: '100%' }} />
                </label>
                {errors.name && <span style={{ color: 'red' }}>Vui lòng nhập trường này</span>}
                <label>
                    Age:
                    <input type="number" defaultValue={data.age} {...register("age", { required: true })} style={{ width: '100%' }} />
                </label>
                {errors.age && <span style={{ color: 'red' }}>Vui lòng nhập trường này</span>}
                <select {...register("class")} defaultValue={data.type} disabled>
                    <option value="react">React</option>
                    <option value="java">Java</option>
                </select>
                <button type="submit" style={{ width: '100px' }}>Edit member</button>
            </form>
            <Link to="/">Return userPage</Link>
        </>
    )

}

export default FormEdit