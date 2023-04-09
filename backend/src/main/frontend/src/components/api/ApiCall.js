import { enqueueSnackbar } from "notistack";
import { SERVER_URL } from "../Constant";

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
            enqueueSnackbar(err.error, {variant: 'error', autoHideDuration: 2000});
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

export function modifyPassword(userDto) {
    return call('member/password', 'PATCH', userDto).then((response) => {
        if (response) {
            enqueueSnackbar("비밀번호가 변경되었습니다", {variant: 'success', autoHideDuration: 2000});
        }
    })
}

export function modifyAddress(userDto) {
    return call('member/address', 'PATCH', userDto).then((response) => {
        if (response) {
            alert("주소가 변경되었습니다")
            window.location.reload();
        }
    })
}

export function getVerifyCode(userDto) {
    return call('emailcode', 'POST', userDto).then(() => {
        enqueueSnackbar("인증번호를 보냈습니다", {variant: 'success', autoHideDuration: 2000})
    })
}