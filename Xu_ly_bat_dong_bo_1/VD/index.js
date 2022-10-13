let happyHanding = (message) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (message === 'Yes'){
                resolve('Đồng ý');
            }else {
                reject(new Error('Không đồng ý'))
            }
                },5000)
    })
}
happyHanding('Yes').then(result =>{
    console.log(result)
})
