export function useValidate() {
  function validateEmail(rule: any, value: any, callback: any) {
    if (value && !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i.test(value))
      callback(new Error('Введите корректный адрес электронной почты'))
    else
      callback()
  }

  function validatePhone(rule: any, value: string, callback: (error?: Error) => void) {
    if (value && !value.startsWith('+'))
      callback(new Error('Должен начинаться с "+"'))
    else if (value && !/^[0-9+-]+$/.test(value))
      callback(new Error('Можно использовать только цифры, "+" и "-"'))
    else
      callback()
  }

  function validateFullName(rule: any, value: any, callback: any) {
    if (value && !/^[A-Za-zа-яА-ЯёЁ]+$/.test(value))
      return callback(new Error('Можно использовать только буквы'))
    else
      return callback()
  }

  function validateUsername(rule: any, value: any, callback: any) {
    if (value && !/^[A-Za-zа.-]+$/.test(value))
      return callback(new Error('Можно использовать только латиницу, "." и "-"'))
    else
      return callback()
  }

  function validatePassword(rule: any, value: any, callback: any) {
    if (value && !/^[0-9A-Za-zа]+$/.test(value))
      return callback(new Error('Можно использовать только латиницу и цифры'))
    else
      return callback()
  }

  return {
    validateEmail,
    validateFullName,
    validatePassword,
    validatePhone,
    validateUsername,
  }
}
