const listStudents =
    [
        {
            name: "Ha",
            gender: 'female',
            poin: 8
        },
        {
            name: "Huy",
            gender: 'male',
            poin: 9
        },
        {
            name: "Hung",
            gender: 'male',
            poin: 7
        },
        {
            name: "Phuong",
            gender: 'female',
            poin: 6
        },
        {
            name: "Huyen",
            gender: 'female',
            poin: 10
        },
        {
            name: "Long",
            gender: 'male',
            poin: 5
        },
        {
            name: "Luan",
            gender: 'male',
            poin: 10
        },
        {
            name: "Linh",
            gender: 'female',
            poin: 8
        }

    ];
let sumMale = 0;
let sumFemale = 0;
let sumPoinMale = 0;
let sumPoinFemale = 0;
for (let i = 0; i < listStudents.length; i++) {
    if (listStudents[i].gender === 'female'){
        sumFemale++
        sumPoinMale += listStudents[i].poin;
    }else {
        sumMale++;
        sumPoinFemale +=listStudents[i].poin;
    }
}
console.log(`Diem tb male la :  ${[sumPoinMale]/[sumMale]}`);
console.log(`Diem tb cua female là : ${[sumPoinFemale]/[sumFemale]}`);