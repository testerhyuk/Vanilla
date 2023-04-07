import { SERVER_URL } from "./Constant";

export function call(api, method, request) {
    let headers = new Headers({
        "Content-Type" : "application/json",
    });

    const accessToken = localStorage.getItem("ACCESS_TOKEN") !== 'null' ? localStorage.getItem("ACCESS_TOKEN") : sessionStorage.getItem("ACCESS_TOKEN")
    
    if (accessToken && accessToken !== null) {
        headers.append("Authorization", "Bearer " + accessToken);
    }

    let options = {
        headers: headers,
        url: SERVER_URL + api,
        method: method,
    };

    if (request) {
        options.body = JSON.stringify(request);
    }

  return fetch(options.url, options).then((response) => {
    if (response.status === 200) {
        return response.json();
    } else if (response.status === 403) {
        alert("로그인이 필요한 서비스입니다")
        window.location.href = '/login';
    } else {
        response.text().then((res) => {
            const err = JSON.parse(res)
            alert(err.error)
        })
    }
  }).catch((error) => {
    console.log("http error");
    console.log(error)
  })
}

export function signin(userDto, isChecked) {
    return call("auth/signin", "POST", userDto).then((response) => {
        if(response.accessToken) {
            if(isChecked) {
                localStorage.setItem("ACCESS_TOKEN", response.accessToken)
            } else {
                sessionStorage.setItem("ACCESS_TOKEN", response.accessToken)
            }
            window.location.href="/";
        }
    })
}

export function signout() {
    if (sessionStorage.getItem("ACCESS_TOKEN")) {
        sessionStorage.setItem("ACCESS_TOKEN", null)
    }

    if (localStorage.getItem("ACCESS_TOKEN")) {
        localStorage.setItem("ACCESS_TOKEN", null)
    }
    window.location.href="/";
}

export function signup(userDto) {
    return call('auth/signup', 'POST', userDto).then((response) => {
        if (response) {
            alert('회원가입이 완료되었습니다')
            window.location.href="/login";
        }
    })
}