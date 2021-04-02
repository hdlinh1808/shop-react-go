export const getAllCategories = async () => {
    let res = await fetch("/categories")
    let data = await res.json()
    // console.log(data)
    return data;
}

export const addCategory = async (category) => {
    let res = await fetch('/categories', {
        method: 'POST', // or 'PUT'
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(category),
    })

    let data = await res.json();
    return data;
}

export const deleteCategory = async (id) => {
    let res = await fetch('/categories', {
        method: 'DELETE', // or 'PUT'
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            id: id,
        }),
    })
    let data = await res.json();
    return data;
}

export const updateCategory = async (category, id) => {
    category.id = id;
    let res = await fetch('/categories', {
        method: 'PUT', // or 'PUT'
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(category),
    })
    let data = await res.json();
    return data;
}