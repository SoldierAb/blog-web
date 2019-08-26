// import Qs from '@types/qs'
import Qs from 'qs'

export enum ContentType {
    json = 'application/json;charset=UTF-8',
    form = 'application/x-www-form-urlencoded;charset=UTF-8'
}

export enum HttpMethod {
    post = 'Post',
    get = 'Get',
    put = 'Put',
    patch = 'Patch',
    delete = 'Delete'
}

export interface FetchHeader {
    'Content-Type': string
    'X-Requested-With': string
    token: string
    [propName: string]: any
}

export interface FetchConfig {
    body?: any
    method?: string
    headers?: FetchHeader
    token?: string
    'Content-Type'?: string
}

export const fetchInstance = async (url: string, config: FetchConfig) => {
    let promise: Response
    let contentType: string

    if (config['Content-Type'] !== undefined) {
        contentType = config['Content-Type']
    } else if (config.method === HttpMethod.post) {
        contentType = ContentType.form
    } else {
        contentType = ContentType.json
    }

    const headers: Headers = new Headers({
        'Content-Type': contentType
    } as FetchHeader)

    if (!config.method || config.method === HttpMethod.get) {
        promise = await fetch(url, {
            headers
        })
    } else if (config.method === HttpMethod.post) {
        promise = await fetch(url, {
            headers,
            method: HttpMethod.post,
            // body: Qs.stringify(config.body)
            body: JSON.stringify(config.body)
        })
    } else {
        promise = await fetch(url, {
            headers,
            method: config.method,
            body: JSON.stringify(config.body)
        })
    }

    return HandleRes(promise)

}



const HandleRes = async (res: Response) => {
    const parsedRes = await parseRes(res);

    if (res.ok) {
        return parsedRes
    }
    throw parsedRes

}

const parseRes = async (res: Response) => {
    const contentType = res.headers.get('Content-Type');
    if (contentType) {
        if (contentType.includes('json')) return await res.json()
        if (contentType.includes('form')) return await res.formData()
        if (contentType.includes('text')) return await res.text()
        if (contentType.includes('video')) return await res.blob()
    }

    return await res.text()

}



export function tplFunc(url: string, obj: any): string {
    let replacedUrl = url.replace(/\{(\w+)\}/g, function () {
        return obj[arguments[1]]
    });
    return replacedUrl;
}

export function fetchGet(url: string, params: object) {
    const fetchUrl: string = tplFunc(url, params);
    return new Promise(async (resolve, reject) => {
        try {
            const res = await fetchInstance(fetchUrl, {
                method: HttpMethod.get
            });
            resolve(res);
        } catch (e) {
            reject(e)
        }
    })
}

export function fetchPost(url: string, params: any) {
    const fetchUrl: string = tplFunc(url, params);
    return new Promise(async (resolve, reject) => {
        try {
            const res = await fetchInstance(fetchUrl, {
                body: params,
                method: HttpMethod.post
            });
            resolve(res);
        } catch (error) {
            reject(error)
        }
    })
}

