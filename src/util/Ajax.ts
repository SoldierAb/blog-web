import Qs from 'qs'

enum ContentType {
    json = "application/json;charset=UTF-8",
    form = "application/x-www-form-urlencoded; charset=UTF-8"
}

enum HttpMethods {
    post = "Post",
    get = "Get",
    delete = "Delete",
    put = "Put"
}


interface ReuqestHeader {
    Accept?: string;
    'Content-Type': string;
    [propName: string]: any;
}


interface FetchProps {
    
}

