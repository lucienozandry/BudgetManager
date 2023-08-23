export function set(value){
    localStorage.setItem('token', value);
}

export function clear(){
    localStorage.clear();
}