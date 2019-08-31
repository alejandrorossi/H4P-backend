// Class for modeling response.

class ApiResponse {
  constructor(status, code, data, error) {
    this.status = status;
    this.code = code;
    this.data = data;
    this.error = error;
  }
}

module.exports = ApiResponse;