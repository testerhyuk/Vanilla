export const CheckEmail = (email) => {
    // eslint-disable-next-line
    var emailRegex = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;

    if (!emailRegex.test(email)) {
      return false;
    }
}

export const CheckPassword = (password) => {
    // eslint-disable-next-line
    var pwdReg = /^.*(?=^.{8,}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/;

    if (!pwdReg.test(password)) {
      return false
    }
}
