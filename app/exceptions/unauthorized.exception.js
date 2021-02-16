class UnauthorizedException extends Error {
  constructor(...params) {
    super(...params)
    this.status = 401
  }
}

module.exports = {
  UnauthorizedException
}