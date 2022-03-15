import { atom } from 'recoil';

export const listReact = atom({
    key: 'listReact',
    default: [
        { name: "Đinh Tuấn Anh", age: 20 },
        { name: "Ngụy Minh Thắng", age: 21 },
        { name: "Nguyễn Anh Thư", age: 22 },
    ]
});

export const listJava = atom({
    key: 'listJava',
    default: [
        { name: "Bế Trọng Hiếu", age: 20 },
        { name: "Ngô Huỳnh Đức", age: 19 },
        { name: "Nguyễn Mạnh Dũng", age: 18 }
    ]
});
export const editData = atom({
    key: 'editData',
    default: {}
});