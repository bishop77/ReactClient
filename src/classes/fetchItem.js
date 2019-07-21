export default class FetchingDate{
    get_Data = async (url)=>{
        const res = await fetch(`${url}`);
        if (!res.ok) {
            throw new Error(`Could not fetch ${url}` +
            `, received ${res.status}`)
        }
        return await res.json();
    };

    add_Data = async(url, data)=>{
        const res = await fetch(`${url}`, {
            method: "POST",
            headers: { 
                'Content-Type': 'application/json',
             },
            body: data
        });
        if (!res.ok) {
            throw new Error(`Could not fetch ${url}` +
            `, received ${res.status}`)
        }
        return await res.json();
    }

    update_Data = async(url, data)=>{
        const res = await fetch(`${url}`, {
            method: "PUT",
            headers: { 
                'Content-Type': 'application/json',
             },
            body: data
        });
        if (!res.ok) {
            throw new Error(`Could not fetch ${url}` +
            `, received ${res.status}`)
        }
        return await res.json();
    }

    delete_Data = async(url, data)=>{
        const res = await fetch(`${url}/${data}`, {
            method: "DELETE",
            headers: { 
                'Content-Type': 'application/json',
             },
            body: data
        });
        if (!res.ok) {
            throw new Error(`Could not fetch ${url}` +
            `, received ${res.status}`)
        }
        return await res.json();
    }
}
