import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { listReact, listJava } from '../dataImprivate';
import { useRecoilState } from 'recoil';

const FormAdd = () => {
    const { register, handleSubmit, FormState: { errors }, reset } = useForm();
    const [listReactMember, setListReactMember] = useRecoilState(listReact);
    const [listJavaMember, setListJavaMember] = useRecoilState(listJava);


    const onSumit = (data) => {
        if (data.class === 'react') {
            setListReactMember([
                ...listReactMember,
                {
                    name: data.name,
                    age: +data.age
                }
            ])
        } else if (data.class === 'java') {
            setListJavaMember([
                ...listJavaMember,
                {
                    name: data.name,
                    age: +data.age
                }
            ])
        }
        reset();
    }
    console.log(listReactMember);

    return (
        <>
            <form onSubmit={handleSubmit(onSumit)} style={{ display: 'flex', flexDirection: 'column', width: '300px' }}>
                <label>
                    Name:
                    <input {...register("name", { required: true })} style={{ width: '100%' }} />
                </label>
                {errors.name && <span style={{ color: 'red' }}>Vui lòng nhập trường này</span>}
                <label>
                    Age:
                    <input type="number" {...register("age", { required: true })} style={{ width: '100%' }} />
                </label>
                {errors.age && <span style={{ color: 'red' }}>Vui lòng nhập trường này</span>}
                <select {...register("class")}>
                    <option value="react">React</option>
                    <option value="java">Java</option>
                </select>
                <button type="submit" style={{ width: '100px' }}>Add member</button>
            </form>
            <Link to="/">Return Home</Link>
        </>
    )

}

export default FormAdd